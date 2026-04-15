import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OnboardingWizard } from './onboarding-wizard';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setupFinancialProfile } from '@/app/onboarding/actions';
import { TooltipProvider } from '@/components/ui/tooltip';

// Mock the server action
vi.mock('@/app/onboarding/actions', () => ({
  setupFinancialProfile: vi.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<TooltipProvider>{ui}</TooltipProvider>);
};

describe('OnboardingWizard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('navigates through the wizard steps', async () => {
    renderWithProviders(<OnboardingWizard />);

    // Step 1: Basic Info
    expect(screen.getByText(/financial profile/i)).toBeInTheDocument();

    // Fill step 1
    const incomeInput = screen.getByLabelText(/monthly income/i);
    fireEvent.change(incomeInput, { target: { value: '5000' } });

    // Click Next
    fireEvent.click(screen.getByText('Next'));

    // Step 2: Risk Assessment
    await waitFor(() => {
      expect(screen.getByText(/risk assessment/i)).toBeInTheDocument();
    });

    // Click Next
    fireEvent.click(screen.getByText('Next'));

    // Step 3: Review
    await waitFor(() => {
      expect(screen.getByText(/review & initialize/i)).toBeInTheDocument();
    });
  });

  it('submits the form and calls setupFinancialProfile', async () => {
    (
      setupFinancialProfile as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({ error: null });

    renderWithProviders(<OnboardingWizard />);

    // Step 1
    fireEvent.change(screen.getByLabelText(/monthly income/i), {
      target: { value: '5000' },
    });
    fireEvent.click(screen.getByText('Next'));

    // Step 2
    await waitFor(() => screen.getByText(/risk assessment/i));
    fireEvent.click(screen.getByText('Next'));

    // Step 3
    await waitFor(() => screen.getByText(/review & initialize/i));
    fireEvent.click(screen.getByText('Initialize Dashboard'));

    await waitFor(() => {
      expect(setupFinancialProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          monthlyIncome: 5000,
          employmentType: 'Full-time',
        })
      );
    });
  });

  it('displays error message when submission fails', async () => {
    (
      setupFinancialProfile as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({ error: 'Initialization Failed' });

    renderWithProviders(<OnboardingWizard />);

    // Fast forward to step 3
    fireEvent.change(screen.getByLabelText(/monthly income/i), {
      target: { value: '5000' },
    });
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => screen.getByText(/risk assessment/i));
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => screen.getByText(/review & initialize/i));

    // Submit
    fireEvent.click(screen.getByText('Initialize Dashboard'));

    await waitFor(() => {
      expect(screen.getByText('Initialization Failed')).toBeInTheDocument();
    });
  });
});
