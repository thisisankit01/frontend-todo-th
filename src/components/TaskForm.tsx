import React, { ChangeEvent, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ value, onChange, ...rest }: InputProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e)
	}

	return (
		<input
			type="text"
			id={rest.id}
			value={value}
			onChange={handleChange}
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			{...rest}
		/>
	)
}

export default Input
