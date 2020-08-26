import { useEffect, useCallback, useRef, useState, DependencyList } from 'react';
import { useSetState, useMountedRef } from './'

type State<T> = {
	pending: boolean,
	error: null | Error,
	data: null | T
}

type FnReturningPromise = (...args: any[]) => Promise<any>
type Execute<T extends FnReturningPromise> = (...args: Parameters<T>) => void

const useAsync = function <T extends FnReturningPromise>(
	callback: T,
): [ State<ReturnType<T>>, Execute<T> ] {

	const callbackRef = useRef(callback)
	const lastCallID = useRef(0)
	const isMountedRef = useMountedRef()

	const [ state, setState ] = useSetState<State<ReturnType<T>>>({
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

// type Callback<T> = (...args: any[]) => Promise<T>
// type Execute<T> = (...args: Parameters<Callback<T>>) => void

// const useAsync = function <T>(
// 	callback: Callback<T>,
// 	deps: DependencyList = [],
// 	immediate: boolean = false
// ): [ State<T>, Execute<T> ] {

// 	const callbackRef = useRef(callback)
// 	const lastCallID = useRef(0)
// 	const isMountedRef = useMountedRef()

// 	useEffect(() => console.log(isMountedRef.current), [ isMountedRef ])

// 	const [ state, setState ] = useSetState<State<T>>({
// 		pending: false,
// 		error: null,
// 		data: null
// 	})

// 	const execute: Execute<T> = useCallback((...args) => {
// 		const callID = ++lastCallID.current
// 		setState({ pending: true })

// 		callbackRef.current(...args)
// 			.then(data => {
// 				if (callID !== lastCallID.current) return
// 				setState({
// 					data,
// 					pending: false
// 				})
// 			})
// 			.catch(error => {
// 				if (callID !== lastCallID.current) return
// 				setState({
// 					error,
// 					pending: false
// 				})
// 			})
// 	}, [])

// 	useEffect(() => {
// 		immediate && execute()
// 	}, [ execute, immediate ])

// 	return [ state as State<T>, execute ]
// }

export default useAsync

