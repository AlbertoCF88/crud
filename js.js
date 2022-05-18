console.log("crud");
//obtener año de hoy
var fecha = new Date();
var hoy = fecha.getFullYear();

//usuarios de muestra
var listaUser = [
  {
    nombre: "User1",
    apellidos: "Apellido1",
    poblacion: "poblacion",
    nacimiento: 1988,
    edad: hoy - 1988,
  },
  {
    nombre: "User2",
    apellidos: "Apellido2",
    poblacion: "poblacion2",
    nacimiento: 1990,
    edad: hoy - 1990,
  },
];

var cambioArray = listaUser;
////////////////////mostras lsita/////////////////////////////////////////
function Mostrardatros( donde) {
  //donde es el id de salida: ingresarUser o listaFiltrada
  if (donde == "ingresarUser") {
    document.getElementById("ingresarUser").innerHTML = "";
  } else {
    document.getElementById("trFiltro").innerHTML = "";
  }

  cambioArray.forEach((user, index) => {
    document.getElementById(donde).innerHTML += plantillaTr(user, index, donde);
  });
}
///plantilla TR
function plantillaTr(user, index, donde) {
  if (donde == "ingresarUser") {
    let plantila = `<tr class="selector" >
        <td  class="text-center text-capitalize">${user.nombre}</td>
        <td  class="text-center text-capitalize">${user.apellidos}</td>
        <td  class="text-center text-capitalize">${user.poblacion}</td>
        <td  class="text-center">${user.nacimiento}</td>
        <td  class="text-center">${user.edad}</td> 
        <td  class="text-center">
        <div class="btn-group" role="group" data-posicion="${index}">
          <button class="btn btn-outline-success" onclick="editarUser(this)">Editar</button>
          <button type="button" class="btn btn-outline-danger" onclick="eliminarModal(this)"
            data-bs-toggle="modal" data-bs-target="#modal">
              Eliminar
          </button>
        </div>
    </tr>`;
    return plantila;
  } else {
    let plantilla2 = `<tr >
        <td  class="text-center text-capitalize">${user.nombre}</td>
        <td  class="text-center text-capitalize">${user.apellidos}</td>
        <td  class="text-center text-capitalize">${user.poblacion}</td>
        <td  class="text-center">${user.nacimiento}</td>
        <td  class="text-center">${user.edad}</td> 
        <td  class="text-center">
    </tr>`;
    return plantilla2;
  }
}
/////////////////añadir usuario///////////////////////////////////////////////
function addUser() {
  let inputNombre = document.getElementById("nombre").value.toLocaleLowerCase();
  let inputApellidos = document.getElementById("apellidos").value.toLocaleLowerCase();
  let inputPoblacion = document.getElementById("poblacion").value.toLocaleLowerCase();

  let inputAnio = document.getElementById("anio").value;
  //limpar espacios texto
  inputNombre = quitaEspacios(inputNombre);
  inputApellidos = quitaEspacios(inputApellidos);
  inputPoblacion = quitaEspacios(inputPoblacion);

  //verificar datos
  let correcto = verificarDatos(
    inputNombre,
    inputApellidos,
    inputPoblacion,
    inputAnio
  );
  if (correcto) {
    crearObjetoUser(inputNombre, inputApellidos, inputPoblacion, inputAnio);
  }
}
//verificar datos
function verificarDatos(
  inputNombre,
  inputApellidos,
  inputPoblacion,
  inputAnio
) {
  //verificar datos en blanco
  let verificaN = false;
  let verificaA = false;
  let verificaP = false;
  let verificaAnio = false;
  if (inputNombre == "") {
    document.getElementById("nombre").classList.add("is-invalid");
  } else {
    verificaN = true;
    document.getElementById("nombre").classList.remove("is-invalid");
  }
  if (inputApellidos == "") {
    document.getElementById("apellidos").classList.add("is-invalid");
  } else {
    verificaA = true;
    document.getElementById("apellidos").classList.remove("is-invalid");
  }
  if (inputPoblacion == "") {
    document.getElementById("poblacion").classList.add("is-invalid");
  } else {
    verificaP = true;
    document.getElementById("poblacion").classList.remove("is-invalid");
  }
  if (inputAnio == "" || inputAnio < 1900 || inputAnio == "e") {
    document.getElementById("anio").classList.add("is-invalid");
  } else {
    let inputAnio = parseInt(document.getElementById("anio").value);
    verificaAnio = true;
    document.getElementById("anio").classList.remove("is-invalid");
  }
  //si todo es corecto retorna true
  if (
    verificaN == true &&
    verificaA == true &&
    verificaP == true &&
    verificaAnio == true
  ) {
    let correcto = true;
    return correcto;
  }
}
//limpiar espacios
function quitaEspacios(texto) {
  texto = texto.trim();
  do {
    texto = texto.replaceAll("  ", " ");
  } while (texto.indexOf("  ") != -1);
  return texto;
}
//////////crear nuevo user////////////////////////////////////////////
function crearObjetoUser(nombre, apellido, poblacion, anio) {
  //nuevo user
  ob = {
    nombre: nombre,
    apellidos: apellido,
    poblacion: poblacion,
    nacimiento: anio,
    edad: hoy - anio,
  };
  ////año logicamente incorrecto
  let respuesta = edadNegativa(ob)
  if (respuesta == true) {
    listaUser.push(ob);
  }
  //limpiar inputs
  limpiaInputs();
  //mostrar lista
  cambioArray=listaUser;
  Mostrardatros( "ingresarUser");
  scroll();
}
function edadNegativa(ob) {
  ////año logicamente incorrecto
  let respuesta = false;
  if (ob.edad < 0) {
    let alerta = ` 
    <div class="modal d-block" style="top:100px">
      <div class="mod modal-content">
        <div class="alert alert-danger d-flex justify-content-around" role="alert">
            <span> Fecha de nacimiento invalida</span>
            <button type="button" class="btn-close" onclick="cerrarAlerta()"></button>
        </div>
      </div>
    </div>
      `;
    document.getElementById("alertas").innerHTML = alerta;
    setTimeout(function () {
      document.getElementById("alertas").innerHTML = "";
    }, 2500);
    return respuesta = false;
  } else {
    return respuesta = true;
  }
}
function cerrarAlerta() {
  document.getElementById("alertas").innerHTML = "";
}
/////eliminar//////////////////////////////////////////////////////
function eliminarModal(_este) {
  //le paso texto al modal
  let index = _este.parentNode.dataset.posicion;
  document.getElementById("ModalLabel").textContent =
  cambioArray[index].nombre + " " + cambioArray[index].apellidos;
  //Aasignar onclik al btn aceptar ventana modal
  document.getElementById("btnCancelar").onclick = function () {
    eliminarUser(_este);
  };
}
function eliminarUser(_este) {
  let index = _este.parentNode.dataset.posicion;
  let listaTr = document.querySelectorAll("tr.selector");
  //animacion borrar
  listaTr[index].classList.add("flash");
  setTimeout(function () {
    cambioArray.splice(index, 1);
    Mostrardatros( "ingresarUser");
  }, 1100);
}
//////editar////////////////////////////////////////////////////////
function editarUser(_este) {
  //mostrar datos en los inputs
  let index = _este.parentNode.dataset.posicion;

  console.log("array", cambioArray)
  //dos arrays uno para los sort y otro  el original
  document.getElementById("nombre").value = cambioArray[index].nombre;
  document.getElementById("apellidos").value = cambioArray[index].apellidos;
  document.getElementById("poblacion").value = cambioArray[index].poblacion;
  document.getElementById("anio").value = cambioArray[index].nacimiento;

  //botones, mostrar uno y ocultar el otro
  document.getElementById("aceptarEditar").className = "d-block";
  document.getElementById("añadir").className = "d-none";

  document.getElementById("btnEditar").onclick = function () {
    AceptarUserEditar(_este, index);
  };
}

