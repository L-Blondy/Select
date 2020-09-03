export type Opt = {
	value: string,
	label: string,
	[ key: string ]: any
}

export type State = {
	index: number
	isOpen: boolean,
	filter: string,
	opt: Opt,
	isFocused: boolean
}

export type BaseProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value' | 'onMouseEnter' | 'onMouseLeave'> & {
	options: Opt[]
	value?: Opt
	noOptionsMessage?: string
	onInputClick?: () => void
	onInputChange?: (value: string) => void
	onChange?: (value: Opt) => void
	onOpen?: (openSource: OpenSource) => void
	onClose?: () => void
	onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void,
	onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void,
	isLoading?: boolean
	withCleanup?: boolean
}

export type Actions =
	| {
		type: 'set_index',
		index: number
	}
	| {
		type: 'prev_index',
		options: Opt[]
	}
	| {
		type: 'next_index',
		options: Opt[]
	}
	| {
		type: 'open',
		source: OpenSource,
		clear: boolean
	}
	| {
		type: 'close',
		clear: boolean
	}
	| {
		type: 'select',
		opt: Opt
	}
	| {
		type: 'set_filter',
		filter: string
	}
	| {
		type: 'focus'
	}
	| {
		type: 'blur'
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

