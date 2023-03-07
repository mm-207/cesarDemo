const UI_ELEMENTS = {
    contentElementId : "content",
    shiftElementId : "shift",
    submitButtonElementId : "submitBT"
}



class CesarChipherApp{

    constructor(){
        this.message;
    }

    set message(msg){
        this.message = msg
    }

}


new CesarChipherApp();

function onUserSubmission (e) {
    console.log("YEs virkar");
}

document.getElementById(UI_ELEMENTS.submitButtonElementId).onclick = onUserSubmission;