function AceptarUserEditar(_este, index) {
  //crear nuevo objeto si acepta
  let nombre = document.getElementById("nombre").value.toLocaleLowerCase();
  let apelllido = document
    .getElementById("apellidos")
    .value.toLocaleLowerCase();
  let pobla = document.getElementById("poblacion").value.toLocaleLowerCase();
  let naci = document.getElementById("anio").value;

  //verificar datos
  let correcto = verificarDatos(nombre, apelllido, pobla, naci);
  if (correcto) {
    obEditado(nombre, apelllido, pobla, naci, _este);
  } else {
    //si no es correcta la comprobvacion volver al principio de editar
    editarUser();
  }
  //botones
  document.getElementById("aceptarEditar").className = "d-none";
  document.getElementById("añadir").className = "d-block";
}
function obEditado(nombre, apellido, poblacion, anio, index) {
  let indice = index.parentNode.dataset.posicion;
  //crear nuevo objeto
  ob = {
    nombre: nombre,
    apellidos: apellido,
    poblacion: poblacion,
    nacimiento: anio,
    edad: hoy - anio,
  };
  //edad negativa

  let respuesta = edadNegativa(ob)
  if (respuesta == true) {
    //remplazar objeto por el editado
    listaUser.splice(indice, 1, ob);
  }
  //limpiar inputs
  limpiaInputs();
  //mostrar nueva lista
  Mostrardatros("ingresarUser");
}
//btn cancelar editar
function cancelarEditar() {
  document.getElementById("aceptarEditar").className = "d-none";
  document.getElementById("añadir").className = "d-block";
  limpiaInputs();
}
///////////filtros/////////
//cambiar los iconos de las flechas botones
var cuentaNombre = 0;

