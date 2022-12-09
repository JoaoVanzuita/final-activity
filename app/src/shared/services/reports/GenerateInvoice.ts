import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces'

import { Invoice, InvoiceType } from '../../types'

const create = (invoice: Invoice) => {
	(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

	const tableData = invoice.items.map(item => {
		return [
			{ text: item.product.id, fontSize: 9, margin: [0, 2, 0, 2] },
			{ text: item.product.name, fontSize: 9, margin: [0, 2, 0, 2] },
			{ text: item.quantity, fontSize: 9, margin: [0, 2, 0, 2] },
			{ text: item.unitPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), fontSize: 9, margin: [0, 2, 0, 2] }
		]
	})

	const title: Content = [{
		text: `Nota fiscal de ${invoice.invoiceType === InvoiceType.purchase ? 'compra' : 'venda'}  -  ID do pedido: ${invoice.id}`,
		alignment: 'left',
		fontSize: 20,
		bold: true,
		margin: [30, 20, 10, 20]
	}]

	const issueDate: Content = [{
		text: `Data de emissão: ${invoice.date}`,
		fontSize: 15,
		alignment: 'left',
		margin: [0, 20, 10, 20]
	}]

	const detailsTitle: Content = [{
		text: 'Itens do pedido',
		fontSize: 20,
		alignment: 'center',
		margin: [0, 80, 0, 20]
	}]

	const details: Content = [{
		table: {
			headerRows: 1,
			widths: ['*', '*', '*', '*'],
			body: [
				[
					{ text: 'ID do produto', style: 'tableHeader', fontSize: 10 },
					{ text: 'Nome do produto', style: 'tableHeader', fontSize: 10 },
					{ text: 'Quantidade', style: 'tableHeader', fontSize: 10 },
					{ text: 'Valor unitário', style: 'tableHeader', fontSize: 10 }
				],
				...tableData
			]
		},
		layout: {
			fillColor: function (rowIndex, node, columnIndex) {
				return (rowIndex % 2 === 0) ? null : '#CCCCCC'
			}
		}
	}]

	const totalValue: Content = [{
		text: `Valor total: ${invoice.totalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`,
		fontSize: 15,
		alignment: 'left',
		margin: [0, 40, 10, 20]
	}]

	const footer = (currentPage: number, pageCount: number): Content => {

		return [{
			text: `Página ${currentPage} de ${pageCount}`,
			alignment: 'right',
			fontSize: 9,
			margin: [0, 10, 20, 0]
		}]
	}

	const docDefinitions: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [30, 50, 30, 40],
		header: title,
		content: [issueDate, detailsTitle, details, totalValue],
		footer: footer
	}

	pdfMake.createPdf(docDefinitions).open()
}

export const GenerateInvoice = {
	create
}
