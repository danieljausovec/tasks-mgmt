import { MigrationInterface, QueryRunner } from 'typeorm';

export class TasksUpdate1721376297160 implements MigrationInterface {
  name = 'TasksUpdate1721376297160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`);
  }
}
