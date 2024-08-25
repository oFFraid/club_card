import { FC, useEffect, useRef } from 'react'

import { cn } from '@/utils'

const Spinner: FC<{
  centered?: boolean
  className?: string
}> = ({ className, centered = true }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!centered) return
    const $parent = ref.current?.parentElement
    const classIsExist = $parent?.classList.contains('relative')
    if (classIsExist) return
    $parent?.classList.add('relative')
    return () => $parent?.classList.remove('relative')
  }, [centered])

  return (
    <div
      ref={ref}
      className={cn({
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2': centered,
        className,
      })}>
      <svg
        className='animate-spin'
        width='48'
        height='48'
        viewBox='0 0 48 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_2592_7105)'>
          <path
            opacity='0.33'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M30.2558 0.828453L29.2222 4.68692C28.66 4.53585 28.0926 4.41432 27.5117 4.31073C26.9309 4.20713 26.3564 4.12498 25.7766 4.07236L26.1408 0.0944916C26.8306 0.15658 27.525 0.249958 28.2141 0.372871C28.9032 0.495783 29.5871 0.648229 30.2558 0.828453Z'
            fill='#3758F9'
          />
          <path
            opacity='0.38'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M36.0437 3.23207L34.0348 6.6931C33.0418 6.10968 31.9919 5.61768 30.885 5.2171L32.2561 1.45947C33.5824 1.93981 34.8464 2.54111 36.0437 3.23207Z'
            fill='#3758F9'
          />
          <path
            opacity='0.42'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M41.0081 7.0633L38.1697 9.87865C37.3521 9.05225 36.4596 8.30391 35.5039 7.62556L37.8131 4.3603C38.958 5.17398 40.0263 6.07556 41.0081 7.0633Z'
            fill='#3758F9'
          />
          <path
            opacity='0.5'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M44.8038 12.037L41.3401 14.0298C40.758 13.0219 40.0965 12.0609 39.352 11.1662L42.4194 8.60504C43.3147 9.67894 44.1155 10.8274 44.8038 12.037Z'
            fill='#3758F9'
          />
          <path
            opacity='0.55'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M47.2042 17.8285L43.3338 18.8549C43.0376 17.7253 42.6341 16.6274 42.1494 15.5861L45.7724 13.896C46.3598 15.1588 46.8365 16.4729 47.2042 17.8285Z'
            fill='#3758F9'
          />
          <path
            opacity='0.6'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M48.0049 24.0457L44.0049 24.0332C44.0117 22.8561 43.9032 21.699 43.7107 20.5575L47.651 19.8788C47.8872 21.2313 48.0127 22.6352 48.0049 24.0457Z'
            fill='#3758F9'
          />
          <path
            opacity='0.65'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M47.6271 28.2141C47.5042 28.9033 47.3518 29.5871 47.1715 30.2559L43.305 29.2107C43.4543 28.6583 43.5857 28.0926 43.6893 27.5118C43.7929 26.931 43.8669 26.3449 43.9178 25.7749L47.9055 26.1408C47.8452 26.8208 47.7518 27.5152 47.6271 28.2141Z'
            fill='#3758F9'
          />
          <path
            opacity='0.7'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M46.5423 32.2463C46.0602 33.5824 45.4589 34.8465 44.7679 36.0437L41.3069 34.0348C41.8805 33.0401 42.3841 31.9821 42.7846 30.8752L46.5423 32.2463Z'
            fill='#3758F9'
          />
          <path
            opacity='0.75'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M43.6414 37.8033C42.826 38.958 41.9244 40.0263 40.9384 40.9983L38.1213 38.1697C38.9379 37.3504 39.6961 36.4596 40.3646 35.5021L43.6414 37.8033Z'
            fill='#3758F9'
          />
          <path
            opacity='0.8'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M39.3868 42.4078C38.3228 43.3049 37.1743 44.1057 35.9629 44.8038L33.9702 41.3401C34.978 40.758 35.931 40.0849 36.8256 39.3404L39.3868 42.4078Z'
            fill='#3758F9'
          />
          <path
            opacity='0.95'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M34.104 45.7724C32.8412 46.3598 31.5271 46.8365 30.1732 47.1943L29.1353 43.3321C30.2666 43.026 31.3628 42.6323 32.4156 42.1395L34.104 45.7724Z'
            fill='#3758F9'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M28.1229 47.6412C26.7588 47.8855 25.3665 48.0029 23.9542 48.0049L23.9668 44.005C25.1456 44.0019 26.3009 43.9032 27.4326 43.7089L28.1229 47.6412Z'
            fill='#3758F9'
          />
          <path
            opacity='0.05'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M21.8592 47.9055C21.1693 47.8434 20.475 47.75 19.7858 47.6271C19.0967 47.5042 18.4128 47.3518 17.7441 47.1715L18.7794 43.3032C19.3416 43.4543 19.9074 43.5857 20.4882 43.6893C21.069 43.7929 21.6453 43.8652 22.225 43.9178L21.8592 47.9055Z'
            fill='#3758F9'
          />
          <path
            opacity='0.07'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M17.1149 42.7829L15.7438 46.5405C14.4193 46.0503 13.1535 45.4589 11.958 44.7581L13.9652 41.3069C14.9599 41.8805 16.0098 42.3725 17.1149 42.7829Z'
            fill='#3758F9'
          />
          <path
            opacity='0.09'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.4978 40.3646L10.1886 43.6299C9.04192 42.826 7.97364 41.9245 6.99182 40.9367L9.83202 38.1115C10.6496 38.9379 11.5421 39.6863 12.4978 40.3646Z'
            fill='#3758F9'
          />
          <path
            opacity='0.11'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.64977 36.8239L5.58239 39.3851C4.68705 38.3112 3.88626 37.1628 3.19797 35.9531L6.66169 33.9603C7.24376 34.9682 7.90528 35.9293 8.64977 36.8239Z'
            fill='#3758F9'
          />
          <path
            opacity='0.13'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.85059 32.4139L2.2293 34.0941C1.64014 32.8412 1.16348 31.5271 0.797554 30.1616L4.6679 29.1353C4.96417 30.2649 5.36765 31.3628 5.85059 32.4139Z'
            fill='#3758F9'
          />
          <path
            opacity='0.15'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.29105 27.4327L0.348911 28.1212C0.114478 26.7588 -0.0127286 25.3648 -0.00317545 23.9444L3.99677 23.957C3.98998 25.1341 4.09675 26.301 4.29105 27.4327Z'
            fill='#3758F9'
          />
          <path
            opacity='0.17'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.31074 20.4882C4.20714 21.0691 4.13484 21.6453 4.08397 22.2152L0.0945084 21.8592C0.156597 21.1694 0.249975 20.475 0.372887 19.7859C0.4958 19.0967 0.650002 18.403 0.82847 17.7441L4.69678 18.7795C4.54747 19.3318 4.41434 19.9074 4.31074 20.4882Z'
            fill='#3758F9'
          />
          <path
            opacity='0.19'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.69483 13.9554C6.11949 14.9599 5.61765 16.0081 5.21707 17.115L1.45944 15.7439C1.93978 14.4176 2.54284 13.1437 3.23204 11.9563L6.69483 13.9554Z'
            fill='#3758F9'
          />
          <path
            opacity='0.21'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.87863 9.83029C9.06383 10.6398 8.30565 11.5305 7.63714 12.488L4.36028 10.1869C5.17395 9.04195 6.07554 7.97366 7.06328 6.99184L9.87863 9.83029Z'
            fill='#3758F9'
          />
          <path
            opacity='0.25'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M14.0316 6.65011C13.0237 7.23218 12.0707 7.9053 11.1761 8.64978L8.6149 5.58241C9.67895 4.68531 10.8274 3.88452 12.0388 3.18638L14.0316 6.65011Z'
            fill='#3758F9'
          />
          <path
            opacity='0.28'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.8664 4.65811C17.7351 4.96422 16.6389 5.35786 15.5861 5.85064L13.896 2.22759C15.1587 1.64019 16.4728 1.16353 17.8285 0.795849L18.8664 4.65811Z'
            fill='#3758F9'
          />
          <path
            opacity='0.3'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M24.0331 3.99503C22.856 3.98824 21.7007 4.08692 20.5673 4.29107L19.8788 0.348926C21.2411 0.114494 22.6351 -0.0127127 24.0457 -0.00491544L24.0331 3.99503Z'
            fill='#3758F9'
          />
        </g>
        <defs>
          <clipPath id='clip0_2592_7105'>
            <rect
              width='48'
              height='48'
              fill='white'
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Spinner
