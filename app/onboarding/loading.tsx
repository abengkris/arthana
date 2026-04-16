/**
 * Loading UI for the Onboarding segment
 */
export default function OnboardingLoading() {
  return (
    <div className="flex min-h-[600px] items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-pulse space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="bg-muted h-8 w-48 rounded" />
            <div className="bg-muted h-4 w-24 rounded" />
          </div>
          <div className="bg-muted h-2 w-full rounded" />
        </div>

        <div className="bg-muted h-[400px] w-full rounded-xl" />

        <div className="flex justify-between">
          <div className="bg-muted h-10 w-24 rounded" />
          <div className="bg-muted h-10 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}
