export function parseUrl() {
	const url = window.location;
	const query = url.href.split('?')[1] || '';
	const delimiter = '&';
	let result = {};

	let parts = query
		.split(delimiter);

	parts.map(p => p.split('=').reduce((a, b) => result[a] = b))

	return result;
}