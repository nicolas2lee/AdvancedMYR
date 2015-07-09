//=require replay
//=require handle_markers
//=require replay_map
//=require choice_robots
/*choose one robot*/
function requestRefreshOnerobot(flag){
	$.ajax({
		type: "GET",
		url: "/choice_onerobot",
	
		success: function(){
			if (flag){
				requestRefreshReplayMissions()
			}else{
				//if flag==false, it will not display choose mission
			}
		}       
	});
}

function requestRefreshReplayMissions(){
		$.ajax({
		type: "GET",
		url: "/choice_replay_missions",
		
		success: function(){
			choose_mission();
		}       
	});
}

function choose_mission(){
	$.cookie("missionslist",$("#replay_missions_dropdown option:selected").val());
	$("#replay_missions_dropdown").on("change", function () {
		$.cookie("missionslist",$("#replay_missions_dropdown option:selected").val());
		requestRefreshAttempts();
	});
}

function requestRefreshAttempts(){
	$.ajax({
		type: "GET",
		url: "/choice_attempts",
		
		success: function(){
			choose_attempts();
		}       
	});
}

function choose_attempts(){
	$.cookie("attemptslist",$("#attempts_dropdown option:selected").val());
	$("#attempts_dropdown").on("change", function () {
		$.cookie("attemptslist",$("#attempts_dropdown option:selected").val());
		requestRefreshUpdateButton(1);
	});
}

function requestRefreshUpdateButton(nb){
	$.ajax({
		type: "GET",
		url: "/update_replay_map",
		
		success: function(){
			$('#updatebutton').click(function(){
				if (nb==1)
					requestRefreshMapFromAttempt();
				else{
					if (nb==2){
						getDatetimesInfos()  //It is in the file of choice_robots.js
					}
				}
			})
		}       
	});
}

function requestRefreshMapFromAttempt(){
	$.ajax({
		type: "GET",
		url: "/getAttemptInfos",
		
		success: function(data){
			//alert(data)
			requestGatherCoordsBetweenDates(data);
		}       
	});
}


function requestGatherCoordsBetweenDates(timedata){
	//alert(timedata[0])
	
	$.ajax({
		type: "GET",
		url: "/gatherCoordsBetweenDates",
		data: {tstart : timedata[0], tend: timedata[1]},
		dataType: "json",
		success: function(data){
			refreshWithNewMarkers2(data,getMap());
		}       
	});
}


