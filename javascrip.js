let btninicio = document.getElementById("inicio")
btninicio.style.display='none';

function inicio(){
   let contenedor = document.createElement("div")
   contenedor.id="caja";
   contenedor.innerHTML= `<section id="contenedor2"><article id="frezzer1"><img src="Card_1022750_artwork_apng.webp" alt="frezzer"></article><form id="formz">
                    <label for="defensa1">defenderse</label>
                    <input type="radio" name="combate" value="defenderse" id="defensa1" checked>
                    <br>
                    <label for="ataque1">atacar</label>
                    <input type="radio" name="combate" value="atacar" id="ataque1">
                    <br>
                    <label for="vidadegoku">vida de goku</label><br>
                    <input type="number" id="vidadegoku" value="20" disabled>
                    <br>
                    <label for="vidadefrezzer1">vida de frezzer</label>
                    <input type="number" id="vidadefrezzer1" value="20" disabled>
                    <input type="button" id="comienzo1" value="iniciar"><br><label for="turno1">turnos</label><input type="number" id="turno1" value="20" disabled>
                    </form>
                    <div class="friezaesquiva" id="friezaesquiva1">
                    <img src="friezaguardia.webp" alt="frieza esquiva" width="200">
                </div>
                <div class="gokuesquiva" id="gokuesquiva1">
                <img src="gokuesquiva.webp" alt="goku esquiva" width="200">
                </div>
                <div class="friezapoder" id="friezapoder1">
                <img src="friezapoder.webp" alt="frieza lanza poder" width="200">
                </div>
                <div class="gokupoder" id="gokupoder1">
                <img src="friezakameha.webp" alt="goku lanza kamehame" width="200">
                </div>
            <article id="goku1"><img src="Card_1022630_artwork_apng.webp" alt="goku"></article>
        </section>
        <section id="videorematef">
            <video id="rematef" src="frezzer.mp4" controls width="200">ganas</video>
        </section>
        <section id="videoremateg">
            <video id="remategoku" src="goku.mp4" controls width="200"></video>
        </section>
        `;
   document.body.appendChild(contenedor);
    
   btninicio.style.display='none';
   document.getElementById("comienzo1").addEventListener("click",pelea);
}

btninicio.addEventListener("click",inicio);

let Freezer ={nombre: "freezer", ataque:10, velocidad:10}
let Goku = {nombre: "goku", ataque:20, velocidad: 20}
const personajes = [Freezer,{...Goku}]
let puntos=20;
let stats = document.getElementById("stat")
let ataque= document.getElementById("ataque")
let velocidad= document.getElementById("velocidad")

let aumentarataque= document.getElementById("aumentarataque")
let aumentarvelocidad= document.getElementById("aumentarvelocidad");

function aumentarAtaque() {
    puntos > 0 
    ? (()=>{
            Freezer.ataque += 1;
            puntos -= 1;
            if(puntos==0){
                btninicio.style.display="block";
            }
        })() 
    : alert('no se puede aumentar');
    document.getElementById("ataque").innerText=Freezer.ataque;
    stats.innerHTML=puntos;
    localStorage.setItem('luchadores', JSON.stringify(personajes));
    luchadores = localStorage.getItem('luchadores');
}
function aumentarVelocidad() {
    puntos > 0 
    ? (()=>{
            Freezer.velocidad += 1;
            puntos -= 1;
            if(puntos==0){
                btninicio.style.display="block";
            }
        })() 
    : alert('no se puede aumentar');
    document.getElementById("velocidad").innerText=Freezer.velocidad;
    stats.innerHTML=puntos;
    localStorage.setItem('luchadores', JSON.stringify(personajes));
    luchadores = localStorage.getItem('luchadores');
}

aumentarataque.addEventListener("click",aumentarAtaque)

aumentarvelocidad.addEventListener("click",aumentarVelocidad)

function pelea() {
    document.getElementById('friezaesquiva1').style.display = 'none';
    document.getElementById('gokupoder1').style.display = 'none';
    document.getElementById('friezapoder1').style.display = 'none';
    document.getElementById('gokuesquiva1').style.display = 'none';
    document.getElementById('videorematef').style.display= 'none';
    document.getElementById('videoremateg').style.display= 'none';

    let jugadoresquiva = document.getElementById('defensa1').checked;
    let jugadorataque = document.getElementById('ataque1').checked;

    let vidafrezzer = parseInt(document.getElementById('vidadefrezzer1').value);
    let vidagoku = parseInt(document.getElementById('vidadegoku').value);

    if (jugadoresquiva) {
        let numerod = Math.random() * Freezer.velocidad;
        if (numerod > 10) {
            alert('Esquive logrado');
            vidagoku -= 3;
            document.getElementById('vidadefrezzer1').value = vidafrezzer;
            document.getElementById('friezaesquiva1').style.display = 'block';
            alert('Contrataque lanzado');
            document.getElementById('friezapoder1').style.display = 'block';
            document.getElementById('vidadegoku').value = vidagoku;
        } else {
            alert('Esquive fallido');
            vidafrezzer -= 3;
            document.getElementById('vidadefrezzer1').value = vidafrezzer;
            document.getElementById('gokupoder1').style.display = 'block';
        }
    } else if (jugadorataque) {
        let numeroa = Math.random()* 30;
        if (numeroa < Freezer.ataque ) {
            alert('Ataque acertado');
            vidagoku -= 5;
            document.getElementById('vidadegoku').value = vidagoku;
            document.getElementById('friezapoder1').style.display = 'block';
        } else {
            alert('Ataque fallido');
            vidafrezzer -= 5;
            document.getElementById('vidadefrezzer1').value = vidafrezzer;
            document.getElementById('gokuesquiva1').style.display = 'block';
            alert('Contrataque de Goku!');
            document.getElementById('gokupoder1').style.display = 'block';
        }
    }

    let turnorestante = parseInt(document.getElementById('turno1').value);
    document.getElementById('turno1').value = turnorestante - 1;

    if (turnorestante <= 0 || vidafrezzer <= 0) {
        document.getElementById('turno1').value = 0;
        alert('Goku wins!');
        document.getElementById('videoremateg').style.display='block';
        document.getElementById('remategoku').play();
        document.getElementById('reiniciar').style.display='block'

    } else if (vidagoku <= 0) {
        alert('Freezer wins!');
        document.getElementById('videorematef').style.display='block';
        document.getElementById('rematef').play();
        document.getElementById('reiniciar').style.display='block';
    }
}

    document.getElementById('reiniciar').addEventListener("click",()=>{
    Freezer.ataque=10;
    Freezer.velocidad=10;
    document.getElementById("ataque").innerText=10;
    document.getElementById("velocidad").innerText=10;
    puntos=20;
    document.getElementById("stat").innerHTML=20;
    document.getElementById("caja").style.display='none';
    localStorage.clear();
    document.getElementById('reiniciar').style.display='none';
    btninicio.style.display='block';
});
    


