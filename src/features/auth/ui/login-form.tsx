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
  PasswordInput,
} from '@/components/ui'
import { z } from '@/validation/ru-zod.ts'

const formSchema = z.object({
  login: z.string().min(2),
  password: z.string().min(2),
})

export type IFormValues = z.infer<typeof formSchema>

export const LoginForm: FC<{ onSubmit: SubmitHandler<IFormValues> }> = (props) => {
  const form = useForm<IFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
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
        <CardDescription className='text-center text-2xl font-bold text-slate-900'>Вход</CardDescription>
      </CardHeader>
      <CardContent className='min-w-40'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(props.onSubmit)}
            className='space-y-8'>
            <fieldset disabled={form.formState.isSubmitting}>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='login'
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

                <Button
                  type='submit'
                  className='w-full mt-5'>
                  Войти в систему
                </Button>
              </div>

              <div className='mt-5 text-center text-sm'>
                Нет аккаунта?{' '}
                <Link
                  to='/register'
                  className='underline'>
                  Зарегистрироваться
                </Link>
              </div>
            </fieldset>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
