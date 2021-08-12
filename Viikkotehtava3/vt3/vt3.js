"use strict";  // pidä tämä ensimmäisenä rivinä
//@ts-check 

console.log(data);

window.addEventListener("load", function() {

    haeSarjat();
    jasenKentat();
    nimenTarkistus();
    luoLista();

    /**
     * Haetaan sarjat ja lisätään oikeannimiset vaihtoehdot
     */
    function haeSarjat() {

        let ekaLabel = document.getElementById("ekasarja").parentNode; 
        let radiolabelit = ekaLabel.parentNode.getElementsByTagName("label");
        let jarjestetyt = [];
        

        if (data.sarjat.length > 0) {

            let s = document.getElementById("ekasarja");
            s.name = "sarja";

            for(let sarja of data.sarjat) {

                jarjestetyt.push(sarja.nimi);
                    
            }
    
            jarjestetyt.sort();
    
            let i = 0;
            for(let x of jarjestetyt) {
    
                if (i > radiolabelit.length -1 ) {
                    lisaaRadio(ekaLabel);
                }
                let nimi = document.createTextNode(x);
                radiolabelit[i].insertBefore(nimi, radiolabelit[i].firstChild);
                i++;
            }
        }
        else {
            ekaLabel.parentNode.textContent = "";
        }
    }


    /**
     * Lisätään lomakkeelle uusi vaihtoehto ja valintanappi
     * @param {*} ekaLabel 
     */
    function lisaaRadio(ekaLabel) {

        let uusiLabel = document.createElement("label");
        ekaLabel.parentNode.appendChild(uusiLabel);
        let uusiInput = document.createElement("input");
        uusiInput.type = "radio";
        uusiInput.name = "sarja";
        uusiInput.value="";
        uusiLabel.appendChild(uusiInput);

    }


    /**
     * Jäsenkentät
     */
    function jasenKentat() {

        let jasenfieldset = document.getElementById("fieldsetjasenet");
        let inputit = jasenfieldset.getElementsByTagName("input");

        inputit[1].addEventListener("input", addNew);

        addNew();
        numeroi(inputit);

        /**
         * Lisätään tai poistetaan input-kenttiä
         * @param {*} e 
         */
        function addNew(e) {
            let tyhja = false;  // oletuksena ei ole löydetty tyhjää

            // käydään läpi kaikki input-kentät viimeisestä ensimmäiseen
            // järjestys on oltava tämä, koska kenttiä mahdollisesti poistetaan
            // ja poistaminen sotkee dynaamisen nodeList-objektin indeksoinnin
            // ellei poisteta lopusta 
            for(let i=inputit.length-1 ; i>0; i--) { // inputit näkyvät ulommasta funktiosta
                let input = inputit[i];

                // jos on tyhjä ja on jo aiemmin löydetty tyhjä niin poistetaan
                if ( input.value.trim() == "" && tyhja) { // ei kelpuuteta pelkkiä välilyöntejä
                    inputit[i].parentNode.remove(); // parentNode on label, joka sisältää inputin
                }

            // onko tyhjä?
                if ( input.value.trim() == "") {
                        tyhja = true;
                }
            }

            // jos ei ollut tyhjiä kenttiä joten lisätään yksi
            if ( !tyhja) {
                let label = document.createElement("label");
                let input = document.createElement("input");
                input.setAttribute("type", "text");
                input.addEventListener("input", addNew);
                let p = jasenfieldset.getElementsByTagName("p")[0];
                p.appendChild(label).appendChild(input);
            }

            numeroi(inputit);
        
        }


        /**
         * Kenttien numerointi
         */
        function numeroi() {

            // tehdään kenttiin numerointi
            for(let i=0; i<inputit.length; i++) { // inputit näkyy ulommasta funktiosta

                    let label = inputit[i].parentNode;

                    if (label.lastChild.nodeType === Node.TEXT_NODE) {

                        label.lastChild.nodeValue = "Jäsen " + (i+1);
                    }
                    else {

                        let kentanNimi = document.createTextNode("Jäsen " + (i+1));
                        label.appendChild(kentanNimi);
                    }
                    tarpeeksiKenttia();
            }  
        }
    }


    /**
     * Onko tarpeeksi jäseniä
     */
    function tarpeeksiKenttia() {

        let jasenfieldset = document.getElementById("fieldsetjasenet");
        let inputit = jasenfieldset.getElementsByTagName("input"); 

        for(let i = 0; i < 2 && i < inputit.length; i++ ) {

            inputit[i].required = "required";
            let button = document.getElementsByTagName("button")[0];
            button.addEventListener("click", virheIlmoitus);

        }

        for(let i = 2; i < inputit.length; i++) {
            inputit[i].required = false;

        }
    }


    /**
     * Näytetään virhe jos jäseniä on vähemmän kuin 2
     * @param {*} e 
     */
    function virheIlmoitus(e) {


        let jasenfieldset = document.getElementById("fieldsetjasenet");
        let inputit = jasenfieldset.getElementsByTagName("input"); 

        for(let input of inputit) {
            input.setCustomValidity("");
            if (!input.validity.valid) {
                input.setCustomValidity("Joukkueella on oltava vähintään kaksi jäsentä");
            }
            input.reportValidity();
        }
        
    }


    /**
     * Kun klikataa Tallenna, tarkistetaan nimi
     */
    function nimenTarkistus() {

        let button = document.getElementsByTagName("button")[0];
        
        button.addEventListener("click", tallenna);

    }


    /**
     * Katsotaan voiko tallentaa
     * @param {*} e 
     */
    function tallenna(e) {
            
        e.preventDefault();
        let nimivalidi = tarkista();
        let inputitvalidi = true;
        let jasenfieldset = document.getElementById("fieldsetjasenet");
        let inputit = jasenfieldset.getElementsByTagName("input"); 

        for(let input of inputit) {
            if (input.validity.valid != true) {
                inputitvalidi = false;
            }
        }
        if (nimivalidi == true && inputitvalidi == true ) {
            lisaaJoukkue();
        }

    }


    /**
     * Lisätään joukkue
     */
    function lisaaJoukkue() {

        let nimiInput = document.getElementById("nimi");
        let jasenfieldset = document.getElementById("fieldsetjasenet");
        let inputit = jasenfieldset.getElementsByTagName("input");  

        let jasenet = [];
        for (let i of inputit){
            if (i.value.length > 0) {
                jasenet.push(i.value);
            }
        }

        let joukkue = {
        "nimi" : nimiInput.value.trim(),
        "jasenet": jasenet,
        "id" : joukkueelleId(),
        "rastit": [],
        "leimaustapa": [0],
        "pisteet": 0,
        "sarja" : getSarja()
        };

        data.joukkueet.push(joukkue);

        //Tarkistus
        for(let j of data.joukkueet) {
            if (j.id == joukkue.id) {
                tyhjenna();
                luoLista();
            }
        }
    }


    /**
     * Haetaan sarja
     */
    function getSarja() {

        
        let sarjat = document.getElementsByClassName("radiot")[0];
        let inputit = sarjat.getElementsByTagName("input");

        for(let input of inputit) {

            if (input.checked == true) {
                return sarjaId(input.parentNode);
            }
        }
        
    }


    /**
     * Etsitään sarja ja palautetaan sen id
     * @param {} label 
     */
    function sarjaId(label) {

        let sarjanNimi = label.firstChild.nodeValue;
        
        for(let sarja of data.sarjat) {
            
            if (sarja.nimi == sarjanNimi) {

                return sarja.id;
            }
        }
    }

    /**
   * Tyhjennetään joukkuelomake
   */
  function tyhjenna() {

    let nimiInput = document.getElementById("nimi"); 
    let jasenfieldset = document.getElementById("fieldsetjasenet");
    let inputit = jasenfieldset.getElementsByTagName("input"); 

    nimiInput.value = " ";
    for(let i of inputit) {
      i.value = "";
    } 
    document.getElementsByTagName("button")[0].removeEventListener("click", virheIlmoitus);
    jasenKentat();
    

  }


    /**
     * Luodaan uusi id
     */
    function joukkueelleId() {
        let suurin = 0;
        for(let j of data.joukkueet) {
            if (j.id > suurin) {
                suurin = j.id;
            }
        }
        let uusiId = suurin + 1;
        return uusiId;
    }

  
    /**
     * Tarkistetaan nimikenttä
     */
    function tarkista() {

        let nimiInput = document.getElementById("nimi");

        if (nimiInput.validity.tooShort) {
            nimiInput.reportValidity();
            return false;
        }
        else {

            let n = nimiInput.value.trim();
            if (n.length < 2){

                nimiInput.setCustomValidity("Nimen tulee olla pituudeltaan vähintään 2 merkkiä.");
                nimiInput.reportValidity();
                return false;
                
            }   
            else {
                for(let joukkue of data.joukkueet) {

                    if (joukkue.nimi.trim().toLowerCase() == nimiInput.value.trim().toLowerCase()) {
                        
                        nimiInput.setCustomValidity("Tämän niminen joukkue on jo lisätty. Valitse toinen nimi!");
                        nimiInput.reportValidity();
                        return false;
                    }
                }
                return true;
            }
        }
    }


    function luoLista() {

        let lista = document.getElementsByClassName("lista")[0];
        lista.textContent = "";
        let joukkuelista = [];


        for(let joukkue of data.joukkueet) {
            
            let jasenet = [];

            for(let jasen of joukkue.jasenet) {
                jasenet.push(jasen);
                jasenet.sort(compareFunction);
            }
            joukkuelista.push(joukkue);
            joukkuelista.sort(compareFunction2);
        }



        for(let joukkue of joukkuelista) {

            
            let jouk = document.createElement("li");
            lista.appendChild(jouk);
            let sarja = document.createElement("strong");
            let nimi = document.createTextNode(joukkue.nimi);
            jouk.appendChild(sarja);
            sarja.textContent = sarjanNimi(joukkue.sarja);
            jouk.insertBefore(nimi, sarja);
            let jaset = document.createElement("ul");
            jouk.appendChild(jaset);
            
            for(let jasen of joukkue.jasenet) {
                let jas = document.createElement("li");
                jaset.appendChild(jas);
                jas.appendChild(document.createTextNode(jasen));
            }
       }

    }

        /**
     * Comparefunktio nimen perusteella järjestämiseen (Turha, Taso1)
     * @param {Object} a verrattava
     * @param {Object} b toinen verrattava
     */
    function compareFunction(a, b) {


        var nimiA = a.toUpperCase(); 
        var nimiB = b.toUpperCase(); 
        if (nimiA < nimiB) {
        return -1;
        }
        if (nimiA > nimiB) {
        return 1;
        }
    
        return 0;
    }


       /**
     * Comparefunktio nimen perusteella järjestämiseen (Turha, Taso1)
     * @param {Object} a verrattava
     * @param {Object} b toinen verrattava
     */
    function compareFunction2(a, b) {


        var nimiA = a.nimi.toUpperCase(); 
        var nimiB = b.nimi.toUpperCase(); 
        if (nimiA < nimiB) {
        return -1;
        }
        if (nimiA > nimiB) {
        return 1;
        }
    
        return 0;
    }
    

    function sarjanNimi(id) {

        for(let sarja of data.sarjat) {

            if (id == sarja.id) {
                return sarja.nimi;
            }
        }


    }




});


