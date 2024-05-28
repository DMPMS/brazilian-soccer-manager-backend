import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePosition1716833435673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.position(name, abbreviation, area) VALUES
        ('Centroavante', 'CA', 'Ataque'),
        ('Segundo Atacante', 'SA', 'Ataque'),
        ('Ponta Esquerda', 'PE', 'Ataque'),
        ('Ponta Direita', 'PD', 'Ataque'),
        ('Meio-Campista Ofensivo', 'MO', 'Meio-Campo'),
        ('Meio-Campista Esquerdo', 'ME', 'Meio-Campo'),
        ('Meio-Campista Direito', 'MD', 'Meio-Campo'),
        ('Meio-Campista Central', 'MC', 'Meio-Campo'),
        ('Volante', 'VOL', 'Meio-Campo'),
        ('Lateral Esquerdo', 'LE', 'Defesa'),
        ('Lateral Direito', 'LD', 'Defesa'),
        ('Zagueiro', 'ZAG', 'Defesa'),
        ('Goleiro', 'GOL', 'Goleiro');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.position;
    `);
  }
}
