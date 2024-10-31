import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableManagerglobal1712076334930
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.managerglobal(name, birthdate, country_id) VALUES
        ('Artur Jorge', '1972-01-01', 160),
        ('Gabriel Milito', '1980-09-07', 11),
        ('Pedro Caixinha', '1970-10-15', 160),
        ('Cuca', '1963-06-07', 29),
        ('Rogério Ceni', '1973-01-22', 29),
        ('Eduardo Coudet', '1974-09-12', 11),
        ('Fernando Seabra', '1977-06-19', 29),
        ('Tite', '1961-05-25', 29),
        ('Renato Gaúcho', '1962-09-09', 29),
        ('Claudio Tencati', '1973-12-09', 29),
        ('Juan Pablo Vojvoda', '1975-05-13', 11),
        ('Abel Ferreira', '1978-12-22', 160),
        ('Roger Machado', '1975-04-25', 29),
        ('Luis Zubeldía', '1981-01-13', 11),
        ('António Oliveira', '1982-10-09', 160),
        ('Fernando Diniz', '1974-03-27', 29),
        ('Ramón Díaz', '1959-08-29', 11),
        ('Thiago Carpini', '1984-07-16', 29),
        ('Jair Ventura', '1979-03-14', 29),
        ('Petit', '1976-09-25', 74),
        ('Gilmar Dal Pozzo', '1969-09-01', 29),
        ('Fábio Carille', '1973-09-26', 29),
        ('Cauan de Almeida', '1989-02-08', 29),
        ('Rafael Guanaes', '1981-03-27', 29),
        ('Márcio Zanardi', '1978-07-11', 29),
        ('Márcio Fernandes', '1962-03-24', 29),
        ('Mariano Soso', '1981-04-30', 11),
        ('Fábio Matias', '1979-09-25', 29),
        ('Léo Condé', '1978-04-21', 29),
        ('Mozart Santos', '1979-11-08', 29),
        ('Eduardo Baptista', '1970-03-30', 29),
        ('Paulo Gomes', '1975-03-31', 160),
        ('Nelsinho Baptista', '1950-07-22', 29),
        ('Rafael Lacerda', '1984-06-12', 29),
        ('Hélio dos Anjos', '1958-03-07', 29),
        ('Umberto Louzer', '1980-02-24', 29),
        ('Daniel Paulista', '1982-05-05', 29),
        ('Luizinho Vieira', '1972-02-04', 29),
        ('Alberto Valentim', '1975-03-22', 29),
        ('Pintado', '1965-09-17', 29),
        ('Evaristo Piza', '1972-07-02', 29),
        ('Roger Silva', '1985-01-07', 29),
        ('Júnior Rocha', '1981-04-21', 29),
        ('Ricardo Catalá', '1982-04-28', 29),
        ('Rogério Corrêa', '1981-03-27', 29),
        ('Thiago Carvalho', '1988-06-24', 29),
        ('Claudinei Oliveira', '1969-09-29', 29), 
        ('Rodrigo Santana', '1982-05-29', 29),
        ('Marquinhos Santos', '1979-05-24', 29),
        ('José Alberto Trajano', '1984-10-06', 29), 
        ('João Burse', '1982-06-10', 29),
        ('Marcelo Chamusca', '1966-10-07', 29),
        ('Mazola Júnior', '1965-02-28', 29),
        ('Roberto Fonseca', '1962-06-03', 29),
        ('Argel Fuchs', '1974-09-04', 29),
        ('Marcelo Cabo', '1966-11-06', 29),
        ('Felipe Surian', '1981-10-03', 29),
        ('Emerson Ávila', '1967-07-16', 29),
        ('Paulinho Kobayashi', '1970-01-09', 29),
        ('Sérgio Guedes', '1962-11-07', 29),
        ('Dico Woolley', '1982-01-03', 29),
        ('Renatinho Potiguar', '1982-11-19', 29),
        ('Flávio Araújo', '1963-01-30', 29),
        ('Roberto Cavalo', '1963-04-13', 29),
        ('Luís Carlos Winck', '1963-01-05', 29),
        ('Jorge Castilho', '1982-04-06', 29),
        ('Felipe Conceição', '1979-07-09', 29),
        ('Waldemar Lemos', '1954-06-05', 29);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.managerglobal;
    `);
  }
}
