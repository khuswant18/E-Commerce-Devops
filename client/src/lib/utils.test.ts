import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('px-2', 'px-4', 'text-sm')).toBe('px-4 text-sm');
  });

  it('ignores falsy values', () => {
    expect(cn('font-medium', false && 'hidden', null, undefined)).toBe('font-medium');
  });
});
