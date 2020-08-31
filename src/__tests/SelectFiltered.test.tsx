import React, { useState } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectFiltered from 'src/components/SelectFiltered';

type Tab = {
	tab: () => void
}

const withTab = function <T>(target: T): T & Tab {
	return target as T & Tab
}

describe('SelectFiltered Base functionality', () => {

	function test_baseFunctionality() {
		const input = screen.getByRole('textbox') as HTMLInputElement
		const ul = screen.getByRole('list')
		const arrow = screen.getByTestId('toggle')

		expect(ul).toHaveClass('close')
		fireEvent.focus(input)
		expect(ul).toHaveClass('open')
		expect(ul.children).toHaveLength(4)
		expect(ul.children[ 0 ]).toHaveClass('active-option')
		fireEvent.keyDown(input, { key: 'ArrowUp' })
		expect(ul.children[ 3 ]).toHaveClass('active-option')
		userEvent.type(input, '_OP')
		expect(ul.children).toHaveLength(2)
		expect(ul.children[ 0 ]).toHaveClass('active-option')
		userEvent.type(input, '_LE')
		expect(ul.children).toHaveLength(2)
		userEvent.click(ul.children[ 0 ])
		expect(input).toHaveValue('_LET1')
		fireEvent.blur(input)
		expect(ul).toHaveClass('close')
		expect(input).toHaveValue('_LET1')
		userEvent.click(input)
		expect(ul).toHaveClass('open')
		expect(input).toHaveValue('')
		fireEvent.blur(input)
		expect(ul).toHaveClass('close')
		userEvent.click(input)
		expect(ul).toHaveClass('open')
		expect(input.value).toHaveLength(0)
		expect(input).toHaveAttribute('placeholder', '_LET1')
		userEvent.type(input, 'pp')
		expect(ul.children[ 0 ]).toHaveTextContent('No options')
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(input).toHaveValue('_LET1')
		expect(ul).toHaveClass('close')
		userEvent.type(input, 'ortolana')
		expect(ul).toHaveClass('open')
		expect(input.parentElement).toHaveClass('focus')
		expect(input).toHaveValue('ortolana')
		expect(document.activeElement === input).toBeTruthy()
		fireEvent.click(input)
		expect(input).toHaveValue('ortolana')
		userEvent.type(input, '_OP')
		fireEvent.keyDown(input, { key: 'ArrowUp' })
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(input).toHaveValue('_OPT2')
		fireEvent.click(arrow)
		expect(ul).toHaveClass('open')
		fireEvent.click(arrow)
		expect(ul).toHaveClass('open')
	}

	test('UNCONTROLLED', () => {

		const SF = (
			<SelectFiltered
				options={[
					{ value: 'opt1', label: '_OPT1' },
					{ value: 'opt2', label: '_OPT2' },
					{ value: 'let1', label: '_LET1' },
					{ value: 'let2', label: '_LET2' }
				]}
			/>
		)

		render(SF);
		test_baseFunctionality()
	});

	test('CONTROLLED', () => {

		const Test_Container: React.FC = () => {

			const [ value, setValue ] = useState({ value: 'opt1', label: '_OPT1' })
			const options = [
				{ value: 'opt1', label: '_OPT1' },
				{ value: 'opt2', label: '_OPT2' },
				{ value: 'let1', label: '_LET1' },
				{ value: 'let2', label: '_LET2' }
			]

			return (
				<SelectFiltered
					options={options}
					value={value}
					onChange={setValue}
				/>
			)
		}

		render(<Test_Container />);

		const input = screen.getByRole('textbox') as HTMLInputElement
		const ul = screen.getByRole('list')

		expect(input).toHaveValue('_OPT1')
		expect(ul).toHaveClass('close')
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(input).toHaveValue('')
		expect(ul).toHaveClass('open')
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(input).toHaveValue('_OPT1')
		expect(ul).toHaveClass('close')
		userEvent.type(input, '')

		test_baseFunctionality()
	})
});

describe('SelectFiltered Public API', () => {

	let eventArray: string[] = []
	const reset = () => eventArray = []
	const increment = (origin: string) => () => eventArray.push(origin)

	const Test_Container: React.FC = () => {



		const options = [
			{ value: 'opt1', label: '_OPT1' },
			{ value: 'opt2', label: '_OPT2' },
			{ value: 'let1', label: '_LET1' },
			{ value: 'let2', label: '_LET2' }
		]

		return (
			<div>
				<button data-testid='reset' onClick={reset}>
					Reset
				</button>

				<SelectFiltered
					className='width-250'
					options={options}
					onFocus={increment('focus')}
					onBlur={increment('blur')}
					onClick={increment('click')}
					onTouchStart={increment('touchStart')}
					onTouchEnd={increment('touchEnd')}
					onTouchMove={increment('touchMove')}
					onInputClick={increment('inputClick')}
					onInputChange={increment('inputChange')}
					onKeyDown={increment('keyDown')}
					onKeyPress={increment('keyPress')}
					onKeyUp={increment('keyUp')}
					onOpen={increment('open')}
					onClose={increment('close')}
					onChange={increment('change')}
					noOptionsMessage='test-noOptionsMessage'

				/>
			</div>
		)
	}

	test('Correct handlers are called', () => {
		render(<Test_Container />);

		const wrapper = screen.getByTestId('wrapper')
		const input = screen.getByRole('textbox') as HTMLInputElement
		const ul = screen.getByRole('list')
		const arrow = screen.getByTestId('toggle')

		expect(eventArray).toEqual([])
		userEvent.click(input)
		expect(eventArray).toEqual([ "focus", "open", "inputClick", "click" ])
		expect(wrapper).toHaveClass('focus')
		reset()
		userEvent.type(input, '1')
		expect(eventArray).toEqual([ "keyDown", "keyPress", "inputChange", "keyUp" ])
		reset()
		fireEvent.touchStart(input)
		fireEvent.touchMove(input)
		fireEvent.touchEnd(input)
		expect(eventArray).toEqual([ "touchStart", "touchMove", "touchEnd" ])
		reset()
		fireEvent.touchStart(arrow)
		fireEvent.touchMove(arrow)
		fireEvent.touchEnd(arrow)
		expect(eventArray).toEqual([ "touchStart", "touchMove", "touchEnd" ])
		reset()
		withTab(userEvent).tab()
		expect(input).not.toHaveFocus()
		expect(eventArray).toEqual([ "blur", "close" ])
		reset()
		fireEvent.focus(input)
		expect(eventArray).toEqual([ "focus", "open" ])
		reset()
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(eventArray).toEqual([ "close", "change", "keyDown" ])
		reset()
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(eventArray).toEqual([ "open", "keyDown" ])
		userEvent.type(input, '____')
		expect(ul.children[ 0 ]).toHaveTextContent("test-noOptionsMessage")
		reset()
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(eventArray).toEqual([ "close", "keyDown" ])
		fireEvent.keyDown(input, { key: 'Enter' })
		userEvent.type(input, '_')
		reset()
		userEvent.click(ul.children[ 0 ])
		expect(input).toHaveValue('_OPT1')
		expect(eventArray).toEqual([ "close", "change", "click" ])
	})

})

