
class CognitiveService{
    
    constructor(){

        this.http = new HttpService();
    }

    detectarFace(file){
        return new Promise((resolve, reject) => {
            
            var params = {
                // Request parameters
                "returnFaceId": "true",
                "returnFaceLandmarks": "false",
                "returnFaceAttributes": "",
            };
            
            this.http.contentType = "application/octet-stream";
            this.http.serviceKey = "dc4fce08f91e4edba91acfb99c3aee38";

            this.http.post("https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params), file)
                    .then(dados => resolve(dados))
                    .catch(erro => reject('Não foi possível detectar o rosto.'));//fim this.http
        });
        /*return new Promise((resolve, reject) => {
            $.ajax({
                    url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
                    beforeSend: function(xhrObj){
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","dc4fce08f91e4edba91acfb99c3aee38");
                    },
                    type: "POST",
                    processData: false,
                    // Request body
                    data: file
                }).done(function(data) {
                    
                    resolve(data);                      

                }).fail(function(error) {

                    reject(error.getAllResponseHeaders());
                });
        });*/
  }

 verificarFace(faceId1, faceId2){
    
    return new Promise((resolve, reject) => {
        
        var params = {
            // Request parameters
        };
        
        this.http.contentType = "application/json";
        this.http.serviceKey = "dc4fce08f91e4edba91acfb99c3aee38";

        let dadosVerify = JSON.stringify(
                    {
                        faceId1: faceId1,
                        faceId2: faceId2
                    });

         this.http.post("https://api.projectoxford.ai/face/v1.0/verify", dadosVerify)
                .then(dados => resolve(dados))
                .catch(erro => reject('Não foi possível verificar os rostos.'));//fim this.http
    });
        /*return new Promise((resolve, reject) => { 
                            $.ajax({
                                    url: "https://api.projectoxford.ai/face/v1.0/verify?" + $.param(params),
                                    beforeSend: function(xhrObj){
                                        // Request headers
                                        xhrObj.setRequestHeader("Content-Type","application/json");
                                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","dc4fce08f91e4edba91acfb99c3aee38");
                                    },
                                    type: "POST",
                                    // Request body
                                    data: JSON.stringify(
                                    {
                                        faceId1: faceId1,
                                        faceId2: faceId2
                                    }),
                                }).done(function (data){

                                    resolve(data.isIdentical);                                            
                                }).fail(function(error){

                                    reject(error.getAllResponseHeaders())
                                 });
        });*/      
    }
}