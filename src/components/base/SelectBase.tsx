import React, { useReducer, useRef, forwardRef } from 'react'
import { reducer, Menu, Input, Loader, Arrow } from './'
import { BaseProps, State, Actions, OpenSource } from 'src/types'
import { useHover, useFocusWithin } from 'src/hooks'

const noop = () => { }

const SelectBase = forwardRef<HTMLDivElement, BaseProps>(({
	onOpen = noop,
	onClose = noop,
	onFocus = noop,
	onBlur = noop,
	onClick = noop,
	onTouchEnd = noop,
	onTouchMove = noop,
	onTouchStart = noop,
	onChange = noop,
	onInputChange = noop,
	onInputClick = noop,
	placeholder = 'Select...',
	noOptionsMessage = 'No options',
	options = [],
	isLoading = false,
	value: opt,
	className = '',
	withCleanup = true,
	...props
}, ref) => {

	const selectRef = ref || useRef<HTMLDivElement>(null!)
	const inputRef = useRef<HTMLInputElement>(null!)
	const shouldInputClickCallOnOpen = useRef(true)
	const [ state, dispatch ] = useReducer<(state: State, action: Actions | Actions[]) => State>(reducer, {
		index: 0,
		isOpen: false,
		filter: opt?.label || '',
		opt: opt ?? { value: '', label: '' }
	})

	type SelectRef = React.MutableRefObject<HTMLDivElement | null>
	const isFocused = useFocusWithin(selectRef as SelectRef)
	const isHovered = useHover(selectRef as SelectRef)
	const currentOption = options[ state.index ]

	const handle = {
		pressUp() {
			dispatch({ type: 'prev_index', options })
		},
		pressDown() {
			dispatch({ type: 'next_index', options })
		},
		pressEnterOrMenuClick() {
			if (!state.isOpen) {
				dispatch({ type: 'open', source: OpenSource.pressEnter, clear: withCleanup })
				onOpen(OpenSource.pressEnter)
				return
			}
			currentOption && dispatch({ type: 'select', opt: currentOption })
			onClose()
			shouldInputClickCallOnOpen.current = true
			options.length && onChange(currentOption)
		},
		focus(e: React.FocusEvent<HTMLInputElement>) {
			dispatch({ type: 'open', source: OpenSource.focus, clear: withCleanup })
			onFocus(e)
			onOpen(OpenSource.focus)
			shouldInputClickCallOnOpen.current = false
		},
		blur(e: React.FocusEvent<HTMLInputElement>) {
			dispatch({ type: 'close', clear: withCleanup })
			onBlur(e)
			if (!state.isOpen) return
			onClose()
			shouldInputClickCallOnOpen.current = true
		},
		inputClick() {
			dispatch({ type: 'open', source: OpenSource.inputClick, clear: withCleanup })
			onInputClick()
			if (shouldInputClickCallOnOpen.current && !state.isOpen)
				onOpen(OpenSource.inputClick)
		},
		mouseOverMenu(index: number) {
			dispatch({ type: 'set_index', index })
		},
		inputChange(filter: string) {
			if (!state.isOpen) {
				dispatch({ type: 'open', source: OpenSource.inputChange, clear: withCleanup })
				onOpen(OpenSource.inputChange)
			}
			dispatch([
				{ type: 'set_index', index: 0 },
				{ type: 'set_filter', filter }
			])
			onInputChange(filter)
		},
		toggleClick(e: React.MouseEvent<HTMLDivElement>) {
			e.stopPropagation()
			inputRef.current.focus()
			inputRef.current.click()
		},
	}

	const getInputValue = () => {
		if (state.isOpen || !withCleanup) {
			return state.filter
		}
		return opt?.label ?? state.opt.label
	}

	return (
		<div
			ref={selectRef}
			data-testid='select'
			className={`select ${className} ${isFocused ? 'focus' : isHovered ? 'hover' : ''} `}
			onClick={onClick}
			onTouchEnd={onTouchEnd}
			onTouchMove={onTouchMove}
			onTouchStart={onTouchStart}>

			<Input
				ref={inputRef}
				data-testid='select__input'
				className='select__input'
				placeholder={(opt?.label ?? state.opt.label) || placeholder}
				value={getInputValue()}
				onChange={handle.inputChange}
				onPressUp={handle.pressUp}
				onPressDown={handle.pressDown}
				onPressEnter={handle.pressEnterOrMenuClick}
				onFocus={handle.focus}
				onBlur={handle.blur}
				onClick={handle.inputClick}
				{...props}
			/>

			<Loader
				data-testid='select__loader'
				className={`select__loader ${isLoading ? '' : 'select__loader--hidden'} `}
			/>

			<div
				data-testid='select__divisor'
				className={'select__divisor'}
			/>

			<Arrow
				data-testid='select__arrow'
				className={`select__arrow ${isFocused ? 'focus' : isHovered ? 'hover' : ''} `}
				onClick={handle.toggleClick}
			/>

			<Menu
				data-testid='select__menu'
				className={`select__menu ${state.isOpen ? 'open' : 'close'}`}
				index={state.index}
				options={options}
				onMouseOver={handle.mouseOverMenu}
				onClick={handle.pressEnterOrMenuClick}
				noOptionsMessage={noOptionsMessage}
			/>
		</div>
	)
})

export default SelectBase
