//variables
var itemId = 0;
var itemsVisible = false;


//Prepare the automate trade button
var buttonElement = document.createElement("button");
buttonElement.className = "ih-button";
buttonElement.innerHTML = "Automate trade";

//Prepare the text
var textElement = document.createElement("p");
textElement.innerHTML = "Click the button to automatically select the correct item. You will manually have to accept the trade here and on mobile.";

//Prepare the itemherald content div
var ihContentElement = document.createElement("div");
ihContentElement.className = "ih-content";

//Add contents to the content div
ihContentElement.appendChild(textElement);
ihContentElement.appendChild(buttonElement);





function bindListeners() {
	//Bind click handler to the button
	buttonElement.addEventListener("click", ()=> {
		var interval = setInterval(() => {
			//Make sure the items are visible before searching for the to be traded item
			const checkableElement = document.getElementById("trade_inventory_unavailable");
			
			if(getComputedStyle(checkableElement).display != "block") {
				clearInterval(interval);
				let tScript = document.createElement('script');
				
				//highlight the correct item
				tScript.innerText = `
					$J('#inventory_select_your_inventory').click();
					MoveItemToTrade(UserYou.findAsset(730, 2, ${itemId}).element);
				`;
				document.head.appendChild(tScript);
			}
		}, 1000);
	});
}

(function() {
	var params = window.location.search;
	var itemIdParams = params.split("&");
	itemIdParams.forEach(param => {
		if(param.startsWith("item=")) {
			itemId = param.split("=")[1];
			console.log("Item id is", itemId);
			//Add the automate trade button
			document.getElementById("mainContent").prepend(ihContentElement);
			bindListeners();
		}
	});
})();

