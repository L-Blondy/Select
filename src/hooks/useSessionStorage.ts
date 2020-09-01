import { useMemo } from 'react'

function useSessionStorage(nonRandomKey: string) {

	const sessionStore = useMemo(() => ({
		setItem(key: any, value: any) {
			sessionStorage.setItem(
				nonRandomKey + JSON.stringify(key),
				JSON.stringify(value)
			)
		},
		getItem(key: any) {
			const stringified = sessionStorage.getItem(
				nonRandomKey + JSON.stringify(key)
			)
			if (!stringified) return null
			return JSON.parse(stringified)
		}
	}), [ nonRandomKey ])
	return sessionStore
}

export default useSessionStorage