export function randChoice<T>(arr: Array<T>): T {
	return arr[Math.floor(Math.random() * arr.length)]
}
