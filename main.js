window.onload = function() {
    document.querySelector(".modal").style.display = "grid";
}

document.querySelector(".boton_aceptar").addEventListener("click", function() {
    document.querySelector(".modal").style.display = "none";
})

document.querySelector(".instrucciones").addEventListener("click", function() {
    document.querySelector(".modal_instrucciones").style.display = "grid";
})

document.querySelector(".boton_instrucciones_aceptar").addEventListener("click", function() {
    document.querySelector(".modal_instrucciones").style.display = "none";
})

document.querySelector(".jugar").addEventListener('mouseover', function(e) {
    e.target.textContent = "NUEVO JUEGO";
})

document.querySelector(".jugar").addEventListener('mouseout', function(e) {
    e.target.textContent = "JUGAR";
})
