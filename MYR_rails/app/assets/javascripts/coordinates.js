//-------------------DATETIMES -----------------------------------------------
function getstartselectedvalue(){
	 var year = $("#start_year option:selected").val();
	 var month =$("#start_month option:selected").val();
	 var day =$("#start_day option:selected").val();
	 var hour =$("#start_hour option:selected").val();
	 var minute =$("#start_minute option:selected").val();
	 // convert "8" to "08"
	 if(month<10){
	 	var month = "0"+month;
	 }
	 if(day<10){
	 	var day = "0"+day;
	 }
	 var result = year+month+day+hour+minute;
	 return result;
}

function getendselectedvalue(){
	 var year = $("#end_year option:selected").val();
	 var month =$("#end_month option:selected").val();
	 var day =$("#end_day option:selected").val();
	 var hour =$("#end_hour option:selected").val();
	 var minute =$("#end_minute option:selected").val();
	 // convert "8" to "08"
	 if(month<10){
	 	var month = "0"+month;
	 }
	 if(day<10){
	 	var day = "0"+day;
	 }
	 var result = year+month+day+hour+minute;
	 return result;
}

function fillcookie(start,end){
	$.cookie("rdatetimes",start+"_"+end);
	var date = new Date();
	//expires in 60 minutes (browser time)
	date.setTime(date.getTime() + (60 * 60 * 1000));
	$.cookie("rdatetimes",start+"_"+end,{ expires: date});
}

function readcookie(){
	return $.cookie("rdatetimes");
}

function initialize(){
	var str = readcookie();
	if (str != null){
		var tab = str.split("_");

		var start = tab[0];
		var end = tab[1];

		var tabstart = start.split("");
		var tabend = end.split("");

		//datetime for the start
		//YEAR
		var startyear = tabstart[0]+tabstart[1]+tabstart[2]+tabstart[3];
		//MONTH and convert 08 to 8
		if(tabstart[4] == 1){
			var startmonth = tabstart[4]+tabstart[5];
		}
		else{
			var startmonth = tabstart[5];
		}
		//DAY and convert 08 to 8
		if(tabstart[6] == 1 || tabstart[6] == 2 || tabstart[6] == 3){
			var startday = tabstart[6]+tabstart[7];
		}
		else{
			var startday = tabstart[7];
		}
		//HOURS
		var starthour = tabstart[8]+tabstart[9];
		//MINUTES
		var startminute = tabstart[10]+tabstart[11];

		//changing the start datetime
		$("#start_year option[value="+startyear+"]").prop('selected', true);
		$("#start_month option[value="+startmonth+"]").prop('selected', true);
		$("#start_day option[value="+startday+"]").prop('selected', true);
		$("#start_hour option[value="+starthour+"]").prop('selected', true);
		$("#start_minute option[value="+startminute+"]").prop('selected', true);

		//datetime for the end
		//YEAR
		var endyear = tabend[0]+tabend[1]+tabend[2]+tabend[3];
		//MONTH and convert 08 to 8
		if(tabend[4] == 1){
			var endmonth = tabend[4]+tabend[5];
		}
		else{
			var endmonth = tabend[5];
		}
		//DAY and convert 08 to 8
		if(tabend[6] == 1 || tabend[6] == 2 || tabend[6] == 3){
			var endday = tabend[6]+tabend[7];
		}
		else{
			var endday = tabend[7];
		}
		//HOURS
		var endhour = tabend[8]+tabend[9];
		//MINUTES
		var endminute = tabend[10]+tabend[11];

		//changing the end datetime
		$("#end_year option[value="+endyear+"]").prop('selected', true);
		$("#end_month option[value="+endmonth+"]").prop('selected', true);
		$("#end_day option[value="+endday+"]").prop('selected', true);
		$("#end_hour option[value="+endhour+"]").prop('selected', true);
		$("#end_minute option[value="+endminute+"]").prop('selected', true);

	} 
}

//---------- WHEN CLICKING ON ANY DROPDOWM LIST----------------
$('select').on("change", function () {
 		fillcookie(getstartselectedvalue(),getendselectedvalue());
});
//-------------------------------------------------------------

//-------------- INITIALIZE ----------------------------------
$(document).ready(function () {
	//si pas de cookie on cree un cookie par defaut
	if (readcookie() == null || readcookie() == ""){
		fillcookie(getstartselectedvalue(),getendselectedvalue());
	}
	//sinon on change les champs selectionnes dans les datetimes
	else{
		initialize();
	}
});