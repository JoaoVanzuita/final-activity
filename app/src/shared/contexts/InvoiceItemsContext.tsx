import React, { createContext, useContext, useState } from 'react'

import { InvoiceItem } from '../types'

interface IInvoiceItemsContext{
	items: InvoiceItem[]
	setItems: (newItems: InvoiceItem[]) => void
}

const InvoiceItemsContext = createContext({} as IInvoiceItemsContext)

export const useInvoiceItemsContext = () => {
	return useContext(InvoiceItemsContext)
}

interface IInvoiceItemsContextProps {
  children: React.ReactNode
}

export const InvoiceItemsProvider: React.FC<IInvoiceItemsContextProps> = ({ children }) => {
	const [items, setItems] = useState<InvoiceItem[]>([])

	return(
		<InvoiceItemsContext.Provider value = {{items, setItems}}>
			{children}
		</InvoiceItemsContext.Provider>
	)
}
