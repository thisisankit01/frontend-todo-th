'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Input from '@/components/TaskInput'
import Button from '@/components/Button'
import { useMutation } from '@tanstack/react-query'
import { addTask } from '@/lib/api'
import TaskList from '@/components/TaskList'
import { useTasksQuery } from '@/hooks/useTasksQuery'
import { motion } from 'framer-motion'
import Alert from '@/components/Alert'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface FormData {
	task: string
}

export default function Home() {
	const { refetch } = useTasksQuery()
	const [isVisible, setIsVisible] = useState(true);

	const schema = z.object({
		task: z.string().nonempty({ message: 'Input cannot be empty' }),
	  });

	const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
	  });
	

	const handleAddTask = (data : FormData) => {	
		mutate(data.task)
		reset()
	}

	const { mutate, error: addTasksError, isSuccess: isaddTaskSuccess, isPending : isAddTaskPending } = useMutation({
		mutationKey: ['addTasks'],
		mutationFn: addTask,
		onSuccess: () => {
			setIsVisible(true)
			refetch()
			setTimeout(() => {
				setIsVisible(false);
			  }, 3000);
		},
		onError: () => {
			setIsVisible(false)
			
		}
	})
	
	return (
		<div className="container py-8 flex justify-center items-center">
			<div className="md:w-2/5 space-y-3 px-3">
				<Header />
				<form onSubmit={handleSubmit(handleAddTask)}>
					<div className='flex space-x-2'>
					<input {...register('task')} className="input-box"/>
					<Button
						className="px-10 bg-blue-700"
						type='submit'
					>
						<span className="inline-flex w-max">Add Task</span>
					</Button>
					</div>
				</form>
				<TaskList />
				{}
				{ isaddTaskSuccess && isVisible &&  (
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
				{isAddTaskPending && (
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
