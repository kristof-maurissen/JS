/* 
 * Array van de winkels
 * @aWinkels array
*/
var aWinkels = [
{naam:"de fruitmand",adres:"steenstraat 34", post:8000,gemeente:"Brugge",tel:"050342218",manager:"Francine Lapoule"},
{naam:"Jos & Anneke",adres:"visserijstraat 1", post:8400,gemeente:"Oostende",tel:"059463689",manager:"Jos Leman"},
{naam:"groene vingers",adres:"hoogstraat 108", post:9000,gemeente:"Gent",tel:"091342218"},
{naam:"de buurtwinkel",adres:"die laene 22", post:2000,gemeente:"Antwerpen",tel:"0230342218",manager:"Bert Simoens"}
];

/*
 * Array van groenten
 * @aGroenten Array
 */
var aGroenten = [
["aardappelen",0.95,"kg"],
["avocado",2.69,"stuk"],
["bloemkool",1.93,"stuk"],
["brocoli",1.29,"stuk"],
["champignons",0.89,"250g"],
["chinese kool",1.59,"stuk"],
["groene kool",1.69,"stuk"],
["knolselder",1.29,"stuk"],
["komkommer",2.49,"stuk"],
["kropsla",1.69,"stuk"],
["paprika",0.89,"net"],
["prei",2.99,"bundel"],
["princessenbonen",1,"250g"],
["rapen",0.99,"bundel"],
["rode kool",1.39,"stuk"],
["sla iceberg",1.49,"stuk"],
["spinazie vers",1.89,"300g"],
["sjalot",0.99,"500g"],
["spruiten",1.86,"kg"],
["trostomaat",2.99,"500g"],
["ui",0.89,"kg"],
["witloof 1ste keus",1.49,"700g"],
["wortelen",2.59,"kg"],
["courgetten",1.5,"stuk"]
];

/*
 * De mogelijke fouten
 */
var oFouten = {
        required: {
            msg: "verplicht veld",
            test: function(elem){
                return elem.value != "";
            }
        },
        aantal: {
            msg: "getal verwacht",
            test: function(elem) {
                //aantal test enkel de inhoud als getal als er een inhoud is 
                if(elem.value != ""){
                    return  !isNaN(elem.value) && elem.value>0;
                }
                else {
                    return true;
                }
            }
        }
}



