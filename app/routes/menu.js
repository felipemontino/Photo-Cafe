

module.exports = function (app){

    var api = app.api.menu;

	app.route('/api/menus')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/api/menus/:id')
		.get(api.buscaPorId)
		.delete(api.removePorId)
		.put(api.atualiza);

    app.route('/api/menuAssociarPrato/:id/:idPrato')
       .post(api.associarPrato)
       .delete(api.desassociarPrato);
}