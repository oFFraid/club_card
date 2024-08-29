import { motion } from 'framer-motion'
import { FC, PropsWithChildren } from 'react'

import bgImage from '@/assets/images/background.png'
import { AuroraBackground } from '@/components/ui'
import { cn } from '@/utils'

const AuthLayout: FC<
  PropsWithChildren<{
    logoVisible?: boolean
  }>
> = ({ children }) => (
  <div
    className='h-screen overflow-hidden min-h-full bg-no-repeat bg-[var(--background-primary)] bg-center bg-cover'
    style={{
      backgroundImage: `url(${bgImage})`,
    }}>
    <AuroraBackground className='h-full overflow-y-auto overflow-x-hidden'>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className={cn('flex w-full min-h-full flex-col gap-4 items-center justify-center px-4')}>
        <div className='max-w-md w-full z-10 py-4 px-2'>{children}</div>
      </motion.div>
    </AuroraBackground>
  </div>
)

export default AuthLayout
