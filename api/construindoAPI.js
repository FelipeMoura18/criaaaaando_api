const http = require('http')

const url = require('url');

let pedidos = [{
    id: 1,
    cliente: "felipe Moura",
    produto: "luva de mma",
    status: "pendente"
}]

const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/JSON');
    const urlCompleta = url.parse(req.url, true);

    const rota = urlCompleta.pathname;
    const metodo = req.method;
    //liberação do cors 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", " Content-Type");
    if (metodo === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }

    //  res.end(JSON.stringify({
    //  rota: rota,
    // metodo: metodo
    //  }));

    if (rota === "/pedidos" && metodo === "GET") {
        res.end(JSON.stringify({
            mensagem: 'lista de pedidos',
            dados: pedidos
        }));
        return;
    };

    if (rota === "/pedidos" && metodo === "POST") {
        let body = ' ';
        req.on('data', parte => {
            body += parte;
        });

        req.on('end', () => {
            const novoPedido = JSON.parse(body);

            pedidos.push(novoPedido);

            res.statusCode = 201;

            res.end(JSON.stringify({
                mensagem: "pedido registrado",
                pedido: novoPedido
            }));
        });
        return;
    };

    //metodo put


    if (rota === "/pedidos" && metodo === "PUT") {
        let body = '';
        req.on('data', parte => {
            body += parte;
        });

        req.on('end', () => {
            const dados = JSON.parse(body);

            let encontrado = false;

            pedidos = pedidos.map(pedido => {
                if (pedido.id === dados.id) {
                    encontrado = true;
                    return {
                        ...pedido,
                        status: dados.status
                    };

                };
                return pedido;
            });

            if (!encontrado) {
                res.statusCode = 404;
                res.end(JSON.stringify({
                    mensagem: "pedido nao encontradp"
                }));
            };
            res.end(JSON.stringify({
                mensagem: "pedido atualizado com suacesso",
                dados: pedidos
            }));

        });
        return;
    };

    // Criação do método DELETE
    if (rota === "/pedidos" && metodo === "DELETE") {
        let body = ''; // variável que armazena os pedaços da requisição
        // ação que será disparada com a requisição para armazenar as partes da requisição dentro da variável body
        req.on('data', parte => {
            body += parte;
        });

        req.on('end', () => {
            // dados receberá o body traduzido para objeto em JavaScript
            const dados = JSON.parse(body);

            // Medirá o tamanho do array antes de o deletar-mos
            const tamanhoAntes = pedidos.length;

            // Manterá todos os pedidos que NÃO tem o id informado e removerá os que tem o ID igual ao enviado pela requisição.
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id);

            // Fará a comparação de tamanho do array, se os tamanhos estiverem identidos, o pedido não foi localizado para que seja apagado.
            if (pedidos.length === tamanhoAntes) {
                res.statusCode = 404;
                res.end(JSON.stringify({ mensagem: "Pedido não encontrado" }));
                return;
            };

            // Reposta final que exibe o pedido removido com sucesso e exibe o array atualizado
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }));
        });
        return;
    };







    res.statusCode = 404;
    res.end(JSON.stringify({
        mensagem: 'página não encontrada'
    }));

});
//definição da porta onde o servidor rodará
const PORT= process.env.PORT ||3000;

server.listen(PORT, () => {
    console.log('Servidor Rodando na porta ${PORT}');
});

