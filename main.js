// Storing references
var ul = document.getElementById('ul');
var ulNotAdded = document.getElementById('notadded');
var text = document.getElementById('Your order');
var button = document.getElementsByClassName('addBtn');
var mapview = document.getElementById('locMap');
//
// Adding food Item
button.onclick = addElement; // Creating an eventhandler for button
function addElement() {
    let ul = document.getElementById('ul'); //  Storing the unordered list

    let li = document.getElementsByTagName('li'); // Storing the list items
    let newLi = document.createElement('li'); // Creating a new list to store newli

    let label = document.createElement('label'); // Creating label element
    label.innerText = text.value; // Label to get value

    let deleteButton = document.createElement('button'); // Creating delete button
    deleteButton.innerText = 'delete'; // Text of delete button 
    deleteButton.setAttribute('class', 'deleteButton'); // Creating Inner HTML 
    function deleteTask() {
        var removeList = this.parentElement; //  Creating functionality for delete button i.e. Button pressed will vanish element
        ul.removeChild(removeList)
    }

    // Creating checkbox
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = '1';
    checkbox.name = 'checkbox1';

    var checkIt = function(e) { // Creating functionality when user checks checkbox 
        checkbox = document.querySelector("input[name = checkbox1]"); // Selecting the checkbox 
        if (checkbox.checked) {
            var enteredText = this.parentElement;
            enteredText.style.textDecoration = 'line-through'; // Styling text 
            ul.appendChild(enteredText); // Creating the text as a child in an unordered list
            var removeList = function() { // Creating the functionality that removes the Item from the list when delete button is presed
                var removeItem = this.parentElement;
                ul.removeChild(removeItem);
            }
            deleteButton.addEventListener('click', deleteTask); // Creating an event handler for delete button


        } else {
            var enteredText = this.parentElement;
            enteredText.style.textDecoration = 'none';
            ul.removeChild(enteredText);
            ul.appendChild(newLi);
        }
    }
    checkbox.addEventListener('change', checkIt); // Event handler for checkbox

    deleteButton.addEventListener('click', deleteTask);
	// updated to add at top of the list
    ul.prepend(newLi);
    text.value = "";

    newLi.appendChild(checkbox);
    newLi.appendChild(label);
    newLi.appendChild(deleteButton);
}
var checkedItems = document.getElementsByTagName('li');

function getDelivery() {

// get geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  
  // on success get co-ordinates of my location
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
	
	var at = new google.maps.LatLng(latitude, longitude);
	// create a map with 7 zoom
	var locaiton = new google.maps.Map(mapview, {
		zoom: 7,
		center: at
		});
		// add marker at same co-ordinates
		   var your = new google.maps.Marker({
		   title: "Your Items will be Delivered Here...",
		   map: locaiton,
		   position: at
	   }); 
	   // create and add a new text
	  var h3 = document.createElement('h3');
	  h3.textContent = "Your Items Will be delivered here";
	  h3.style.float='right';
	  // add in footer
	  document.getElementsByTagName('footer')[0].prepend(h3);
  }
  // error function
  function error() {
	  
	  var h3 = document.createElement('h3');
	  h3.textContent = "Delivery is not possible! unable to fetch your location";
	  h3.style.float='right';
	  document.getElementsByTagName('footer')[0].prepend(h3);
  }


}