function ordenarIcono(_this, _propiedad) {
  cuentaNombre++;

  switch (cuentaNombre) {
    case 0:
      _this.childNodes[1].className = "bi bi-arrow-down-up text-danger px-2";
      Mostrardatros( "ingresarUser");
      break;
    case 1:
      _this.childNodes[1].className = "bi bi-arrow-up-short text-danger px-2";
      ordenarArray(_propiedad, 1);
      break;
    case 2:
      _this.childNodes[1].className = "bi bi-arrow-down-short text-danger px-2";
      ordenarArray(_propiedad, -1);
      break;
    default:
      cuentaNombre = 0;
      _this.childNodes[1].className = "bi bi-arrow-down-up text-danger px-2";
      Mostrardatros("ingresarUser");
      break;
  }
}
//ordenar alfabeticamente
function ordenarArray(propiedad, orden) {
  //array, posicion, 1 o -1
  nuevoArray = Array.from(listaUser);
  nuevoArray.sort(function (a, b) {
    if (a[propiedad] === b[propiedad]) {
      return 0;
    } else {
      return (a[propiedad] > b[propiedad] ? 1 : -1) * orden;
    }
  });
  cambioArray = nuevoArray
  Mostrardatros("ingresarUser");
}

//filtrar por edad
var btnFiltro = true;
var nuevoArray
function filtroEdad(_this) {
  let filtroInput = document.getElementById("filtroInput").value;
  let filtroInput2 = document.getElementById("filtroInput2").value;
  //input vacio
  if (filtroInput == "" || filtroInput2 == "") {
    document.getElementById("filtroInput").value = "";
    document.getElementById("filtroInput2").value = "";
    return;
  }
  filtroInput = parseInt(filtroInput);
  filtroInput2 = parseInt(filtroInput2);
  //botones
  btnFiltro = !btnFiltro;
  cambioBotonFiltro(_this);
  //cambio orden
  if (filtroInput > filtroInput2) {
    let intermedio = filtroInput2;
    filtroInput2 = filtroInput;
    filtroInput = intermedio;
  }

  if (btnFiltro == false) {
    //copia array
    nuevoArray = Array.from(listaUser);
    nuevoArray = nuevoArray.filter(
      (ob) => ob.edad >= filtroInput && ob.edad <= filtroInput2
    );
    document.getElementById("encontrados").textContent = nuevoArray.length;
    cambioArray = nuevoArray;
    Mostrardatros( "trFiltro");
  } else {
    document.getElementById("filtroInput").value = "";
    document.getElementById("filtroInput2").value = "";
  }
}

function cambioBotonFiltro(_this) {
  if (btnFiltro) {
    _this.textContent = "Buscar";
    _this.className = "btn btn-outline-primary w-100";
    document.getElementById("listado").style.display = "block";
    document.getElementById("listaFiltrada").style.display = "none";
  } else {
    _this.textContent = "Salir de la busqueda";
    _this.className = "btn btn-outline-danger w-100";
    document.getElementById("listado").style.display = "none";
    document.getElementById("listaFiltrada").style.display = "block";
  }
}
////////////limpiar inputs/////////////////////////////////////
function limpiaInputs() {
  //limpiar inputs
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("poblacion").value = "";
  document.getElementById("anio").value = "";
}

//llamar a lista para cerar los usuarios de muestra
Mostrardatros( "ingresarUser");




