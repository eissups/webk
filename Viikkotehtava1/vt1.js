"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen leimaamat rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin
// voit vapaasti luoda data-rakenteen pohjalta omia aputietorakenteita

console.log(data);

console.dir(data);

let joukkue = {
    "nimi" : "Mallijoukkue",
    "jasenet": [0,2],
    "rastit": [],
    "sarja": undefined,
    "id": 99999
}; 

let sarja = "8h";

    lisaaJoukkue(data, joukkue, sarja);
    muutaSarjanNimi(data, "8h", "10h");
    tulostaJoukkueet(data);
    tulostaRastit(data);
    poistaJoukkue(data, "Vara 1");
    poistaJoukkue(data, "Vara 2");
    poistaJoukkue(data, "Vapaat");
    vaihdaRasti("Dynamic Duo", 73, 32);
    tulostaPisteet(data);
    tulostaKaikki(data);


/**
 * lisää joukkueen ja lisää sen tiettyyn sarjaan
 * @param {object} data 
 * @param {object} joukkue 
 * @param {object} sarja
 */
function lisaaJoukkue(data, joukkue, sarja){

    for(let sarj of data.sarjat) {

        if (sarja == sarj.nimi) {

            joukkue.sarja = sarj;
            data.joukkueet.push(joukkue);
        }
    }       
} 


/**
 * Taso 1:n tulostus(rasteja lukuunottamatta). 
 * Tulostetaan joukkue ja sarja
 * @param {Object} data 
*/
function tulostaJoukkueet(data) {

  let uusi = [];

    for(var i = 0; i < data.joukkueet.length; i++) {
       
        uusi.push(data.joukkueet[i]);
        uusi.sort(compareFunction);

    }
    for(let joukkue of uusi) {
        
        log(joukkue.nimi + " " + joukkue.sarja.nimi );
    }  
}


/**
 * Comparefunktio nimen perusteella järjestämiseen
 * @param {Object} a verrattava
 * @param {Object} b toinen verrattava
 */
function compareFunction(a, b) {

  var eka = a.nimi.toUpperCase(); 
  var toka = b.nimi.toUpperCase(); 

  if (eka < toka) {
    return -1;
  }
    
  if (eka > toka) {
    return 1;
  }
    return 0;
  }

/**
 * Taso 1:n rastien tulostus
 * Luodaan uusi taulukko, johon lisätään halutut, jottei alkuperäistä
 * tietorakennetta muuteta
 * @param {*} data
 */
function tulostaRastit(data) {

  let tulostettavat = [];
  let tuloste = "";
    
  for(var rasti of data.rastit) {

    let eka = rasti.koodi.charAt(0);
  

    if( parseInt(eka) % 1 == 0) {

      tulostettavat.push(rasti.koodi);   
    
    }
  }

  tulostettavat.sort(compareFunction2);
    
  for(let tul of tulostettavat) {

    tuloste = tuloste + tul + "; ";
  }

  log();
  log(tuloste);
}


/**
 * Comparefunktio suuruusjärjestyksessä 
 * ja toissijaisesti nimen mukaanjärjestämiseen
 * @param {Object} a verrattava
 * @param {Object} b toinen verrattava
 */
function compareFunction2(a, b) {

    if (a < b) {
        return -1;
      }
      
      if (a > b) {
        return 1;
      }
      
      return 0;
    }

/**
 * Muutetaan sarjan nimi
 * @param {Object} data 
 * @param {String} vanhanimi sarjan vanha nimi
 * @param {String} uusinimi sarjan uusi nimi
 */
function muutaSarjanNimi(data, vanhanimi, uusinimi) {
    
 
    for(sarja of data.sarjat) {
        if (sarja.nimi == vanhanimi) {
          sarja.nimi = uusinimi;
        }
    }
}


/**
 * Poistetaan joukkue joukkueen nimen perusteella
 * @param {Object} data 
 * @param {String} pnimi poistettavan joukkueen nimi
 */
function poistaJoukkue(data, pnimi) {
  for (let jn = 0; jn < data.joukkueet.length; jn++) {

    if (data.joukkueet[jn].nimi == pnimi) {
      data.joukkueet.splice(jn, 1); 
      break;
    }
  }
}
 

