import React from 'react'
import Button from './Button'

interface TaskProps {
	title: string
	onDelete: () => void
}

const TodoCard = ({ title, onDelete }: TaskProps) => {
	return (
		<div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
			<h1 className="text-lg max-w-80 overflow-hidden break-words">
				{title}
			</h1>
			<Button text="Delete" className="bg-red-500" onClick={onDelete} />
		</div>
	)
}

export default TodoCard
