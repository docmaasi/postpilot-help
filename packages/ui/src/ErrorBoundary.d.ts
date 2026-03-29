import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps);
  static getDerivedStateFromError(error: Error): ErrorBoundaryState;
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
  render(): ReactNode;
}

export default ErrorBoundary;
