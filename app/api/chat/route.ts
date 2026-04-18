import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Fetch user context
  const { data: profile } = await supabase
    .from('profiles')
    .select('locale, budget_strategy')
    .eq('id', user.id)
    .single();

  const locale = profile?.locale || 'id';
  const strategy = profile?.budget_strategy || '50/30/20';

  // Construct dynamic system prompt
  let systemPrompt = '';
  if (locale === 'id') {
    systemPrompt =
      'Kamu adalah Arthana, asisten keuangan personal yang santai dan friendly. Gunakan bahasa Indonesia kasual. ';
  } else {
    systemPrompt =
      'You are Arthana, a casual, friendly personal financial assistant. Use natural, conversational English. ';
  }

  systemPrompt += `User is currently using the ${strategy} budgeting rule. Categorize your analysis based on Needs (Kebutuhan), Wants (Keinginan), and Savings (Tabungan). Warn them if their current spending violates this specific ratio.`;

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: systemPrompt,
    tools: {
      getSpendingByClassification: {
        description:
          'Get total spending aggregated by classification (Needs, Wants, Savings, Income)',
        parameters: z.object({
          month: z.number().optional(),
          year: z.number().optional(),
        }),
        execute: async ({ month, year }: { month?: number; year?: number }) => {
          const now = new Date();
          const targetMonth = month || now.getMonth() + 1;
          const targetYear = year || now.getFullYear();

          const startDate = new Date(
            targetYear,
            targetMonth - 1,
            1
          ).toISOString();
          const endDate = new Date(
            targetYear,
            targetMonth,
            0,
            23,
            59,
            59
          ).toISOString();

          const { data, error } = await supabase
            .from('transactions')
            .select('amount, classification')
            .eq('user_id', user.id)
            .gte('date', startDate)
            .lte('date', endDate);

          if (error) throw error;

          const totals = (data || []).reduce(
            (acc: Record<string, number>, tx) => {
              const cls = tx.classification || 'unclassified';
              acc[cls] = (acc[cls] || 0) + Number(tx.amount);
              return acc;
            },
            {}
          );

          return totals;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    },
  });

  return result.toTextStreamResponse();
}
