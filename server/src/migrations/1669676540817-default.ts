import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669676540817 implements MigrationInterface {
    name = 'default1669676540817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" RENAME COLUMN "type" TO "invoiceType"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" RENAME COLUMN "invoiceType" TO "type"`);
    }

}
