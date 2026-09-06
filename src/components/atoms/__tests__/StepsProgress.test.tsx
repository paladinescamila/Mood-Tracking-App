import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import StepsProgress from '@/components/atoms/StepsProgress';

describe('StepsProgress', () => {
	it('exposes the current step and total through progressbar semantics', () => {
		render(<StepsProgress progress={2} total={4} />);

		const progress = screen.getByRole('progressbar', {name: 'Step 2 of 4'});

		expect(progress).toHaveAttribute('aria-valuenow', '2');
		expect(progress).toHaveAttribute('aria-valuemin', '1');
		expect(progress).toHaveAttribute('aria-valuemax', '4');
	});
});
