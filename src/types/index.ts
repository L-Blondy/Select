export type OptBase = { value: string, label: string }

export type State<TOpt> = {
	index: number
	isOpen: boolean,
	filter: string,
	opt: TOpt
}

export type Actions<TOpt> =
	| {
		type: 'set_index',
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
		type: 'open',
		source: OpenSource
	}
	| {
		type: 'close'
	}
	| {
		type: 'select',
		opt: TOpt
	}
	| {
		type: 'set_filter',
		filter: string
	}

export enum OpenSource {
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

