// Fetching the data from a Text file via Ajax
function loadJSON(callback) 
{  
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/txt");
    xobj.open('GET', 'http://localhost/manifesto/assets/json.txt', true);
    xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText);
		}
    };
    xobj.send(null);
}

// Show the menu for small devices
function showMenu() {
	var x = document.getElementById("topnav");
	if (x.classList.contains("responsive")) {
		x.classList.remove("responsive");
	} else {
		x.classList.add("responsive");
	}
}

// Initiate the data to show on the home page
function init(){
	// Load the data from the text file
	loadJSON(function(response){
		// Parse JSON string into object
		var content = JSON.parse(response);
		var header  = content.header;
		var menu    = content.menu;
		var title   = content.title;
		var body    = content.body;
		var footer  = content.footer;
		
		// Initiate the menu value
		var menuContent = "";
		var subMenuContent = '';
		
		//Get all the items for the menu
		for (i=0; i < menu.length; i++){
			// If the item has a submenu 
			if(menu[i].submenu != null && menu[i].submenu.length > 0)
			{
				item = '<a href="'+menu[i].url+'">'+menu[i].title+'<i class="down"></i></a>';
				
				for (j=0; j < menu[i].submenu.length; j++) 
				{
					subMenuContent += '<a href="'+menu[i].submenu[j].url+'">'+menu[i].submenu[j].title+'</a>';
				}
				
				item = '<div class="dropdown"><button class="dropbtn">'+item+'</button><div class="dropdown-content">'+subMenuContent+'</div></div>';
			}
			else{
				item = '<a href="'+menu[i].url+'">'+menu[i].title+'</a>';
			}
			
			menuContent += item;
		}
		
		// Prepare the menu to be sent to the page
		menuContent += '<a href="javascript:void(0);" class="icon" onclick="showMenu()">&#9776;</a>';
		
		// Add the data to the html nodes on the main page
		document.getElementById('header').innerHTML = "<h1>"+header+"</h1>";
		document.getElementById('title').innerHTML  = title;
		document.getElementById('text').innerHTML   = body;
		document.getElementById('footer').innerHTML = footer;
		document.getElementById('topnav').innerHTML = menuContent;
		
		// Remove the loader 
		setTimeout(function(){document.getElementById("loader").style.display = "none"}, 3000);
		
		// show the page
		setTimeout(function(){document.getElementById("container").style.display = "block"}, 3000);

	});
}