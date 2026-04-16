import React from 'react';
import { AIInsightCard } from './AIInsightCard';
import { getInsights, refreshInsights } from '@/app/dashboard/insight-actions';
import { Button } from '@/components/ui/button';
import { MessageCircleIcon, SparklesIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export async function AIInsightSection() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // For this MVP, we refresh on every load as requested by the spec
  const insights = await refreshInsights();

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier')
    .eq('id', user.id)
    .single();

  const isPremium = profile?.subscription_tier === 'premium';

  if (insights.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <SparklesIcon className="h-5 w-5 text-yellow-500" />
          Wawasan AI
        </h2>
        {isPremium && (
          <Button variant="outline" size="sm" disabled className="gap-2">
            <MessageCircleIcon className="h-4 w-4" />
            Konsultasi Chat (Soon)
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, idx) => (
          <AIInsightCard
            key={idx}
            content={insight.content}
            type={insight.type as 'warning' | 'encouragement' | 'saving_tip'}
          />
        ))}
      </div>
    </section>
  );
}
