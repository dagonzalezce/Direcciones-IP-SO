function calcular(){
	inputDireccionIP1 = document.getElementById("inputDireccionIP1");
	inputMascaraDeRed = document.getElementById("inputMascaraDeRed");
	inputDireccionIP2 = document.getElementById("inputDireccionIP2");

	if(inputDireccionIP1.value.length == 0 || inputMascaraDeRed.value.length == 0 ){
		document.getElementById("mensaje").innerText="Debes ingresar al menos una dirección IP y la máscara de red";
		$('#modalMensaje').modal('show');
		return;
	}

	try{

		numListDireccionIP1 = dividirStringEnOctetos(inputDireccionIP1.value);
		numListMascaraDeRed = dividirStringEnOctetos(inputMascaraDeRed.value);

		if (inputDireccionIP2.value.length == 0){
			calcularUnaDireccion(numListDireccionIP1,numListMascaraDeRed);
		}else{
			numListDireccionIP2 = dividirStringEnOctetos(inputDireccionIP2.value);
			console.log(enBinario(numListDireccionIP2[0]))
			calcularDosDirecciones(numListDireccionIP1,numListMascaraDeRed,numListDireccionIP2);
		}

	}catch(error){
		document.getElementById("mensaje").innerText=error;
		$('#modalMensaje').modal('show');
	}
}

function calcularUnaDireccion(numListDireccionIP1,numListMascaraDeRed){
	$('#modalUnaDireccionIP').modal('show');
}

function calcularDosDirecciones(numListDireccionIP1,numListMascaraDeRed,numListDireccionIP2){
	$('#modalDosDireccionesIP').modal('show');
}

//Devuelve un array de 8 posiciones con la equivalencia en binario de un int
function enBinario(numDecimal){
	var numString = (numDecimal).toString(2);
	numString = ("0").repeat(8-numString.length).concat(numString);
	return numString.split("").map(function (x) { return parseInt(x, 10); });;
}

// Devuelve un array con los cuatro números en decimal (0-255) que hay en un string separados por puntos 
function dividirStringEnOctetos(str){
	var res = str.split(".");
	res = res.map(function (x) { 
				  var num = parseInt(x, 10);
				  if(isNaN(num)) throw "Entradas no válidas";
				  if(num>255) throw "Cada número debe estar entre 0 y 255";
				  return num;
				});
	if(res.length != 4) throw "Debes ingresar cuatro números por dirección IP / Máscara de Red"
	return res;
}
