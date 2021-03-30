"use strict";
//@ts-check 
// data-muuttuja on lähes sama kuin viikkotehtävässä 1.
//käytetty 6h

console.log(data);

window.onload = function() {


tulostaJoukkueet();
rastiLomake();
joukkueLomake();

function tulostaJoukkueet() {

    let uusi = [];

    for(var i = 0; i < data.joukkueet.length; i++) {
       
        uusi.push(data.joukkueet[i]);
        //uusi.sort(compareFunction);  //Taso1

        uusi[i].pisteet = laskePisteet(data, uusi[i]); //Taso3
        uusi.sort(compareFunction3);  //Taso3

    }


    let div = document.getElementById("tupa");

    let taulukko = document.getElementsByTagName("table")[0]; //taso3
    let otsikot = document.getElementsByTagName("tr")[0];  
    let uusiOtsikko = document.createElement("th"); 
    uusiOtsikko.textContent = "Pisteet"; 
    otsikot.appendChild(uusiOtsikko); //taso 3


    for(let i of uusi) {

        let table = div.getElementsByTagName("table")[0];
        let newRow = table.insertRow(-1);
        let newCell = newRow.insertCell(-1);
        let newText = document.createTextNode(sarjanNimi(i.sarja));
        newCell.appendChild(newText);

        //taso 3
        let linkki = document.createElement('a'); 
        let newCell2 = newRow.insertCell(-1); 
        let newCell3 = newRow.insertCell(-1);
        //let newText3 = document.createTextNode(i.nimi); //taso1
        linkki.setAttribute("href", "#joukkue");
        newCell2.appendChild(linkki);     
        linkki.textContent = i.nimi;  
    
        let br = document.createElement("br")
        let jasenet = "";
        let eka = true;

        for(let jasen of i.jasenet ) {

            if (eka == true) {
                jasenet = jasen;
                eka = false;

            }

            else jasenet = jasenet + ", " + jasen;

        }

        let k = document.createTextNode(jasenet);
        newCell2.appendChild(k);
        
        
        //newCell2.appendChild(newText3);  //taso1d


        let newText4 = document.createTextNode(i.pisteet);
        newCell3.appendChild(newText4);

        newCell2.insertBefore(br, k);

      

    }
    
    }  

/**
 * Comparefunktio sarjan ja nimen perusteella järjestämiseen (Taso1)
 * @param {Object} a verrattava
 * @param {Object} b toinen verrattava
 */
function compareFunction(a, b) {

    var eka = sarjanNimi(a.sarja); 
    var toka = sarjanNimi(b.sarja); 

    

    if (eka == toka) {

        eka = a.nimi.toUpperCase();
        toka = b.nimi.toUpperCase();
    }
  
    if (eka < toka) {
      return -1;
    }
      
    if (eka > toka) {
      return 1;
    }
      return 0;
}


/**
 * Kopioitu viikkotehtävä 1:stä
 * Lasketaan joukkueen rasteista saamat pisteet LAHTO- ja MAALI- rastien välillä
 * @param {Object} data 
 * @param {Object} joukkue 
 */
function laskePisteet(data, joukkue) {

    let summa = 0;
    let leimatut = [];
    let lahdettu = false;
    let koodi = "";
  
    for(let rasti of joukkue.rastit) {
      let piste = 0;
      let voiko = true;
      
  

      if ((rasti.rasti != undefined)) {
  

        for(let rast of data.rastit) {

            if (rasti.rasti == rast.id) {

                koodi = rast.koodi;
            }

        }

        for(let leimattu of leimatut) {
  

          if (koodi == leimattu) {
            voiko = false;
          }
        } 
  
        if (koodi == "LAHTO")  {
          
          lahdettu = true;
          summa = 0;
  
        }
        if (koodi == "MAALI") {
          
          lahdettu = false;
        }
  
        if((koodi != "") && (voiko == true) && (lahdettu == true)) {
  
          if (parseInt(koodi.charAt(0)) % 1 == 0) {
  
            piste = koodi.charAt(0);
            summa = summa + parseInt(piste);
            leimatut.push(koodi);
          }
        }
      }
      }
  
    return summa;
  }
  


/**
 * Comparefunktio sarjan ja pisteiden perusteella järjestämiseen (Taso1)
 * @param {Object} a verrattava
 * @param {Object} b toinen verrattava
 */
function compareFunction3(a, b) {

    var eka = sarjanNimi(a.sarja); 
    var toka = sarjanNimi(b.sarja); 

    

    if (eka == toka) {

        eka = b.pisteet;
        toka = a.pisteet;
    }
  
    if (eka < toka) {
      return -1;
    }
      
    if (eka > toka) {
      return 1;
    }
      return 0;
}


function sarjanNimi(sarja) {

    let nimi = "";
    for(let s of data.sarjat) {

        if (s.id == sarja) {
            
            nimi = s.nimi;
            break;
        }
    }

    return nimi;
}


function rastiLomake() {


    let rastiLomake = document.getElementsByTagName("form")[0];


    let fieldset = document.createElement("fieldset");
    rastiLomake.appendChild(fieldset);
    let tiedot = document.createElement("legend");
    let kentta1 = document.createElement("label");
    let kentta2 = document.createElement("label");
    let kentta3 = document.createElement("label");
    let button = document.createElement("button");

    let lat = document.createElement("span");
    let lon = document.createElement("span");
    let koodi = document.createElement("span");
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    let input3 = document.createElement("input");

    input1.setAttribute("type", "text");
    input1.setAttribute("value", "");
    input2.setAttribute("type", "text");
    input2.setAttribute("value", "");
    input3.setAttribute("type", "text");
    input3.setAttribute("value", "");
    
    tiedot.textContent = "Rastin tiedot";
    lat.textContent = "Lat";
    lon.textContent = "Lon";
    koodi.textContent = "Koodi";

    button.id = "rasti";
    button.textContent = "Lisää rasti";

    fieldset.appendChild(tiedot);
    fieldset.appendChild(kentta1);
    fieldset.appendChild(kentta2);
    fieldset.appendChild(kentta3);
    fieldset.appendChild(button);

    
     
    kentta1.appendChild(lat);
    kentta1.appendChild(input1);
    kentta2.appendChild(lon);
    kentta2.appendChild(input2);
    kentta3.appendChild(koodi);
    kentta3.appendChild(input3);

    button.addEventListener("click", luoLomake);


    function luoLomake(e) {
        e.preventDefault();
        lisaaRasti(input1.value, input2.value, input3.value);
        tulostaRastit();
        input1.value = "";
        input2.value = "";
        input3.value = "";
    }


    }


    function lisaaRasti(lat, lon, koodi ) {

        let latF = parseFloat(lat);
        let lonF = parseFloat(lon); 


        /////LISÄÄ TESTIT ONKO LIUKULUKU
    
        if (Number(latF) === latF && latF % 1 !== 0 && Number(lonF) === lonF && lonF % 1 !== 0 && koodi.length > 0) {
                let rasti = {
                    "lon" : lon,
                    "koodi": koodi,
                    "lat": lat,

                };

                rasti.id = rastilleId();
                data.rastit.push(rasti);

            }
        }


    function rastilleId() {

        let suurin = 0;

        for(let rasti of data.rastit ) {

            if (rasti.id > suurin) {
                suurin = rasti.id
            }
        }

        let uusiId = suurin + 1;

        return uusiId;


    }

    function tulostaRastit() {

        let rastitT = data.rastit;
        rastitT.sort(compareFunction2);

        console.log("Rasti    Lat          Lon");

        for(let rasti of rastitT) {

            console.log(rasti.koodi + "       " + rasti.lat + "    " + rasti.lon);
        }

    }


    /**
 * Comparefunktio nimen perusteella järjestämiseen
 * @param {Object} a verrattava
 * @param {Object} b toinen verrattava
 */
function compareFunction2(a, b) {

    var eka = a.koodi; 
    var toka = b.koodi; 

    if (eka == toka) {

        eka = a.nimi.toUpperCase();
        toka = b.nimi.toUpperCase();
    }
  
    if (eka < toka) {
      return -1;
    }
      
    if (eka > toka) {
      return 1;
    }
      return 0;
}


function joukkueLomake(joukkue) {

  let joukkuelomake = document.getElementById("joukkuelomake");
  let fieldset = joukkuelomake.getElementsByTagName("fieldset")[0];
  let puu = fieldset.getElementsByTagName("p")[1];
  let fieldset2 = document.createElement("fieldset");
  let otsikko = document.createElement("legend");
  otsikko.textContent = "Jäsenet";
  fieldset2.appendChild(otsikko);
  fieldset.insertBefore(fieldset2, puu);
  

}
    
}

    