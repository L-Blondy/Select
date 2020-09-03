import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { SelectAsync, SelectFiltered } from 'src/components'
import { Opt } from 'src/types'

const noop = () => { }

const TestView = () => {
	const [ cleanup, setCleanup ] = useState<Opt>({ value: '', label: '' })
	const [ noCleanup, setNoCleanup ] = useState<Opt>({ value: '', label: '' })
	const [ sf, setSf ] = useState<Opt>({ value: '', label: '' })


	const options: Opt[] = [
		{ value: 'opt1', label: 'opt1' },
		{ value: 'opt2', label: 'opt2' },
		{ value: 'let1', label: 'let1' },
		{ value: 'let2', label: 'let2' },
		{ value: 'paris', label: 'paris' },
	]

	const ref = useRef<HTMLDivElement>(null)

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
				ref={ref}
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

		/* border-color: red;
		&.hover {
			border-color: yellow
		}

		&.focus {
			border-color: black;
		}  */
		/* line-height: 30px; */
		/* height: 32px; */
		/* width: 200px;
		margin-bottom: 3rem;
		font-size: 1.15rem;
		line-height: 2em;
		color: #444; 
		background: pink;

		.no-option {
			color:blue;
		}

		.active-option {
			background: blue;
			color:white;
		}
	} */

`
