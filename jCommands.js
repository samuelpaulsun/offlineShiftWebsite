var receiver, amount;
var qrcode = "";
	
$( function() {
	$( "#tabs" ).tabs();
	$( ".widget input[type=submit], .widget a, .widget button" ).button();
	$( "button, input, a" ).click( function( event ) {
	  //event.preventDefault();
	  //console.log(event.currentTarget.checked);
	  togglePassword(event.currentTarget.id, event.currentTarget.checked);
	} );
	$('input').addClass("ui-textfield");
	$( ".controlgroup" ).controlgroup()
	$( ".controlgroup-vertical" ).controlgroup({
	  "direction": "vertical"
	});
} );	 

setInterval(function(){
  $('blinks').each(function() {
	if ($(this).css('color') == 'rgb(255, 0, 0)')
		$(this).css('color', 'black');
	else
		$(this).css('color', 'red');
  });
}, 1000);

function createLskTx(){
	document.getElementById("transaction-1").innerHTML = "";
	document.getElementById("qrcode-1").innerHTML=""
	
	qrcode = new QRCode(document.getElementById("qrcode-1"), {
		width : 500,
		height : 500
	});
	var pass = document.getElementById('pass01-1').value;
	pass = pass.trim();
	var second = document.getElementById('pass02-1').value;
	second = second.trim();
	var amnt = document.getElementById('amount').value;
	receiver = document.getElementById('rec').value;
	receiver = receiver.trim();
	
	if (isNaN(Number(amnt)))
		amnt = amnt.replace(',','.');
	if (isNaN(Number(amnt)) || (Number(amnt) == 0)){
		alert('Please specify a valid amount!');
		return;
	}
	
	amnt = Number(amnt);
	if (confirm("You would like to send "+ amnt +" LSK ?") == false) {
		return;
	}
	
	amnt = amnt.toFixed(8);
	amount  = amnt * Math.pow(10, 8); // 100000000000
	if(amount.toString().indexOf('.')!==-1){
		amount = amount.toPrecision(amount.toString().indexOf('.'));
	}
	
	amount = Number(amount);
	var transaction = lisk.transaction.createTransaction(receiver, amount, pass, second);
	//document.getElementById("transaction").innerHTML = JSON.stringify(transaction);
	document.getElementById("transaction-1").innerHTML = JSON.stringify(transaction);
	
	function makeCode () {		
		var elText = JSON.stringify(transaction);
		
		if (!elText) {
			alert("Transaction was empty");
			elText.focus();
			return;
		}
		qrcode.makeCode(elText);
	}
	makeCode();
}

function createSecPassTx(){
	document.getElementById("transaction-2").innerHTML = "";
	document.getElementById("qrcode-2").innerHTML=""
	qrcode = new QRCode(document.getElementById("qrcode-2"), {
		width : 500,
		height : 500
	});
	var pass = document.getElementById('pass01-2').value;
	pass = pass.trim();
	var second = document.getElementById('pass02-2').value;
	second = second.trim();
	var transaction = lisk.signature.createSignature(pass, second);
	document.getElementById("transaction-2").innerHTML = JSON.stringify(transaction);

	function makeCode () {
		var elText = JSON.stringify(transaction);
		
		if (!elText) {
			alert("Transaction was empty");
			elText.focus();
			return;
		}
		qrcode.makeCode(elText);
	}
	makeCode();
}

function createVotingTx(){
	document.getElementById("transaction-3").innerHTML = "";
	document.getElementById("qrcode-3").innerHTML=""
	var strQR ='';
	var strQR1 ='';
	var strQR2 ='';
	qrcode = new QRCode(document.getElementById("qrcode-3"), {
		width : 600,
		height : 600,
		correctLevel : QRCode.CorrectLevel.L
	});
		
	var pass = document.getElementById('pass01-3').value;
	pass = pass.trim();
	var second = document.getElementById('pass02-3').value;
	second = second.trim();
	var deleg = document.getElementById('deleg').value;
	deleg = deleg.trim();
	var transaction = lisk.vote.createVote(pass, deleg.split(",") , second);
	console.log(transaction);
	document.getElementById("transaction-3").innerHTML = JSON.stringify(transaction);
	
	function makeCode () {		
		var elText = JSON.stringify(transaction);
		
		if (!elText) {
			alert("Transaction was empty");
			elText.focus();
			return;
		}
		qrcode.makeCode(elText);
	}
	makeCode();
}

