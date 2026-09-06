import {describe, expect, it} from 'vitest';
import {getTrend} from '@/utils/getTrend';

describe('getTrend', () => {
	it('returns increase when the final value is higher', () => {
		expect(getTrend([1, 2, 3])).toBe('increase');
	});

	it('returns decrease when the final value is lower', () => {
		expect(getTrend([3, 2, 1])).toBe('decrease');
	});

	it('returns same when the endpoints match', () => {
		expect(getTrend([2, 5, 2])).toBe('same');
	});

	it('returns null when there are fewer than two values', () => {
		expect(getTrend([1])).toBeNull();
		expect(getTrend([])).toBeNull();
	});
});
