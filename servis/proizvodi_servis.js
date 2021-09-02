var express = require('express');
var proizvodiServis=require('../proizvodi_modul/proizvodi_funkcije');
var app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(request, response)=>{
    response.send("Server radi");
});

app.get("/sviProizvodi",function(request,response){
    response.send(proizvodiServis.sviProizvodi())
});

app.post("/dodajProizvod",function(request,response){
   proizvodiServis.dodajproizvod(request.body);
   response.end("Dodat proizvod!");
});

app.get("/filtrirajPoImenu",function(request,response){
    response.send(proizvodiServis.pretrazi(request.query.ime));
});

app.get("/filtrirajPoKategoriji",function(request,response){
    response.send(proizvodiServis.filtrirajPoKategoriji(request.query.kategorija)); 
});

app.get("/sveKategorije",function(request,response){
    response.send(proizvodiServis.vratiKategorije());
});

app.get("/proizvodiNaAkciji",function(request,response){
    response.send(proizvodiServis.filtrirajPoAktivnojAkciji());
});

app.delete('/izbrisiProizvod/:id',(request, response)=>{
    proizvodiServis.izbrisiProizvod(request.params["id"]);
    response.end("Izbrisan proizvod");
});

app.get("/vratiProizvod/:id",(request,response)=>{
    response.send(proizvodiServis.nadjiProizvod(request.params["id"]));
    });

app.post("/snimiIzmene",(request,response)=>{
    proizvodiServis.IzmeniProizvod(request.body);
    response.end("Snimljeno!");
});

app.listen(port,()=>{console.log(`startovan server na portu ${port}`)});