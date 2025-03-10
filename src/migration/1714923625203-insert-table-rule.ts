import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableRule1714923625203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.rule(name, number_of_teams, level, default_competition_name, default_competition_src_image, country_id, description) VALUES
        ('Campeonato Brasileiro Série A', 20, 1, 'Brasileirão Série A', 'https://i.ibb.co/gynW091/brazil-league-a.png', 29, 'O Campeonato Brasileiro Série A é uma competição disputada por 20 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 38 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Além do título, o campeão garante uma vaga na Supercopa do Brasil na temporada seguinte, onde enfrentará o vencedor da Copa do Brasil. Os 4 times com o pior desempenho ao final do campeonato serão rebaixados para o Campeonato Brasileiro Série B na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Campeonato Brasileiro Série B', 20, 2, 'Brasileirão Série B', 'https://i.ibb.co/MPLsZ0q/brazil-league-b.png', 29, 'O Campeonato Brasileiro Série B é uma competição disputada por 20 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 38 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Os 4 times com o melhor desempenho são promovidos ao Campeonato Brasileiro Série A na temporada seguinte. Os 4 times com o pior desempenho ao final do campeonato serão rebaixados para o Campeonato Brasileiro Série B na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Campeonato Brasileiro Série C', 20, 3, 'Brasileirão Série C', 'https://i.ibb.co/DY16F97/brazil-league-c.png', 29, 'O Campeonato Brasileiro Série C é uma competição disputada por 20 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 38 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Os 4 times com o melhor desempenho são promovidos ao Campeonato Brasileiro Série B na temporada seguinte. Os 4 times com o pior desempenho ao final do campeonato serão rebaixados para o Campeonato Brasileiro Série D na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Campeonato Brasileiro Série D', 8, 4, 'Brasileirão Série D', 'https://i.ibb.co/RP9DVCc/brazil-league-d.png', 29, 'O Campeonato Brasileiro Série D é uma competição disputada por 8 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 14 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Os 4 times com o melhor desempenho são promovidos ao Campeonato Brasileiro Série C na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Copa do Brasil', 64, 5, 'Copa do Brasil', 'https://i.ibb.co/jbf2MTJ/brazil-cup.png', 29, 'A definir.'),
        ('Supercopa do Brasil', 2, 6, 'Supercopa Rei', 'https://i.ibb.co/yQ0Mfc8/brazil-super-cup.png', 29, 'A definir.');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.rule;
    `);
  }
}
