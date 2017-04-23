module.exports = function(app){

    var produto = function(){

        this.id = 0;
        this.nome = '';
        this.dataCriacao = new Date();
        this.quantidadeTotal = 0;
    }

    return produto;
};