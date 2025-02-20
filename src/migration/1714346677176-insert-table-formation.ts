import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableFormation1714346677176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.formation(name) VALUES
        ('4-4-2'),
        ('4-4-2 Ofensivo'),
        ('4-4-2 Defensivo'),
        ('4-3-3'),
        ('4-3-3 Ofensivo');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.formation;
    `);
  }
}
