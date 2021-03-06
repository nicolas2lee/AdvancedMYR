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
				initializeMap()
				initialScroll()
    			buoyFlag=getMarkerDisplay()
       			//alert(buoyFlag)
       			if (nb==1){
	       			if (buoyFlag==true){
		            	// alert('buoyflag is true')
		           		requestOfficialMarkersInfo()
	        		}
					requestRefreshMapFromAttempt();
       			}
				else{
					if (nb==2){
						getDatetimesInfos(markerDisplay)  //It was in the file choice_robots
					}
				}
			})
		}       
	});
}


function requestRefreshMapFromAttempt(){
  $.ajax({
		type: "GET",
		url: "/getSingleAttemptInfos",
		
		success: function(data){
			//alert(data)
			//tstart: data[0]; tend: data[1]; trackers: data[2] 
		    //alert(data[0]+' '+data[1]+''+data[2])
		    //alert('trackers are '+data[2])
		    //alert(data[0])
		    // data 0 => tstart, data 1 => tend, data 2 => tracker id)
  			if (!getDoReplay()){
  			    requestGatherCoordsBetweenDates(data[0],data[1],data[2]);
  			}
     		else{
     			requestGatherCoordsLittleByLittle(data[0],data[1],data[2]);
     		}	
		}       
	});
}

	
function requestGatherCoordsBetweenDates(tstart,tend,trackers){//desired_data contains start, end, tracker_id[]
	//alert(desired_data[2])
	//alert (trackers)
  $.ajax({
		type: "GET",
		url: "/gatherCoordsBetweenDates",
		data: {tstart : tstart, tend: tend, trackers: trackers},
		dataType: "json",
		success: function(data){
				//alert(data)
	      	refreshWithNewMarkers2(data);
			if (getShowInfo()){
				requestWantInfo();
			}
		}       
	});
}

function requestGatherCoordsLittleByLittle(tstart,tend,trackers){//desired_data contains start, end, tracker_id[]
	//alert(desired_data[2])
	//alert (trackers)
  $.ajax({
		type: "GET",
		url: "/gatherCoordsLittleByLittle",
		data: {tstart : tstart, tend: tend, trackers: trackers},
		dataType: "json",
		success: function(data){
				//alert(data)
			if (data.length != 10){
			    if (myReset!= null){
	      			clearInterval(myReset);
      			}
			}
	      	refreshWithNextMarkers(data);
			if (getShowInfo()){
				requestWantInfo();
			}
			if(getFirstLaunch()){
				myReset = setInterval(function() {
					requestGatherCoordsLittleByLittle(latest_markers[2][latest_markers[0].length-1],tend,trackers);
				}, 5000);
				setFirstLaunch(false);
			}
		}       
	});
}

