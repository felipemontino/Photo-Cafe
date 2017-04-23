

module.exports = function (app){

    var api = app.api.pedido;

	app.route('/api/pedidos')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/api/pedidos/:id')
		.get(api.buscaPorId)
		.delete(api.removePorId)
		.put(api.atualiza);
}