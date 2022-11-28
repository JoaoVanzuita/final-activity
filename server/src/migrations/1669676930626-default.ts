import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669676930626 implements MigrationInterface {
    name = 'default1669676930626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" RENAME COLUMN "invoiceType" TO "invoice_type"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" RENAME COLUMN "invoice_type" TO "invoiceType"`);
    }

}
