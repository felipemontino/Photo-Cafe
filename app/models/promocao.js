module.exports = function(app){

    var promocao = function(){

        this.id = 0;
        this.nome = '';
        this.dataCriacao = new Date();
        this.idsPratos = [];
    }

    return promocao;
};