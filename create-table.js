import { sql } from './db.js'

sql`
  CREATE TABLE filme (
      id text PRIMARY KEY,
      nome character varying(255),
      diretor character varying(255),
      genero character varying(255),
      classificacao character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})