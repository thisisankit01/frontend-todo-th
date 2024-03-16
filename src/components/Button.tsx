import React, { SVGProps } from 'react'

interface ButtonProps {
	className?: string
	onClick?: () => void
	children?: React.ReactNode
	disabled?: boolean
	type?: 'submit' | 'reset' | 'button'
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	className,
	children,
	type,
	...rest

}) => {
	return (
		<button
		    type={type}
			{...rest}
			className={`${className} text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center me-2 `}
			onClick={onClick}
			disabled={rest.disabled}
		>
			{children}
		</button>
	)
}

export default Button
