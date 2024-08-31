import { forwardRef, useEffect } from 'react'
import { ReactMaskOpts, useIMask } from 'react-imask'
import { mergeRefs } from 'react-merge-refs'

import { Input, InputProps } from './input'

type MaskInputChangeEvent = {
  target: {
    name?: string
    value?: string
  }
}

const MaskInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, 'onChange'> & {
    mask: ReactMaskOpts
    onChange: (event: MaskInputChangeEvent) => void
  }
>(({ value, onChange, mask, ...props }, ref) => {
  const { maskRef, ref: inputRef } = useIMask<HTMLInputElement>(mask, {
    onAccept: (_, mask) => {
      if (!onChange) return
      onChange({
        target: {
          name: props.name,
          value: mask.unmaskedValue,
        },
      })
    },
  })

  useEffect(() => {
    if (!maskRef.current) return
    maskRef.current.unmaskedValue = value?.toString() || ''
  }, [maskRef, value])

  return (
    <Input
      ref={mergeRefs([inputRef, ref])}
      {...props}
    />
  )
})

MaskInput.displayName = 'MaskInputHooks'

export { MaskInput }
