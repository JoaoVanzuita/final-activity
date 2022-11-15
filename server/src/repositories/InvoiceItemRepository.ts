import { AppDataSource } from "../data-source";
import { InvoiceItem } from "../entities/InvoiceItem";

export const InvoiceItemRepository = AppDataSource.getRepository(InvoiceItem)
