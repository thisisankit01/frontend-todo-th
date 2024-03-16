import React, { ChangeEvent, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ onChange, ...rest }: InputProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e)
	}

	return (
		<input
			type="text"
			id={rest.id}
			onChange={handleChange}
			className="bg-gray-50 border border-box text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			{...rest}
		/>
	)
}

export default Input
