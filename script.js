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
		numListDireccionIP1 = enBinario(dividirStringEnOctetos(inputDireccionIP1.value));
		numListMascaraDeRed = enBinario(dividirStringEnOctetos(inputMascaraDeRed.value));
	

		if (inputDireccionIP2.value.length == 0){

			mostrarCaracteristicasRed(numListDireccionIP1, numListMascaraDeRed,"unaip",'#modalUnaDireccionIP');

		}else{
			numListDireccionIP2 = enBinario(dividirStringEnOctetos(inputDireccionIP2.value));

			if(enLaMismaRed(numListDireccionIP1, numListDireccionIP2, numListMascaraDeRed)){
				mostrarCaracteristicasRed(numListDireccionIP1, numListMascaraDeRed, "dosip", '#modalDosDireccionesIP');
			}else{
				throw "Las direcciones IP no pertenecen a la misma red"
			}


		}

	}catch(error){
		console.log(error);
		document.getElementById("mensaje").innerText=error;
		$('#modalMensaje').modal('show');
	}
}

function mostrarCaracteristicasRed(numListDireccionIP, numListMascaraDeRed, modalElementName, modalName ){
	[direccion_red_decimal, contador, broadcast] = calcularRed(numListDireccionIP,numListMascaraDeRed);

	direccion_final = 'Dirección de red: ' + direccion_red_decimal.join('.').concat('/' + contador) + '\n' +
						'Dirección de broadcast: ' + broadcast.join('.')+ '\n' +
						'Número máximo de usuarios: '+ numeroDeUsuarios(contador);
	document.getElementById(modalElementName).innerText=direccion_final;

	$(modalName).modal('show');
}

function numeroDeUsuarios(contador){
	return Math.pow(2, 32-contador)-2; 
}

function calcularRed(numListDireccionIP1,numListMascaraDeRed){

	[new_direccion_red, f, contador] = direccionDeRed(numListDireccionIP1, numListMascaraDeRed);

	direccion_broadcast = direccionDeBroadcast(contador, numListDireccionIP1);

	var direccion_red_decimal = enDecimal(new_direccion_red);
	var direccion_broadcast_dec = enDecimal(direccion_broadcast);

	return [direccion_red_decimal, contador, direccion_broadcast_dec];
}

function enLaMismaRed(numListDireccionIP1, numListDireccionIP2, numListMascaraDeRed){

	var redIP1Decimal = direccionDeRed(numListDireccionIP1, numListMascaraDeRed);
	var redIP2Decimal = direccionDeRed(numListDireccionIP2, numListMascaraDeRed);

	var f;
	var igual = 0;

	for (f=0; f<4; f++){
		if (redIP1Decimal[f] == redIP2Decimal[f]){
			igual ++;
		}
	}

	if (igual==4){
		return true;
	}
	else{
		return false;
	}
}

function direccionDeRed(numListDireccionIP, numListMascaraDeRed){
	var f;
	var contador = 0;
	var direccion_red = new Array(numListDireccionIP.length);  // array para guardar los digitos de la dirección de red.

	for(f=0; f<numListDireccionIP.length; f++){

		if (numListMascaraDeRed[f]=="1"){
			contador++;
		}

		if (numListDireccionIP[f]=="1" && numListMascaraDeRed[f]=="1"){
			direccion_red[f]="1";
		}
		else{

			direccion_red[f]="0";
		}
	}

	var new_direccion_red = direccion_red.join("");

	return [new_direccion_red, f, contador];
}

function direccionDeBroadcast (contador, numListDireccionIP) {
	var f;

	for (f=numListDireccionIP.length-1; f>=contador; f--){  // para reemplazar lo n últimos por 1 y hallar broadcast.
		numListDireccionIP[f] = "1";
	}

	var direccion_broadcast =numListDireccionIP.join("");

	return direccion_broadcast;
}

function enDecimal(enBinario){
	var enDecimal = new Array();        // almacenar los 4 valores que componen la red en decimal

	for (var f=0; f<enBinario.length; f+=8){
		enDecimal.push(enBinario.substring(f,f+8));
	}

	var enDecimal2 = new Array();

	for(var f=0; f<enDecimal.length; f++){  // guardar los elemntos en decimal
		enDecimal2.push(parseInt(enDecimal[f], 2));
	}

	return enDecimal2;
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

