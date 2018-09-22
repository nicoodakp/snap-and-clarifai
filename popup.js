
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

var imgb64src, width, height, imgdetail, canvas, ctx;
/// once clicked generate name and link, return err msg if fail
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


/// once the click generate successful, bind even to the link, and open tab benhind

$('body').on('click', 'a.linky', function (){
			chrome.tabs.create({active: false, url: $(this).attr('href')});
				return false;
		// console.log("click work?");
				});


/// draw bounding box while hover to name
$( 'body' ).on('mouseenter', 'a.linky',  function () {
// image2 = new Image();
// image2.src = $('img').attr('src');
// console.log("mouse hover work?");
// ctx.rect(x, y, w, h);
// ctx.lineWidth = "2.5";
// ctx.stroke();
					});
/// end draw box


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

				// canvas set up
	// $('img').after( '<canvas id = "canvas"></canvas>' ); /// canvas ready for draw face box
			// end, also adjust the position through css, so now its overlay on img


// if found, then for i , grab these datas
				for(var i = 0; i < regionArray.length; i++) {


				         name = response.outputs[0].data.regions[i].data.face.identity.concepts[0].name;
					   fullname = capitalize(name);

								 prob = response.outputs[0].data.regions[i].data.face.identity.concepts[0].value;
       percentageprob = percentile(prob);

					//gather data to draw a box
					top  = response.outputs[0].data.regions[i].region_info.bounding_box.top_row;
					left = response.outputs[0].data.regions[i].region_info.bounding_box.left_col;
				 right = response.outputs[0].data.regions[i].region_info.bounding_box.right_col;
				bottom = response.outputs[0].data.regions[i].region_info.bounding_box.bottom_row;

      x =  (response.outputs[0].data.regions[i].region_info.bounding_box.left_col) * 225;
      y =  (response.outputs[0].data.regions[i].region_info.bounding_box.top_row) * 400;
      w =  (response.outputs[0].data.regions[i].region_info.bounding_box.right_col-response.outputs[0].data.regions[i].region_info.bounding_box.left_col) * 225;
      h =  (response.outputs[0].data.regions[i].region_info.bounding_box.bottom_row-response.outputs[0].data.regions[i].region_info.bounding_box.top_row) * 400;
			// drawandconnect(x,y,w,h);

			// canvas set up
			$('img').after( '<canvas id = "canvas"></canvas>' ); /// canvas ready for draw face box
		// end, also adjust the position through css, so now its overlay on img
			var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			c.width = w*2.8;
			c.height = h*(.985);
			c.style.left = x*1.966+"px";
			c.style.top = y*(0.59582)+"px";
console.log("x are"+" " + x);
			// ctx.strokeStyle = "#FF0000";
			// ctx.strokeRect(x, y, w, h);




			console.log(x);

				 // end gather box data

					console.log(response.outputs[0].data.regions[i].data.face.identity.concepts[0].name);



					var source = "https://www.youtube.com/results?search_query="+fullname;
					var catDiv = document.createElement("p");
					console.log(typeof source);									//"target=" + "_blank" +
					catDiv.innerHTML = "Name:" + " " + "<a"  + " " + " " + "class=" + "linky" + " " + " " + "href=" +  source + ">" + fullname + "</a>" + " " +   "" + percentageprob;
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

// draw box - user hover name, show bounding boundingbox




//  Purpose: Return a capitalized String
//  Args:
//    s - A String
 function capitalize(str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};

function percentile(s){  /// convert probability
	return (s*100).toFixed(2) + '%'
};
