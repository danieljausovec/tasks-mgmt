import { MigrationInterface, QueryRunner } from "typeorm";

export class TasksDescriptionUpdate1721376474831 implements MigrationInterface {
    name = 'TasksDescriptionUpdate1721376474831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying`);
    }

}
