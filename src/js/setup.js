export function makeFooter() {
	let container = document.getElementById('footer-container')
	let footer = document.createElement("footer");
	let part1 = document.createElement('span')
	part1.textContent = '🦄 I made this myself! '
	let part2 = document.createElement('span')
	part2.textContent = '🦄'
	part2.setAttribute('id', 'unicorn-flip')
	footer.appendChild(part1);
	footer.appendChild(part2);
	container.appendChild(footer)
}