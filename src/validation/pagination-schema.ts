import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().min(1).catch(1).default(1).catch(1),
})
