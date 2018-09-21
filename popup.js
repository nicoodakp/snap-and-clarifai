
$(function(){    ///doc ready
// $( document ).ready(function() {
chrome.runtime.getBackgroundPage(function(bg) {
	bg.capture(window);
});
try {
	var app = new Clarifai.App({
	 apiKey: "e806d305ca32413ab54eaed155e5c7bc"
	});
}
catch(err) {
	alert("Need a valid API Key!");
	throw "Invalid API Key";
}

var imgb64src, width, height, imgdetail;
/// once click generate name and link, return err msg if fail
	$('.action-button').click(function(){
	try {
		  imgb64src = $('img').attr('src');  // get b64 string
			    width = $('img').width();
         height = $('img').height();
		 	imgdetail = imgb64src.replace(/^data:image\/(.*);base64,/, '');  // pure b64 string for Clarifai
			console.log(height);

			}
	catch(err) {
				alert("I can't seem to finding any videos...");
				// throw "I can't seem to finding any videos...";
				// $('.load-wrapp').hide();
				return false;
							}
			//// clarifai there
			$(this).hide();
			$('.load-wrapp').show();
					doPredict({ base64: imgdetail });

		});   //end ('action-button').click(function(){


/// once the click generate successful, bind even to the link, and open it benhind
		$('body').on('click', 'a.linky', function (){
					chrome.tabs.create({active: false, url: $(this).attr('href')});
							return false;
					// console.log("click work?");
							});



	//  after some appetize, now its time for the main dish
function doPredict(value) {
	app.models.predict("e466caa0619f444ab97497640cefc4dc", value).then(
	    function(response) {
	      // do something with response
				console.log(response); // test response, get familiar with the API strucure
				var name, prob, boundingbox;




		// check for region and concepts tag in API, if none then nothing was found.
		// if found then its a successful call
				if(response.outputs[0].data.hasOwnProperty("regions") ||
						response.outputs[0].data.hasOwnProperty("concepts")){
				regionArray = response.outputs[0].data.regions;


// if found, then for i , grab these datas
				for(var i = 0; i < regionArray.length; i++) {


				         name = response.outputs[0].data.regions[i].data.face.identity.concepts[0].name;
					processname =  name.split(" ")[0];
		processfamilyname =  name.split(" ")[1];
					    capname = capitalize(processname);
    capfamilynamename = capitalize(processfamilyname);

								 prob = response.outputs[0].data.regions[i].data.face.identity.concepts[0].value;
       percentageprob = percentile(prob);

					//gather data to draw a box
					top  = response.outputs[0].data.regions[i].region_info.bounding_box.top_row;
					left = response.outputs[0].data.regions[i].region_info.bounding_box.left_col;
				 right = response.outputs[0].data.regions[i].region_info.bounding_box.right_col;
				bottom = response.outputs[0].data.regions[i].region_info.bounding_box.bottom_row;
				 // end draw box
					console.log(response.outputs[0].data.regions[i].data.face.identity.concepts[0].name);



					var source = "https://www.youtube.com/results?search_query="+capname + "+" + capfamilynamename;
					var catDiv = document.createElement("p");
					console.log(typeof source);									//"target=" + "_blank" +
					catDiv.innerHTML = "Name:" + " " + "<a"  + " " + " " + "class=" + "linky" + " " + " " + "href=" +  source + ">" + capname + " " + capfamilynamename + "</a>" + " " +  " " + percentageprob + "</h3>";
					// catDiv.setAttribute('alt', 'namee');
					catDiv.setAttribute('class', 'namee');
					catDiv.setAttribute('align', 'center');
					document.body.appendChild(catDiv);
					$('.load-wrapp').hide();
				} // end check for region for loop
			} // end if
			else {
				var catDiv = document.createElement("p");
				catDiv.innerHTML = "I didn't see faces. :(";
				catDiv.setAttribute('align', 'center');
				document.body.appendChild(catDiv);
				$('.load-wrapp').hide();
						}
	    },  // end response
	  );  // end app model predict
	} // end doPredict
}); /// end doc ready function

//  Purpose: Return a capitalized String
//  Args:
//    s - A String
function capitalize(s)
{
  return s[0].toUpperCase() + s.slice(1);
};

function percentile(s){  /// convert probability
	return (s*100).toFixed(2) + '%'
};
