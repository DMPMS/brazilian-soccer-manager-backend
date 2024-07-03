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
        ('Petit', 47, 74),
        ('Gilmar Dal Pozzo', 54, 29),
        ('Fábio Carille', 50, 29),
        ('Cauan de Almeida', 35, 29),
        ('Rafael Guanaes', 43, 29),
        ('Márcio Zanardi', 45, 29),
        ('Márcio Fernandes', 62, 29),
        ('Mariano Soso', 43, 11),
        ('Fábio Matias', 44, 29),
        ('Léo Condé', 50, 29),
        ('Mozart Santos', 44, 29),
        ('Eduardo Baptista', 54, 29),
        ('Paulo Gomes', 49, 160),
        ('Nelsinho Baptista', 73, 29),
        ('Rafael Lacerda', 40, 29),
        ('Hélio dos Anjos', 66, 29),
        ('Umberto Louzer', 45, 29),
        ('Daniel Paulista', 42, 29),
        ('Luizinho Vieira', 52, 29),
        ('Alberto Valentim', 49, 29),
        ('Pintado', 58, 29);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.managerglobal;
    `);
  }
}
