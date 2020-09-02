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
		{ value: 'opt1', label: 'opt1' },
		{ value: 'opt2', label: 'opt2' },
		{ value: 'let1', label: 'let1' },
		{ value: 'let2', label: 'let2' },
		{ value: 'paris', label: 'paris' },
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
		color: #444; 
		/* height: 50px; */
		/* width: 200px;
		margin-bottom: 3rem;
		font-size: 1.15rem;
		line-height: 2em;
		color: #444; 
		background: pink;
		
		&--border {
			border-color: green;
			border-radius: 10px;
			overflow: hidden;

			&.hover {
				border-color: red;
			}

			&.focus {
				border-color: blue;
			}
		}

		&__arrow {
			color: green;

			&__divisor {
				border-color: red;
			}
		}

		.no-option {
			color:blue;
		}

		.active-option {
			background: blue;
			color:white;
		}
	} */

`
