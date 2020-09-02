import styled, { StyledComponent } from 'styled-components'
import React, { useReducer, useRef, useState, useLayoutEffect, useEffect } from 'react'
import { reducer, Menu, Input, LoadingIndicator, ArrowButton } from './'
import { BaseProps, OptBase, State, Actions, OpenSource } from 'src/types'
import src_preloader from 'src/assets/preloader.svg'
import { useHover, useFocusWithin } from 'src/hooks'

const noop = () => { }

function SelectBase<Opt extends OptBase>({
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
}: BaseProps<Opt>) {

	const input = useRef<HTMLInputElement>(null!)
	const shouldInputClickCallOnOpen = useRef(true)
	const [ state, dispatch ] = useReducer<(state: State<Opt>, action: Actions<Opt> | Actions<Opt>[]) => State<Opt>>(reducer, {
		index: 0,
		isOpen: false,
		filter: opt?.label || '',
		opt: opt ?? { value: '', label: '' } as Opt
	})

	const isFocused = useFocusWithin(input.current?.parentElement)
	const isHovered = useHover(input.current?.parentElement)
	const currentOption = options[ state.index ]
	const getInputValue = () => {
		if (state.isOpen || !withCleanup) {
			return state.filter
		}
		return opt?.label ?? state.opt.label
	}

	const [ inputHeight, setInputHeight ] = useState<number>(0)

	useLayoutEffect(() => {
		setInputHeight(input.current.getBoundingClientRect().height)
	}, [])

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
			input.current.focus()
			input.current.click()
		},
	}



	return (
		<div
			// inputHeight$={inputHeight}
			data-testid='container'
			className={'select ' + className}
			onClick={onClick}
			onTouchEnd={onTouchEnd}
			onTouchMove={onTouchMove}
			onTouchStart={onTouchStart}>

			<div
				data-testid='wrapper'
				className={`select--border select__content ${isFocused ? 'focus' : isHovered ? 'hover' : ''}`}>

				<Input
					ref={input}
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
				<LoadingIndicator
					className='select__loading'
					width={inputHeight}
					when={isLoading}
				/>
				<ArrowButton
					className={`select-border select__arrow ${isFocused ? 'focus' : isHovered ? 'hover' : ''}`}
					width={inputHeight}
					onClick={handle.toggleClick}
				/>
			</div>

			<Menu
				className='select--border select__menu'
				index={state.index}
				isOpen={state.isOpen}
				options={options}
				onMouseOver={handle.mouseOverMenu}
				onClick={handle.pressEnterOrMenuClick}
				noOptionsMessage={noOptionsMessage}
			/>
		</div>
	)
}

export default SelectBase
