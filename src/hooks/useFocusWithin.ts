import { useState, useEffect, useCallback } from 'react'

function useIsFocused(el: HTMLElement | null): boolean {


	const [ isFocused, setIsFocused ] = useState(false)

	const handleFocus = useCallback((e: FocusEvent) => {
		if (!el) return
		if (el.contains(e.target as Node))
			setIsFocused(true)
	}, [ el ])

	const handleBlur = useCallback((e: FocusEvent) => {
		if (!el) return
		if (el.contains(e.target as Node))
			setIsFocused(false)
	}, [ el ])

	useEffect(() => {
		document.addEventListener('focusin', handleFocus)
		document.addEventListener('focusout', handleBlur)

		return () => {
			document.removeEventListener('focusin', handleFocus)
			document.removeEventListener('focusout', handleBlur)
		}
	}, [ el, handleFocus, handleBlur ])

	return isFocused
}

export default useIsFocused