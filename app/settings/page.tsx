import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SettingsForm from './SettingsForm';
import { getTranslations } from 'next-intl/server';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import MobileHeader from '@/components/dashboard/MobileHeader';
import BottomNav from '@/components/dashboard/BottomNav';

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('locale, budget_strategy')
    .eq('id', user.id)
    .single();

  const t = await getTranslations('settings');

  return (
    <div className="bg-background flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <MobileHeader />
        <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 md:pb-6">
          <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
            <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
              <SettingsForm
                initialLocale={profile?.locale || 'id'}
                initialStrategy={profile?.budget_strategy || '50/30/20'}
              />
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
