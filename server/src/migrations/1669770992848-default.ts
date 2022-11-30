import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669770992848 implements MigrationInterface {
    name = 'default1669770992848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_27f93efe474daf5bb921b35ab1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_831578615b7fe45c03df3a70e9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_3d5ac71f03424e4b3db7aeae79"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_55ba54d7f8e0c78d5191dc3f89" CHECK ("quantity" > -1)`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_3494e9a3db02526a75ff004528" CHECK ("sale_price" > -1)`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_8fa79e8b642969f15fc70f37a1" CHECK ("cost_price" > -1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_8fa79e8b642969f15fc70f37a1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_3494e9a3db02526a75ff004528"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_55ba54d7f8e0c78d5191dc3f89"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_3d5ac71f03424e4b3db7aeae79" CHECK ((cost_price > (0)::numeric))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_831578615b7fe45c03df3a70e9" CHECK ((sale_price > (0)::numeric))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_27f93efe474daf5bb921b35ab1" CHECK ((quantity > 0))`);
    }

}
