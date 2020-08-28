export type TOptBase = { value: string, label: string }

export type TState<TOpt> = {
	index: number
	isOpen: boolean,
	opt: TOpt
}

export type TActions<TOpt> =
	| {
		type: 'goto_index',
		index: number
	}
	| {
		type: 'prev_index',
		options: TOpt[]
	}
	| {
		type: 'next_index',
		options: TOpt[]
	}
	| {
		type: 'open'
	}
	| {
		type: 'close'
	}
	| {
		type: 'select',
		opt: TOpt
	}

export enum EOpenSource {
	inputChange = 'inputChange',
	focus = 'focus',
	pressEnter = 'pressEnter',
	inputClick = 'inputClick',
}

export type AnyFunction =
	| ((...args: any[]) => any)
	| ((...args: any[]) => Promise<any>)

export type FnReturningPromise = (...args: any[]) => Promise<any>
export type PromiseReturnType<Prom> = Prom extends Promise<infer R> ? R : 'not a promise'
export type FnReturningPromiseReturnType<T> = T extends FnReturningPromise ? PromiseReturnType<ReturnType<T>> : '<T> is not a function returning promise'

