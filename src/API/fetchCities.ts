type CityData = {
	name: string
	[ key: string ]: string
}

function fetchCities(keyword: string): Promise<string[]> {
	const url = 'https://api-cities.herokuapp.com/'

	return fetch(`${url}?keyword=${keyword}`)
		.then(res => res.json())
		.then((data: CityData[]) => data.map(city => city.name))
}

export default fetchCities
