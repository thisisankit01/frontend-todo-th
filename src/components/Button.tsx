import React, { SVGProps } from 'react'

interface ButtonProps {
	className?: string
	onClick?: () => void
	children?: React.ReactNode
	disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	className,
	children,
	...rest
}) => {
	return (
		<button
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