function createDelegateTx(){
	document.getElementById("transaction-4").innerHTML = "";
	document.getElementById("qrcode-4").innerHTML=""
	qrcode = new QRCode(document.getElementById("qrcode-4"), {
		width : 500,
		height : 500
	});

	var pass = document.getElementById('pass01-4').value;
	pass = pass.trim();
	var second = document.getElementById('pass02-4').value;
	second = second.trim();
	degName = document.getElementById('degName').value;
	degName = degName.trim();
	if (degName.length > 20){
		alert("Name is too long! Max.: 20 characters!");
		return;
	}
	var transaction = lisk.delegate.createDelegate(pass, degName, second);
	document.getElementById("transaction-4").innerHTML = JSON.stringify(transaction);

	function makeCode () {		
		var elText = JSON.stringify(transaction);
		
		if (!elText) {
			alert("Transaction was empty");
			elText.focus();
			return;
		}
		qrcode.makeCode(elText);
	}
	makeCode();
}

function clearAll1(){
	//document.getElementById("chkPass1").checked = false;
	//document.getElementById("chkPass2").checked = false;		
	document.getElementById("transaction-1").innerHTML = "";
	//document.getElementById('amount').innerHTML = "";
	document.getElementById("qrcode-1").innerHTML=""
	//document.getElementById('rec').innerHTML = "";
}

function clearAll2(){
	//document.getElementById("chkPass1").checked = false;
	//document.getElementById("chkPass2").checked = false;		
	document.getElementById("transaction-2").innerHTML = "";
	//document.getElementById('amount').innerHTML = "";
	document.getElementById("qrcode-2").innerHTML=""
	//document.getElementById('rec').innerHTML = "";
}

function clearAll3(){
	//document.getElementById("chkPass1").checked = false;
	//document.getElementById("chkPass2").checked = false;		
	document.getElementById("transaction-3").innerHTML = "";
	//document.getElementById('amount').innerHTML = "";
	document.getElementById("qrcode-3").innerHTML=""
	//document.getElementById('rec').innerHTML = "";
}

function clearAll4(){
	//document.getElementById("chkPass1").checked = false;
	//document.getElementById("chkPass2").checked = false;		
	document.getElementById("transaction-4").innerHTML = "";
	//document.getElementById('amount').innerHTML = "";
	document.getElementById("qrcode-4").innerHTML=""
	//document.getElementById('rec').innerHTML = "";
}

function togglePassword(num, checked){
	
	switch(num) {
		case "chk01-1":
			//var chkPass = document.getElementById("chkPass1");
			var strPass = document.getElementById("pass01-1");
			break;
		case "chk02-1":
			//var chkPass = document.getElementById("chkPass2");
			var strPass = document.getElementById("pass02-1");
			break;
		case "chk01-2":
			//var chkPass = document.getElementById("chkPass1");
			var strPass = document.getElementById("pass01-2");
			break;
		case "chk02-2":
			//var chkPass = document.getElementById("chkPass2");
			var strPass = document.getElementById("pass02-2");
			break;
		case "chk01-3":
			//var chkPass = document.getElementById("chkPass1");
			var strPass = document.getElementById("pass01-3");
			break;
		case "chk02-3":
			//var chkPass = document.getElementById("chkPass2");
			var strPass = document.getElementById("pass02-3");
			break;
		case "chk01-4":
			//var chkPass = document.getElementById("chkPass1");
			var strPass = document.getElementById("pass01-4");
			break;
		case "chk02-4":
			//var chkPass = document.getElementById("chkPass2");
			var strPass = document.getElementById("pass02-4");
			break;
		default:
			return;
	}
	if (checked == true){
		strPass.setAttribute('type', 'text');
	} else {
		strPass.setAttribute('type', 'password');
	}
}

