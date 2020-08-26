import { createGlobalStyle } from 'styled-components'

const Global$ = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'Avenir LT Std'
	}

	html,
	body,
	#root {
		height: 100%;
	}

	#root {
		background: #f0f0f0
	}
`

export default Global$