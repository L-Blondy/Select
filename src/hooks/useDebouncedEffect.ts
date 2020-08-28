import { useEffect, DependencyList } from 'react'
import useDebounce from './useDebounce'
import { AnyFunction } from 'src/types'

function useDebouncedEffect(
	callback: AnyFunction,
	deps: DependencyList,
	delay: number = 300,
) {

	const debouncedCallback = useDebounce(callback, delay)

	useEffect(() => {
		debouncedCallback()
	}, deps) // eslint-disable-line
}

export default useDebouncedEffect