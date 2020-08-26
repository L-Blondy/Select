import { TState, TActions } from 'src/types'

function reducer<TOpt>(state: TState<TOpt>, action: TActions<TOpt>) {
	switch (action.type) {
		case 'prev_index':
			if (!action.options.length) return state
			return {
				...state,
				index: (state.index > 0
					? state.index - 1
					: action.options.length - 1)
			}
		case 'next_index':
			if (!action.options.length) return state
			return {
				...state,
				index: state.index < action.options.length - 1
					? state.index + 1
					: 0
			}
		case 'goto_index':
			return {
				...state,
				index: action.index
			}
		case 'close':
			return {
				...state,
				isOpen: false,
			}
		case 'open':
			return {
				...state,
				isOpen: true,
				index: 0
			}
		case 'select':
			return {
				...state,
				isOpen: false,
				opt: action.opt
			}
	}
}

export default reducer