import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePosition1716833435673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.position(id, name, abbreviation, area) VALUES
        (1, 'Centroavante', 'CA', 'Ataque'),
        (2, 'Segundo Atacante', 'SA', 'Ataque'),
        (3, 'Ponta Esquerda', 'PE', 'Ataque'),
        (4, 'Ponta Direita', 'PD', 'Ataque'),
        (5, 'Meio-Campista Ofensivo', 'MO', 'Meio-Campo'),
        (6, 'Meio-Campista Esquerdo', 'ME', 'Meio-Campo'),
        (7, 'Meio-Campista Direito', 'MD', 'Meio-Campo'),
        (8, 'Meio-Campista Central', 'MC', 'Meio-Campo'),
        (9, 'Volante', 'VOL', 'Meio-Campo'),
        (10, 'Lateral Esquerdo', 'LE', 'Defesa'),
        (11, 'Lateral Direito', 'LD', 'Defesa'),
        (12, 'Zagueiro', 'ZAG', 'Defesa'),
        (13, 'Goleiro', 'GOL', 'Goleiro');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.position;
    `);
  }
}
