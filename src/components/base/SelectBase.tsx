import React, { useReducer, useRef, forwardRef, useState, useCallback, useMemo } from 'react'
import { reducer, Menu, Input, Loader, Arrow } from './'
import { BaseProps, State, Actions, OpenSource } from 'src/types'

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
	onMouseEnter = noop,
	onMouseLeave = noop,
	placeholder = 'Select...',
	noOptionsMessage = 'No options',
	options = [],
	isLoading = false,
	value: opt,
	className = '',
	withCleanup = true,
	...props
}, ref) => {

	const inputRef = useRef<HTMLInputElement>(null!)
	const shouldInputClickCallOnOpen = useRef(true)
	const [ state, dispatch ] = useReducer<(state: State, action: Actions | Actions[]) => State>(reducer, {
		index: 0,
		isOpen: false,
		keyword: opt?.label || '',
		opt: opt ?? { value: '', label: '' },
		isFocused: false
	})
	const [ isHovered, setIsHovered ] = useState(false)

	const currentOption = options[ state.index ]

	const handleSelect = useMemo(() => ({
		mouseEnter(e: React.MouseEvent<HTMLDivElement>) {
			onMouseEnter(e)
			setIsHovered(true)
		},
		mouseLeave(e: React.MouseEvent<HTMLDivElement>) {
			onMouseLeave(e)
			setIsHovered(false)
		},
	}), [ onMouseEnter, onMouseLeave ])

	const handleInput = useMemo(() => ({
		change(keyword: string) {
			if (!state.isOpen) {
				dispatch({ type: 'open', source: OpenSource.inputChange, clear: withCleanup })
				onOpen(OpenSource.inputChange)
			}
			dispatch([
				{ type: 'set_index', index: 0 },
				{ type: 'set_keyword', keyword }
			])
			onInputChange(keyword)
		},
		pressUp() {
			dispatch({ type: 'prev_index', options })
		},
		pressDown() {
			dispatch({ type: 'next_index', options })
		},
		focus(e: React.FocusEvent<HTMLInputElement>) {
			dispatch([
				{ type: 'open', source: OpenSource.focus, clear: withCleanup },
				{ type: 'focus' }
			])
			onFocus(e)
			onOpen(OpenSource.focus)
			shouldInputClickCallOnOpen.current = false
		},
		blur(e: React.FocusEvent<HTMLInputElement>) {
			dispatch([
				{ type: 'close', clear: withCleanup },
				{ type: 'blur' }
			])
			onBlur(e)
			if (!state.isOpen) return
			onClose()
			shouldInputClickCallOnOpen.current = true
		},
		click() {
			dispatch({ type: 'open', source: OpenSource.inputClick, clear: withCleanup })
			onInputClick()
			if (shouldInputClickCallOnOpen.current && !state.isOpen)
				onOpen(OpenSource.inputClick)
		},
	}), [ onBlur, onClose, onFocus, onInputChange, onInputClick, onOpen, options, state.isOpen, withCleanup ])

	const handlePressEnterOrMenuClick = useCallback(() => {
		if (!state.isOpen) {
			dispatch({ type: 'open', source: OpenSource.pressEnter, clear: withCleanup })
			onOpen(OpenSource.pressEnter)
			return
		}
		currentOption && dispatch({ type: 'select', opt: currentOption })
		onClose()
		shouldInputClickCallOnOpen.current = true
		options.length && onChange(currentOption)
	}, [ currentOption, onChange, onClose, onOpen, options.length, state.isOpen, withCleanup ])

	const handleMenu = useMemo(() => ({
		mouseOver(index: number) {
			dispatch({ type: 'set_index', index })
		}
	}), [])

	const handleArrow = useMemo(() => ({
		click(e: React.MouseEvent<HTMLDivElement>) {
			e.stopPropagation()
			inputRef.current.focus()
			inputRef.current.click()
		}
	}), [])

	const getInputValue = () => {
		if (state.isOpen || !withCleanup) {
			return state.keyword
		}
		return opt?.label ?? state.opt.label
	}

	return (
		<div
			ref={ref}
			data-testid='select'
			className={`select ${className} ${state.isFocused ? 'focus' : isHovered ? 'hover' : ''} `}
			onClick={onClick}
			onMouseEnter={handleSelect.mouseEnter}
			onMouseLeave={handleSelect.mouseLeave}
			onTouchEnd={onTouchEnd}
			onTouchMove={onTouchMove}
			onTouchStart={onTouchStart}>

			<Input
				ref={inputRef}
				data-testid='select__input'
				className='select__input'
				placeholder={(opt?.label ?? state.opt.label) || placeholder}
				value={getInputValue()}
				onChange={handleInput.change}
				onPressUp={handleInput.pressUp}
				onPressDown={handleInput.pressDown}
				onPressEnter={handlePressEnterOrMenuClick}
				onFocus={handleInput.focus}
				onBlur={handleInput.blur}
				onClick={handleInput.click}
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
				className={`select__arrow ${state.isFocused ? 'focus' : isHovered ? 'hover' : ''} `}
				onClick={handleArrow.click}
			/>

			<Menu
				data-testid='select__menu'
				className={`select__menu ${state.isOpen ? 'open' : 'close'}`}
				index={state.index}
				options={options}
				onMouseOver={handleMenu.mouseOver}
				onClick={handlePressEnterOrMenuClick}
				noOptionsMessage={noOptionsMessage}
			/>
		</div>
	)
})

export default SelectBase
