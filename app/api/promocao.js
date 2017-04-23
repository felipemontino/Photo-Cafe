

module.exports = function (app){

    var api = app.api.promocao;

	app.route('/api/promocoes')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/api/promocoes/:id')
		.get(api.buscaPorId)
		.delete(api.removePorId)
		.put(api.atualiza);
}