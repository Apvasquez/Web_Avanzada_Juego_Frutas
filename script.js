var jugando=false;
var puntaje;
var vidas;
var frutas=['apple','banana','cherry','grapes','mango','orange','peach','pera','watermelon','pine'];
var movimiento;
var accion;
$(function(){
    $("#inicioreset").click(function(){
        if(jugando==true){
            location.reload();
        }else{
            jugando==true;
            puntaje=0;
            $("#valorPuntaje").html(puntaje);
            $("#vidas").show();
            vidas=3;
            //Generar las vidas
            generarVidas();
            //Ocultar el mensaje 
            $("#gameover").hide();
            $("#inicioreset").html("Reiniciar juego");
            comenzar();
        }
    });

$("#fruta").mouseover(function(){
    puntaje++;
    $("#valorPuntaje").html(puntaje);
    clearInterval(accion);
    $("#fruta").hide("explode",100);
    $("#sonido")[0].play();
    setTimeout(comenzar,500);

});


function generarVidas(){
    $("#vidas").empty();
    for(i=0;i<vidas;i++){
        $("#vidas").append('<img src="images/heart.png" class="vida">');
    }
}

function comenzar(){
    $("#fruta").show();
    //Generar fruta dee manera aleatoria
    generarFruta();
    //Generar una posicion horizontal aleatoria
    $("#fruta").css({'left':Math.round(550*Math.random()),'top':-50});
    movimiento=1+Math.round(5*Math.random());
// desplazar la fruta
accion=setInterval(function(){
    //mover la fruta
    $("#fruta").css('top', $("#fruta").position().top +movimiento);
    // verificar si la fruta llega al borde inferior
    if($("#fruta").position().top>$("#contenedorfrutas").height()){ //llega abajo mayor que el 
        if(vidas>1){
            $("#fruta").show();
            generarFruta();
            $("#fruta").css({'left':Math.round(550*Math.random()),'top':-50});
            movimiento=1+Math.round(5*Math.random());
            vidas--;  
            generarVidas();         

        }else{
            jugando==false;
            $("#inicioreset").html("Iniciar Juego");
            $("#gameover").show();
            $("#gameover").html('<p> Game Over!!</p> <p>Su puntaje es ' +puntaje +'</p>');
            $("#vidas").hide();
            //finalizar el desplazamiento de las frutas
            finalizar();
        }
    }
},10);
}

function generarFruta(){
    $("#fruta").attr('src','images/' + frutas[Math.round(9*Math.random())]+'.png');
}
function finalizar(){
    clearInterval(accion);
    $("#fruta").hide();
}

})