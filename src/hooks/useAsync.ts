import { useCallback, useRef } from 'react';
import { FnReturningPromiseReturnType, FnReturningPromise } from 'src/types';
import { useSetState, useMountedRef } from './'

type State<T> = {
	pending: boolean,
	error: null | Error,
	data: null | FnReturningPromiseReturnType<T>
}

type Execute<T extends FnReturningPromise> = (...args: Parameters<T>) => void

const useAsync = function <T extends FnReturningPromise>(
	callback: T,
): [ State<T>, Execute<T> ] {

	const callbackRef = useRef(callback)
	const lastCallID = useRef(0)
	const isMountedRef = useMountedRef()

	const [ state, setState ] = useSetState<State<T>>({
		pending: false,
		error: null,
		data: null
	})

	const execute: Execute<T> = useCallback((...args) => {
		const callID = ++lastCallID.current
		setState({ pending: true })

		callbackRef.current(...args)
			.then(data => {
				if (!isMountedRef.current || callID !== lastCallID.current) return
				setState({
					data,
					pending: false
				})
			})
			.catch(error => {
				if (!isMountedRef.current || callID !== lastCallID.current) return
				setState({
					error,
					pending: false
				})
			})
	}, [ setState, isMountedRef ])

	return [ state, execute ]
}

export default useAsync

