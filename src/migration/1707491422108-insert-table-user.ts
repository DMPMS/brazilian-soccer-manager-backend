import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableUser1707491422108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.user(name, user_type, birthdate, email, password, country_id) VALUES
        ('Admin', 2, '2000-01-01', 'admin@admin.com', '$2b$10$ZOUve/KzFlz9kixhLl3ef.Iq8bnlyFH0KyoGR1c0BEC1EX9DlU57i', 29);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.user;
    `);
  }
}
