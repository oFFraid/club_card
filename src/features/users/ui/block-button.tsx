import { AlertOctagon } from 'lucide-react'
import { FC, useEffect } from 'react'

import { Button, useToast } from '@/components/ui'
import { useChangeMemberLockedMutation } from '@/store/api/members-slice.ts'

const BlockButton: FC<{ userId: number; locked: boolean }> = ({ userId, locked }) => {
  const [changeLockUserMutation, changeLockUserMutationInfo] = useChangeMemberLockedMutation()
  const { toast } = useToast()

  useEffect(() => {
    if (changeLockUserMutationInfo.isError) {
      toast({
        title: 'Неизвестная ошибка !',
        variant: 'destructive',
      })
    }
  }, [changeLockUserMutationInfo.isError, toast])

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
