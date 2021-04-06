import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1616456212655
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true, // informar que é PK
            generationStrategy: 'uuid', // gerador de primary key é uuid
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false, // não é possivel ter esse campo como nulo, (ja fica false por default)
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // para capturar o fuso horario da região
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
