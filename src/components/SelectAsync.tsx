import React, { useEffect } from 'react'
import { useAsync } from 'src/hooks'
import { SelectBase } from './base'
import { fetchCities } from 'src/API'

interface Props {

}

function SelectAsync({
	...props
}: Props) {

	const [ { pending, error, data }, execute ] = useAsync(fetchCities)

	useEffect(() => console.log(data), [ data ])

	const handleClick = () => {
		console.log('click')
		execute('oi')
	}

	return (
		<div>
			<h1>Select Async is in the Game !</h1>
			<br />
			<button onClick={handleClick}> Call it ! </button>
			<br />
			<SelectBase options={data || []} />
		</div>
	)
}

export default SelectAsync
