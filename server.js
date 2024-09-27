
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
// post vai colocar os dados do local escrito no servidor
// async informa que a função vai demorar para retornar o que for pedido (promise)
server.post('/filme', async (request, reply) => {
    // const cria uma variável que o valor é fixo e o request pede um requisito, no caso o body
    // body recebe um json
    const body = request.body;
    // await faz a execução de uma função async pausar, para esperar pelo retorno da promise
    // o body ta sendo criado na constante databasePostgres 
    await databasePostgres.createfilme(body);
    // codigo 201 para confirmar que foi criado com sucesso
    return reply.status(201).send();
})

// READE
// o get vai pegar os dados do local inserido
server.get('/filme', async () => {
    // a constante filme espera o retorno da promise pra receber a lista dos filme
    const filme = await databasePostgres.listfilme();
    // return retorna a execução da função (async) e envia o valor de volta, nesse caso a lista
    return filme;
});

// UPDATE
// o comando put vai estar atualizando os dados do local inserido
server.put('/filme/:id', async (request, reply) => {
    // uma constante pedindo o id parametro do filme
    const filmeID = request.params.id;
    const body = request.body;
    // as constantes sao chamadas e atualizadas com a função do update
    await databasePostgres.updatefilme(filmeID, body);
    // codigo 204 significa que a solicitação deu certo
    return reply.status(204).send();
})

// DELETE
// o comando delete vai deletar os dados do local inserido
server.delete('/filme/:id', async (request, reply) => {
    // params vai pegar o que vier depois da barra filme
    const filmeID = request.params.id;
    // a informação é deletada de acordo com o id informado
    await databasePostgres.deletefilme(filmeID);

    return reply.status(204).send();
})


server.listen({
    port: 3333
});
