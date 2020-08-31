import { SetState } from 'src/hooks/useSetState'
import { OpenSource, OptBase } from 'src/types';

type State<Opt extends OptBase> = {
	filter: string,
	opt: Opt
}

type Handlers<Opt> = {
	onInputChange: (filter: string) => void
	onChange: (option: Opt) => void
	onOpen: (openSource: OpenSource) => void
	onClose: () => void
}

function useCommonHandlers<Opt extends OptBase>(
	setState: SetState<State<Opt>>,
	handlers: Handlers<Opt>
) {

	const handle = {
		inputChange(filter: string) {
			handlers.onInputChange(filter)
			setState({ filter })
		},
		change(option: Opt) {
			setState({
				filter: option.label,
				opt: option
			})
			handlers.onChange(option)
		},
		open(openSource: OpenSource) {
			if (openSource !== 'inputChange')
				setState({ filter: '' })
			handlers.onOpen(openSource)
		},
		close() {
			setState((state) => ({ filter: state.opt.label }))
			handlers.onClose()
		}
	}

	return handle
}

export default useCommonHandlers