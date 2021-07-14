////////////////  VÁLTOZÓK ///////////////////////

let doboz = document.getElementsByClassName('doboz');
let dobozOK= [...doboz];
const szinek =["yellow","yellow","black","black","blue","blue","green","green","pink","pink","lime","lime"];
let tömbErtek=[];
let kattintas = 0;
let sumKattintas =document.getElementById('katt');
let pontszam = document.querySelector('.pontszam');
let pontSZAM = parseInt(pontszam.innerHTML)
let vegeredmeny =document.querySelector('.eredmeny')
let ertek1;
let ertek2;

/////////////// KEVERÉS FUNKCIÓ (egy array-t kever meg ahol a színek vannak)
 let keveres =function(a){
    for (let i =0; i<szinek.length;i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
 }
 keveres(szinek)

//////////// FŐ FUNKCIÓ (kattintás számláló, ne lehessen kétszer kattintani a kártyát, plusz funkciók)
const lepes = function(){
    document.querySelector('#katt').innerText++;
    this.classList.add('soha');
    tömbErtek.push(this);
    kattintas++;
    sumKattintas++;
    ellenorzes();
    meres()
  };

////// SZÍN KIOSZTÁS (játék elején kap minden kártya egy színt, ami nem változik az új játékig)
  let szinKiosztas=function(){
      this.classList.remove('kartyalap');
    var value = this.getAttribute('value');
      this.style.backgroundColor=szinek[value];
  };

///////// ElTŰNÉS FUNKCIÓ (ez a funkció felel a kártyák eltűnéséért)  
function eltunes(x,y){
    setTimeout(function(){
        pontszam.innerHTML=parseInt(pontszam.innerHTML)+1;
        pontSZAM++;
        x.style.visibility ="hidden";
        y.style.visibility ="hidden";
    },500)
}
//////////// MÉRŐ FUNKCIÓ időzítővel (Két kattinás után visszafordulnak a kártyák)
function meres(){
    if (kattintas >= 2) {
        setTimeout(function(){
        for(let i =0;i<dobozOK.length;i++){
            dobozOK[i].classList.add('kartyalap')
            dobozOK[i].classList.remove('soha');
            tömbErtek =[];
        }
    },500)
        kattintas=0;
    }
};
//////////// ELLENŐRZÉS FUNKCIÓ (Ez a funkció figyeli, hogy azonos színűek e  kártyák)
function ellenorzes(){
    for(let i =0; i<tömbErtek.length;i++){
        ertek1 = tömbErtek[i].style.backgroundColor;
        for(let j= i+1;j < tömbErtek.length;j++){
            ertek2= tömbErtek[j].style.backgroundColor;
            if(ertek1 == ertek2){
                eltunes(tömbErtek[i],tömbErtek[j]);
            }
        }
    }
}
//////////// EVENT LISTENEREK (Két funkció fut le minden kattintásnál)
for(let u = 0; u<dobozOK.length;u++){
    dobozOK[u].addEventListener("click",szinKiosztas)
    dobozOK[u].addEventListener("click",lepes)
  };
//////////// ÚJ JÁTÉK (Visszaállít mindent alapállapotba az new game gomb megnyomásánál)  
  function newGame(){
    for(let z =0;z<dobozOK.length;z++){
        dobozOK[z].classList.add('kartyalap');
        dobozOK[z].style.visibility ="visible";
        dobozOK[z].classList.remove('soha');

}        tömbErtek =[];
        kattintas = 0;
        pontszam.innerHTML = 0;
        document.getElementById('katt').innerText=0;
        console.log(sumKattintas)
        keveres(szinek);
    
    };
        
