window.onload = function() {
    document.querySelector(".modal").style.display = "grid";
}

document.querySelector(".boton_aceptar").addEventListener("click", function() {
    document.querySelector(".modal").style.display = "none";
})