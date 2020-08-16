
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
    }
    else
    {
        tag = document.getElementById(`${ubicacion}`);
    }
    tag.parentNode.removeChild(tag);

}
/**
 * Clousure que se encarga de sumar los premios
 * @param {int} i - valor del premio.
 * @author RABI LEONEL LEON CHAN
 */
const cantidadPremios = (i) => {
    let suma = 0;
    const SumaPremios = () => {
        suma += i;
        createElement("premio", `${suma.toFixed(2)}`);
    }
    return SumaPremios;
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

    saveList(jugadores);

}
/**
 * Resuelve juego
 * @author RABI LEONEL LEON CHAN
 */
const jugar = () => {
    let numGanador = 12345;//Math.ceil(getRandomArbitrary(10000, 50000));
    createElement("numganador", numGanador);
    let completado = false;

    for (var i = 0; i < arrayJugadores.length; i++) {
        if (arrayJugadores[i].num == numGanador) {
            completado = false;
            createElement("ganador", `Nombre: ${arrayJugadores[i].name} | Número de apuesta: ${arrayJugadores[i].num}`);
        }
        else {
            completado = true;
        }
    }
    if (completado) {
        alert("Sorteo terminado, :( el monto se agrega al siguiente sorteo.");
        arrayJugadores = [];
        removeElement("numganador");
        removeElement("jugadores",1);
        removeElement("premio");
        juegoCompletado = true;
        newPremio();
    }
}

/**
 * Clousure que se encarga de sumar los premios
 * @author RABI LEONEL LEON CHAN
 */
const apostar = () => {
    let cont = 0;
    const crearJugador = (jugadores) => {
        arrayJugadores.push(jugadores[0]);
        createElement("jugadores", `Nombre: ${arrayJugadores[cont].name} | Número de apuesta: ${arrayJugadores[cont].num}`);
        cont++;
    }

    return crearJugador;
}

const newPremio = cantidadPremios(1000);
newPremio();
var saveList = apostar();
var arrayJugadores = [];
let juegoCompletado = false;










