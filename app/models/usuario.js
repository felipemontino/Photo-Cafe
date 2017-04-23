module.exports = function(app){

    var usuario = function(){

        this.id = 0;
        this.nome = '';
        this.dataCriacao = new Date();
        this.faceId = '';
    }

    return usuario;
};