/**
 * Vaihtaa pyydetyn rastileimauksen sijalle uuden rastin
 * @param {Object} joukkue 
 * @param {number} rastinIdx - rastin paikka joukkue.rastit-taulukossa
 * @param {Object} uusirasti
 * @param {string} Aika - Rastileimauksen aika. Jos tätä ei anneta, käytetään samaa aikaa kuin vanhassa korvattavassa leimauksessa
 */
function vaihdaRasti(joukkue, rastinIdx, uusirasti, aika) {

  let etsittavaR;
  let etsittavaJ;

  for (let rasti of data.rastit ) {

    if (rasti.koodi == uusirasti) {
      etsittavaR = rasti;
      break;
    }
  }

  for (let jouk of data.joukkueet ) {

    if (jouk.nimi.trim() == joukkue) {
      etsittavaJ = jouk;
      break;
    }
  }

  if (aika == undefined) {

      etsittavaR.aika = etsittavaJ.rastit[rastinIdx].aika;
      etsittavaJ.rastit[rastinIdx].rasti = etsittavaR;
  }
  
}


/**
 * Taso 3:n tulostus eli
 * Tulostetaan joukkueiden nimet ja pisteet 3-tason muutosten jälkeen
 * pisteiden mukaisessa laskevassa suuruusjärjestyksessä 
 * @param {Object} data 
 */
function tulostaPisteet(data) {
 
  let ptaulukko = joukkueenTiedot(data);


  ptaulukko.sort(compareFunction3);

  log();
  log("----------");
  log("Taso 3");
  log("----------");
  log();

  for(let tulostettava of ptaulukko) {

    log(tulostettava.nimi + " (" + tulostettava.pisteet + " p)");

  }

}

/**
 * Taulukko, johon laitetaan joukkueiden tiedot 
 * @param {Object} data 
 */
function joukkueenTiedot(data) {

  let ptaulukko = [];
  for(let joukkue of data.joukkueet) {


    let yhteisPisteet = laskePisteet(data, joukkue);
    let matka = laskeMatka(data, joukkue);
    let aika = laskeAika(data, joukkue);
    if (aika == "") {
      aika = "00:00:00";
    }
    let jouk = {
      "nimi" : joukkue.nimi,
      "pisteet": yhteisPisteet,
      "matka" : matka,
      "aika" : aika
    };  
    
    ptaulukko.push(jouk);
  } 
  return ptaulukko;
}


/**
 * Lasketaan joukkueen rasteista saamat pisteet LAHTO- ja MAALI- rastien välillä
 * @param {Object} data 
 * @param {Object} joukkue 
 */
function laskePisteet(data, joukkue) {

  let summa = 0;
  let leimatut = [];
  let lahdettu = false;

  for(let rasti of joukkue.rastit) {
    let piste = 0;
    let voiko = true;
    

    if ((rasti.rasti != undefined)) {

      for(let leimattu of leimatut) {

        if (rasti.rasti.koodi == leimattu) {
          voiko = false;
        }
      } 

      if (rasti.rasti.koodi == "LAHTO")  {
        
        lahdettu = true;
        summa = 0;

      }
      if (rasti.rasti.koodi == "MAALI") {
        
        lahdettu = false;
      }

      if((rasti.rasti.koodi != undefined) && (voiko == true) && (lahdettu == true)) {

        if (parseInt(rasti.rasti.koodi.charAt(0)) % 1 == 0) {

          piste = rasti.rasti.koodi.charAt(0);
          summa = summa + parseInt(piste);
          leimatut.push(rasti.rasti.koodi);
        }
      }
    }
    }

  return summa;
}


/**
 * 5-tason tulostus, joukkueen nimi, pisteet, matka ja käytetty aika
 * @param {Object} data 
 */
function tulostaKaikki(data) {

  let taulu = joukkueenTiedot(data);

  taulu.sort(compareFunction3); 
  
  log();
  log("----------");
  log("Taso 5");
  log("----------");
  log();

  for(let jouk of taulu) {

    log(jouk.nimi + ", " + jouk.pisteet + " p, " + jouk.matka + " km, " + jouk.aika); //ajan vaikutus lisättävä

  }
}


/**
 * Compare funktio pisteiden mukaan järjestämiseen
 * @param {*} a verrattava
 * @param {*} b toinen verrattava
 */
