import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Input from '@/components/atoms/Input';

describe('Input', () => {
	it('associates its label with the input and reports changes', () => {
		let value = '';
		const {rerender} = render(
			<Input
				label='Email address'
				value={value}
				onChange={(nextValue) => {
					value = nextValue;
				}}
			/>,
		);

		const input = screen.getByLabelText('Email address');
		fireEvent.change(input, {target: {value: 'person@example.com'}});

		expect(value).toBe('person@example.com');
		rerender(
			<Input
				label='Email address'
				value={value}
				onChange={(nextValue) => {
					value = nextValue;
				}}
			/>,
		);
		expect(input).toHaveValue('person@example.com');
	});

	it('connects an error message to the invalid input', () => {
		render(
			<Input
				label='Email address'
				value='invalid'
				onChange={() => undefined}
				error='Invalid email format.'
			/>,
		);

		const input = screen.getByLabelText('Email address');
		const error = screen.getByRole('alert');

		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAttribute('aria-describedby', error.id);
		expect(error).toHaveTextContent('Invalid email format.');
	});
});
