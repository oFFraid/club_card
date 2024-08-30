import { QRCodeSVG } from 'qrcode.react'
import { FC } from 'react'

import { privilegesMapping, rolesMapping } from '@/consts'
import { cn } from '@/utils'

import commonStyles from '../common.module.css'
import { CardInfo } from '../types'
import styles from './style.module.css'

const Card: FC<{
  info: CardInfo
}> = ({ info }) => {
  return (
    <div className={cn(commonStyles.flipCard, 'w-full h-full cursor-pointer')}>
      <div className={commonStyles.flipCardInner}>
        <div className={cn(styles.card, styles.front, commonStyles.flipCardFront)}>
          <div className={styles.blue} />
          <div className={styles.yellow} />
          <div className={styles.pink} />
          <div className={styles.dots} />
          <div
            className={cn(
              styles.personalIntro,
              'aspect-square w-1/2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
            )}>
            <QRCodeSVG
              className='h-full w-full object-cover'
              value={JSON.stringify({
                email: info.email,
                locked: info.locked,
                role: info.role,
                privilege: info.privilege,
              })}
            />
          </div>
        </div>
        <div className={cn(styles.card, styles.back, commonStyles.flipCardBack)}>
          <div className={styles.yellow} />
          <div className={cn(styles.top, styles.dots)} />
          <div className={styles.personalInfo}>
            <p className='text-xs whitespace-nowrap sm:text-2xl uppercase mb-1'>
              {info.firstName} {info.lastName}
            </p>
            <p className='text-xs sm:font-bold mb-2'>
              {privilegesMapping(info.privilege)} {info.createdAt}
            </p>
            <p className='text-xs sm:text-sm'>{rolesMapping(info.role)}</p>
            <p className='text-xs sm:text-sm'>{info.phone}</p>
            <p className='mt-2 text-xs hidden sm:block xs:text-sm'>{info.id}</p>
          </div>
          <div className={cn(styles.bottom, styles.dots)} />
          <div className={styles.pink} />
        </div>
      </div>
    </div>
  )
}

export default Card
