import { FC, PropsWithChildren } from 'react'

import Spinner from '@/components/ui/spinner.tsx'

const AppInitializingGuard: FC<PropsWithChildren> = ({ children }) => {
  // const { isInitializing } = useAuth()

  if (true)
    return (
      <div className='h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  return children
}

export default AppInitializingGuard
