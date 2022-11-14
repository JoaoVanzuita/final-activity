import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668461307804 implements MigrationInterface {
  name = 'default1668461307804'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "invoice_itens" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "unit_price" numeric(12,2) NOT NULL, "invoice_id" integer, "product_id" integer, CONSTRAINT "PK_825979a9e1eb7beeea02305bd50" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "invoices" ("id" SERIAL NOT NULL, "type" character varying(255) NOT NULL, "date" date NOT NULL, "total_price" numeric(12,2) NOT NULL, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sale_price" TYPE numeric(12,2)`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sale_price" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "cost_price" TYPE numeric(12,2)`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "cost_price" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "invoice_itens" ADD CONSTRAINT "FK_c16bdf93820f9739926c74cf555" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "invoice_itens" ADD CONSTRAINT "FK_4e47643287c7a9f9dc175e903f1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invoice_itens" DROP CONSTRAINT "FK_4e47643287c7a9f9dc175e903f1"`);
    await queryRunner.query(`ALTER TABLE "invoice_itens" DROP CONSTRAINT "FK_c16bdf93820f9739926c74cf555"`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "cost_price" SET DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "cost_price" TYPE numeric(10,2)`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sale_price" SET DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "sale_price" TYPE numeric(10,2)`);
    await queryRunner.query(`DROP TABLE "invoices"`);
    await queryRunner.query(`DROP TABLE "invoice_itens"`);
  }

}
