'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Input from '@/components/TaskForm'
import Button from '@/components/Button'
import { useMutation } from '@tanstack/react-query'
import { addTask } from '@/lib/api'
import TaskList from '@/components/TaskList'
import { useTasksQuery } from '@/hooks/useTasksQuery'
import { motion } from 'framer-motion'
import Alert from '@/components/Alert'

export default function Home() {
	const { refetch } = useTasksQuery()
	const [inputValue, setInputValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleAddTask = () => {
		if (inputValue.trim() === '') {
			alert('Input cannot be empty')
			return
		}
		setIsLoading(true)
		mutate(inputValue)
	}

	const { mutate, error: addTasksError } = useMutation({
		mutationKey: ['addTasks'],
		mutationFn: addTask,
		onSuccess: () => {
			setInputValue('')
			setShowSuccess(true)
			setIsLoading(false)
			setTimeout(() => {
				setShowSuccess(false)
			}, 2000)
			refetch()
		},
		onError: () => {
			console.log('Error adding task')
			setIsLoading(false)
		}
	})

	return (
		<div className="container py-8 flex justify-center items-center">
			<div className="md:w-2/5 space-y-3 px-3">
				<Header />
				<div className="flex space-x-2">
					<Input onChange={handleChange} value={inputValue} />
					<Button
						className="px-10 bg-blue-700"
						onClick={handleAddTask}
					>
						<span className="inline-flex w-max">Add Task</span>
					</Button>
				</div>
				<TaskList />
				{}
				{showSuccess && (
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50 }}
						transition={{ duration: 0.5 }}
						className="bg-green-500 p-2 rounded-md text-white"
					>
						Task added successfully!
					</motion.div>
				)}
				{isLoading && (
					<div className="flex justify-center items-center">
						<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
					</div>
				)}
			</div>
			{addTasksError && (
				<Alert message={addTasksError.message} type="error" />
			)}
		</div>
	)
}
