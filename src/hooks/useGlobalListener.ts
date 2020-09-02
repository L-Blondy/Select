import { useState, useEffect, useRef } from 'react'

const handlers: { [ eventType: string ]: Function[] } = {}

function useGlobalListener(type: string, handler: Function) {

	const handlerRef = useRef(handler)
	const typeRef = useRef(type)
	const typeHandler = useRef((e: Event) => { })

	useEffect(() => {
		let h = handlerRef.current
		const t = typeRef.current
		if (!handlers[ t ])
			handlers[ t ] = []
		handlers[ t ].push(h)

		Object.keys(handlers).forEach((type: string) => {

			window.removeEventListener((type as 'click'), typeHandler.current)

			typeHandler.current = (e: Event) => {
				handlers[ type ].forEach((handler: Function) => {
					handler(e)
				})
			}

			window.addEventListener(type, typeHandler.current)
			console.log(handlers)
		})

		return () => {
			const index = handlers[ type ].indexOf(h)
			console.log(index)
			handlers[ type ].splice(index, 1)
		}
	}, [ type ])

	return null
}

export default useGlobalListener