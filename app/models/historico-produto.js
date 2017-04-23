
module.exports = function(app){

    var historicoProduto = function(){

        this.id = 0;
        this.idHistorico = 0;
        this.preco = 0;
        this.quantidade = 0;
        this.dataCriacao = new Date();
    }

    return historicoProduto;
};