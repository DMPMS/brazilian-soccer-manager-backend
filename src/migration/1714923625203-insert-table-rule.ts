import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableRule1714923625203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.rule(name, competition_type, number_of_teams, description) VALUES
        ('Campeonato Brasileiro Série A', 1, 20, 'O Campeonato Brasileiro Série A é uma competição disputada por 20 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 38 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Além do título, o campeão garante uma vaga na Supercopa Rei na temporada seguinte, onde enfrentará o vencedor da Copa do Brasil. Os 4 times com o pior desempenho ao final do campeonato serão rebaixados para o Campeonato Brasileiro Série B na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Campeonato Brasileiro Série B', 2, 20, 'O Campeonato Brasileiro Série B é uma competição disputada por 20 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 38 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Os 4 times com o melhor desempenho são promovidos ao Campeonato Brasileiro Série A na temporada seguinte. Os 4 times com o pior desempenho ao final do campeonato serão rebaixados para o Campeonato Brasileiro Série B na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Campeonato Brasileiro Série C', 3, 20, 'O Campeonato Brasileiro Série C é uma competição disputada por 20 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 38 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Os 4 times com o melhor desempenho são promovidos ao Campeonato Brasileiro Série B na temporada seguinte. Os 4 times com o pior desempenho ao final do campeonato serão rebaixados para o Campeonato Brasileiro Série D na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Campeonato Brasileiro Série D', 4, 8, 'O Campeonato Brasileiro Série D é uma competição disputada por 8 times em formato de pontos corridos, dividida em 2 turnos. No primeiro turno, todos os times jogam entre si uma única vez. No segundo turno, os confrontos se repetem, mas com o mando de campo invertido. A competição tem um total de 14 rodadas, e o time que somar o maior número de pontos ao final dessas rodadas será declarado campeão.

Os 4 times com o melhor desempenho são promovidos ao Campeonato Brasileiro Série C na temporada seguinte.

Em caso de empate em pontos entre dois ou mais times, os critérios de desempate são aplicados nesta ordem: 1) Número de vitórias; 2) Saldo de gols; 3) Gols marcados; 4) Confronto direto (entre dois times); 5) Menor número de cartões vermelhos; 6) Menor número de cartões amarelos; e 7) sorteio.

As regras de suspensão por cartões são aplicadas da seguinte forma: quando o jogador acumula 3 cartões amarelos, ele cumpre automaticamente 1 jogo de suspensão, e após o cumprimento da suspensão, os cartões amarelos são zerados. Se o jogador é expulso ao receber o segundo cartão amarelo na mesma partida, ele cumpre 1 jogo de suspensão, e o número de cartões amarelos que ele tinha antes da partida permanece inalterado. No caso de expulsão por cartão vermelho direto, o jogador cumpre 1 jogo de suspensão automática, podendo ser estendida para 2 jogos, dependendo da gravidade da infração, sem alteração no número de cartões amarelos anteriores. Se o jogador já tiver 2 cartões amarelos antes da partida, receber mais 1 cartão amarelo e, em seguida, um cartão vermelho direto, ele cumpre 2 jogos de suspensão automática, podendo a punição ser estendida para 3 jogos, conforme a gravidade do cartão vermelho.'),
        ('Copa do Brasil', 5, 64, 'A definir.'),
        ('Supercopa do Brasil', 6, 2, 'A definir.');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.rule;
    `);
  }
}