function getNewAccount(){
	document.getElementById("qrcode-51").innerHTML=""
	document.getElementById("qrcode-52").innerHTML=""
	
	qrcode51 = new QRCode(document.getElementById("qrcode-51"), {
		width : 300,
		height : 300
	});
	
	qrcode52 = new QRCode(document.getElementById("qrcode-52"), {
		width : 300,
		height : 300
	});
	
	var newPassphrase = '';
	newPassphrase=getRandomPassphrase();
	
	var keys = lisk.crypto.getKeys(newPassphrase);
	var pubKey = keys['publicKey'];
	var privKey = keys['privateKey'];
	var accountAddress = lisk.crypto.getAddress(pubKey);
	
	document.getElementById("passp").value = newPassphrase;
	document.getElementById("pubkey").value = pubKey;
	document.getElementById("privkey").value = privKey;
	document.getElementById("address").value = accountAddress;
	//console.log(accountAddress);
	
	function makeCode51 () {		
		var elText = JSON.stringify(privKey);
		
		if (!elText) {
			alert("Private key was empty");
			elText.focus();
			return;
		}
		qrcode51.makeCode(elText);
	}

	
	function makeCode52 () {		
		var elText = JSON.stringify(pubKey);
		
		if (!elText) {
			alert("Public key was empty");
			elText.focus();
			return;
		}
		qrcode52.makeCode(elText);
	}
	makeCode51();
	makeCode52();	
}
function copyClipboard(){
	var dummy = document.createElement("input");
	document.body.appendChild(dummy);
	dummy.setAttribute("id", "trans");
	dummy.setAttribute('value', document.forms['frm'].elements['transaction'].value);
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
}

function getRandomPassphrase(){
	var strPassphrase = '';
	var lPassphrase128 = '';
	var lPassphrase132 = '';
	var checksum;
	var randomWords = [];		// digital words as in 2 bytes (16 bits) not real words!
	var start=0;
	var end=11;
	randomWords[4]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	randomWords[7]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	randomWords[6]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	randomWords[1]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	randomWords[8]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	randomWords[3]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	randomWords[2]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	randomWords[5]=addZerosToHex(Math.floor(Math.random()*65535).toString(16));
	lPassphrase128=randomWords[1]+randomWords[2]+randomWords[3]+randomWords[4]+randomWords[5]+randomWords[6]+randomWords[7]+randomWords[8];
	var sha256Hash = lisk.crypto.getSha256Hash(lPassphrase128,"hex");
	lPassphrase128=hexToBin(lPassphrase128);
	checksum=addZerosToBin(sha256Hash[0]).toString(2).slice(0,4);
	lPassphrase132=lPassphrase128+checksum;
	for (let i = 0; i < 12; i++) {
		strPassphrase = strPassphrase.trim() + " " + wordsBip39[parseInt(lPassphrase132.slice(start,end),2)];
		start = start + 11;
		end = end + 11;
	}
	return strPassphrase;
	function addZerosToHex(bNumber){
		var strTmp;
		strTmp=bNumber.toString();
		while (strTmp.length < 4) {
			strTmp="0"+strTmp;
		}
		return strTmp;
	}
	function addZerosToBin(bNumber){
		var strTmp;
		strTmp=bNumber.toString(2);
		while (strTmp.length < 8) {
			strTmp="0"+strTmp;
		}
		return strTmp;
	}
	function hexToBin(strHex){
		var iLenght=strHex.length;
		var strBinNumber="";
		for (let i = 0; i < strHex.length; i++) {
			switch (strHex[i]) {
				case "0":
					strBinNumber=strBinNumber+"0000"
					break;
				case "1":
					strBinNumber=strBinNumber+"0001"
					break;
				case "2":
					strBinNumber=strBinNumber+"0010"
					break;
				case "3":
					strBinNumber=strBinNumber+"0011"
					break;
				case "4":
					strBinNumber=strBinNumber+"0100"
					break;
				case "5":
					strBinNumber=strBinNumber+"0101"
					break;
				case "6":
					strBinNumber=strBinNumber+"0110"
					break;
				case "7":
					strBinNumber=strBinNumber+"0111"
					break;
				case "8":
					strBinNumber=strBinNumber+"1000"
					break;
				case "9":
					strBinNumber=strBinNumber+"1001"
					break;
				case "a":
					strBinNumber=strBinNumber+"1010"
					break;
				case "b":
					strBinNumber=strBinNumber+"1011"
					break;
				case "c":
					strBinNumber=strBinNumber+"1100"
					break;
				case "d":
					strBinNumber=strBinNumber+"1101"
					break;
				case "e":
					strBinNumber=strBinNumber+"1110"
					break;
				case "f":
					strBinNumber=strBinNumber+"1111"
					break;
				default:
					break;
			}
		}
		return strBinNumber;
	}
}		