function compareFunction3(a, b) {

  var toka = a.pisteet; 
  var eka = b.pisteet; 


  if (eka == toka) {

    toka = b.nimi;
    eka = a.nimi;
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
 * Laskee matkan "LAHTO"-rastilta "MAALI"-rastille
 * @param {*} data 
 * @param {*} joukkue 
 */
function laskeMatka(data, joukkue) {

  let edlat;
  let edlon;
  let matkalla = false;
  let kmatka = 0;

  for(let rasti of joukkue.rastit) {


    if ((rasti.rasti != undefined) ) {

      if ((rasti.rasti.koodi != undefined) && (rasti.rasti.lat != undefined) && (rasti.rasti.lon != undefined)) {

        
     
        if (matkalla == true ) {

          let matka = getDistanceFromLatLonInKm(edlat, edlon, rasti.rasti.lat, rasti.rasti.lon);
          kmatka = kmatka + matka;
          edlat = rasti.rasti.lat;
          edlon = rasti.rasti.lon;
        }

        if (rasti.rasti.koodi == "MAALI") {
          matkalla = false;
        }

        if (rasti.rasti.koodi == "LAHTO") {
          matkalla = true;
          kmatka = 0;
          edlat = rasti.rasti.lat;
          edlon = rasti.rasti.lon;
        }
      }
    } 
  }
  return Math.round(kmatka);
}


/**
 * Kopioitu tehtävänannosta
 * Laskee matkan pisteestä pisteeseen pituus ja leveysasteista
 * @param {*} lat1 alkupisteen pituus
 * @param {*} lon1 alkupisteen leveys
 * @param {*} lat2 loppupisteen pituus
 * @param {*} lon2 loppupisteen leveys
 */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}


function deg2rad(deg) {
  return deg * (Math.PI/180);
}


/**
 * Lasketaan "LAHTO"- ja "MAALI"- rastien välillä käytetty aika
 * @param {*} data 
 * @param {*} joukkue 
 */
function laskeAika(data, joukkue) {

  let lahto;
  let maali;
  let aikaS = "";

  for(let rasti of joukkue.rastit) {
    if (rasti.rasti != undefined) {
      if ((rasti.rasti.koodi != undefined) & (rasti.aika != undefined)) {

        if (rasti.rasti.koodi == "LAHTO") {
          lahto = rasti.aika;
        }
        if ((rasti.rasti.koodi == "MAALI") && (lahto != undefined)) {
          maali = rasti.aika;
          break;
        }
      }
    }
  }
  if (lahto != undefined && maali != undefined) {

    let laika = lahto.toString();
    let laikaN = aikaNumeroina(laika);
    let laika2 = maali.toString();
    let maikaN = aikaNumeroina(maali);

    let kokAika = maikaN - laikaN;

    aikaS = aikaStringina(kokAika);
  }
  return aikaS;
  
}


/**
 * Otetaan ajasta erilleen tunnit, minuutit ja sekunnit ja
 * muutetaan aika luvuiksi
 * @param {*} stringi Aika muodossa "tunnit:minuutit:sekunnit"
 */

function aikaNumeroina(stringi) {

  let tunnit = parseInt(stringi.substring(11, 13));
  let minuutit = parseInt(stringi.substring(14, 16));
  let sekunnit = parseInt(stringi.substring(17, 19));
  let aika = (tunnit*60*60) + (minuutit*60) + sekunnit;

  return aika; 
}


/**
 * Lasketaan luku:sta tunnit, minuuti ja sekunnit 
 * ja palautetaan ne muodossa "tunnit:minuutit:sekunnit"
 * @param {*} luku joukkueen käytetty aika sekunteina
 */

function aikaStringina(luku) {

let tunnit = Math.floor(luku/60/60);
let minuutit = Math.floor((luku-tunnit*60*60)/60);
let sekunnit = luku-(tunnit*60*60)-(minuutit * 60);

if (tunnit < 10) {
  tunnit = "0" + tunnit ;
}
if (minuutit < 10) {
  minuutit = "0" + minuutit;
}
if (sekunnit < 10) {
  sekunnit = "0" + sekunnit;
}

let aika = (tunnit + ":" + minuutit + ":" + sekunnit);
return aika;
    
}