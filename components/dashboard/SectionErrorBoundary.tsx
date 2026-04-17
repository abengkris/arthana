'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   // You can also log the error to an error reporting service
  //   console.error("SectionErrorBoundary caught an error", error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-destructive/10 text-destructive flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 text-center">
          <AlertTriangle className="h-8 w-8" />
          <div>
            <h3 className="font-semibold">Gagal memuat bagian ini</h3>
            <p className="text-sm opacity-90">
              Ada masalah saat mengambil data.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => this.setState({ hasError: false })}
          >
            Coba Lagi
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
