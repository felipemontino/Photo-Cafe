module.exports = function(app){

    var api = app.api.produto;

    app.route('/api/produtos')
       .get(api.lista)
       .post(api.adiconar);

    app.route('/api/produtos/:id')
       .get(api.buscaPorId)       
       .delete(api.removePorId)
       .put(api.atualiza);             

    app.route('/api/historicoProdutos/:id')
       .get(api.listaHistorico)
       .post(api.adicionaHistorico)
       .delete(api.removeHistoricoPorId)
       .put(api.atualizaHistorico);
}