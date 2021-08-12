"use strict";
//@ts-check 

window.onload = function() {
palkit();
pingviinit();
pollo();
};


/**
 * Tehdään 10kpl palkkeja
 */
function palkit() {

    let svg = document.getElementsByTagName("svg")[0];
    let x = 0;

    
    for(let i = 0; i < 10; i++) {

    
        let palkki = document.createElementNS("http://www.w3.org/2000/svg","rect");
        svg.appendChild(palkki);
        palkki.setAttribute("width", "10%");
        palkki.setAttribute("height", "100%");
        palkki.setAttribute("x", "-60%");
        palkki.style.animationDelay= x + "s";
        x = x+0.2;

    }
}


/**
 * Pingviinien leveys
 */
function pingviinit() {

    let pigviinit = document.getElementsByTagName("image");

    for(let pigviini of pigviinit) {

        pigviini.style.height = "10px";
    }
}


/**
 * Tehdään pöllöt
 */
function pollo() {

    let kuva = new Image();
    kuva.src = "http://appro.mit.jyu.fi/tiea2120/vt/vt4/owl.png";
    kuva.alt = "pöllö";
    kuva.style.backgroundColor =  "transparent";

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    
    kuva.addEventListener('load', e => {
    ctx.drawImage(kuva, 0, 0, kuva.width/2, kuva.height, 0, 0, kuva.width/2, kuva.height/2);

    });

    const canvas2 = document.getElementById("canvas2");
    const ctx2 = canvas2.getContext('2d');

    kuva.addEventListener('load', e => {
    ctx2.drawImage(kuva, kuva.width/2, 0, kuva.width/2, kuva.height, 0, 0, kuva.width/2, kuva.height/2);

    });

    const canvas3 = document.getElementById("canvas3");
    const ctx3 = canvas3.getContext('2d');

    kuva.addEventListener('load', e => {
    ctx3.drawImage(kuva, 0, kuva.height/2, kuva.width/2, kuva.height, 0, 0, kuva.width/2, kuva.height/2);

    });

    const canvas4 = document.getElementById("canvas4");
    const ctx4 = canvas4.getContext('2d');

    kuva.addEventListener('load', e => {
    ctx4.drawImage(kuva, kuva.width/2, kuva.height/2, kuva.width/2, kuva.height, 0, 0, kuva.width/2, kuva.height/2);

    canvas4.style.height = kuva.height/2;
    canvas4.style.width = kuva.width/2;

    });
}


