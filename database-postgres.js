import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listfilme() {
    const filme = await sql`select * from filme`;
    return filme;
  }

  async createfilme(filme) {
    const id = randomUUID();
    console.log('id', id);
    const nome = filme.nome;
    const diretor = filme.diretor;
    const genero = filme.genero;
    const classificacao = filme.classificacao;
    
    await sql`insert into filme (id, nome, diretor, genero, classificacao)
    values (${id}, ${nome}, ${diretor}, ${genero}, ${classificacao})`
  }

  async updatefilme(id, filme) {
    const nome = filme.nome;
    const autor = filme.diretor;
    const genero = filme.genero;
    const classificacao = filme.classificacao;

    await sql`update filme set 
        nome = ${nome},
        autor = ${diretor},
        genero = ${genero},
        classificacao = ${classificacao}
        where id = ${id}
    `;
  }

  async deletefilme(id) {
    await sql`delete from filme where id = ${id}`
  }

}