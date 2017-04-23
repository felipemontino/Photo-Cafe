class HttpService {

    constructor(){
        this.contentType = '';
        this.serviceKey = '';
    }

    get(url) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            
            xhr.open('GET', url);

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)); //apenas o JSON!
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }  
                }
            }

            xhr.send();
        });           
    }

    post(url, dados){
        
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            
            xhr.open('Post', url);

            if(this.contentType){
                xhr.setRequestHeader("Content-Type", this.contentType);
            }

            if(this.serviceKey){
                xhr.setRequestHeader("Ocp-Apim-Subscription-Key", this.serviceKey);
            }

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)); //apenas o JSON!
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }  
                }
            }

            xhr.send(dados);
        });
    }
}