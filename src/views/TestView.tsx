import React, { useState } from 'react'
import styled from 'styled-components'
// import { useDebounce } from 'src/hooks'

import { SelectAsync, SelectFiltered } from 'src/components'

const noop = () => { }

type Option = {
	value: string
	label: string
}

const TestView = () => {
	const [ option, setOption ] = useState<Option>({ value: '', label: '' })

	const options: Option[] = [
		{ value: 'opt1', label: '_OPT1' },
		{ value: 'opt2', label: '_OPT2' },
		{ value: 'let1', label: '_LET1' },
		{ value: 'let2', label: '_LET2' },
	]

	return (
		<Div$>

			<SelectAsync
				className='async-shit'
				onInputChange={filter => console.log('TestView | onInputChange | ' + filter)}
			/>

			<SelectFiltered
				className='width-250'
				options={options}
				onFocus={noop}
				onBlur={noop}
				onClick={noop}
				onTouchStart={noop}
				onInputClick={noop}
				onInputChange={noop}
				onKeyDown={noop}
				onOpen={noop}
				onClose={noop}
				onChange={setOption}
				value={option}
			/>

		</Div$>
	)
}

export default TestView

const Div$ = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	padding: 10rem;

	.width-250 {
		width: 250px;
		width: 250px;
		margin-bottom: 3rem;
		font-size: 1.15rem;
		line-height: 2em;
		color: #444;
	}

	.async-shit {
		line-height: 2em;
		font-size: 1.3rem;
	}
`
