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
		numListDireccionIP1 = enBinario(numListDireccionIP1);
		numListMascaraDeRed = enBinario(numListMascaraDeRed);
		console.log(numListDireccionIP1);

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
	var f;
	var contador = 0;
	var direccion_red = new Array(numListDireccionIP1.length);
	for(f=0; f<numListDireccionIP1.length; f++){

		if (numListMascaraDeRed[f]=="1"){
			contador++;
		}

		if (numListDireccionIP1[f]=="1" && numListMascaraDeRed[f]=="1"){
			direccion_red[f]="1";
		}
		else{

			direccion_red[f]="0";
		}
	}

	var new_direccion_red = direccion_red.join("");
	var direccion_red_decimal = new Array();

	//será mejor si lo hago en un for ????
	
	direccion_red_decimal.push(new_direccion_red.substring(0,8));
	direccion_red_decimal.push(new_direccion_red.substring(8,16));
	direccion_red_decimal.push(new_direccion_red.substring(16,24));
	direccion_red_decimal.push(new_direccion_red.substring(24,32));


	var direccion_red_decimal2 = new Array();

	for(f=0; f<direccion_red_decimal.length; f++){
		var dir_decimal = parseInt(direccion_red_decimal[f], 2);
		direccion_red_decimal2.push(dir_decimal);
	}

	var direccion_final = 'Dirección de red: ' + direccion_red_decimal2.join('.').concat('/' + contador);

	document.getElementById("unaip").innerText=direccion_final;

	$('#modalUnaDireccionIP').modal('show');

}

function calcularDosDirecciones(numListDireccionIP1,numListMascaraDeRed,numListDireccionIP2){
	$('#modalDosDireccionesIP').modal('show');
}

//Devuelve un array de 8 posiciones con la equivalencia en binario de un int
function enBinario(array_dir){
	var f;
	var numString2 = "";
	for(f=0; f<array_dir.length; f++) {
		var numString = (array_dir[f]).toString(2);
		numString2 = numString2 + ("0").repeat(8-numString.length).concat(numString);

	}
	return numString2.split("");
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
