import React from 'react'

interface ErrorMessageProps {
	message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return (
		<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
			<span className="font-medium">{message}</span>
		</div>
	)
}

export default ErrorMessage
