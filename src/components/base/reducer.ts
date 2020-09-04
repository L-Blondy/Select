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
					keyword: action.clear ? draw.opt.label : draw.keyword
				}
				break
			case 'open':
				draw = {
					...draw,
					isOpen: true,
					index: 0,
					keyword: action.source === 'inputChange' || !action.clear ? draw.keyword : ''
				}
				break
			case 'select':
				draw = {
					...draw,
					isOpen: false,
					opt: action.opt,
					keyword: action.opt.label
				}
				break
			case 'set_keyword':
				draw = {
					...draw,
					keyword: action.keyword
				}
				break
			case 'focus':
				draw = {
					...draw,
					isFocused: true
				}
				break
			case 'blur':
				draw = {
					...draw,
					isFocused: false
				}
				break
		}
	})
	return draw

}

export default reducer