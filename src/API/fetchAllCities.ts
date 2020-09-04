type CityData = {
	name: string
	[ key: string ]: string
}

function fetchAllCities(keyword: string): Promise<{ value: string, label: string }[]> {
	console.log('fetchAllCities')
	const url = 'https://api-cities.herokuapp.com/'

	return fetch(`${url}?keyword=${keyword}&maxResults=100`)
		.then(res => res.json())
		.then((data: CityData[]) => data.map(city => ({ value: city.name, label: city.name })))
}

export default fetchAllCities
