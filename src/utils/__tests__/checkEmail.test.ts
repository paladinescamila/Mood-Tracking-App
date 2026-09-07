import {describe, expect, it} from 'vitest';
import {checkEmail} from '@/utils/checkEmail';

describe('checkEmail', () => {
	it('accepts a valid email address', () => {
		expect(checkEmail('person@example.com')).toBe(true);
	});

	it('rejects malformed email addresses', () => {
		expect(checkEmail('person@example')).toBe(false);
		expect(checkEmail('person.example.com')).toBe(false);
		expect(checkEmail('')).toBe(false);
		expect(checkEmail('   ')).toBe(false);
		expect(checkEmail('person@@example.com')).toBe(false);
	});

	it('accepts common valid boundary formats', () => {
		expect(checkEmail('person+tag@example.com')).toBe(true);
		expect(checkEmail('person.lastname@example.co.uk')).toBe(true);
		expect(checkEmail('person-name@example.com')).toBe(true);
	});
});
