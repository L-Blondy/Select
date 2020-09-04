import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { SelectAsync, SelectFiltered, SelectAsyncFiltered } from 'src/components'
import { Opt } from 'src/types'
import { fetch5Cities, fetchAllCities } from 'src/API'

const noop = () => { }

const TestView = () => {
	const [ cleanup, setCleanup ] = useState<Opt>({ value: '_m', label: 'M' })
	const [ noCleanup, setNoCleanup ] = useState<Opt>({ value: '_p', label: 'P' })
	const [ sf, setSf ] = useState<Opt>({ value: '_g', label: 'G' })

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

			<h2>Async With cleanup</h2>
			<SelectAsync
				callback={fetch5Cities}
				className='async-with-cleanup'
				onChange={setCleanup}
				value={cleanup}
				withCache={false}
			/>

			<h2>Async Without cleanup</h2>
			<SelectAsync
				ref={ref}
				debounceMs={300}
				callback={fetch5Cities}
				className='async-without-cleanup'
				onChange={setNoCleanup}
				value={noCleanup}
				withCleanup={false}
			/>

			<h2>Filtered</h2>
			<SelectFiltered
				filterFn={(opt, keyword) => RegExp(keyword, 'i').test(opt.label)}
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

			<h2>Async Filtered With Cleanup</h2>
			<SelectAsyncFiltered
				callback={fetchAllCities}
				filterFn={(opt, keyword) => RegExp(keyword, 'i').test(opt.label)}
				withCleanup={false}
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
