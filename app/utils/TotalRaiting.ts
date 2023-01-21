export const TotalRaiting = (array: object, values: number) => {
	const sum = Object.values(array).reduce((t, values) => t + values, 0)
	return sum / Object.keys(array).length
}
