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
			numListDireccionIP2 = enBinario(numListDireccionIP2);
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
	var direccion_red = new Array(numListDireccionIP1.length);  // array para guardar los digitos de la dirección de red.

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

	var num_unos = 32 - contador ;

	for (f=numListDireccionIP1.length-1; f>=contador; f--){  // para reemplazar lo n últimos por 1 y hallar broadcast.
		numListDireccionIP1[f] = "1";
	}


	var new_direccion_red = direccion_red.join("");
	var direccion_red_decimal = new Array();        // almacenar los 4 valores que componen la red en decimal

	var direccion_broadcast =numListDireccionIP1.join("");
	var direccion_broadcast_dec = new Array();   // para almacenar los 4 valores que componen el broadcast

	for (f=0; f<new_direccion_red.length; f+=8){
		direccion_red_decimal.push(new_direccion_red.substring(f,f+8));
		direccion_broadcast_dec.push(direccion_broadcast.substring(f,f+8));

	}

	var direccion_red_decimal2 = new Array();
	var direccion_broadcast_dec2 = new Array();

	for(f=0; f<direccion_red_decimal.length; f++){  // guardar los elemntos en decimal
		var dir_decimal = parseInt(direccion_red_decimal[f], 2);
		var dir_broadcast = parseInt(direccion_broadcast_dec[f], 2);
		direccion_red_decimal2.push(dir_decimal);
		direccion_broadcast_dec2.push(dir_broadcast);
	}


	var direccion_final = 'Dirección de red: ' + direccion_red_decimal2.join('.').concat('/' + contador) + '\n' + '\n' +
	 											' Dirección de broadcast: ' + direccion_broadcast_dec2.join('.');

	document.getElementById("unaip").innerText=direccion_final;

	$('#modalUnaDireccionIP').modal('show');

}

function calcularDosDirecciones(numListDireccionIP1,numListMascaraDeRed,numListDireccionIP2){
	var f;
	var contador = 0;
	var direccion_red1 = new Array(numListDireccionIP1.length);  // array para guardar los digitos de la dirección de red.
	var direccion_red2 = new Array(numListDireccionIP2.length);

	for(f=0; f<numListDireccionIP1.length; f++){

		if (numListMascaraDeRed[f]=="1"){
			contador++;
		}

		//calculando la red de la primera ip
		if (numListDireccionIP1[f]=="1" && numListMascaraDeRed[f]=="1"){
			direccion_red1[f]="1";
		}
		else{

			direccion_red1[f]="0";
		}

		//calculando la red de la segunda ip
		if (numListDireccionIP2[f]=="1" && numListMascaraDeRed[f]=="1"){
			direccion_red2[f]="1";
		}
		else{

			direccion_red2[f]="0";
		}


	}

	var num_unos = 32 - contador ;

	for (f=numListDireccionIP1.length-1; f>=contador; f--){  // para reemplazar lo n últimos por 1 y hallar broadcast.
		numListDireccionIP1[f] = "1";
	}


	var new_direccion_red1 = direccion_red1.join("");
	var new_direccion_red2 = direccion_red2.join("");

	var direccion_red_decimal1 = new Array();        // almacenar los 4 valores que componen la red en decimal
	var direccion_red_decimal2 = new Array();

	var direccion_broadcast =numListDireccionIP1.join("");
	var direccion_broadcast_dec = new Array();   // para almacenar los 4 valores que componen el broadcast

	for (f=0; f<new_direccion_red1.length; f+=8){
		direccion_red_decimal1.push(new_direccion_red1.substring(f,f+8));
		direccion_red_decimal2.push(new_direccion_red2.substring(f,f+8));
		direccion_broadcast_dec.push(direccion_broadcast.substring(f,f+8));

	}

	var direccion_red_decimalIP1 = new Array();
	var direccion_red_decimalIP2 = new Array();
	var direccion_broadcast_dec2 = new Array();

	for(f=0; f<direccion_red_decimal1.length; f++){  // guardar los elemntos en decimal
		var dir_decimal1 = parseInt(direccion_red_decimal1[f], 2);
		var dir_decimal2 = parseInt(direccion_red_decimal2[f], 2);
		var dir_broadcast = parseInt(direccion_broadcast_dec[f], 2);
		direccion_red_decimalIP1.push(dir_decimal1);
		direccion_red_decimalIP2.push(dir_decimal2);
		direccion_broadcast_dec2.push(dir_broadcast);
	}

	var igual = 0;

	for (f=0; f<direccion_red_decimalIP1.length; f++){
		if (direccion_red_decimalIP1[f] == direccion_red_decimalIP2[f]){
			igual ++;
		}

		if (igual==4){
			var direccion_final = 'Dirección de red: ' + direccion_red_decimalIP1.join('.').concat('/' + contador) + '\n' + '\n' +
			 											' Dirección de broadcast: ' + direccion_broadcast_dec2.join('.');

		}
		else{
			direccion_final = 'Las redes no pertenecen a la misma red';
		}
	}

	document.getElementById("dosip").innerText= direccion_final;
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
