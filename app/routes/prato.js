

module.exports = function (app){

    var api = app.api.prato;

	app.route('/api/pratos')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/api/pratos/:id')
		.get(api.buscaPorId)
		.delete(api.removePorId)
		.put(api.atualiza);
}