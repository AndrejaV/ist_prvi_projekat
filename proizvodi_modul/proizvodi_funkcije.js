const fs=require('fs');
const file="proizvodi.json";

var kategorije=["monitori","tastature","zvucnici"];

let procitajProizvode=()=>{
    let proizvodi=fs.readFileSync(file);
    return JSON.parse(proizvodi);
}

let snimiProizvode=(data)=>{
    fs.writeFileSync(file,JSON.stringify(data));
}

exports.sviProizvodi=()=>{
    return procitajProizvode();
};


exports.dodajproizvod=(noviproizvod)=>{
    let id=1;
    let proizvodi=this.sviProizvodi();
    let proizvod={};
    let oznake=noviproizvod.oznake.split(',');

    if(proizvodi.length>0){
        id=proizvodi.length+1;
    }

    if(kategorije.find(x=>x.startsWith(noviproizvod.kategorija))){     
        if(noviproizvod.nova_cena!="" && noviproizvod.datum_isteka!=""){
            let akcije= [];
            let akcija={"id_akcije":1,"nova_cena":parseFloat(noviproizvod.nova_cena),
            "datum_isteka":noviproizvod.datum_isteka};
            akcije.push(akcija);
            proizvod={
                "id":id,
                "naziv":noviproizvod.naziv,
                "kategorija":noviproizvod.kategorija,
                "cena":parseFloat(noviproizvod.cena),
                "tekst":noviproizvod.tekst,
                "oznake":oznake,
                "akcije":akcije
            };
        }
        else{
            proizvod={
                "id":id,
                "naziv":noviproizvod.naziv,
                "kategorija":noviproizvod.kategorija,
                "cena":parseFloat(noviproizvod.cena),
                "tekst":noviproizvod.tekst,
                "oznake":oznake
            };
        }
    }
    proizvodi.push(proizvod);
    snimiProizvode(proizvodi);
}

exports.izbrisiProizvod=(id)=>{
    if(this.sviProizvodi().find(x=>x.id==id)){
        snimiProizvode(this.sviProizvodi().filter(proizvod=>proizvod.id!=id));
    }
}

exports.pretrazi=(ime)=>{
    let filtrirano=this.sviProizvodi().filter(p=>p.naziv.includes(ime));
        return filtrirano;
}

exports.filtrirajPoKategoriji=(kategorija)=>{
    return this.sviProizvodi().filter(p=>p.kategorija==kategorija);
}


exports.filtrirajPoAktivnojAkciji=()=>{
    let proizvodi=sviProizvodi();
    let filtrirani=[];
    let danas = Date.now();
    for(let i=0;i<proizvodi.length;i++){
        if(proizvodi[i].akcije!=undefined){
             for(let j=0;j<proizvodi[i].akcije.length;j++){
                let datum = Date.parse(proizvodi[i].akcije[j].datum_isteka);
                if(datum>danas)
                filtrirani.push(proizvodi[i]);
                }     
            }
        }
    return filtrirani;
}

exports.vratiKategorije=()=>{ 
    return kategorije;
}

exports.nadjiProizvod=(id)=>{
    let broj=parseInt(id);
    let proizvodi=this.sviProizvodi();
    let proizvod=proizvodi.filter(p=>p.id==broj);
    return proizvod;
}

exports.IzmeniProizvod=(izmenaProizvod)=>{
    let proizvodi=this.sviProizvodi();
    for(let i=0;i<proizvodi.length;i++){
        if(izmenaProizvod.id==proizvodi[i].id){
            proizvodi[i].naziv=izmenaProizvod.naziv;
            proizvodi[i].kategorija=izmenaProizvod.kategorija;
            proizvodi[i].cena=izmenaProizvod.cena;
            proizvodi[i].tekst=izmenaProizvod.tekst;
            proizvodi[i].oznake=izmenaProizvod.oznake;
            if(proizvodi[i].akcije!=undefined){
            for(let j=0;j<proizvodi[i].akcije.length;j++){
                proizvodi[i].akcije[j].nova_cena=izmenaProizvod.nova_cena;
                proizvodi[i].akcije[j].datum_isteka=izmenaProizvod.datum_isteka;

            }
        }
        }
    }
    snimiProizvode(proizvodi);
}
