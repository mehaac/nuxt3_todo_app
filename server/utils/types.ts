import z from 'zod'

export const TaskStatus = ['todo', 'in-progress', 'done'] as const

export const taskDtoSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  text: z.string().min(4).max(255),
  priority: z.number().min(0).max(5),
  status: z.enum(TaskStatus),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const taskFormSchema = taskDtoSchema.omit({ id: true, userId: true }).extend({
  priority: z.coerce.number({ required_error: 'Please select priority ' }).min(0).max(5),
})
export const updateTaskSchema = taskFormSchema.omit({ createdAt: true }).partial()

export type TaskDto = z.infer<typeof taskDtoSchema>
export type TaskForm = z.infer<typeof taskFormSchema>
export type UpdateTask = z.infer<typeof updateTaskSchema>

export const taskParamSchema = z.object({
  id: z.string().min(1),
})

export type TaskParam = z.infer<typeof taskParamSchema>
