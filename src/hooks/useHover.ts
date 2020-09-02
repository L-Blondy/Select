import { useState, useEffect } from 'react'


function useIsHovered(el: HTMLElement | null): boolean {

	const [ isHovered, setIsHovered ] = useState(false)

	const setTruthy = () => setIsHovered(true)
	const setFalsy = () => setIsHovered(false)

	useEffect(() => {
		if (!el) return
		el.addEventListener('mouseenter', setTruthy)
		el.addEventListener('mouseleave', setFalsy)

		return () => {
			el.removeEventListener('mouseenter', setTruthy)
			el.removeEventListener('mouseleave', setFalsy)
		}
	}, [ el ])

	return isHovered
}

export default useIsHovered