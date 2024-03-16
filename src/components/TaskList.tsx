import React, { useState } from 'react'
import TaskItem from './TodoCard'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { deleteTask, getTasks } from '@/lib/api'
import { Todo } from '@/types/todo'
import { useTasksQuery } from '@/hooks/useTasksQuery'
import Input from './TaskForm'
import Button from './Button'
import ErrorMessage from './ErrorMessage'

const TaskList = () => {
	const { refetch } = useTasksQuery()

	const { data: todoLists, isLoading: isFetchTodoLoading } = useQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
		staleTime: 0
	})

	const { mutate: deleteMutate, error: deleteTaskError } = useMutation({
		mutationKey: ['deleteTask'],
		mutationFn: deleteTask,
		onSuccess: () => {
			refetch()
		}
	})

	const handleDelete = (id: string) => {
		deleteMutate(id)
	}

	return (
		<>
			{todoLists?.length === 0 && (
				<p className="text-center">No tasks available</p>
			)}
			{todoLists && todoLists?.length > 0 && (
				<div className="py-3 border-black border-[1px] rounded-lg">
					<h1 className="px-3 pb-2 text-2xl">Tasks</h1>
					<div className="overflow-y-auto max-h-96 py-4">
						{isFetchTodoLoading && (
							<p className="px-3">Loading...</p>
						)}
						<AnimatePresence>
							{todoLists &&
								todoLists.map((todo: Todo) => (
									<motion.div
										key={todo?.id}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{
											opacity: 0,
											height: 0,
											overflow: 'hidden'
										}}
										transition={{ duration: 0.3 }}
									>
										<div className="py-2 px-3">
											<TaskItem
												title={todo?.content}
												onDelete={() =>
													handleDelete(todo?.id)
												}
											/>
										</div>
									</motion.div>
								))}
						</AnimatePresence>
					</div>
				</div>
			)}
			{deleteTaskError && <ErrorMessage message="Error Deleting Task" />}
		</>
	)
}

export default TaskList
