var life = 3;

function actualizarVida() {
    var cont=3;
    life--;
    document.querySelectorAll(".heart").forEach(heart => {
        cont--;
        if(cont==life) heart.style.color = "#a09b98";
    })
}

function mover(accion, mapaActual, mapaMinas){
    acciones = ["up", "down", "left", "right"]
    if(acciones.indexOf(accion) == -1){
        return "error: accion no definida"
    }
    CARACTER_FIN = "@"
    if(mapaActual.indexOf(CARACTER_FIN) >= 0){
        return "error: no se puede ejecutar más acciones"
    }
    matrixActual = mapaActual.trim().split("\n")
    matrixMinas = mapaMinas.trim().split("\n")
    if(matrixActual.length == 0){
        return "error: mapa actual no puede ser vacío"
    }
    if(matrixMinas.length == 0){
        return "error: mapa minas no puede ser vacío"
    }
    rowsActual = matrixActual.length
    colsActual = matrixActual[0].length
    for(i = 0; i < matrixActual.length; i++){
        if(matrixActual[i].length != colsActual){
            return "error: dimensiones incorrectas para mapa actual"
        }
        matrixActual[i] = matrixActual[i].split("")
    }    
    rowsMinas = matrixMinas.length
    colsMinas = matrixMinas[0].length
    for(i = 0; i < matrixMinas.length; i++){
        if(matrixMinas[i].length != colsMinas){
            return "error: dimensiones incorrectas para mapa minas"
        }
    }
    if(rowsActual != rowsMinas || colsActual != colsMinas){
        return "error: dimesiones distintas para mapa actual y minas"
    }
    CARACTER_POSICION_ACTUAL = "+"
    x = -1
    y = -1
    for(i = 0; i < matrixActual.length; i++){
        x = matrixActual[i].indexOf(CARACTER_POSICION_ACTUAL)
        if(x >= 0){
            y = i
            break
        }
    }
    x0 = x
    y0 = y
    switch(accion){
        case 'up':
            y--
            break;
        case 'down':
            y++
            break;
        case 'left':
            x--
            break;
        case 'right':
            x++
            break;
    }
    if(x < 0){
        x = 0
    }
    if(x >= colsActual){
        x = colsActual - 1
    }
    if(y < 0){
        y = 0
    }
    if(y >= rowsActual){
        y = rowsActual - 1
    }
    
    CARACTER_MINA = "$"
    CARACTER_META = "#"
    CARACTER_VACIO = "0"
    if(CARACTER_MINA == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_MINA
    }else if(CARACTER_META == matrixMinas[y][x]){
        matrixActual[y][x] = CARACTER_FIN
        matrixActual[y0][x0] = CARACTER_VACIO
    }else{
        //avanzar        
        matrixActual[y0][x0] = CARACTER_VACIO
        matrixActual[y][x] = CARACTER_POSICION_ACTUAL
    }
    result = []
    for(i = 0 ; i < matrixActual.length ; i++){
        result.push(matrixActual[i].join(""))
    }
    return result.join("\n")
}
function obtenerResultado(mapaActual, mapaPrevio){
    if(mapaActual == mapaPrevio){
        return "sin cambios"
    }
    if((mapaActual.match(/@/g) || []).length){
        return "fin"
    }
    minasActual = (mapaActual.match(/\$/g) || []).length
    minasPrevio = (mapaPrevio.match(/\$/g) || []).length
    if(minasActual > minasPrevio ){        
        return "mina"
    }
    if(minasActual == minasPrevio ){
        return "sin mina"
    }    
}
function obtenerMatrixDeMapa(mapa){
    matrixMapa = mapa.trim().split("\n")
    for(i = 0; i < matrixMapa.length; i++){
        matrixMapa[i] = matrixMapa[i].split("")
    }
    return matrixMapa
}

//////////////////////////////////////////////////////////////////////




