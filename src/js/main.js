
/**
 * Crea un elemento en <p> en HTML.
 * @param {string} ubicación - id del elemento padre.
 * @param {string} valor - valor del elelemento.
 * @author RABI LEONEL LEON CHAN
 */
function createElement(ubicacion, valor) {
    var p = document.createElement("p");
    p.innerHTML = `${valor}`;
    var ubi = document.getElementById(`${ubicacion}`);
    ubi.appendChild(p);
}

/**
 * Regresa un numero randon entre los valores min y max.
 * @param {int} min - valor mimnimo.
 * @param {int} max - valor maximo.
 * @returns {Number} numero ale
 * @author RABI LEONEL LEON CHAN
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Elimina un elemento de HTML
 * @author RABI LEONEL LEON CHAN
 */
function removeElement(ubicacion, all = 0) {
    var tag;
    if (all ==0)
    {
        tag = document.getElementById(`${ubicacion}`).firstChild;
        tag.parentNode.removeChild(tag);
    }
    else
    {
        tag = document.getElementById(`${ubicacion}`);

        while (tag.lastElementChild) {
            tag.removeChild(tag.lastElementChild);
        }
    }
    

}
/**
 * Clousure que se encarga de sumar los premios
 * @param {int} i - valor del premio.
 * @author RABI LEONEL LEON CHAN
 */
const cantidadPremios = () => {
    let suma = 0;
    return {
        getsuma: () =>{
            return suma;
        },
        setsuma: (i,noGano = false) => {
            if (noGano)
                suma += i;
            else
                suma = i;
            createElement("premio", ` ${suma.toFixed(2)}`);
        }
    }
    
}

function iniciaJuego(){
    let arrayGanadores = [];
    
    removeElement("numganador",1);    
    removeElement("ganador",1);  
    setTimeout(crearJugador, 100);
}

/**
 * Crea losjugadores que participaran en la rifa
 * @author RABI LEONEL LEON CHAN
 */
const crearJugador = () => {
    
    
    
    let name = prompt("Ingrese su nombre");
    let numero = prompt("Ingrese sus 5 números apostar");

    if (name == null) {
        alert("Por Favor,ingresa un nombre");
        return;
    }

    if (numero == null) {
        alert("Por Favor, Ingresa tu número de apuesta");
        return;
    }

    

    if(!numero.match(/^[0-9][0-9][0-9][0-9][0-9]$/))
    {
        alert("Solo se permiten 5 números");
        return;
    }
    let jugadores = new Array({ name: name, num: numero });

    listJugadores.setJugador(jugadores);

}
/**
 * Resuelve juego
 * @author RABI LEONEL LEON CHAN
 */
const jugar = () => {
    let arrayParticipantes = listJugadores.getJugador();
    if (arrayParticipantes.length == 0){
        alert("Primero inicie apuestas.");     
        return
    }
    let numGanador = 12345;//Math.ceil(getRandomArbitrary(10000, 50000));
    createElement("numganador", numGanador);
    
    let arrayGanadores = [];
    let cont = 0;

    for (var i = 0; i < arrayParticipantes.length; i++) {
        if (arrayParticipantes[i].num == numGanador) {
            arrayGanadores.push(arrayParticipantes[i]);
            cont ++;
            createElement("ganador", `Felicidades!! ${arrayParticipantes[i].name} Ganaste $ ${newPremio.getsuma().toFixed(2)} con tu número de apuesta ${arrayParticipantes[i].num}`);
        }
    }
    if (arrayGanadores.length == 0) {
        alert("Sorteo terminado, :( el monto se acumula para al siguiente sorteo.");  
        removeElement("premio");
        let valor = newPremio.getsuma();
        newPremio.setsuma(valor,true);   
    }
    
    limpiarDatos();
    
}

/**
 * Clousure que se encarga de sumar los premios
 * @author RABI LEONEL LEON CHAN
 */
const apostar = () => {
    let cont = 0;
    let arrayJugadores = [];
    return {
        getJugador: (jugadores) =>{
            return arrayJugadores;
        },
        setJugador: (jugadores) => {
            arrayJugadores.push(jugadores[0]);
            createElement("jugadores", `Nombre: ${arrayJugadores[cont].name} | Número de apuesta: ${arrayJugadores[cont].num}`);
            cont++;
        }
    }
}

const newPremio = cantidadPremios();
newPremio.setsuma(1000);
let listJugadores = apostar();

let noGano = false;
const limpiarDatos = () => {
    saveList = apostar();
    removeElement("jugadores",1);
    listJugadores = apostar();
    
}










