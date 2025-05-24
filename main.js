var koneksyonKatawan = document.getElementById("koneksyon-katawan");

var ipasa = document.getElementById("ipasa");

var notif = document.getElementById("notif");
var notifText = document.getElementById("notif-text");

var sagot = document.getElementById("sagot");
var koneksyon = document.getElementById("koneksyon");
var template = document.getElementsByTagName("template")[0];
var ibahagi = template.content.getElementById("ibahagi");

var selections = koneksyonKatawan.getElementsByTagName("div");
var selected = [];
var group_count = [0,0,0,0];
var found_count = 0;

var naiintindihan = document.getElementById("naiintindihan");
var modalBackground = document.getElementById("modal-background");
var modal = document.getElementById("modal");
var paano = document.getElementById("paano");

var textToShare = "Konektado\nhttps://judepadillx.github.io/konektado/";

function shuffle() {
}

for (let i = 0; i < selections.length; i++) {
    const element = selections[i];
    
    element.onclick = () => {
        if (element.classList.contains("select")) {
            element.classList.remove("select");
            
            const index = selected.indexOf(element);
            if (index > -1) selected.splice(index, 1); 
            
            if (selected.length < 4) ipasa.disabled = true;
            
        } else if (selected.length != 4) {
            element.classList.add("select");
            selected.push(element);
            
            if (selected.length == 4) ipasa.disabled = false;
        } else {
            notify("May napili nang apat");
        }
    }
    
    element.onmouseenter = () => {
        if (selected.length == 4 && selected.indexOf(element) == -1) return;
        
        element.style.boxShadow = "rgba(254, 254, 252, 0.025) 0px 1px 1px 0px inset, rgba(254, 254, 252, 0.0625) 0px 50px 100px -20px, rgba(254, 254, 252, 0.075) 0px 30px 60px -30px";
        // element.style.scale = "1.05";
        element.style.cursor = "pointer";
    }
    
    element.onmouseleave = () => {        
        element.style.boxShadow = "none";
        // element.style.scale = "1";
        element.style.cursor = "default";
    }
}

ipasa.onclick = () => {
    checkGroup();
}

function show_group(i) {
    sagot.classList.add("show_sagot");
    
    const grupo = template.content.getElementById("grupo" + i);
    const bago = sagot.appendChild(grupo.cloneNode(true));
    
    for (let i = 0; i < 4; i++) {
        selected[0].classList.add("hide");
        selected.splice(0, 1); 
    }
    
    deselectAll();
    ipasa.disabled = true;
    
    found_count++;
    if (found_count == 4){
        koneksyon.style.display = "none";
        sagot.appendChild(ibahagi).onclick = () => share();
    }
    
    bago.scrollIntoView();
}

function checkGroup() {
    for (let i = 0; i < 4; i++) { 
        group_count[i] = 0;      
    }
    
    if (textToShare.length != 0) textToShare += "\n";
    
    // Count Group
    for (let i = 0; i < 4; i++) {
        const curr_group = Number(selected[i].getAttribute("data-group"));
        
        group_count[curr_group-1] += 1;
        
        switch (curr_group) {
            case 1:
                textToShare = textToShare + "🟨"
                break;
            case 2:
                textToShare += "🟩"
                break;
            case 3:
                textToShare += "🟦"
                break;
            case 4:
                textToShare += "🟪"
                break;            
        } 
    }
        
    // Check if group or not
    for (let i = 0; i < 4; i++) {        
        if (group_count[i] == 4) {
            show_group(i+1);
            return;
        }
        else if (group_count[i] == 3) {
            notify("May maling isa")
            return;
        } 
    }
    
    shakeAll();
}

function deselectAll() {
    for (let i = 0; i < selections.length; i++) {
        const element = selections[i];
    
        if (!element.classList.contains("select")) continue;
        
        element.classList.remove("select");
        selected.pop(selected.indexOf(element));
    }
}

function shakeAll() {
    for (let i = 0; i < 4; i++) {
        const element = selected[i];
            
        element.classList.add("shake");
        
        setTimeout(() => {
            element.classList.remove("shake");
        }, 500);
    }
}

function select(div) {
    div.classList.add("select");
}

function notify(text) {
    notifText.innerHTML = text;
    notif.style.marginTop = '2rem';
            
    setTimeout(() => {
        notif.style.marginTop = '-2rem';
    }, 1000);
}

function share() {
    navigator.clipboard.writeText(textToShare);
    notify("Na-save na sa clipboard");
}

naiintindihan.onclick = () => {
    modal.style.scale = 0;
    modalBackground.style.opacity = 0;
    
    setTimeout(() => {
        modalBackground.style.display = "none";
    }, 250);
}

paano.onclick = () => {
    modalBackground.style.display = "flex";
    modalBackground.style.opacity = 1;
    
    setTimeout(() => {
        modal.style.scale = 1;
    }, 1);
}
