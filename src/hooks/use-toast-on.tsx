import { useEffect } from 'react'

import { useToast } from '@/components/ui'

export const useToastOnError = ({ isError, error }: { isError: boolean; error?: string }) => {
  const { toast } = useToast()

  useEffect(() => {
    if (isError) {
      toast({
        title: error || 'Ошибка',
        variant: 'destructive',
      })
    }
  }, [error, isError, toast])
}

export const useToastOnSuccess = ({ isSuccess, message }: { isSuccess: boolean; message?: string }) => {
  const { toast } = useToast()

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: message || 'Успешно',
        variant: 'default',
      })
    }
  }, [message, isSuccess, toast])
}
