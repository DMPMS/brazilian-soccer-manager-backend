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
        ('Cuiabá', 'https://i.ibb.co/XkwPD69/cuiaba.png', 29, 20),
        ('Avaí', 'https://i.ibb.co/mNsxJgP/avai-sc.png', 29, 21),
        ('Santos', 'https://i.ibb.co/x6s7Py0/santos-sp.png', 29, 22),
        ('América-MG', 'https://i.ibb.co/WBL0kBn/america-mg.png', 29, 23),
        ('Operário-PR', 'https://i.ibb.co/ZTT5hxC/operario-pr.png', 29, 24),
        ('Goiás', 'https://i.ibb.co/Srk7Skg/goias-go.png', 29, 25),
        ('Vila Nova', 'https://i.ibb.co/qYZ9h9X/vila-nova-go.png', 29, 26),
        ('Sport Recife', 'https://i.ibb.co/DgtTkFc/sport-pe.png', 29, 27),
        ('Coritiba', 'https://i.ibb.co/hZR6sj6/coritiba-pr.png', 29, 28),
        ('Ceará SC', 'https://i.ibb.co/cJQGc5X/ceara-ce.png', 29, 29),
        ('Mirassol', 'https://i.ibb.co/NTdLc7f/mirassol-sp.png', 29, 30),
        ('Novorizontino', 'https://i.ibb.co/LhDPcRZ/novorizontino-sp.png', 29, 31),
        ('Botafogo-SP', 'https://i.ibb.co/RcSzHdS/botafogo-sp.png', 29, 32),
        ('Ponte Preta', 'https://i.ibb.co/N62SvWN/ponte-preta-sp.png', 29, 33),
        ('Amazonas FC', 'https://i.ibb.co/SNP0JY3/amazonas-am.png', 29, 34),
        ('Paysandu', 'https://i.ibb.co/rpbctJ3/paysandy-pa.png', 29, 35),
        ('Chapecoense', 'https://i.ibb.co/SNCkk5R/chapecoense-sc.png', 29, 36),
        ('CRB', 'https://i.ibb.co/y8QcCrH/crb-al.png', 29, 37),
        ('Brusque', 'https://i.ibb.co/JxTt6fc/brusque-sc.png', 29, 38),
        ('Ituano', 'https://i.ibb.co/SBfCfY4/ituano-sp.png', 29, 39),
        ('Guarani', 'https://i.ibb.co/r6nDCW8/guarani-sp.png', 29, 40);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.teamglobal;
    `);
  }
}