window.onload =  function() {
    
/*
 * noscript verbergen ingeval er geen javascript in browser is 
 */
    var eNoScript = document.getElementById('noscript');
    eNoScript.style.display = "none";
    
/**********************************************************************/
    
    var eFrmBestel        = document.frmBestel;
    var eWinkel           = document.frmBestel.winkel;
    eWinkel.className    += "required";
    var eGroenten         = document.frmBestel.groente;
    eGroenten.className  += "required"; 
    var eAantal           =  document.frmBestel.aantal;
    eAantal.className    += " required";  
    //console.log(eAantal.className);

/*
 * check of de array aWinkels bestaat
 * vul de select lijst met winkels
 */
    //console.log(aWinkels.length);
    if(typeof aWinkels == "undefined"){ //check of de array aWinkels bestaat 
            alert("array aWinkels niet gevonden");
        }
        else { //vul de select met options met de array aWinkels
            var nWinkels    = aWinkels.length;
            var eWinkel     = document.getElementById('winkel');
            if (eWinkel) {
            for (var i=0; i<nWinkels;i++){
                eOption    = document.createElement('option');
               // eOption.setAttribute('class', 'required');// dient op select niet op options
                eOption.innerHTML  = aWinkels[i].naam;
                eWinkel.appendChild(eOption);
                eOption.title = (aWinkels[i]["adres"] + ", " + aWinkels[i]["post"] + ", " + aWinkels[i]["gemeente"]);
                eWinkel.appendChild(eOption);
                //eWinkel.normalize();
                }
            }
        }

    
/*
 * check of de array aGroenten bestaat
 * vul de select met Groenten
 */    
    //console.log(aGroenten.length);
    if(typeof aGroenten == "undefined"){ //check of de array aGroenten bestaat
            alert("array aGroenten niet gevonden");        
        }
        else { //vul de options met array aGroenten
            var nGroenten    = aGroenten.length;
            var eGroenten     = document.getElementById('groente');
            if (eGroenten){
                for (var i=0; i<nGroenten;i++){
                    eOption    = document.createElement('option');
                   // eOption.setAttribute('class', 'required');// dient op select niet op options
                    eOption.innerHTML  = (aGroenten[i][0] + "(" + aGroenten[i][1] + "€/" + aGroenten[i][2] + ")");
                    eGroenten.appendChild(eOption);
                }
            }
        }


/*
 * event winkelmandje
 */
    eFrmBestel.addEventListener('submit', function (e){
            e.preventDefault();
            var bValid = valideer(this);
           // console.log('formulier ' + this.name + 'valideert ' + bValid);
            if (bValid === true) {
                
                voegAanWinkelmandje(this);
            }
        });

}; //einde window.onload

    function valideer(frm) {
        var bValid = true;
            //lus doorheen alle form elementen van het formulier
           //console.log( frm.elements.length);
            for (var i = 0; i<frm.elements.length; i++) {
                //verwijder alle vorige foutboodschappen
                hideErrors(frm.elements[i]);
                //valideer veld
                var bVeld = valideerVeld(frm.elements[i]);
              //console.log("het element %s met name %s valideert %s",frm.elements[i].nodeName,frm.elements[i].name,bVeld);
                if (bVeld === false) {
                    bValid = false;
                }
            }
            return bValid;
    }
    
    function valideerVeld(elem) {
        //valideert één veld volgens zijn class
        var aFoutBoodschappen = [];

            for (var fout in oFouten) {
                var re = new RegExp("(^|\\s)" + fout + "(\\s|$)"); //regex
                //fouten class aanwezig?
                if(re.test(elem.className)) {
                    var bTest = oFouten[fout].test(elem);
                    console.log("het element %s met name %s wordt gevalideerd voor %s: %s", elem.nodeName, elem.name, fout, bTest);
                    if(bTest === false) {
                        aFoutBoodschappen.push(oFouten[fout].msg);
                    }

                }
            }
            if (aFoutBoodschappen.length > 0) {
                showErrors(elem, aFoutBoodschappen);
            }
            return !(aFoutBoodschappen.length>0);
    }
     
    function showErrors(elem,aErrors) {
             /*toon alle fouten voor één element
             * @elem  element, te valideren veld
             * @Errors  array, fouten voor dit element
             */

        var eBroertje = elem.nextSibling;
            if(!eBroertje || !(eBroertje.nodeName == "UL" && eBroertje.className == "fouten")) {
                eBroertje = document.createElement('ul');
                eBroertje.className = "fouten";
                elem.parentNode.insertBefore(eBroertje, elem.nextSibling);
            }
            //plaats alle foutberichten erin
            for(var i = 0; i<aErrors.length; i++) {
                var eLi = document.createElement('li');
                eLi.innerHTML = aErrors[i];
                eBroertje.appendChild(eLi);
            }
    }
 
    function hideErrors(elem) {
         /*
          * verbergt alle foutboodschappen voor één element
          * @elem   element, te valideren veld
         */ 
        var eBroertje = elem.nextSibling;
            if(eBroertje && eBroertje.nodeName == "UL" && eBroertje.className == "fouten") {
                elem.parentNode.removeChild(eBroertje);
            }
     }
     
     
    function voegAanWinkelmandje(frm){
        /*
         * na valideren het mandje vullen
         * @frm = eFrmBestel
         */
    //var eWinkelmandje = document.getElementById('winkelmandje');
        var eLeeg   = document.getElementById('leeg');
        var eTotaal = document.getElementById('totaal');
        var eRij    = document.createElement('div');
        eRij.className = 'item';
        eLeeg.style.display = 'none';

        /*
         * Maak een array en vul door de naam van de groente te vergelijken met de groetenDB
         * Push het aantal toe bij de array
         * @aWinkelmandje Array
         */
        var aWinkelmandje     = [];
        var sGroenteLijn      = frm.groente.value;
        var sGroenteLijnNaam  = sGroenteLijn.split("(");
        var naamGroente       = sGroenteLijnNaam[0];
    
        for(var i=0; i<aGroenten.length; i++) {
            if (aGroenten[i][0] == naamGroente){
                var sGroente = aGroenten[i];
            } 
        }
    
        aWinkelmandje.push(sGroente[0]);
        aWinkelmandje.push(sGroente[1]);
        var sAantal = frm.aantal.value;
        aWinkelmandje.push(sAantal);
        
        /*
         *Plaats elk element in de array in een div en plaats deze divs in de item div 
         */
         var aNames = document.getElementsByClassName('cellinks');
         var sNames = aNames.getTextNode;
        console.log(aNames.length);
        console.log(aNames);
        console.log(sNames);
        /*if (aWinkelmandje[0] == eNaam){
            
        }*/
        var eNaam          = document.createTextNode(aWinkelmandje[0]);
        var eDivNaam       = document.createElement('div');
        eDivNaam.className ='cel cellinks';
        eDivNaam.appendChild(eNaam);
        eRij.appendChild(eDivNaam);
        
        var eAantal                  = document.createTextNode(aWinkelmandje[1]);
        var eDivAantal               = document.createElement('div');
        eDivAantal.className         ='cel';
        eDivAantal.style.marginRight = '80px';
        eDivAantal.appendChild(eAantal);
        eRij.appendChild(eDivAantal);
        
        var ePrijs          = document.createTextNode(aWinkelmandje[2]);
        var eDivPrijs       = document.createElement('div');
        eDivPrijs.className ='cel';
        eDivPrijs.appendChild(ePrijs);
        eRij.appendChild(eDivPrijs);
        
        //Bereken het subtotaal en plaats in de item div
        var subTotaal           = (parseFloat(aWinkelmandje[1])*parseFloat(aWinkelmandje[2])).toFixed(2);
        var eSubTotaalDiv       = document.createElement('div');
        eSubTotaalDiv.className = 'cel celrechts subtotaal';
        var sSubTotaal          = document.createTextNode(subTotaal);
        eSubTotaalDiv.appendChild(sSubTotaal);
        eRij.appendChild(eSubTotaalDiv);
        
        
        
        eTotaal.parentNode.insertBefore(eRij, eTotaal); 
        //Bereken het totaal en plaats in de totaal div
        var eTotaal              = document.getElementById('totNum');
        var aSubtotalen          = document.querySelectorAll('.subtotaal');
       // console.log(aSubtotalen.length);
        var nTotaal              = 0;
        for (var i=0; i<aSubtotalen.length; i++) {
            nTotaal             += parseFloat(aSubtotalen[i].innerHTML);
        }
        nTotaal = parseFloat(nTotaal).toFixed(2);
        eTotaal.innerHTML = nTotaal;

    
    
   /* console.log(aGroenten);
    console.log(subTotaal);
    //var sGroentenLijnPrijs = sGroenteLijn.split("€");
    //aWinkelmandje.push (sGroentenLijnPrijs); 
    //aWinkelmandje.push = frm.groente.value;
    //aWinkelmandje.replace 
    console.log(eRij);
    console.log(sGroente);
    console.log(aGroenten[1][0]);
    console.log(sGroenteLijnNaam);
    console.log(aWinkelmandje.length);
    console.log (naamGroente);*/
    //Maakt een div groente aan en plaatst die in de rij
 /*  var eGroenteDiv = document.createElement('div');
    eGroenteDiv.className = 'cel cellinks groente';
    var aGroente = frm.groente.value.split("(");
    var sGroente = document.createTextNode(aGroente[0]);
    eGroenteDiv.appendChild(sGroente);
    eRij.appendChild(eGroenteDiv);
    
    //Maakt een div aantal aan en plaatst die in de rij
    var eAantalDiv = document.createElement('div');
    eAantalDiv.className = 'cel aantal';
    eAantalDiv.style.marginRight = '80px';
    var nAantal = frm.aantal.value;
    var sAantal = document.createTextNode(nAantal);
    eAantalDiv.appendChild(sAantal);
    eRij.appendChild(eAantalDiv);
    
    //Maakt een div met de prijs per stuk en plaatst die in de rij
    var eStukprijsDiv = document.createElement('div');
    eStukprijsDiv.className = 'cel stukprijs';
    var aStukprijs = aGroente[1].split("\u20AC/");
    var nStukprijs = aStukprijs[0];
    var sStukprijs = document.createTextNode(nStukprijs);
    eStukprijsDiv.appendChild(sStukprijs);
    eRij.appendChild(eStukprijsDiv);
    
    //Maakt een div met het subtotaal van de rij en plaatst die in de rij
    var eSubtotaalDiv = document.createElement('div');
    eSubtotaalDiv.className = 'cel celrechts subtotaal';    
    var nSubtotaal = (parseFloat(nAantal) * parseFloat(nStukprijs)).toFixed(2);
    var sSubtotaal = document.createTextNode(nSubtotaal);
    eSubtotaalDiv.appendChild(sSubtotaal);
    eRij.appendChild(eSubtotaalDiv);
    
    //Plaatst de volledige rij in het winkelmandje
    eTotaal.parentNode.insertBefore(eRij, eTotaal); 
    
    //Berekent het totaal van alle rijen a.d.h.v. alle elementen met een subtotaal class
    var eTotaal = document.getElementById('totNum');    
    var aSubtotalen = document.querySelectorAll('.subtotaal');
    var nTotaal = 0;
    for (var i = 0; i < aSubtotalen.length; i++) {
        nTotaal += parseFloat(aSubtotalen[i].innerHTML);
    }
    nTotaal = parseFloat(nTotaal).toFixed(2);
    eTotaal.innerHTML = nTotaal;*/
    
    
    
      
    
}
        
        
        
        
        
        
        
       /* var eWinkelmandje   = document.getElementById('winkelmandje');
        var eLeeg           = document.getElementById('leeg');
        var eRowDiv         = document.createElement('div');
        
        eLeeg.style.display = 'none';
        
        //var aWinkelmandje  = [];
        
        var eDivGroente    = document.createElement('div');
        var oGroente       = frm.groente.value.split('(');
        var eNaamGroente   = document.createTextNode(oGroente[0]);
        //var sGroente       = oGroente[0];
        eDivGroente.innerHtml = (eNaamGroente);
        eRowDiv.appendChild(eDivGroente);
        
        console.log(eNaamGroente);
        
        //eWinkelmandje.appendChild(eRowDiv);
        //alert(typeof aGroente);
        console.log(eDivGroente);
        //console.log(eWinkelmandje);
        
}*/



 
