//variables
var itemId = 0;
var itemsVisible = false;


//Prepare the automate trade button
var buttonElement = document.createElement("button");
$(buttonElement).addClass("ih-button");
$(buttonElement).html("Automate trade");

//Prepare the text
var textElement = document.createElement("p");
$(textElement).html("Click the button to automatically select the correct item. You will manually have to accept the trade here and on mobile.");

//Prepare the itemherald content div
var ihContentElement = document.createElement("div");
$(ihContentElement).addClass("ih-content");

//Add contents to the content div
$(ihContentElement).append(textElement).append(buttonElement);





function bindListeners() {
	//Bind click handler to the button
	$(buttonElement).click(() => {
		var interval = setInterval(() => {
			//Make sure the items are visible before searching for the to be traded item
			if(jQuery("#trade_inventory_unavailable").css('display') != "block") {
				clearInterval(interval);
				var item = jQuery(document.body).find(`*[id$='${itemId}']`);
				
				let tScript = document.createElement('script');
				tScript.innerText = `
					$J('#inventory_select_your_inventory').click();
					MoveItemToTrade(UserYou.findAsset(730, 2, ${itemId}).element);
				`;
				document.head.appendChild(tScript);
			}
		}, 1000);
	});
}


jQuery(document).ready(() => {
	var params = window.location.search;
	var itemIdParams = params.split("&");
	itemIdParams.forEach(param => {
		if(param.startsWith("item=")) {
			itemId = param.split("=")[1];
			console.log("Item id is", itemId);
	
			//Add the automate trade button
			$(".pagecontent").prepend(ihContentElement);
			bindListeners();
		}
	});
	
})