for (i = 0; i < 25; i++) {
    var div = document.createElement("div");
    var car = document.createElement("div");
    car.className = "car " + "c" + i;
    div.appendChild(car);
    document.querySelector(".container").appendChild(div);
}

function actualizarMatriz(matriz) {
    var cont = 0;
    matriz.forEach(x => {
        x.forEach(y => {
            document.querySelector(`.c${cont}`).textContent = y;
            document.querySelector(`.c${cont}`).parentElement.style.backgroundColor = "";
            if(y==='+') {
                document.querySelector(`.c${cont}`).innerHTML = '<img src="https://opengameart.org/sites/default/files/robot-idle.gif">';                
            }
            if(y==='0' || y=='#') {
                document.querySelector(`.c${cont}`).textContent = "";
                document.querySelector(`.c${cont}`).parentElement.style.backgroundColor = "#70B7E0";
            }
            if(y=='$') {
                document.querySelector(`.c${cont}`).innerHTML = '<img src="https://esraa-alaarag.github.io/Minesweeper/images/bomb.png">';                
            }
            if(y=='@') {
                document.querySelector(`.c${cont}`).innerHTML = '<img src="https://cdnb.artstation.com/p/assets/images/images/011/517/245/original/isa-deu-flag.gif?1529988984">';                    
            }
            cont++;
        });
    });
}

//ejemplo
mapaInicial = `
0000#
00000
00000
00000
+0000
`
mapaMinas = `
0000#
0$$$0
0$000
0$000
+$000
`

mapaActual = mapaInicial
console.log(mapaActual)
mapaPrevio = mapaActual
actualizarMatriz(obtenerMatrixDeMapa(mapaActual));

document.querySelectorAll(".arrow").forEach(arrow => {
    arrow.firstChild.addEventListener("click", function() {
        if(life>0) {
            var clase = arrow.firstChild.className;
            if(clase.includes("up")) mapaActual = mover("up", mapaActual, mapaMinas);
            else if(clase.includes("down")) mapaActual = mover("down", mapaActual, mapaMinas);
            else if(clase.includes("right")) mapaActual = mover("right", mapaActual, mapaMinas);
            else if(clase.includes("left")) mapaActual = mover("left", mapaActual, mapaMinas);
            actualizarMatriz(obtenerMatrixDeMapa(mapaActual));        
            var resultado = obtenerResultado(mapaActual, mapaPrevio);
            if(resultado == "fin") mostrarPerder();
            else if(resultado == "mina") actualizarVida();  
            mapaPrevio = mapaActual;  
        }              
    })
})

document.addEventListener("keydown", function(e) {  
    if(life>0){
        switch (e.key) {
            case "ArrowUp":
                mapaActual = mover("up", mapaActual, mapaMinas) 
              break;
            case "ArrowDown":
                mapaActual = mover("down", mapaActual, mapaMinas)
                break;
            case "ArrowRight":
                mapaActual = mover("right", mapaActual, mapaMinas)
                break;
            case "ArrowLeft":
                mapaActual = mover("left", mapaActual, mapaMinas)
                break;
            default:         
              break;
        } 
        actualizarMatriz(obtenerMatrixDeMapa(mapaActual));
        var resultado = obtenerResultado(mapaActual, mapaPrevio);
        if(resultado == "fin") {
            document.querySelector(".ganar").style.display = "grid";
            life = 0;
        }
        else if(resultado == "mina") actualizarVida();    
        verificarEstado();
        mapaPrevio = mapaActual;   
    }
     
})

document.querySelector(".regresar").addEventListener("click", function() {
    window.location.href='../index.html'
})

document.querySelectorAll(".boton_aceptar").forEach(boton => {
    boton.addEventListener('click', function(){
        document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
    })
})

function verificarEstado() {
    if(life<0) life=0;
    if(life==0) {    
        document.querySelector(".perder").style.display = "grid";
    }
}

document.querySelector(".reiniciar").addEventListener("click", function() {
    window.location.href = "./Jugar.html";
}) 









