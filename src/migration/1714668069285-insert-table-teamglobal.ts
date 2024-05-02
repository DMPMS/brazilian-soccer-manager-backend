import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableTeamglobal1714668069285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.teamglobal(name, src_image, country_id, managerglobal_id) VALUES
        ('Botafogo', 'https://i.ibb.co/r4MLj2x/Botafogo.png', 29, 1),
        ('Atlético-MG', 'https://i.ibb.co/hc7SDqg/atletico-mg.png', 29, 2),
        ('Bragantino', 'https://i.ibb.co/kmnD5KW/bragantino.png', 29, 3),
        ('Athletico-PR', 'https://i.ibb.co/fFLRnJY/athletico-pr.png', 29, 4),
        ('Bahia', 'https://i.ibb.co/K5mJ2Y5/bahia.png', 29, 5),
        ('Internacional', 'https://i.ibb.co/NY7v6W3/internacional.png', 29, 6),
        ('Cruzeiro', 'https://i.ibb.co/w72qM51/cruzeiro.png', 29, 7),
        ('Flamengo', 'https://i.ibb.co/BtJgrBJ/flamengo.png', 29, 8),
        ('Grêmio', 'https://i.ibb.co/SmN6wrc/gremio.png', 29, 9),
        ('Criciúma', 'https://i.ibb.co/0tHRHt5/criciuma.png', 29, 10),
        ('Fortaleza', 'https://i.ibb.co/72NyWQv/fortaleza.png', 29, 11),
        ('Palmeiras', 'https://i.ibb.co/tbKbVHR/palmeiras.png', 29, 12),
        ('Juventude', 'https://i.ibb.co/tJDCshF/juventude.png', 29, 13),
        ('São Paulo', 'https://i.ibb.co/B24WHT2/sao-paulo.png', 29, 14),
        ('Corinthians', 'https://i.ibb.co/tYpXh0q/corinthians.png', 29, 15),
        ('Fluminense', 'https://i.ibb.co/HXjfjpR/fluminense.png', 29, 16),
        ('Vasco da Gama', 'https://i.ibb.co/SPnQN8V/vasco.png', 29, 17),
        ('EC Vitória', 'https://i.ibb.co/jr4800Q/vitoria.png', 29, 18),
        ('Atlético-GO', 'https://i.ibb.co/nPQwpXK/atletico-go.png', 29, 19),
        ('Cuiabá', 'https://i.ibb.co/XkwPD69/cuiaba.png', 29, 20);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.teamglobal;
    `);
  }
}
