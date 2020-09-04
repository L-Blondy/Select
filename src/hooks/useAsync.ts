import { useCallback, useRef } from 'react';
import { useSetState, useMountedRef, useSessionStorage } from './'
import { FnReturningPromiseReturnType, FnReturningPromise } from 'src/types';
import { SetState } from 'src/hooks/useSetState'

type State<T extends FnReturningPromise> = {
	isPending: boolean,
	status: 'idle' | 'pending' | 'success' | 'error' | 'cancelled',
	error: null | Error,
	data: null | FnReturningPromiseReturnType<T>,
	args: null | Parameters<T>
}
type Execute<T extends FnReturningPromise> = (...args: Parameters<T>) => void

const useAsync = function <T extends FnReturningPromise>(
	callback: T,
	nonRandomKey: string,
	withCache: boolean = true
): [ State<T>, Execute<T>, SetState<State<T>> ] {

	const callbackRef = useRef(callback)
	const lastCallID = useRef(0)
	const isMountedRef = useMountedRef()
	const sessionStore = useSessionStorage(nonRandomKey)

	const [ state, setState ] = useSetState<State<T>>({
		isPending: false,
		status: 'idle',
		error: null,
		data: null,
		args: null
	})

	const execute: Execute<T> = useCallback((...args) => {
		const callID = ++lastCallID.current

		const storedData = withCache && sessionStore.getItem(args)
		if (withCache && storedData) {
			return setState({
				args,
				data: storedData,
				isPending: false,
				status: 'success',
			})
		}

		setState({
			args,
			isPending: true,
			status: 'pending',
		})

		callbackRef.current(...args)
			.then(data => {
				if (!isMountedRef.current || callID !== lastCallID.current) return
				setState({
					data,
					args,
					isPending: false,
					status: 'success',
				})
				withCache && sessionStore.setItem(args, data)
			})
			.catch(error => {
				if (!isMountedRef.current || callID !== lastCallID.current) return
				setState({
					error,
					args,
					isPending: false,
					status: 'error',
				})
			})
	}, [ setState, isMountedRef, sessionStore, withCache ])

	return [ state, execute, setState ]
}

export default useAsync

