chrome.runtime.getBackgroundPage(function(bg) {
	bg.capture(window);
});

$(function(){    ///doc ready

try {
	var app = new Clarifai.App({
	 apiKey: "e0c01101e5f944919934b47eff3ced2f"
	});
}
catch(err) {
	var nokey = document.createElement("p");
	nokey.setAttribute('class', 'error');
	nokey.innerText = "Need a valid API key.";
	document.body.appendChild(nokey);
	throw "Invalid API Key";
}

var imgb64src, width, height, imgdetail, canvas, ctx;

/// once clicked generate name and link, return err msg if fail
	$('.button-three').click(function analysis(){
	try {
		  imgb64src = $('img').attr('src');  // get b64 string
			    width = $('img').width();
         height = $('img').height();
		 	imgdetail = imgb64src.replace(/^data:image\/(.*);base64,/, '');  // pure b64 string for Clarifai
			console.log(height);
				}
	catch(err) {

				return false;
							}
			//// clarifai there
					$(this).hide();
			$('.load-wrapp').show();
					doPredict({ base64: imgdetail });

		});   //end ('action-button').click(function(){

/// once the click generate successful, bind even to the link, and open tab benhind
$('body').on('click', 'a.linky', function (){
	let page_url = $(this).attr('href'); // get url to call
		let page_title = $(this).attr('data-title'); // set data-title in link



		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.storage.sync.set({key: page_url}, function() {
          console.log('Value is set to ' + page_url);
        });
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {

		 });
	});

	chrome.tabs.update({ active: false, url: $(this).attr('href')});
	 return true;
			});  //end 'body').on('click', 'a.linky', function (){

/// temperoary closed snap button
// $('body').on('click', 'button.minimize', function (){
// 	console.log("click work?");
// 					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 				  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
// 					 });
// 				});
// 			});
///closed snap button

/// hightlight individual bounding box while hover to name
///  dummy drawbox function
				$( 'body' ).on('mouseenter', "a#linky0" ,  function () {
						console.log("mouse work?");
						$('canvas:not(#canvas0)').hide();
									});
				$( 'body' ).on('mouseenter', "a#linky1" ,  function () {
						$('canvas:not(#canvas1)').hide();
									});
				$( 'body' ).on('mouseenter', "a#linky2" ,  function () {
							$('canvas:not(#canvas2)').hide();
									});
				$( 'body' ).on('mouseenter', "a#linky3" ,  function () {
							$('canvas:not(#canvas3)').hide();
									});
				$( 'body' ).on('mouseenter', "a#linky4" ,  function () {
							$('canvas:not(#canvas4)').hide();
									});
				$( 'body' ).on('mouseenter', "a#linky5" ,  function () {
							$('canvas:not(#canvas5)').hide();
									});
				$( 'body' ).on('mouseenter', "a#linky6" ,  function () {
							$('canvas:not(#canvas6)').hide();
									});
				$( 'body' ).on('mouseenter', "a#linky7" ,  function () {
						 $('canvas:not(#canvas7)').hide();
						 			});
				$( 'body' ).on('mouseleave', "a.linky" ,  function () {
			 		   $('.canclass').show();
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
			$('img').after( '<canvas class = canclass' + ' ' + 'id = canvas' +i + ' '+ '></canvas>' ); /// canvas ready for draw face box
		// end, also adjust the position through css, so now its overlay on img
			var c = document.getElementById("canvas"+i);
			var ctx = c.getContext("2d");
			c.width = w*2.8;
			c.height = h*(.985);
			c.style.left = x*1.84855+"px";
			c.style.top = y*(0.59582)+"px";

				 // end gather box data
					console.log(response.outputs[0].data.regions[i].data.face.identity.concepts[0].name);

					var source = "https://www.youtube.com/results?search_query="+fullname.split(' ').join('+');
					var catDiv = document.createElement("p");
					catDiv.innerHTML = "Name:" + " " + "<a"  + " " + " " + "class=" + "linky" + " " + "id="+ "linky" +  i +" " + "href=" +  source + ">" + fullname + "</a>" + " " +   "" + percentageprob;
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
