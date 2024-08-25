import { IdCard, LucideMail, PhoneIcon } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@/utils'

import commonStyles from './common.module.css'
import styles from './style.module.css'
import { CardInfo } from './types'

const Card: FC<{
  info: CardInfo
}> = ({ info }) => {
  return (
    <div className={cn(commonStyles.flipCard, 'w-full h-full cursor-pointer')}>
      <div className={cn(commonStyles.flipCardInner)}>
        <div className={cn(styles.frontSide, commonStyles.flipCardFront)}>
          <div className={styles.colorGrid}>
            <div className={styles.black} />
            <div className={styles.red1} />
            <div className={styles.red2} />
            <div className={cn(styles.green, 'bg-secondary')} />
          </div>

          <div className='absolute top-0 left-0 w-full h-full'>
            <img
              className='w-full h-full p-4'
              src='https://t1.ru/images/main_logo.svg'
              alt='logo'
            />
          </div>
          <div className={cn(styles.infoGrid, 'p-3 overflow-auto')}>
            <div>
              <h2 className='text-2xl'>
                {info.firstName} {info.lastName}
              </h2>
              {info.createdAt}
              <h5 className='text-lg font-bold'>{info.privilege}</h5>
            </div>
            {info.phone && (
              <div className='flex text-sm md:text-xl flex-col gap-1 items-end justify-start'>
                <PhoneIcon />
                <p>{info.phone}</p>
              </div>
            )}

            <div className='flex gap-1 text-sm mt-auto justify-between'>
              <div className='flex gap-1 md:text-xl flex-col items-start justify-start'>
                <IdCard />
                <p>{info.id}</p>
              </div>

              <div className='flex gap-1 md:text-xl flex-col items-end justify-start'>
                <LucideMail />
                <p>{info.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn(styles.backSide, commonStyles.flipCardBack)}>
          <div className={styles.colorGrid}>
            <div className={styles.black} />
            <div className={cn(styles.red1, 'bg-primary')} />
            <div className={cn(styles.red2, 'bg-primary')} />
            <div className={cn(styles.green, 'bg-secondary')} />
          </div>
          <div
            className={cn(
              'aspect-square w-1/2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
              styles.blur,
            )}>
            <img
              className='h-full w-full object-cover'
              alt='code'
              src={info.qrLink}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
