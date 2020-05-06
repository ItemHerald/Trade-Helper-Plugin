//variables
var itemId = 0;
var itemsVisible = false;


//Prepare the automate trade button
var button = document.createElement("button");
$(button).addClass("ih-button");
$(button).html("Automate trade");

function bindListeners() {
	//Bind click handler to the button
	$(button).click(() => {
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

	var itemIdParam = params.split("&")[1];
	if(itemIdParam.startsWith("item=")) {
		itemId = itemIdParam.split("=")[1];
		console.log("Item id is", itemId);

		//Add the automate trade button
		$(".pagecontent").prepend(button);
		bindListeners();
	}
})

