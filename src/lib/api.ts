import { TODOIST_API_BASE_URL } from '@/constants/constants'
import axios from 'axios'

const todoistApi = axios.create({
	baseURL: TODOIST_API_BASE_URL,
	headers: {
		Authorization: `Bearer 05bee2fbd55ef1e11666bb3f6a52608b849a94d9`
	}
})

export const getTasks = async () => {
	try {
		const response = await todoistApi.get('/tasks?_sort=id')
		return response.data
	} catch (error) {
		console.error('Error getting tasks:', error)
		throw error
	}
}

export const addTask = async (content: string) => {
	try {
		const response = await todoistApi.post('/tasks', {
			content
		})
		return response.data
	} catch (error) {
		console.error('Error adding task:', error)
		throw error
	}
}

export const deleteTask = async (taskId: string) => {
	try {
		const response = await todoistApi.delete(`/tasks/${taskId}`)
		return response.data
	} catch (error) {
		console.error('Error deleting task:', error)
		throw error
	}
}

export const closeTask = async (taskId: string) => {
	try {
		const response = await todoistApi.post(`/tasks/${taskId}/close`)
		return response.status
	} catch (error) {
		console.error('Error closing task:', error)
		throw error
	}
}
