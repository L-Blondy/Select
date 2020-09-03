import { useState, useEffect } from 'react'


function useIsHovered(elRef: React.MutableRefObject<HTMLDivElement> | null): boolean {

	const [ isHovered, setIsHovered ] = useState(false)

	const setTruthy = () => setIsHovered(true)
	const setFalsy = () => setIsHovered(false)

	useEffect(() => {
		if (!elRef) return
		const el = elRef.current
		el.addEventListener('mouseenter', setTruthy)
		el.addEventListener('mouseleave', setFalsy)

		return () => {
			el.removeEventListener('mouseenter', setTruthy)
			el.removeEventListener('mouseleave', setFalsy)
		}
	}, [ elRef ])

	return isHovered
}

export default useIsHovered