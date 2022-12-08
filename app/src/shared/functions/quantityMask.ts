export const quantityMask = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	const value = ev.currentTarget.value.replace(/[^0-9]/g, '')

	return value
}
