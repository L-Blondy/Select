import styled, { StyledComponent } from 'styled-components'
import React, { useReducer, useRef, useState, useLayoutEffect, useEffect } from 'react'
import { reducer, Menu, Input, LoadingIndicator, ArrowButton } from './'
import { TOptBase, TState, TActions, EOpenSource } from 'src/types'
import { borderColor, borderColorHover, paddingLeft } from 'src/styles'
import src_preloader from 'src/assets/preloader.svg'

const noop = () => { }

interface Props<TOpt> extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'> {
	options: TOpt[]
	filter: string
	value?: TOpt
	noOptionsMessage?: string
	onInputChange?: (value: string) => void
	onChange?: (value: TOpt) => void
	onOpen?: (openSource: EOpenSource) => void
	onClose?: () => void
	onInputClick?: () => void
	isLoading?: boolean
}

function SelectBase<TOpt extends TOptBase>({
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
	filter,
	value: opt = { value: '', label: '' } as TOpt,
	className = '',
	...props
}: Props<TOpt>) {

	const input = useRef<HTMLInputElement>(null!)
	const shouldInputClickCallOnOpen = useRef(true)
	const [ state, dispatch ] = useReducer<(state: TState<TOpt>, action: TActions<TOpt>) => TState<TOpt>>(reducer, {
		index: 0,
		isOpen: false,
		opt: opt
	})

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
				dispatch({ type: 'open' })
				onOpen(EOpenSource.pressEnter)
				return
			}
			dispatch({ type: 'select', opt: currentOption })
			onClose()
			shouldInputClickCallOnOpen.current = true
			options.length && onChange(currentOption)
		},
		focus(e: React.FocusEvent<HTMLInputElement>) {
			dispatch({ type: 'open' })
			onFocus(e)
			onOpen(EOpenSource.focus)
			shouldInputClickCallOnOpen.current = false
		},
		blur(e: React.FocusEvent<HTMLInputElement>) {
			dispatch({ type: 'close' })
			onBlur(e)
			if (!state.isOpen) return
			onClose()
			shouldInputClickCallOnOpen.current = true
		},
		inputClick() {
			dispatch({ type: 'open' })
			onInputClick()
			if (shouldInputClickCallOnOpen.current && !state.isOpen)
				onOpen(EOpenSource.inputClick)
		},
		mouseOverMenu(index: number) {
			dispatch({ type: 'goto_index', index })
		},
		inputChange(value: string) {
			if (!state.isOpen) {
				dispatch({ type: 'open' })
				onOpen(EOpenSource.inputChange)
			}
			dispatch({ type: 'goto_index', index: 0 })
			onInputChange(value)
		},
		toggleClick() {
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
					placeholder={opt.label || placeholder}
					value={filter ?? (opt.value || state.opt.value)}
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
		opacity: 0.66
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

