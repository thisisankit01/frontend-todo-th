import React from 'react'

interface AlertProps {
	message: string
	type: 'info' | 'success' | 'warning' | 'error'
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
	let bgColor, textColor

	switch (type) {
		case 'info':
			bgColor = 'bg-blue-50'
			textColor = 'text-blue-800'
			break
		case 'success':
			bgColor = 'bg-green-50'
			textColor = 'text-green-800'
			break
		case 'warning':
			bgColor = 'bg-yellow-50'
			textColor = 'text-yellow-800 '
			break
		case 'error':
			bgColor = 'bg-red-50'
			textColor = 'text-red-800'
			break
		default:
			bgColor = 'bg-blue-50'
			textColor = 'text-blue-800'
	}

	return (
		<div
			className={`p-4 mb-4 text-sm rounded-lg ${bgColor} ${textColor}`}
			role="alert"
		>
			<span className="font-medium">{message}</span>
		</div>
	)
}

export default Alert
