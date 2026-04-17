import MobileDashboard from '@/components/mobile/MobileDashboard';

export const metadata = {
  title: 'Mobile Dashboard | Arthana',
  description: 'Personal Finance Tracking Mobile App UI',
};

export default function MobilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      {/* We wrap it in a container that looks like a mobile phone frame for desktop viewing */}
      <div className="relative h-[100dvh] w-full max-w-md overflow-hidden shadow-2xl md:h-[844px] md:rounded-[40px] md:border-8 md:border-[#1A1D24]">
        <MobileDashboard />
      </div>
    </div>
  );
}
