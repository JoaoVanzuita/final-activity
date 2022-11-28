import { Request, Response } from "express";
import { InvoiceType } from "../entities/Invoice";
import { ServerError } from "../errors/ServerError";
import { InvoiceRepository } from "../repositories/InvoiceRepository";
import { InvoiceService } from "../service/InvoiceService";

export class InvoiceController {
  async create(req: Request, res: Response) {

    const errors = []

    if (!req.body.invoiceType) {
      errors.push('no type specified')
    }
    if (!req.body.date) {
      errors.push('no date specified')
    }
    if (!req.body.items || req.body.items.length == 0) {
      errors.push('no items specified')
    }
    if (errors.length) {
      throw new ServerError(errors.join())
    }

    const { invoiceType, date, items } = req.body

    console.log(items)

    const invoice = InvoiceRepository.create({
      invoiceType,
      date,
      items
    })

    const newInvoice = await new InvoiceService().create(invoice)

    return res.status(201).json({
      "data": newInvoice
    })

  }
}
