class PhotoController{

    constructor(){

        this.canvas = document.getElementById('canvasSnap');
        this.context = this.canvas.getContext('2d');
        this.video = document.getElementById('videoSnap');
        this.photos = new ListaPhotos();

        this._iniciarMediaDevices();

        this.cognitiveService = new CognitiveService();
    }

    _iniciarMediaDevices(){

        let scope = this;
        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                scope.video.src = window.URL.createObjectURL(stream);
                scope.video.play();
            });
        }
        //Legacy code below: getUserMedia 
        else if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia({ video: true }, function(stream) {
                scope.video.src = stream;
                scope.video.play();
            }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia({ video: true }, function(stream){
                scope.video.src = window.webkitURL.createObjectURL(stream);
                scope.video.play();
            }, errBack);
        } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
            navigator.mozGetUserMedia({ video: true }, function(stream){
                scope.video.src = window.URL.createObjectURL(stream);
                scope.video.play();
            }, errBack);
        }
    }

    capturarPhoto(e){

        var url = this.canvas.toDataURL();
        
        var img = new Image;
        //img.src = URL.createObjectURL(e.target.files[0]);
        img.onload = function() {        
            
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;

            //context.drawImage(video, 0,0);
        }

        this.context.drawImage(this.video, 0,0);

        let base64File = this.canvas.toDataURL("image/png");

        var blob = this._dataURItoBlob(base64File);

        let scope = this;
        this.cognitiveService.detectarFace(blob)
            .then(data => {

                if(data && data.length){
                    let photo = new Photo(data[0].faceId);               

                    scope.verificarLogin(photo);
                }  else {
                    alert('Tente tirar a foto novamente, a iluminação pode estar ruim para a foto.');
                }  
            })
            .catch(erro => { 
                alert(erro);
            });       
    }

    _dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
        {
            byteString = atob(dataURI.split(',')[1]);
        }
        else
        {
            byteString = unescape(dataURI.split(',')[1]);
        }

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    verificarLogin(photo){

        let clienteAntigo = false;
        let scope = this;
        let requisicoesVerificacao = [];

        for(let i = 0; i < scope.photos.count(); i++){

            let photoAtualFor = scope.photos.getElementAt(i);

            requisicoesVerificacao.push(scope.cognitiveService.verificarFace(photo.faceId, photoAtualFor.faceId));
                /*.then(function (isClienteAntigo){

                    
                })
                .then(function (error){ 
                    alert(error);
                });*/            
        }       

        Promise.all(requisicoesVerificacao)
        .then(dados => {

            if(dados)
            {
                dados.forEach(function(element) {

                    if(element.isIdentical)
                    {
                        clienteAntigo = element.isIdentical;        
                        return;
                    }

                }, this);

                if(clienteAntigo)
                {
                    alert('Cliente antigo');
                }
                else
                {
                    alert('Cliente novo');    
                }
            } else {
                alert('Cliente novo');
            } 

            scope.photos.adicionar(photo); 
        })
        .catch(erro => console.log(erro));                
    }
}