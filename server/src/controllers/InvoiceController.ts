import { Request, Response } from "express";
import { InvoiceType } from "../entities/Invoice";
import { InvoiceRepository } from "../repositories/InvoiceRepository";
import { InvoiceService } from "../service/InvoiceService";

export class InvoiceController {
  async create(req: Request, res: Response) {
    const { type, date, itens } = req.body

    const invoice = InvoiceRepository.create({
      type: InvoiceType[type],
      date,
      itens
    })

    const newInvoice = await new InvoiceService().create(invoice)

    return res.status(201).json({
      "status": 201,
      "data": newInvoice
    })

  }
}
