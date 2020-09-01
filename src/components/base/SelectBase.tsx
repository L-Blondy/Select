import styled, { StyledComponent } from 'styled-components'
import React, { useReducer, useRef, useState, useLayoutEffect, useEffect } from 'react'
import { reducer, Menu, Input, LoadingIndicator, ArrowButton } from './'
import { BaseProps, OptBase, State, Actions, OpenSource } from 'src/types'
import { borderColor, borderColorHover, paddingLeft } from 'src/styles'
import src_preloader from 'src/assets/preloader.svg'

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

	const currentOption = options[ state.index ]
	const getInputValue = () => {
		if (state.isOpen || !withCleanup) {
			return state.filter
		}
		return opt?.label ?? state.opt.label
	}

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

	const [ inputHeight, setInputHeight ] = useState<number>(0)

	useLayoutEffect(() => {
		setInputHeight(input.current.getBoundingClientRect().height)
	}, [])

	return (
		<Div$
			inputHeight$={inputHeight}
			data-testid='container'
			className={'select ' + className}
			onClick={onClick}
			onTouchEnd={onTouchEnd}
			onTouchMove={onTouchMove}
			onTouchStart={onTouchStart}>

			<div
				data-testid='wrapper'
				className={'select__content-wrapper ' + (input.current === document.activeElement ? 'focus ' : '')}>

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
					className='select__loading-indicator'
					when={isLoading}
				/>
				<ArrowButton
					className='select__arrow-button'
					onClick={handle.toggleClick}
				/>
			</div>

			<Menu
				className='select__menu'
				index={state.index}
				isOpen={state.isOpen}
				options={options}
				onMouseOver={handle.mouseOverMenu}
				onClick={handle.pressEnterOrMenuClick}
				noOptionsMessage={noOptionsMessage}
			/>
		</Div$>
	)
}

export default SelectBase

type Props$ = {
	inputHeight$: number,
}

const Div$: StyledComponent<'div', any, Props$> = styled.div`
	position: relative;
	background: white;

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	/** wrapper start */
	.select__content-wrapper {
		position: relative;
		display: flex;
		border: 1px solid ${borderColor};
		border-radius: 2px;
		background: inherit;
		transition: border-color 200ms;

		&:not(.focus):hover {
			border-color: ${borderColorHover};
		}
		&.focus path,
		&:hover path {
			fill: ${borderColorHover}
		}
	}

	.focus {
		border-color: #2d9dff;
	}
	/** wrapper end */
	/** Input start */
	.select__input {
		border: none;
		width: 1em;
		flex-grow: 1;
		color: inherit;
		font-size: inherit;
		font-family:inherit;
		line-height: inherit;
		padding-left: ${paddingLeft};
		background: inherit;

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: currentColor;
			opacity: 0.66;
		}
	}
	/** Input end */
	/** Menu start */
	.select__menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		border: 1px solid #aaa;
		background: inherit;
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: none;
		list-style: none;
		opacity: 0;
		z-index:1;

		&__option {
			padding-left: ${paddingLeft};
		}
	}

	.active-option {
		background: lightblue
	}
	.no-option {
		opacity: 0.66;
		text-align: center;
	}

	.open {
		transition: opacity 100ms;
		opacity: 1;
		pointer-events: auto;
	}
	/** Menu end */
	/** Loading-indicator start */
	.select__loading-indicator {
		color: red;
		width: ${(props: { inputHeight$: number }) => props.inputHeight$}px;
		background-image: url(${src_preloader});
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		margin-right: ${(props: { inputHeight$: number }) => `${props.inputHeight$ / 5}px`};
		animation: fadeIn 500ms forwards;
	}

	@keyframes fadeIn {
		from { opacity: 0}
		to { opacity: 0.3}
	}
	/** Loading-indicator end */
	/** Arrow-button start */
	.select__arrow-button {
		position: relative;
		cursor: pointer; 
		display: flex;
		align-items:center;
		justify-content: center;
		height: ${(props: { inputHeight$: number }) => props.inputHeight$}px;
		width: ${(props: { inputHeight$: number }) => props.inputHeight$}px;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 25%;
			bottom: 25%;
			width: 1px;
			opacity:0.66;
			background: ${borderColor};
		}

		&__icon {
			height: 27%;
			width: auto;
		}

		path {
			transition: fill 200ms;
		}	
	}
	/** Arrow-button end */
`

