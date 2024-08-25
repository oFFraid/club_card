import { FC, PropsWithChildren } from 'react'

import bgImage from '@/assets/images/t1-flag.png'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className='container h-screen flex justify-center items-start'>
    <div className='flex max-w-md w-full pb-5 items-center mt-10 justify-center flex-col gap-10'>
      <img
        width={92}
        height={100}
        alt='logo'
        src={bgImage}
      />
      {children}
    </div>
  </div>
)

export default AuthLayout
