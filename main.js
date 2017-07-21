var numAsiento;
var arreglo = [];
var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var dni = document.getElementById("dni");
var asiento = document.getElementById("asiento");
var celdas = document.getElementsByTagName("td");
for(var i = 0; i < celdas.length; i++)
{
    celdas[i].addEventListener("click", redirect, false);
    arreglo[i] = new Info(undefined, undefined, undefined, undefined);
}

function redirect(event)
{
    numAsiento = (event.target.textContent);
    asiento.value = numAsiento;
    mostrar(numAsiento - 1);
    nombre.focus();
}

function Info(nombre, apellido, dni, asiento)
{
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.asiento = asiento;
}

function reservar()
{
    if(asiento.value != "" && nombre.value != "" && apellido.value != "" && dni.value != "")
    {
        arreglo[numAsiento - 1] = new Info(nombre.value, apellido.value, dni.value, numAsiento);
        limpiarTodo(true);
        for(var i in celdas)
        {
            if(celdas[i].textContent == numAsiento)
            {
                celdas[i].firstChild.style = "background-color: #ffd1a3";
                break;
            }
        }
    }
    else
    {
        alert("Faltan datos");
        nombre.focus();
    }
}

function mostrar(num)
{
    if(arreglo[num].nombre != undefined)
    {
        nombre.value = arreglo[num].nombre;
        apellido.value = arreglo[num].apellido;
        dni.value = arreglo[num].dni;
    }
    else
    {
        limpiarTodo(false);
    }
}

function cancelar()
{
    if(arreglo[numAsiento - 1].nombre != undefined)
    {
        arreglo[numAsiento - 1] = new Info(undefined, undefined, undefined, undefined);
        limpiarTodo(true);
    }
    for(var i in celdas)
    {
        if(celdas[i].textContent == numAsiento)
        {
            celdas[i].firstChild.style.backgroundColor = "";
            break;
        }
    }
}

function buscar()
{
    var dniBuscar = document.getElementById("dniBuscar");
    for(var i in arreglo)
    {
        if(dniBuscar.value == arreglo[i].dni)
        {
            mostrar(i);
            asiento.value = arreglo[i].asiento;
            break;
        }
        else
        {
            if(i == arreglo.length - 1)
            {
                limpiarTodo(true);
                alert("No se encontro el DNI");
            }
        }
    }
    dniBuscar.value = "";
    dniBuscar.focus();
}

function listar()
{
    var contenedor = "";
    for(var i in arreglo)
    {
        if(arreglo[i].nombre != undefined)
        {
            contenedor += "<p><b>Nombre:</b> " + arreglo[i].nombre + "<br>";
            contenedor += "<b>Apellido:</b> " + arreglo[i].apellido + "<br>";
            contenedor += "<b>DNI:</b> " + arreglo[i].dni + "<br>";
            contenedor += "<b>Asiento:</b> " + arreglo[i].asiento + "</p>";
        }
    }
    document.getElementById("listar").innerHTML = contenedor;
}

function limpiarTodo(todo)
{
    nombre.value = "";
    apellido.value = "";
    dni.value = "";
    if(todo)
    {
        asiento.value = "";
    }
}