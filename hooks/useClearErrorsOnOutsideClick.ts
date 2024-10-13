import { RefObject, useEffect } from 'react'
import { UseFormClearErrors } from 'react-hook-form'


export const useClearErrorsOnOutsideClick = (
  ref: RefObject<HTMLElement>,
  clearErrors: UseFormClearErrors<any>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clearErrors()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, clearErrors])
}
