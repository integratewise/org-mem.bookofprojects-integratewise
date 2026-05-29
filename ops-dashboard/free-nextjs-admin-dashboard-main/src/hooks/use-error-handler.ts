/**
 * useErrorHandler — React hook for error handling
 * 
 * Captures, reports, and manages errors across all surfaces.
 */

import { useState, useCallback, useEffect } from 'react';
import { errorHandler, ErrorReport } from '@/lib/error-handler';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseErrorHandlerResult {
  reportError: (error: Omit<ErrorReport, 'id' | 'timestamp' | 'resolved'>) => Promise<void>;
  captureFrontendError: (error: Error, componentStack?: string) => Promise<void>;
  captureApiError: (endpoint: string, status: number, message: string) => Promise<void>;
  capturePipelineError: (pipeline: string, stage: string, message: string) => Promise<void>;
  captureWorkerError: (worker: string, message: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useErrorHandler(): UseErrorHandlerResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reportError = useCallback(async (error: Omit<ErrorReport, 'id' | 'timestamp' | 'resolved'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await errorHandler.reportError(error);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const captureFrontendError = useCallback(async (error: Error, componentStack?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await errorHandler.captureFrontendError(error, componentStack);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const captureApiError = useCallback(async (endpoint: string, status: number, message: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await errorHandler.captureApiError(endpoint, status, message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const capturePipelineError = useCallback(async (pipeline: string, stage: string, message: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await errorHandler.capturePipelineError(pipeline, stage, message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const captureWorkerError = useCallback(async (worker: string, message: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await errorHandler.captureWorkerError(worker, message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      captureFrontendError(event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      captureFrontendError(new Error(event.reason));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [captureFrontendError]);

  return {
    reportError,
    captureFrontendError,
    captureApiError,
    capturePipelineError,
    captureWorkerError,
    isLoading,
    error,
  };
}
