///// crxCS
var crxCS = new (function CrxCS() {
	this.insert = function(tab, details, cb) {
		var script;
		if ("file" in details && "code" in details) {
			return;
		} else if ("file" in details) {
			script = details.file;
		} else if ("code" in details) {
			script = "{" + details.code + "}";
		} else {
			return;
		}

		chrome.runtime.onMessage.addListener(function(msg, sender, resp) {
			switch (msg.type) {
				case "CrxCS.Inserted":
					if (msg.script === script) {
						chrome.runtime.onMessage.removeListener(arguments.callee);
						resp();
						if (cb != null) {
							cb();
						}
						return true;
					}
				case "CrxCS.NotInserted":
					if (msg.script === script) {
						chrome.runtime.onMessage.removeListener(arguments.callee);
						chrome.tabs.executeScript(tab, details, function() {
							resp();
							if (cb != null) {
								cb();
							}
						});
						return true;
					}
			}
		});

		chrome.tabs.executeScript(tab, {

			code: `
				if (!("crxCS" in window)) {
					window.crxCS = {};
					chrome.runtime.onMessage.addListener(function(msg, sender, resp) {
						switch (msg.type) {
							case "CrxCS.Call":
								resp(window[msg.funcName]());
								return;
							case "CrxCS.CallA":
								window[msg.funcName](resp);
								return true;
						}
					});
				}
				if (!("InsertedScript" in crxCS)) {
					crxCS.InsertedScript = {};
				}



				if ("` + script + `" in crxCS.InsertedScript) {
					chrome.runtime.sendMessage(null, { type: "CrxCS.Inserted", script: \`` + script + `\`});
				} else {
					chrome.runtime.sendMessage(null, { type: "CrxCS.NotInserted", script: \`` + script + `\`}, null, function() {
						crxCS.InsertedScript["` + script + `"] = true;
					});
				}
			`

		}, _=>{     /// add error handeling
		  let e = chrome.runtime.lastError;
		  if(e !== undefined){
				window.addEventListener('load', function () {
					alert('Cant run on this page');
				}, true);
		  }
		});   /// end error handeling


	};

	function call(type, tab, funcName, resultCb) {
		if (tab == null) {
			chrome.tabs.query({ active: true }, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { type: type, funcName: funcName}, resultCb);
			});
		} else {
			chrome.tabs.sendMessage(tab, { type: type, funcName: funcName}, resultCb);
		}
	};

	this.call = function(tab, funcName, resultCb) {
		call("CrxCS.Call", tab, funcName, resultCb);
	};

	this.callA = function(tab, funcName, resultCb) {
		call("CrxCS.CallA", tab, funcName, resultCb);
	};
})();
///end crxCS



var notFound = document.createElement("p");
notFound.setAttribute('class', 'error');
notFound.innerText = "No video found.";


function capture(popup) {

  function callOnLoad(func) {
    popup.addEventListener("load", func);
    if (popup.document.readyState === "complete") {
      func();
    }
  }

  crxCS.insert(null, { file: "capture.js" }, function() {
    crxCS.callA(null, "get", function(result) {

      var scrShot, zm, bufCav, bufCavCtx;
      function mkImgList() {
        for (var i = 0; i < result.vidShots.length; i++) {
          var img = new popup.Image();
          img.onload = function() {
            this.style.height = this.naturalHeight / (this.naturalWidth / 400) + "px";
          };

          if (result.vidShots[i].constructor === String) {
            img.src = result.vidShots[i];
          } else {
            bufCav.width = result.vidShots[i].width * zm;
            bufCav.height = result.vidShots[i].height * zm;
            bufCavCtx.drawImage(scrShot, -result.vidShots[i].left * zm, -result.vidShots[i].top * zm);
            img.src = bufCav.toDataURL('image/png');
          }

          popup.document.body.appendChild(img);
					// popup.document.body.appendChild(Found);
        }
        popup.onclick = function(mouseEvent) {
          if (mouseEvent.target.tagName === "IMG") {
            chrome.downloads.download({ url: mouseEvent.target.src, saveAs: true, filename: "chrome_video_capture_" + (new Date()).getTime() + ".png" });
          }
        };
        popup.onunload = function(mouseEvent) {
          crxCS.callA(null, "rcy");
        };
      }   /// end mkImgList

      if (result.needScrShot) {
        bufCav = popup.document.createElement("canvas");
        bufCavCtx = bufCav.getContext("2d");

        chrome.tabs.captureVisibleTab({ format: "png" }, function(dataUrl) {
          scrShot = new Image();
          scrShot.onload = function() {
            chrome.tabs.getZoom(function(zoomFactor) {
              zm = zoomFactor;
              callOnLoad(function() {
                mkImgList(zoomFactor);
              });
            });
          };
          scrShot.src = dataUrl;

        });
      } else if (result.vidShots.length) {
        callOnLoad(mkImgList);
      } else {
				popup.document.body.appendChild(notFound);

				// popup.document.body.appendChild(notFoundimgholder);
      }
    });  // end crxCS.callA
  });   // end crxCS.insert
}  // end capture function

// chrome.webNavigation.onHistoryStateUpdated.addListener( function(details) {
//     chrome.tabs.executeScript(null,{file:"content.js"},_=>{     /// add error handeling
// 		  let e = chrome.runtime.lastError;
// 		  if(e !== undefined){
// 				window.addEventListener('load', function () {
// 					alert('Cant run on this page');
// 				}, true);
// 		  }
// 		});   /// end error handeling);
// });
