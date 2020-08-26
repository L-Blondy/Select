const fnPromise = (n: number) => new Promise(resolve => {
	console.log('inside promise ')
	return resolve(n)
})

fnPromise(1).then(res => console.log(res))

export default {}