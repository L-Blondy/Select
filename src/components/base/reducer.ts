import { State, Actions } from 'src/types'

function reducer(state: State, actions: Actions | Actions[]) {

	actions = (actions as Actions[]).length ? actions as Actions[] : [ actions ] as Actions[]

	let draw = { ...state }

	actions.forEach(action => {

		switch (action.type) {
			case 'prev_index':
				if (!action.options.length) return
				draw = {
					...draw,
					index: (draw.index > 0
						? draw.index - 1
						: action.options.length - 1)
				}
				break
			case 'next_index':
				if (!action.options.length) return
				draw = {
					...draw,
					index: draw.index < action.options.length - 1
						? draw.index + 1
						: 0
				}
				break
			case 'set_index':
				draw = {
					...draw,
					index: action.index
				}
				break
			case 'close':
				draw = {
					...draw,
					isOpen: false,
					filter: action.clear ? draw.opt.label : draw.filter
				}
				break
			case 'open':
				draw = {
					...draw,
					isOpen: true,
					index: 0,
					filter: action.source === 'inputChange' || !action.clear ? draw.filter : ''
				}
				break
			case 'select':
				draw = {
					...draw,
					isOpen: false,
					opt: action.opt,
					filter: action.opt.label
				}
				break
			case 'set_filter':
				draw = {
					...draw,
					filter: action.filter
				}
				break
		}
	})
	return draw

}

export default reducer