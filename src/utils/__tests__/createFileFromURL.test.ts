import {afterEach, describe, expect, it, vi} from 'vitest';
import {createFileFromURL} from '@/utils/createFileFromURL';

describe('createFileFromURL', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('converts a successful response into a File', async () => {
		const blob = new Blob(['avatar'], {type: 'image/png'});
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				blob: vi.fn().mockResolvedValue(blob),
			}),
		);

		const file = await createFileFromURL('https://example.com/avatar.png', 'avatar.png');

		expect(file).toBeInstanceOf(File);
		expect(file.name).toBe('avatar.png');
		expect(file.type).toBe('image/png');
	});

	it('throws when the response is not successful', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(new Response(null, {status: 404, statusText: 'Not Found'})),
		);

		await expect(
			createFileFromURL('https://example.com/missing.png', 'missing.png'),
		).rejects.toThrow('Failed to fetch image: 404 Not Found');
	});
});
