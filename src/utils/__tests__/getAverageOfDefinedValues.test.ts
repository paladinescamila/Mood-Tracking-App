import {describe, expect, it} from 'vitest';
import {getAverageOfDefinedValues} from '@/utils/getAverageOfDefinedValues';

type Level = 'low' | 'medium' | 'high';

const levels: Record<Level, number> = {
	low: 1,
	medium: 3,
	high: 5,
};

describe('getAverageOfDefinedValues', () => {
	it('returns the value closest to the average', () => {
		expect(getAverageOfDefinedValues(['low', 'high', 'high'], levels)).toBe('high');
	});

	it('ignores values missing from the mapping', () => {
		expect(getAverageOfDefinedValues(['low', 'unknown' as Level], levels)).toBe('low');
	});

	it('returns null when no values are mapped', () => {
		expect(getAverageOfDefinedValues(['unknown' as Level], levels)).toBeNull();
	});

	it('returns null for an empty input', () => {
		expect(getAverageOfDefinedValues([], levels)).toBeNull();
	});

	it('keeps the first mapped value when the average is tied', () => {
		expect(getAverageOfDefinedValues(['low', 'high'], levels)).toBe('low');
	});
});
