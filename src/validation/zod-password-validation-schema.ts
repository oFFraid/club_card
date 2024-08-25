import { z } from './ru-zod'

const MIN_LENGTH = 6
const FIELD_VALIDATION = {
  TEST: {
    SPECIAL_CHAR: (value: string) => /[!#$%&'()*+,./:;<=>?@[\]^_`{|}~\\-]/.test(value),
    LOWERCASE: (value: string) => /[a-z]/.test(value),
    UPPERCASE: (value: string) => /[A-Z]/.test(value),
    NUMBER: (value: string) => /.*[0-9].*/.test(value),
  },
  MSG: {
    SPECIAL_CHAR: 'Пароль должен содержать хотя бы один специальный символ',
    LOWERCASE: 'Пароль должен содержать хотя бы одну строчную букву',
    UPPERCASE: 'Пароль должен содержать хотя бы одну заглавную букву',
    NUMBER: 'Пароль должен содержать хотя бы одну цифру',
    MATCH: 'Пароль должен совпадать',
  },
}

const patterns = z
  .string()
  .min(MIN_LENGTH)
  .refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR)
  .refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE)
  .refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE)
  .refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER)

export const passwordValidationSchema = z
  .object({
    password: patterns,
    confirmPassword: patterns,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      addFieldIssue('password', ctx)
      addFieldIssue('confirmPassword', ctx)
    }
  })

const addFieldIssue = (field: string, ctx: z.RefinementCtx) => {
  ctx.addIssue({
    code: 'custom',
    message: FIELD_VALIDATION.MSG.MATCH,
    path: [field],
    fatal: true,
  })
}
