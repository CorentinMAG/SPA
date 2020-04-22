import {
	parseUrl
} from './app/utils/utils';

const parameters = parseUrl();

document.querySelector('body')
	.appendChild(document.createTextNode(JSON.stringify(parameters)));