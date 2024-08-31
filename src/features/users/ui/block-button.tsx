import { AlertOctagon } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/components/ui'
import { useToastOnError } from '@/hooks/use-toast-on.ts'
import { useChangeMemberLockedMutation } from '@/store/api/members-slice.ts'

const BlockButton: FC<{ userId: number; locked: boolean }> = ({ userId, locked }) => {
  const [changeLockUserMutation, changeLockUserMutationInfo] = useChangeMemberLockedMutation()

  useToastOnError({
    isError: changeLockUserMutationInfo.isError,
  })

  return (
    <Button
      disabled={changeLockUserMutationInfo.isLoading}
      onClick={() =>
        changeLockUserMutation({
          id: userId,
          locked: !locked,
        })
      }
      variant={locked ? 'default' : 'destructive'}
      className='w-full'>
      <AlertOctagon className='mr-2 h-4 w-4' />
      {locked ? 'Разблокировать' : 'Заблокировать'}
    </Button>
  )
}

export default BlockButton
