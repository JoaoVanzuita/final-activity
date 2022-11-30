import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669812441291 implements MigrationInterface {
    name = 'default1669812441291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice_items" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "unit_price" numeric(12,2) NOT NULL, "invoice_id" integer, "product_id" integer, CONSTRAINT "PK_53b99f9e0e2945e69de1a12b75a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_55ba54d7f8e0c78d5191dc3f89" CHECK ("quantity" > -1)`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_3494e9a3db02526a75ff004528" CHECK ("sale_price" > -1)`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_8fa79e8b642969f15fc70f37a1" CHECK ("cost_price" > -1)`);
        await queryRunner.query(`ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_dc991d555664682cfe892eea2c1" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "invoice_items" ADD CONSTRAINT "FK_5a76734b5eead0967cf6ee3abc0" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_5a76734b5eead0967cf6ee3abc0"`);
        await queryRunner.query(`ALTER TABLE "invoice_items" DROP CONSTRAINT "FK_dc991d555664682cfe892eea2c1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_8fa79e8b642969f15fc70f37a1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_3494e9a3db02526a75ff004528"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_55ba54d7f8e0c78d5191dc3f89"`);
        await queryRunner.query(`DROP TABLE "invoice_items"`);
    }

}
