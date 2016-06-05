
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";


/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
function generirajPodatke(stPacienta) {
    sessionId = getSessionId();
    
    primerki = [["Micka", "Županova", "12.1.1940", [], ]];
    
  ehrId = "";
  // TODO: Potrebno implementirati
  $.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    async: false,
		    headers: {"Ehr-Session": sessionId},
		    success: function (data) {
		        
		        
		        ehrId = data.ehrId;
		        var partyData = {
		            1:{
		                 firstNames: "Micka",
		            lastNames: "Županova",
		            dateOfBirth: "1960-06-10T09:30",
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		            },
		            2:{
		                 firstNames: "Janez",
		            lastNames: "Trdina",
		            dateOfBirth: "1960-06-10T09:30",
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		            }, 
		            3:{
		                 firstNames: "Chuck",
		            lastNames: "Norris",
		            dateOfBirth: "2050-06-10T09:30",
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		            }
		           
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            async: false,
		            headers: {"Ehr-Session": sessionId},
		            contentType: 'application/json',
		            data: JSON.stringify(partyData[stPacienta]),
		            success: function (party) {
		                
		                
		                var podatki = 
		                {1:{
                    			// Struktura predloge je na voljo na naslednjem spletnem naslovu:
                          // https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
                    		    1:{"ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2325",
                    		    "vital_signs/height_length/any_event/body_height_length": "160",
                    		    "vital_signs/body_weight/any_event/body_weight": "40",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "32",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "160",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "100",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "30",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "90"},
                    		    2:{
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2312",
                    		     "vital_signs/height_length/any_event/body_height_length": "160",
                    		    "vital_signs/body_weight/any_event/body_weight": "45",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "34",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "145",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "95",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "50",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "85"},
                    		    3:{
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2313",
                    		     "vital_signs/height_length/any_event/body_height_length": "160",
                    		    "vital_signs/body_weight/any_event/body_weight": "43",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "30",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "160",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "110",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "60",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "95"}
		                },
		                2:{
		                        1:{"ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2325",
                    		    "vital_signs/height_length/any_event/body_height_length": "180",
                    		    "vital_signs/body_weight/any_event/body_weight": "80",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "36",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "150",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "100",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "80",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "70"},
                    		    2:{
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2312",
                    		     "vital_signs/height_length/any_event/body_height_length": "180",
                    		    "vital_signs/body_weight/any_event/body_weight": "85",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "37",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "130",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "95",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "60",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "75"},
                    		    3:{
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2313",
                    		     "vital_signs/height_length/any_event/body_height_length": "180",
                    		    "vital_signs/body_weight/any_event/body_weight": "78",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "36.3",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "130",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "85",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "80",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "65"}
		                },
		                3:{
		                        1:{"ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2325",
                    		    "vital_signs/height_length/any_event/body_height_length": "210",
                    		    "vital_signs/body_weight/any_event/body_weight": "110",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "36",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "140",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "110",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "100",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "150"},
                    		    2:{
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2312",
                    		     "vital_signs/height_length/any_event/body_height_length": "210",
                    		    "vital_signs/body_weight/any_event/body_weight": "80",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "33",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "120",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "75",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "100",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "100"},
                    		    3:{
                    		    "ctx/language": "en",
                    		    "ctx/territory": "SI",
                    		    "ctx/time": "2313",
                    		     "vital_signs/height_length/any_event/body_height_length": "180",
                    		    "vital_signs/body_weight/any_event/body_weight": "100",
                    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": "37",
                    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
                    		    "vital_signs/blood_pressure/any_event/systolic": "160",
                    		    "vital_signs/blood_pressure/any_event/diastolic": "110",
                    		    "vital_signs/indirect_oximetry:0/spo2|numerator": "75",
                    		    "vital_signs/pulse:0/any_event:0/rate|magnitude": "130"}
		                }
                    		};
                    		
                    		
                    		        var parametriZahteve = {
                        		    ehrId: ehrId,
                        		    templateId: 'Vital Signs',
                        		    format: 'FLAT',
                        		};
                        		for(var j = 0; j<3; j++){
                        		    $.ajax({
                        		    headers: {"Ehr-Session": sessionId},
                        		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
                        		    type: 'POST',
                        		    async: false,
                        		    contentType: 'application/json',
                        		    data: JSON.stringify(podatki[stPacienta][j+1]),
                        		    success: function (res) {
                        		        
                        		        console.log(ehrId);
                        		    },
                        		    
                        		    error: function(napaka){
                        		        console.log(napaka);
                        		    }
                        		    
                        		});
                        		}
                        		
                        		
                    		    
		                
		                
		            },
		            error: function(napaka3){
		                console.log(napaka3);
		            }
		        })
		        
		    } 
		        
  
  });
  return ehrId;
}


// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija
$(document).ready(function(){
	
	$("#primer1").click(function(){
	    $("#vnos1").val(generirajPodatke(1));
	});
	
	$("#primer2").click(function(){
	    $("#vnos1").val(generirajPodatke(2));
	});
	
	$("#primer3").click(function(){
	    $("#vnos1").val(generirajPodatke(3));
	});
	
	var ocena = function(podatki, data){
	    string = ""
	    ocena1 = "povprečno";
	    if(podatki["blood_pressure"][0].diastolic<100 || podatki["blood_pressure"][0].systolic >150 || podatki["body_temperature"][0]["temperature"]<35 || podatki["body_temperature"][0]["temperature"]>37) ocena1 = "slabo";
	    if(podatki["blood_pressure"][0].diastolic>100 && podatki["blood_pressure"][0].systolic <150 && podatki["body_temperature"][0]["temperature"]>35 && podatki["body_temperature"][0]["temperature"]<37) ocena1 = "odlično";
	    
	    string += data.party.firstNames +" "+ data.party.lastNames+" vaše stanje je: " + ocena1;
	    document.getElementById("ocena").innerHTML = string;
	}
	
    $("#gumb1").click(function(){
        
        sessionId = getSessionId();
        
        EhrID = $("#vnos1").val();
        if(EhrID && !(EhrID.trim().length == 0)){
            $.ajax({
			url: baseUrl + "/demographics/ehr/" + EhrID + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
	    	    imePodatkov = ["allergy", "blood_pressure", "body_temperature", "height", "labs", "medication", "problem", "pulse", "spO2", "weight"];
	    	    podatki = {};
	    	    $("#MasterDetail").html("");
	    	    for(var i = 0; i<imePodatkov.length; i++){
	    	        $.ajax({
        			url: baseUrl + "/view/" + EhrID + "/"+imePodatkov[i],
        	    	type: 'GET',
        	    	async: false,
        	    	headers: {"Ehr-Session": sessionId},
        	    	success: function (data1) {
        	    	    podatki[imePodatkov[i]] = data1;
        	    	    $("#MasterDetail").append($("<div></div>").attr("id","podatek"+i).html("<hr><h6><b>"+imePodatkov[i].charAt(0).toUpperCase() + imePodatkov[i].slice(1)+"</b></h6>").click(function(e){
        	    	    	element = $(".podPodatek"+e.currentTarget.id[e.currentTarget.id.length-1])
        	    	        if(element.is(":visible")){
        	    	        	element.hide();
        	    	        } else {
        	    	        	element.show();
        	    	        }
        	    	        
        	    	    }));
        	    	   atributi = [["agent"], ["diastolic", "systolic", "unit"], ["temperature", "unit"], ["height", "unit"], ["name", "unit"], ["medicine"], ["diagnosis"], ["pulse", "unit"], ["spO2"], ["weight", "unit"]];
        	    	  for(var j = 0; j<data1.length;j++){
        	    	  	vnos = "";
        	    	  		for(var k = 0; k<atributi[i].length; k++){
        	    	  			vnos += data1[j][atributi[i][k]]+" ";
        	    	  		}
        	    	  		
        	    	  		
        	    	        $("#"+"podatek"+i).append($("<div></div>").attr("class", "podPodatek"+i).text(vnos).hide());
        	    	    }
        	    	},
        	    	error: function(err){console.log(err)}
                    });
        	    	
	    	    }
	    	    ocena(podatki, data);
	    	    console.log(podatki, data);
	    	    document.getElementById("graf").innerHTML = "";
	    	    narisiGraf(podatki);
	    	    
	    	
	    	    
	    	    },
	    	error: function(err){console.log(err)}
            });
	    	    
        }
        
});
});