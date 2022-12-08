export const currencyMask = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	const value = ev.currentTarget.value
		.replace(/\D/g, '')
		.replace(/(\d)(\d{2})$/, '$1,$2')
		.replace(/(?=(\d{3})+(\D))\B/g, '.')

	return value
}
