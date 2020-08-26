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


export type ReturnTypeOfFnThatReturnsPromise<T extends (...args: any[]) => Promise<any>> = T extends (...args: any[]) => Promise<infer R>
	? R
	: 'not a promise'
