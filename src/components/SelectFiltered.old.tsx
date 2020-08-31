// import React, { useEffect } from 'react'
// import { OptBase, OpenSource } from 'src/types'
// import SelectBase from './base/SelectBase'
// import { useSetState } from 'src/hooks'
// import useCommonHandlers from './useCommonHandlers'

// const noop = () => { }

// interface Props<Opt> extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
// 	options: Opt[]
// 	value?: Opt
// 	noOptionsMessage?: string
// 	onInputClick?: () => void
// 	onInputChange?: (value: string) => void
// 	onChange?: (value: Opt) => void
// 	onOpen?: (openSource: OpenSource) => void
// 	onClose?: () => void
// }

// function SelectFiltered<Opt extends OptBase>({
// 	options: defaultOptions,
// 	onChange = noop,
// 	onInputChange = noop,
// 	onOpen = noop,
// 	onClose = noop,
// 	value: opt = { value: '', label: '' } as Opt,
// 	...props
// }: Props<Opt>) {

// 	const [ state, setState ] = useSetState({
// 		filter: opt.label,
// 		opt: opt
// 	})

// 	const handle = useCommonHandlers(setState, { onInputChange, onOpen, onClose, onChange })

// 	useEffect(() => {
// 		if (opt.value === state.opt.value) return
// 		if (!(defaultOptions || []).find(option => option.value === opt.value)) return
// 		setState({ filter: opt.label, opt: opt })
// 	}, [ defaultOptions, opt, setState, state.opt.value ])

// 	return (
// 		<SelectBase
// 			options={defaultOptions.filter(opt => RegExp('^' + state.filter, 'i').test(opt.label))}
// 			onChange={handle.change}
// 			onInputChange={handle.inputChange}
// 			onOpen={handle.open}
// 			onClose={handle.close}
// 			filter={state.filter}
// 			value={state.opt}
// 			{...props}
// 		/>
// 	)
// }

// export default SelectFiltered

export default {}