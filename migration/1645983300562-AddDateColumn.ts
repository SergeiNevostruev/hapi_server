import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateColumn1645983300562 implements MigrationInterface {
    name = 'AddDateColumn1645983300562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "date_test" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_test"`);
    }

}
