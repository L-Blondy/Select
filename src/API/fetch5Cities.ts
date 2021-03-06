type CityData = {
	name: string
	[ key: string ]: string
}

function fetch5Cities(keyword: string): Promise<{ value: string, label: string }[]> {
	console.log('fetch5Cities')
	const url = 'https://api-cities.herokuapp.com/'

	return fetch(`${url}?keyword=${keyword}`)
		.then(res => res.json())
		.then((data: CityData[]) => data.map(city => ({ value: city.name, label: city.name })))
}

export default fetch5Cities
