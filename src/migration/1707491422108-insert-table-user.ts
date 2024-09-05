import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableUser1707491422108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.user(name, user_type, birthdate, email, password, country_id) VALUES
        ('Admin', 2, '2000-01-01', 'admin@admin.com', '$2b$10$ZOUve/KzFlz9kixhLl3ef.Iq8bnlyFH0KyoGR1c0BEC1EX9DlU57i', 29),
        ('Usuário 1', 1, '2001-02-02', 'usuario1@usuario1.com', '$2b$10$N6S.MQtdM0F6gHfUyGcqg.ZXdhOpwOm0iv9npK4YusvEJBTMgSv6K', 29);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.user;
    `);
  }
}
