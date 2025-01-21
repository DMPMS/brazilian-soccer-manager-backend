import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePosition1716833435673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.position(name, abbreviation, area) VALUES
        ('Centroavante', 'CA', 1),
        ('Segundo Atacante', 'SA', 1),
        ('Ponta Esquerda', 'PE', 1),
        ('Ponta Direita', 'PD', 1),
        ('Meio-Campista Ofensivo', 'MO', 2),
        ('Meio-Campista Esquerdo', 'ME', 2),
        ('Meio-Campista Direito', 'MD', 2),
        ('Meio-Campista Central', 'MC', 2),
        ('Volante', 'VOL', 2),
        ('Lateral Esquerdo', 'LE', 3),
        ('Lateral Direito', 'LD', 3),
        ('Zagueiro', 'ZAG', 3),
        ('Goleiro', 'GOL', 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.position;
    `);
  }
}
