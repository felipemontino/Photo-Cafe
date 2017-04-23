module.exports = function(app){

    var prato = function(){

        this.id = 0;
        this.nome = '';
        this.dataCriacao = new Date();
        this.valor = 0;
    }

    return prato;
};