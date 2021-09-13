let link = "https://restcountries.eu/rest/v2/",
panel= document.querySelector('.panel'),
panel__data = document.querySelector('.panel__data'),
input = document.querySelector('input'),
data = '';

input.addEventListener('keyup',load);
input.addEventListener('change',load);

function load() {
	about()
	if( this.value.length>2){
		panel.innerHTML+=`<ul>`;
		
		fetch(`${link}name/${this.value}`).then((response)=>response.json())
		.then((response)=>{
			if(response.status!=404){
				data ='';
				response.forEach((value)=>{
					data+=`<li style="padding-top:.5rem"><a href="#" onclick="about('${value.name}')">${value.name}</a></li>`;
				})
			}else{
				data =`<li style="padding:.5rem 0">${response.message}</li>`;
			}
		})
		.catch((error)=>console.log('error' + error))
		
	}else{
		data='';
	}
	panel.innerHTML= '';
	panel.innerHTML=data;
	panel.innerHTML+=`</ul>`;
}

function about(country= null){
	let data='';

	if(country){
		fetch(`${link}name/${country}`).then((response)=>response.json())
		.then((response)=>{
			panel.innerHTML= '';
			input.value= country;
			panel__data.innerHTML+=`<li><b>Country:</b> ${response[0].name} - ${response[0].cioc}<img style="width:45px; float:right" src="${response[0].flag}"></li>`;
			panel__data.innerHTML+=`<li><b>Capital:</b> ${response[0].capital}</li>`;
			panel__data.innerHTML+=`<li><b>Region:</b> ${response[0].region}</li>`;
			panel__data.innerHTML+=`<li><b>Subregion:</b> ${response[0].subregion}</li>`;
			panel__data.innerHTML+=`<li><b>Area:</b> ${response[0].area.toLocaleString('de-DE')}</li>`;
			panel__data.innerHTML+=`<li><b>Population:</b> ${response[0].population.toLocaleString('de-DE')}</li>`;
			response[0].languages.forEach((value, index)=>{
				panel__data.innerHTML+=`<li style="display:inline-block">${index==0?'<b>Language(s):</b> '+value.name:', '+value.name }</li>`;

			})

			panel__data.innerHTML+=`<span style="display:table-cell;"></span>`;
			response[0].currencies.forEach((value, index)=>{
				panel__data.innerHTML+=`<li style="display:inline-block">${index==0? '<b>Currencie(s):</b> '+
				value.name+' - '+value.code +' - '+value.symbol :', '+value.name+' - '+value.code +' - '+value.symbol}</li>`;

			})

			panel__data.innerHTML+=`<li><b>Calling Codes:</b> ${response[0].callingCodes[0]}</li>`;
			response[0].topLevelDomain.forEach((value, index)=>{
				panel__data.innerHTML+=`<li style="display:inline-block">${index==0? '<b>Domain(s):</b> '+ value.toLowerCase():', '+value.toLowerCase() }</li>`;


			})

			panel__data.innerHTML+=`<span style="display:table-cell;"></span>`;
			response[0].timezones.forEach((value, index)=>{
				panel__data.innerHTML+=`<li style="display:inline-block">${index==0? '<b>Timezone(s):</b> '+ value.toLowerCase():', '+value.toLowerCase() }</li>`;

			})

			panel__data.innerHTML+=`<li class="text-center" style="margin-top:.6rem"><b>Translations</b> <hr style=""> </li>`;
			Object.keys(response[0].translations).forEach((value, index)=>{

				panel__data.innerHTML+=`<li style="display:inline-block"><b>${value.toUpperCase()}: </b>${response[0].translations[value]}</li>`
			})

			panel__data.innerHTML+=`<li class="text-center" style="margin-top:.6rem"><b>Border(s)</b> <hr style=""> </li>`;
			fetch(link+`alpha?codes=${response[0].borders.join(';').toLowerCase()}`).then((response)=>response.json())
			.then((response)=>{
				response.forEach((value, index)=>{
					panel__data.innerHTML+=`<li style="display:inline-block">${index==0?value.name:', '+value.name }</li>`;
				})
			})

			.catch((error)=>console(error))
		})
		.catch((error)=>console.log('error' + error));

		panel__data.innerHTML=data;
	}else{
		panel__data.innerHTML=data;
		return false;
	}
}