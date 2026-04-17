import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SectionErrorBoundary } from './SectionErrorBoundary';

// A component that always throws an error
function ErrorComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Everything is fine</div>;
}

describe('SectionErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <SectionErrorBoundary>
        <ErrorComponent shouldThrow={false} />
      </SectionErrorBoundary>
    );
    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    // Suppress console.error for this test as React logs errors boundaries catch
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <SectionErrorBoundary>
        <ErrorComponent shouldThrow={true} />
      </SectionErrorBoundary>
    );

    expect(screen.getByText('Gagal memuat bagian ini')).toBeInTheDocument();
    expect(screen.getByText('Coba Lagi')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('resets error state when retry button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <SectionErrorBoundary>
        <ErrorComponent shouldThrow={true} />
      </SectionErrorBoundary>
    );

    expect(screen.getByText('Coba Lagi')).toBeInTheDocument();

    // Re-render with a component that doesn't throw, so when retry is clicked, it shows children
    rerender(
      <SectionErrorBoundary>
        <ErrorComponent shouldThrow={false} />
      </SectionErrorBoundary>
    );

    fireEvent.click(screen.getByText('Coba Lagi'));

    expect(screen.getByText('Everything is fine')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
