"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { message_duration } from '@/constants/constants'



interface AlertProps {
	message: string
	type: 'info' | 'success' | 'warning' | 'error'
    message_duration?: number
}

const AlertStructure: React.FC<AlertProps> = ({ message, type }) => {
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

const Alert = ({ message, type, message_duration = 3000 } : AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, message_duration);

    return () => {
      clearTimeout(timer);
    };
  }, [message_duration]);

  return isVisible ? <AlertStructure message={message} type={type} /> : null;
};

export default Alert;
