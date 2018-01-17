'use strict';

// Открыть и закрыть мобильное меню //

var substrate = document.getElementById('substrate');

document.getElementById('btn-modal-menu').onclick = function () {
	substrate.style.display="block";
};

document.getElementById('close').onclick = function () {
	substrate.style.display="none";
};

// Маска для ФИО //

var fullName = document.getElementById('full-name');

fullName.onkeyup = function (){
	var reg = /^[А-Яа-я\s]+$/;

	if(!reg.test(fullName.value)){
		fullName.value = fullName.value.substring(0,fullName.value.length-1);
		alert("Имя и фамилия должны быть введены на русском языке с минимальным количеством 5 штук");
	}
};

// Маска для номера телефона //

var phone = document.getElementById('phone');

phone.onkeyup = function(mask, e) {
	mask = '+7(900)000-00-00';
	try {
		var value = phone.value;

		try {
			var e = (e.which) ? e.which : event.keyCode;
			if ( e == 46 || e == 8 ) {
				phone.value = "";
				return;
			}
		} catch (e1) {}

		var literalPattern=/[0\*]/,
			numberPattern=/[0-9]/,
			newValue = "";

		for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
			if (mId >= value.length)
				break;

			if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
				break;
			}

			while (mask[mId].match(literalPattern) == null) {
				if (value[vId] == mask[mId])
					break;

				newValue += mask[mId++];
			}

			newValue += value[vId++];
			mId++;
		}

		phone.value = newValue;
	}
	catch(e) {}
};

// Маска для e-mail //

var mail = document.getElementById('mail');

mail.onkeyup = function () {
	var reg = /^[A-z0-9\.\-\@]+$/,
		count = 0,
		pos = mail.value.indexOf("@");

	if(!reg.test(mail.value)) {
		mail.value = mail.value.substring(0, mail.value.length - 1);
		alert('Email должен быть введен на английском языке и без спецсимволов: (){}[],*/|\?!№#$" с минимальным количеством 8 штук');
	}

	while (pos != -1) {
		count++;
		pos = mail.value.indexOf("@", pos + 1);
		if (count > 1) {
			var newStr = mail.value.split('');
			newStr.splice(pos, 1);
			mail.value = newStr.join('');
		}
	}
};

// Блокировка кнопки до внесения информации //

var inputs = document.querySelectorAll('.-input-contact'),
	btn = document.getElementsByClassName('submit')[0];

window.onload = function () {
	for(var i=0; i<inputs.length; i++){
		inputs[i].oninput = function() {
			if ((fullName.value.length >= 5) && (phone.value.length >= 16) && (mail.value.length >= 8)) {
				btn.disabled = false;
			}
			else {
				btn.disabled = true;
			}
		}
	}
};

// Нажатие на кнопку -> проверка и отправка параметров //

var checkBox = document.getElementsByClassName('-img-size-answer'),
	flag = false;

btn.onclick = function () {
	for(var i=0; i<checkBox.length; i++){
		if(checkBox[i].checked == true){
			var idBox = checkBox[i].id;
			flag = true;
			console.log('Data = ' + 'Имя и фамилия:', fullName.value, "|| " + "Номер телефона:", phone.value, "|| " + "E-mail:", mail.value, "|| " + "Выбранный ответ:", idBox);
		}
	}
	if(!flag == true){
		alert('Выбирите правильный ответ!');
	}
	else{
		alert('Ваш ответ был отправлен, в console.log можно увидеть переданные параметры!');
	}
};

