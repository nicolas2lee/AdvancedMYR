$(document).ready(function(){
	$("#score_missions_dropdown").on("change", function () {
			var sv=$("#score_missions_dropdown option:selected").val()
			if (sv==0){//no mission
				alert('Pleas choose a mission')
			}else{
				requestRenderAttempts(sv)
			
			}
	});
})

function requestRenderAttempts(m_id){
	$.ajax({
		type: "GET",
		url: "/newAttemptinfo",
		data: {mission_id: m_id},

		success: function(){
			$("#score_attempt_dropdown").on("change", function () {
				var selv=$("#score_attempt_dropdown option:selected").val()
				if (selv==0){//no mission
					alert('Pleas choose an attempt')
				}else{
					requestRenderScoreinfo(selv)	
				}
			});
		}       
	});
}

function requestRenderScoreinfo(a_id)	{
	//alert('render score')
	$.ajax({
		type: "GET",
		url: "/newScoreinfo",
		data: {attempt_id: a_id},

		success: function(){
				$("#cal-timecost").click(function(){
					$("#score_timecost").prop('disabled', true);
					requestCalculateScore(a_id)
				})
		}       
	});
}

function requestCalculateScore(a_id)	{
	$.ajax({
		type: "GET",
		url: "/calculateScore",
		data: {attempt_id: a_id},

		success: function(data){
			alert(data)
		}       
	});
}