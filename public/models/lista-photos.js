class ListaPhotos{

    constructor(){
        this.photos = [];
    }

    adicionar(photo){
        this.photos.push(photo);
    }
    
    count(){
        return this.photos.length;
    }

    getElementAt(i){
        return this.photos[i];
    }
}