
module.exports = function(app){

    var menu = function(){

        this.id = 0;
        this.nome = '';
        this.dataCriacao = new Date();
    }

    return menu;
};