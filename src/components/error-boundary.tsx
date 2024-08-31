import { Link } from '@tanstack/react-router'
import { FC } from 'react'

import { Button } from '@/components/ui/button.tsx'

const ErrorBoundary: FC = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-2'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Произошла ошибка</h1>
      <div className='mt-3'>
        <Button asChild>
          <Link to='/'>Перейти на главную</Link>
        </Button>
      </div>
    </div>
  )
}

export default ErrorBoundary
