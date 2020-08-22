
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
    if (all == 0) {
        tag = document.getElementById(`${ubicacion}`).firstChild;
        tag.parentNode.removeChild(tag);
    }
    else {
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
const crearJugador = async () => {
    const { value: nombre } = await Swal.fire({
        title: '¿Cual es su nombre?',
        input: 'text',
        inputPlaceholder: 'Escriba aquí su nombre',
        showCancelButton: false,
        inputValidator: (value) => {
            if (!value) {
                return 'Es necesario ingresar su nombre'
            }
        }
    });
    let existe, numero;
    let info = "";
    let numeros = [];

    for (i = 0; i < 5; i++) {
        do {

            const { value: num } = await Swal.fire({
                title: `${(i + 1)}° número de apuesta ${info}`,
                input: 'text',
                inputPlaceholder: 'Escriba un número del 0 al 99',
                showCancelButton: false,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Es necesario ingresar un número'
                    }
                }
            });


            existe = true;
            if ((num > 0) && (num < 99)) {
                numero = num;
                existe = false;
                info = "";
            }
            else {
                info = "[=>FUERA DE RANGO<=]";
            }
        } while (existe)
        numeros.push(numero);
    }

    let jugadores = new Array({ nombre: nombre, numeros: numeros });

    saveList(jugadores);

}
/**
 * Resuelve juego
 * @author RABI LEONEL LEON CHAN
 */
const jugar = () => {
    let arrayNumGanador = [];
    let isWinner = false;
    let countGanador = 0;
    for (var i = 0; i < 5; i++) {
        arrayNumGanador.push(Math.ceil(getRandomArbitrary(0, 99)));
    }

    createElement("numganador", arrayNumGanador);

    for (var j = 0; j < arrayJugadores.length; j++) {
        for (var k = 0; k < arrayJugadores[j].numeros.length; k++) {
            let result = arrayNumGanador.find(element => element == arrayJugadores[j].numeros[k]);
            if (result === undefined) {
                isWinner = false;
                break;
            }
            else
                isWinner = true;
        }
        if (isWinner) {
            document.getElementById("Apostar").disabled = true;
            document.getElementById("Jugar").disabled = true;
            document.getElementById("Reiniciar").hidden = false;
            countGanador++;
            createElement("ganador", `Felicidades!! ${arrayJugadores[j].nombre.toUpperCase()} Ganaste con tu números de apuesta ${arrayJugadores[j].numeros}`);
        }
    }

    if (countGanador == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Sorteo Terminado',
            html: `<strong>Número Ganador: ${arrayNumGanador}</strong> <br/> <strong>Ganadores: ${countGanador}</strong> <br/>El monto se suma para el próximo sorteo`,
        });

        arrayJugadores = [];
        removeElement("numganador");
        removeElement("jugadores", 1);
        removeElement("premio");
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
        createElement("jugadores", `Nombre: <strong> ${jugadores[0].nombre.toUpperCase()}</strong> &nbspNúmeros a jugar: ${jugadores[0].numeros}`);
        cont++;
    }

    return crearJugador;
}

const Refresh = () => {
    location.reload();
}

const newPremio = cantidadPremios(1000);
newPremio();
var saveList = apostar();
var arrayJugadores = [];
let juegoCompletado = false;
Swal.fire({
    title: 'Bienvenido',
    text: '1. Para iniciar el juego haga click en APOSTAR, usted podrá apuntar 5 números.\n2.Seguidamente haga click en JUGAR para iniciar el sorteo'
});










