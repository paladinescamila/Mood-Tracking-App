import {describe, expect, it} from 'vitest';
import {checkEmail} from '@/utils/checkEmail';

describe('checkEmail', () => {
	it('accepts a valid email address', () => {
		expect(checkEmail('person@example.com')).toBe(true);
	});

	it('rejects malformed email addresses', () => {
		expect(checkEmail('person@example')).toBe(false);
		expect(checkEmail('person.example.com')).toBe(false);
	});
});
