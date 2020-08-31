import { useEffect, useRef, useCallback } from 'react'
import { FnReturningPromiseReturnType, AnyFunction } from 'src/types'

type DebouncedFn<T extends AnyFunction> = (...args: Parameters<T>) => Promise<FnReturningPromiseReturnType<T>>

const useDebounce = <T extends AnyFunction>(
	callback: T,
	delay: number = 300
): [ (T | DebouncedFn<T>), () => void ] => {

	const callbackRef = useRef(callback)
	const delayRef = useRef(delay)
	const token = useRef<number | null>(null)

	const cancel = () => { token.current && clearTimeout(token.current) }

	const debouncedCallback: DebouncedFn<T> = useCallback((...args) => {
		args.forEach((arg: any) => arg.target && arg.persist?.())

		return new Promise<FnReturningPromiseReturnType<T>>(resolve => {
			token.current && clearTimeout(token.current)
			token.current = setTimeout(() => {
				resolve(callbackRef.current(...args))
			}, delayRef.current)
		})
	}, [])

	useEffect(() => {
		callbackRef.current = callback
		delayRef.current = delay
	}, [ callback, delay ])

	useEffect(() => () => {
		cancel()
	}, [])

	return [ (delay ? debouncedCallback : callback), cancel ]
}

export default useDebounce
