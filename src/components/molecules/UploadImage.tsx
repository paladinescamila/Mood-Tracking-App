import {useRef} from 'react';
import Photo from '@/components/atoms/Photo';
import Button from '@/components/atoms/Button';
import ErrorMessage from '@/components/atoms/ErrorMessage';

interface UploadImageProps {
	value: File | null;
	onChange: (value: File) => void;
	error?: string;
}

export default function UploadImage({value = null, onChange, error}: UploadImageProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const src = value ? URL.createObjectURL(value) : undefined;

	return (
		<div className='flex flex-row items-start gap-5'>
			<input
				type='file'
				accept='image/png, image/jpeg'
				onChange={(e) => e.target.files && e.target.files.length > 0 && onChange(e.target.files[0])}
				style={{display: 'none'}}
				className='hidden'
				ref={inputRef}
			/>
			<Photo src={src} alt='Uploaded image' />
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-1.5'>
					<p className='text-preset-6-regular text-neutral-900'>Upload Image</p>
					<p className='text-preset-7 text-neutral-600'>Max 250KB, PNG or JPEG</p>
				</div>
				<Button type='secondary' onClick={() => inputRef.current?.click()}>
					Upload
				</Button>
				{error ? <ErrorMessage error={error} /> : null}
			</div>
		</div>
	);
}
