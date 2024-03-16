import React from 'react'
import Button from './Button'
import { FiCheck, FiTrash2, FiX } from 'react-icons/fi'

interface TaskProps {
	title: string
	onDelete: () => void
	onComplete: () => void
	isCheckDisable?: boolean
	isDeleteDisable?: boolean
}

const TodoCard = ({
	title,
	onDelete,
	onComplete,
	isCheckDisable,
	isDeleteDisable
}: TaskProps) => {
	return (
		<div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
			<h1 className="text-lg max-w-80 overflow-hidden break-words">
				{title}
			</h1>
			<div className="flex">
				<Button
					className="bg-green-300 flex justify-center items-center"
					onClick={onComplete}
					disabled={isCheckDisable}
				>
					<FiCheck />
				</Button>
				<Button
					className="bg-red-500 flex justify-center items-center"
					onClick={onDelete}
					disabled={isDeleteDisable}
				>
					<FiX />
				</Button>
			</div>
		</div>
	)
}

export default TodoCard
