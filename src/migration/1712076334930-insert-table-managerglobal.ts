import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableManagerglobal1712076334930
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.managerglobal(name, age, country_id) VALUES
        ('Artur Jorge', 52, 160),
        ('Gabriel Milito', 43, 11),
        ('Pedro Caixinha', 53, 160),
        ('Cuca', 60, 29),
        ('Rogério Ceni', 51, 29),
        ('Eduardo Coudet', 49, 11),
        ('Fernando Seabra', 46, 29),
        ('Tite', 62, 29),
        ('Renato Gaúcho', 61, 29),
        ('Claudio Tencati', 50, 29),
        ('Juan Pablo Vojvoda', 49, 11),
        ('Abel Ferreira', 45, 160),
        ('Roger Machado', 49, 29),
        ('Luis Zubeldía', 43, 11),
        ('António Oliveira', 41, 160),
        ('Fernando Diniz', 50, 29),
        ('Ramón Díaz', 64, 11),
        ('Leonardo Condé', 46, 29),
        ('Jair Ventura', 45, 29),
        ('Petit', 47, 74);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.managerglobal;
    `);
  }
}
