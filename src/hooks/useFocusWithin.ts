import { useState, useEffect, useCallback } from 'react'

function useIsFocused(elRef: React.MutableRefObject<HTMLDivElement> | null): boolean {


	const [ isFocused, setIsFocused ] = useState(false)

	const handleFocus = useCallback((e: FocusEvent) => {
		if (!elRef) return
		const el = elRef.current
		if (el.contains(e.target as Node))
			setIsFocused(true)
	}, [ elRef ])

	const handleBlur = useCallback((e: FocusEvent) => {
		if (!elRef) return
		const el = elRef.current
		if (el.contains(e.target as Node))
			setIsFocused(false)
	}, [ elRef ])

	useEffect(() => {
		document.addEventListener('focusin', handleFocus)
		document.addEventListener('focusout', handleBlur)

		return () => {
			document.removeEventListener('focusin', handleFocus)
			document.removeEventListener('focusout', handleBlur)
		}
	}, [ handleFocus, handleBlur ])

	return isFocused
}

export default useIsFocused