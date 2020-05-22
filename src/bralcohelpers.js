import axios from 'axios'
import Swal from 'sweetalert2'
import stored from './stores'
 

const BralcoHelpers = () => {};

BralcoHelpers.install = function (Vue) {

    Vue.prototype.bralcoaxios = function ({ request: method, url, form: data, }) {
        var payload = {
            method,
            url,
            data,
            contentType: false, 
            cache: false,
        };
        
        if( !stored.state.app.loader ){
            stored.state.app.loader = true;
        }

        if( stored.state.app.auth.isAuthenticated ){

            payload.headers = {
                Accept: "application/json", 
                Authorization: stored.state.app.auth.token_type + ' ' + stored.state.app.auth.access_token 
            }

        }
        return axios(payload).then( (response) => { return response; }).catch( (error) => { return error.response; });

    }

    Vue.prototype.bralcoresponse = function (response) {

        stored.state.app.loader = false;

        let data               = response.data;
        var response_container = {t:"error",h:response.statusText};

        switch( response.status ){
            case 200:
                return stored.state.app.response = response.data;
            case 201:
                switch( this.$route.name ){
                    case "auth":
                        localStorage.setItem('access_token',response.data.data.access_token);
                        localStorage.setItem('token_type',response.data.data.type);
                        localStorage.setItem('expires_in',response.data.data.expires_at);
                        Vue.prototype.bralcoswal({t:"success",m:response.data.m,h:response.data.h});
                    break;
                    default:
                        Vue.prototype.bralcoswal({t:"success",m:response.data.m,h:response.data.h});
                }
            break;
            case 204:
                window.location.reload();
            break;
            case 401:
                switch(this.$route.name){
                    case "auth":
                        response_container.m = data.m;
                        return Vue.prototype.bralcoswal(response_container);
                    default:
                        console.log("here");
                        window.localStorage.clear();
                        window.location.reload();
                }
            break;
            case 402:
                return response.data;
            case 403:
                return response.data;
            case 404:
                return response.data;
            case 405:
                return response.data;
            case 409:
                return response.data;
            case 422:
                var array            = toArray(data.errors);
                var string           = arrayToString(array);
                response_container.m = string;

                Vue.prototype.bralcoswal(response_container);
            break;
        }

    }


    Vue.prototype.extractor = function(el) {
        if( el.attributes["data-form"] || el.attributes["data-form-values"]) {
            var form = el.attributes["data-form"].value.split('|');
            var form_values = el.attributes["data-form-values"].value.split('|');

            var request = { form:{} };

            for(var v in form){
                var form_data = form[v].split(':-');
                request[form_data[0]] = form_data[1];
            }

            for(var d in form_values){
                var form_value = form_values[d].split(':-');
                request.form[form_value[0]] = form_value[1];
            }

            return request;
        }

    }

    Vue.prototype.bralcoswal = function (d){

        switch(d.t){
            case 'error':
                Swal.fire({ title: d.h, text: d.m ,icon: d.t }).then((result) => {
                    return result;
                }); 
            break;
            case 'success':
                Swal.fire({ title: d.h, text: d.m ,icon: d.t }).then((v) => {
                    if(v) {
                        if(d.url){
                            window.location.href = d.url;
                        } else {
                            window.location.reload();
                        }
                    }
                }); 
            break;
            case 'confirm': 
                return Swal.fire({ title: d.h, text: d.m ,icon: "info", buttons: true, showCancelButton: d.b.cancelButton != undefined ? d.b.cancelButton : false  });
            case 'warning':
                return Swal.fire({ title: d.h, text: d.m ,icon: d.t }).then((result) => {
                    return result;
                }); 
            default:
                Swal.fire({ title: d.h, text: d.m ,icon: "success" }).then(() => {
                    window.location.reload();
                }); 
        }       
    }

    Vue.prototype.dataURItoBlob = (dataURI) => {
        var byteString, 
            mimestring 
    
        if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
            byteString = atob(dataURI.split(',')[1])
        } else {
            byteString = decodeURI(dataURI.split(',')[1])
        }
    
        mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]
    
        var content = new Array();
        for (var i = 0; i < byteString.length; i++) {
            content[i] = byteString.charCodeAt(i)
        }
    
        return new Blob([new Uint8Array(content)], {type: mimestring});
    }

};

function toArray(obj) {        
        var result = Object.keys(obj).map(function(key) {
           return [String(key), obj[key]];
        });

        return result;
}

function arrayToString(array) {
    
    var data = [];
    
    array.forEach(function (value){
                    
            if(value.constructor.name == "Array") {
                value.forEach(function (item){
                    if(item.constructor.name == "Array") {
                            data.push(item);
                    }
                });
            }

    });

    return data.join();
}



export default BralcoHelpers;