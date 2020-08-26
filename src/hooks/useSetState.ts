import { useState, useCallback } from 'react'

type PatchType<T> = Partial<T> | ((prevState: T) => (Partial<T>))

const useSetState = <T extends object>(
	initialState: T = {} as T
): [ T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void ] => {
	const [ state, set ] = useState<T>(initialState);
	const setState = useCallback((patch: PatchType<T>) => {
		set(prevState => ({
			...prevState,
			...(typeof patch === 'function' ? patch(prevState) : patch)
		}))
	}, [ set ])

	return [ state, setState ];
};




export default useSetState
