import React from 'react'
import TaskItem from './TodoCard'
import { useMutation, useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { closeTask, deleteTask, getTasks } from '@/lib/api'
import { Todo } from '@/types/todo'
import { useTasksQuery } from '@/hooks/useTasksQuery'
import Alert from './Alert'

const TaskList = () => {
	const { refetch } = useTasksQuery()

	const { data: todoLists, isLoading: isFetchTodoLoading } = useQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
		staleTime: 0
	})

	const {
		mutate: deleteMutate,
		error: deleteTaskError,
		isPending: isDeletePending
	} = useMutation({
		mutationKey: ['deleteTask'],
		mutationFn: deleteTask,
		onSuccess: () => {
			refetch()
		}
	})

	const {
		mutate: closeTaskMutate,
		error: closeTaskError,
		isPending: isCloseTaskPending
	} = useMutation({
		mutationKey: ['closeTask'],
		mutationFn: closeTask,
		onSuccess: () => {
			refetch()
		}
	})

	const handleDelete = (id: string) => {
		deleteMutate(id)
	}

	const handleComplete = (id: string) => {
		closeTaskMutate(id)
	}

	return (
		<>
			{todoLists?.length === 0 && (
				<p className="text-center">No tasks available</p>
			)}
			{todoLists && todoLists?.length > 0 && (
				<div className="py-3 border-box border-[1px] rounded-lg">
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
												onComplete={() => {
													handleComplete(todo?.id)
												}}
												isDeleteDisable={
													isDeletePending
												}
												isCheckDisable={
													isCloseTaskPending
												}
											/>
										</div>
									</motion.div>
								))}
						</AnimatePresence>
					</div>
				</div>
			)}
			{deleteTaskError && (
				<Alert message="Error Deleting Task" type="error" />
			)}
			{closeTaskError && (
				<Alert message="Error Closing Task" type="error" />
			)}
			{isDeletePending && (
				<Alert message="Deleting Task..." type="warning" />
			)}
			{isCloseTaskPending && (
				<Alert
					message="Congratulation! Closing Task..."
					type="success"
				/>
			)}
		</>
	)
}

export default TaskList
