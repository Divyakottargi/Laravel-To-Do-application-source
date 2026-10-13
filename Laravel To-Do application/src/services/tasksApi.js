import apiClient from './apiClient'
import { TASK_STATUS } from '../constants/taskStatus'

function normalizeTask(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    dueDate: task.due_date ?? null,
    createdAt: task.created_at ?? null,
    updatedAt: task.updated_at ?? null,
  }
}

function mapTaskPayload(payload) {
  return {
    title: payload.title,
    description: payload.description || null,
    status: payload.status || TASK_STATUS.TODO,
    due_date: payload.dueDate || null,
  }
}

export async function getTasks() {
  const { data } = await apiClient.get('/tasks')
  const tasks = Array.isArray(data?.data) ? data.data : []
  return tasks.map(normalizeTask)
}

export async function getTaskById(id) {
  const { data } = await apiClient.get(`/tasks/${id}`)
  const task = data?.data ?? null
  return task ? normalizeTask(task) : null
}

export async function createTask(payload) {
  const { data } = await apiClient.post('/tasks', mapTaskPayload(payload))
  return normalizeTask(data.data)
}

export async function updateTask(id, payload) {
  const { data } = await apiClient.put(`/tasks/${id}`, mapTaskPayload(payload))
  return normalizeTask(data.data)
}

export async function deleteTask(id) {
  const { data } = await apiClient.delete(`/tasks/${id}`)
  return data
}
