/**
 * Result wrapper for service operations.
 * Allows for explicit success/error handling without throwing for expected failures.
 */
export type ServiceResult<T> =
  | { data: T; error: null }
  | { data: null; error: Error };

/**
 * Common error classes for services.
 */
export class ServiceError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class NotFoundError extends ServiceError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ServiceError {
  constructor() {
    super('Unauthorized access', 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}
