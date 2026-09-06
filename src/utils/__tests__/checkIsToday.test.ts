import {describe, expect, it, vi} from 'vitest';
import {isToday} from '@/utils/checkIsToday';

describe('isToday', () => {
	it('matches the local calendar date', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2026, 8, 6, 12, 0));

		expect(isToday(new Date(2026, 8, 6, 0, 1))).toBe(true);
		expect(isToday(new Date(2026, 8, 5, 23, 59))).toBe(false);

		vi.useRealTimers();
	});
});
