// useTasksQuery.js
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '@/lib/api'

export const useTasksQuery = () => {
	return useQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
		staleTime: 0
	})
}
