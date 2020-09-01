import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SelectAsync, SelectFiltered } from 'src/components'

const noop = () => { }

type Option = {
	value: string
	label: string
}

const TestView = () => {
	const [ sf, setSf ] = useState<Option>({ value: '', label: '' })
	const [ cleanup, setCleanup ] = useState<Option>({ value: '', label: '' })
	const [ noCleanup, setNoCleanup ] = useState<Option>({ value: '', label: '' })

	const options: Option[] = [
		{ value: 'opt1', label: '_OPT1' },
		{ value: 'opt2', label: '_OPT2' },
		{ value: 'let1', label: '_LET1' },
		{ value: 'let2', label: '_LET2' },
		{ value: 'paris', label: '_PARIS' },
		{ value: 'opt1', label: '_OPT1' },
		{ value: 'opt2', label: '_OPT2' },
		{ value: 'let1', label: '_LET1' },
		{ value: 'let2', label: '_LET2' },
		{ value: 'paris', label: '_PARIS' },
	]

	return (
		<Div$>

			<h1>Async With cleanup</h1>
			<SelectAsync
				className='async-shit'
				onChange={setCleanup}
				value={cleanup}
			/>

			<h1>Async Without cleanup</h1>
			<SelectAsync
				className='async-shit'
				onChange={setNoCleanup}
				value={noCleanup}
				withCleanup={false}
			/>

			<h1>Filtered</h1>
			<SelectFiltered
				className='filtered'
				options={options}
				onFocus={(noop)}
				onBlur={noop}
				onClick={noop}
				onTouchStart={noop}
				onInputClick={noop}
				onInputChange={noop}
				onKeyDown={noop}
				onOpen={noop}
				onClose={noop}
				onChange={setSf}
				value={sf}
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

	.select {
		width: 300px;
		margin-bottom: 3rem;
		font-size: 1.15rem;
		line-height: 2em;
		color: #f0f0f0;
		background: steelblue;
		

		.select__content-wrapper {
			/* border-color: pink; */
		}
	}

`
