import UI_ELEMENTS from "./uiElements.mjs";
import ComunicatiomManager from "./comunicationManager.mjs";
import API_ENDPOINTS from "./apiEndpoints.mjs";

class CesarChipherApp{

    static #instance;
    #msg;
    #shiftValue;
    #secretId;

    constructor(){
        if(!CesarChipherApp.#instance){
            CesarChipherApp.#instance = this;
        }
        
        return CesarChipherApp.#instance
    }

    static get instance() {
        return new CesarChipherApp();
    }

    set message(msg){
        this.#msg = msg
        console.log("Message is set to ", msg);
    }

    set shift(shiftValue){
        this.#shiftValue = shiftValue;
        console.log("Shift value set to ", this.shiftValue)
    }

    set secretId(id){
        this.#secretId = id;
        console.log("Secret id is set to", id);
    }

    async submit(){
       await  ComunicatiomManager.send(`${API_ENDPOINTS.base}${API_ENDPOINTS.encrypt.endpoint}`, {msg:this.#msg, shift:this.#shiftValue})
    }

    async decrypt(){
        await ComunicatiomManager.send(`${API_ENDPOINTS.base}${API_ENDPOINTS.decrypt.endpoint}/${this.#secretId}`, { shift:this.#shiftValue})
    }

}

const app = new CesarChipherApp();

async function onUserSubmission (e) {
    CesarChipherApp.instance.message = document.getElementById(UI_ELEMENTS.contentElementId).value;
    CesarChipherApp.instance.shift = document.getElementById(UI_ELEMENTS.shiftElementId).value;
    await CesarChipherApp.instance.submit();
}
document.getElementById(UI_ELEMENTS.submitButtonElementId).onclick = onUserSubmission;

document.getElementById(UI_ELEMENTS.decryptButtonElementId).onclick = async (e)=>{
    CesarChipherApp.instance.shift = document.getElementById(UI_ELEMENTS.shiftElementId).value;
    CesarChipherApp.instance.secretId = document.getElementById(UI_ELEMENTS.secreteElementId).value;
    await CesarChipherApp.instance.decrypt()

};

