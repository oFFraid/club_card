import { z } from '@/validation/ru-zod.ts'

export const firstNameValidator = z
  .string()
  .min(2)
  .max(50)
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Должно содержать только буквы и пробелы')
  .trim()

export const lastNameValidator = z
  .string()
  .min(2)
  .max(50)
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Должно содержать только буквы и пробелы')
  .trim()

export const phoneValidator = z
  .string()
  .regex(/^7\d{10}$/, 'Не верный формат')
  .trim()

export const emailValidator = z.string().email().trim()

export const birthDateValidator = z.date().max(new Date())

export const looseOptional = <T extends z.ZodTypeAny, D>(schema: T, defaultValue?: D) =>
  z.preprocess(
    (value: unknown) => (value === null || (typeof value === 'string' && value === '') ? defaultValue : value),
    schema.optional(),
  )
