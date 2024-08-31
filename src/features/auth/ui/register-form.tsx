import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import logoSvg from '@/assets/images/logo.svg'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MaskInput,
  PasswordInput,
} from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { DateFormatter } from '@/utils/formatters.ts'
import {
  birthDateValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  looseOptional,
  phoneValidator,
} from '@/validation'
import { z } from '@/validation/ru-zod.ts'
import { passwordValidationSchema } from '@/validation/zod-password-validation-schema.ts'

const formSchema = passwordValidationSchema.and(
  z.object({
    email: emailValidator,
    firstName: firstNameValidator,
    lastName: lastNameValidator,
    birthDate: birthDateValidator.optional(),
    phone: looseOptional(phoneValidator),
    agree: z.literal(true, {
      message: 'Обязательно',
    }),
  }),
)

export type IFormValues = z.infer<typeof formSchema>

export const RegisterForm: FC<{ onSubmit: SubmitHandler<IFormValues> }> = (props) => {
  const form = useForm<IFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      phone: '',
    },
    reValidateMode: 'onChange',
  })

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className=' mb-1 flex gap-5 items-center justify-center'>
          <div className='w-[70px]'>
            <img
              className='w-fill h-full object-cover'
              src={logoSvg}
              alt='t1 logo'
            />
          </div>
        </CardTitle>
        <CardDescription className='text-center text-2xl font-bold text-slate-900'>Регистрация</CardDescription>
      </CardHeader>
      <CardContent className='min-w-40'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(props.onSubmit)}
            className='space-y-8'>
            <fieldset disabled={form.formState.isSubmitting}>
              <div className='grid gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Имя</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Фамилия</FormLabel>
                        <FormControl>
                          <Input
                            type='lastName'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Пароль</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Подтверждение пароля</FormLabel>
                        <FormControl>
                          <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Электронная почта</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                          <MaskInput
                            {...field}
                            mask={{
                              mask: '+{7} 000 000 00-00',
                            }}
                            placeholder='+7 ___ ___-__-__'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='birthDate'
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Дата рождения</FormLabel>
                        <FormControl>
                          <Input
                            type='date'
                            max={DateFormatter.yyyymmdd(new Date())}
                            value={DateFormatter.yyyymmdd(value)}
                            onChange={(e) => onChange(e.target.valueAsDate)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='agree'
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem className='flex items-center justify-end gap-2 flex-row-reverse space-y-0'>
                      <FormLabel className='text-xs'>
                        Я прочитал(а) и соглашаюсь с{' '}
                        <a
                          className='underline'
                          href='https://www.consultant.ru/document/cons_doc_LAW_61801'
                          target='_blank'
                          rel='noopener noreferrer'>
                          пользовательским соглашением
                        </a>
                      </FormLabel>
                      <FormControl className='m-0'>
                        <Checkbox
                          checked={value}
                          onCheckedChange={onChange}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  className='w-full mt-5'>
                  Создать аккаунт
                </Button>
              </div>

              <div className='mt-4 text-center text-sm'>
                У вас уже есть аккаунт?{' '}
                <Link
                  to='/login'
                  className='underline'>
                  Войти
                </Link>
              </div>
            </fieldset>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
