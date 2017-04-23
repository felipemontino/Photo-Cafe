module.exports = function(app){

    var pedido = function(){

        this.id = 0;
        this.nome = '';
        this.dataCriacao = new Date();
        this.pratos = [];
    }

    return pedido;
};