import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1618701170779 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "Now()",
          },
        ],
      }),
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