/////////////////////////Crear comunidades//////////////////////////////
var dataComunidad = 1;
//boton subir
function arriba() {
  dataComunidad++
  if (dataComunidad >= 19) {
    dataComunidad = 19
  }
  crearComunidad()
}
//bootn bajar
function abajo() {
  dataComunidad--
  if (dataComunidad <= 1) {
    dataComunidad = 1
  }
  crearComunidad()
}
//crear comunnidad
function crearComunidad() {
  switch (dataComunidad) {
    case 1:
      let plantilla1 = ` 
      <div class="btn-group dropend">
      <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
          data-bs-toggle="dropdown" aria-expanded="false">
          Galicia
      </button>
      <ul class="dropdown-menu text-center ">
          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Lugo</li>
          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Ourense</li>
          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">la Coruña</li>
          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Pontevedra</li>
      </ul>
  </div> `
      document.getElementById('comunidades').innerHTML = plantilla1
      break;
    case 2:
      let plantilla2 = ` 
        <div class="btn-group dropend">
        <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
            data-bs-toggle="dropdown" aria-expanded="false">
            Asturias
        </button>
        <ul class="dropdown-menu text-center ">
            <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Asturias</li>
        </ul>
      </div>`
      document.getElementById('comunidades').innerHTML = plantilla2
      break;
    case 3:
      let plantilla3 = ` 
          <div class="btn-group dropend">
          <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
              data-bs-toggle="dropdown" aria-expanded="false">
              Cantabria
          </button>
          <ul class="dropdown-menu text-center ">
              <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Santander</li>
          </ul>
        </div>`
      document.getElementById('comunidades').innerHTML = plantilla3
      break;
    case 4:
      let plantilla4 = ` 
            <div class="btn-group dropend">
            <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                data-bs-toggle="dropdown" aria-expanded="false">
                Pais vasco
            </button>
            <ul class="dropdown-menu text-center ">
              <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Álava</li>
              <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Guipuzcua</li>
              <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Vizcaya</li>
            </ul>
          </div>`
      document.getElementById('comunidades').innerHTML = plantilla4
      break;
    case 5:
      let plantilla5 = ` 
              <div class="btn-group dropend">
              <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Navarra
              </button>
              <ul class="dropdown-menu text-center ">
                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Pamplona</li>
              </ul>
            </div>`
      document.getElementById('comunidades').innerHTML = plantilla5
      break;
    case 6:
      let plantilla6 = ` 
                <div class="btn-group dropend">
                <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    La Rioja
                </button>
                <ul class="dropdown-menu text-center ">
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Logroño</li>
                </ul>
              </div>`
      document.getElementById('comunidades').innerHTML = plantilla6
      break;
    case 7:
      let plantilla7 = ` 
                  <div class="btn-group dropend">
                  <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      Castilla y Leon
                  </button>
                  <ul class="dropdown-menu text-center ">
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Segovia</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Ávila</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Valladolid</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Salamanca</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Zamora</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Leon</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Burgos</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Soria</li>
                  <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Palencia</li>
                  </ul>
                </div>`
      document.getElementById('comunidades').innerHTML = plantilla7
      break;
    case 8:
      let plantilla8 = ` 
                    <div class="btn-group dropend">
                    <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Aragón
                    </button>
                    <ul class="dropdown-menu text-center ">
                      <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Huesca</li>
                      <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Zaragoza</li>
                      <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Teruel</li>
                    </ul>
                  </div>`
      document.getElementById('comunidades').innerHTML = plantilla8
      break;
    case 9:
      let plantilla9 = ` 
                      <div class="btn-group dropend">
                      <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          Cataluña
                      </button>
                      <ul class="dropdown-menu text-center ">
                        <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Girona</li>
                        <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Lleida</li>
                        <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Barcelona</li>
                        <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Tarragona</li>
                      </ul>
                    </div>`
      document.getElementById('comunidades').innerHTML = plantilla9
      break;
    case 10:
      let plantilla10 = ` 
                        <div class="btn-group dropend">
                        <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Islas Baleares
                        </button>
                        <ul class="dropdown-menu text-center ">
                          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Mallorca</li>
                          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Menorca</li>
                          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Ibiza</li>
                          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Formentera</li>
                        </ul>
                      </div>`
      document.getElementById('comunidades').innerHTML = plantilla10
      break;
    case 11:
      let plantilla11 = ` 
                          <div class="btn-group dropend">
                          <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                              data-bs-toggle="dropdown" aria-expanded="false">
                              Madrid
                          </button>
                          <ul class="dropdown-menu text-center ">
                            <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Madrid</li>
                          </ul>
                        </div>`
      document.getElementById('comunidades').innerHTML = plantilla11
      break;
    case 12:
      let plantilla12 = ` 
                            <div class="btn-group dropend">
                            <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Extremadura
                            </button>
                            <ul class="dropdown-menu text-center ">
                              <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Cáceres</li>
                              <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Badajoz</li>
                            </ul>
                          </div>`
      document.getElementById('comunidades').innerHTML = plantilla12
      break;
    case 13:
      let plantilla13 = ` 
                              <div class="btn-group dropend">
                              <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                  data-bs-toggle="dropdown" aria-expanded="false">
                                  Castilla La Mancha
                              </button>
                              <ul class="dropdown-menu text-center  ">
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Cuenca</li>
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Albacete</li>
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Guadalajara</li>
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Ciudad Real</li>
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Toledo</li>
                              </ul>
                            </div>`
      document.getElementById('comunidades').innerHTML = plantilla13
      break;
    case 14:
      let plantilla14 = ` 
                              <div class="btn-group dropend">
                              <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                  data-bs-toggle="dropdown" aria-expanded="false">
                                  valencia
                              </button>
                              <ul class="dropdown-menu text-center ">
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Alicante</li>
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Valencia</li>
                                <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Castellón</li>
                              </ul>
                            </div>`
      document.getElementById('comunidades').innerHTML = plantilla14
      break;
    case 15:
      let plantilla15 = ` 
                                <div class="btn-group dropend">
                                <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Región de Murcia
                                </button>
                                <ul class="dropdown-menu text-center ">
                                  <li  class="dropdown-item text-white"  onclick="recogePoblacion(this)">Cartagena</li>
                                </ul>
                              </div>`
      document.getElementById('comunidades').innerHTML = plantilla15
      break;
    case 16:
      let plantilla16 = ` 
                                  <div class="btn-group dropend">
                                  <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                      data-bs-toggle="dropdown" aria-expanded="false">
                                      Andalucía
                                  </button>
                                  <ul class="dropdown-menu text-center ">
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Almeria</li>
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Granada</li>
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Jaén</li>
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Córdoba</li>
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Sevilla</li>
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Huelva</li>
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Málaga</li>
                                    <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Cádiz</li>
                                  </ul>
                                </div>`
      document.getElementById('comunidades').innerHTML = plantilla16
      break;
    case 17:
      let plantilla17 = ` 
                                    <div class="btn-group dropend">
                                    <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Canarias
                                    </button>
                                    <ul class="dropdown-menu text-center ">
                                      <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Santa Cruz de tenerife</li>
                                      <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Las Palmas</li>
                                    </ul>
                                  </div>`
      document.getElementById('comunidades').innerHTML = plantilla17
      break;
    case 18:
      let plantilla18 = ` 
                                      <div class="btn-group dropend">
                                      <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                          data-bs-toggle="dropdown" aria-expanded="false">
                                          Ceuta
                                      </button>
                                      <ul class="dropdown-menu text-center ">
                                        <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Ceuta</li>
                                      </ul>
                                    </div>`
      document.getElementById('comunidades').innerHTML = plantilla18
      break;
    case 19:
      let plantilla19 = ` 
                                        <div class="btn-group dropend">
                                        <button type="button" class="btn btn-secondary dropdown-toggle btnComunidad"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            Melilla
                                        </button>
                                        <ul class="dropdown-menu text-center  ">
                                          <li class="dropdown-item text-white"  onclick="recogePoblacion(this)">Melilla</li>
                                        </ul>
                                      </div>`
      document.getElementById('comunidades').innerHTML = plantilla19
      break;
    default:
      break;
  }


}

function recogePoblacion(_este) {
  //recojo texto para enviarlo al formulario
  document.getElementById('poblacion').style.color = "inherit"
  document.getElementById("poblacion").value = _este.textContent
}
function bloquearInput(_this) {
  console.log("adaw")
  _this.style.color = "white"
  _this.value = ""
}

//**añadir user bajar scroll */
function scroll() {
  let altura = document.querySelector('body').offsetHeight
  window.scrollTo(0, altura);
}

