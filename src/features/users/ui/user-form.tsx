import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  Button,
  Card,
  CardContent,
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
} from '@/components/ui'
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

const formSchema = z.object({
  email: emailValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  birthDate: birthDateValidator.optional(),
  phone: looseOptional(phoneValidator),
})

export type IFormValues = z.infer<typeof formSchema>

export const UserForm: FC<{ onSubmit: SubmitHandler<IFormValues>; initialValues?: Partial<IFormValues> }> = (props) => {
  const form = useForm<IFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: props.initialValues || {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  })

  console.log(form.formState.errors)

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-xl mb-1 font-medium'>Редактирование</CardTitle>
      </CardHeader>
      <CardContent className='min-w-40'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(props.onSubmit)}
            className='space-y-8'>
            <fieldset disabled={form.formState.isSubmitting}>
              <div className='grid gap-4'>
                <div className='grid grid-cols-2 gap-4'>
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

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Электронная почта</FormLabel>
                      <FormControl>
                        <Input
                          // type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
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
                <div className='grid grid-cols-1 gap-2 mt-5'>
                  <Button
                    type='submit'
                    className='w-full'>
                    <Save className='mr-2 h-4 w-4' />
                    Сохранить
                  </Button>
                </div>
              </div>
            </fieldset>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
