import { FC, HTMLAttributes } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { privilegesMapping, rolesMapping } from '@/consts'
import { IMemberResponse } from '@/types/members.ts'
import { cn } from '@/utils'

const DescriptionItem: FC<
  {
    title?: string | null
    subTitle?: string | null
  } & HTMLAttributes<HTMLDivElement>
> = ({ title, subTitle, className, ...props }) => {
  return (
    <div
      className={cn('px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0', className)}
      {...props}>
      <dt className='text-sm font-medium leading-none text-gray-900'>{title || 'Отсутствует'}</dt>
      <dd className='mt-1 text-sm leading-none text-gray-700 sm:col-span-2 sm:mt-0'>{subTitle || 'Отсутствует'}</dd>
    </div>
  )
}

const UserDescriptionCard: FC<
  HTMLAttributes<HTMLDivElement> & {
    user: Partial<IMemberResponse>
  }
> = ({ user, className, ...props }) => {
  return (
    <Card
      className={cn('w-full ', className)}
      {...props}>
      <CardHeader>
        <CardTitle className='text-xl mb-1 font-medium'>Информация</CardTitle>
      </CardHeader>
      <CardContent className='min-w-40 flex flex-col gap-4 h-full'>
        <div className='border-t border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <DescriptionItem
              title='Имя'
              subTitle={user.firstName}
            />
            <DescriptionItem
              title='Фамилия'
              subTitle={user.lastName}
            />
            <DescriptionItem
              title='Email'
              subTitle={user.email}
            />

            <DescriptionItem
              title='Телефон'
              subTitle={user.phone}
            />

            <DescriptionItem
              title='Заблокирован'
              subTitle={user.locked ? 'Да' : 'Нет'}
            />

            <DescriptionItem
              title='День рождения'
              subTitle={user.birthDay}
            />

            <DescriptionItem
              title='Привилегия'
              subTitle={privilegesMapping(user.privilege)}
            />

            <DescriptionItem
              title='Роль'
              subTitle={rolesMapping(user.role)}
            />
          </dl>
        </div>
      </CardContent>
    </Card>
  )
}
export default UserDescriptionCard
