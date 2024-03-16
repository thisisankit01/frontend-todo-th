import React, { SVGProps } from 'react'

interface ButtonProps {
	className?: string
	text: string
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset' // Add this line
}

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	className,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={`${className} text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center me-2 `}
			onClick={onClick}
		>
			<span className="inline-flex w-max">{text}</span>
		</button>
	)
}

export default Button
