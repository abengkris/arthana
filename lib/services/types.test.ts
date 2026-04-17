import { describe, it, expect } from 'vitest';
import { ServiceError, NotFoundError, UnauthorizedError } from './types';

describe('Service Types', () => {
  it('should correctly initialize ServiceError', () => {
    const error = new ServiceError('Generic error', 'GENERIC_CODE');
    expect(error.message).toBe('Generic error');
    expect(error.code).toBe('GENERIC_CODE');
    expect(error.name).toBe('ServiceError');
  });

  it('should correctly initialize NotFoundError', () => {
    const error = new NotFoundError('User');
    expect(error.message).toBe('User not found');
    expect(error.code).toBe('NOT_FOUND');
    expect(error.name).toBe('NotFoundError');
  });

  it('should correctly initialize UnauthorizedError', () => {
    const error = new UnauthorizedError();
    expect(error.message).toBe('Unauthorized access');
    expect(error.code).toBe('UNAUTHORIZED');
    expect(error.name).toBe('UnauthorizedError');
  });
});
