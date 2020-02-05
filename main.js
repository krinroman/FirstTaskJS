var input_element = document.getElementById("input");
var output_element = document.getElementById("list_out");
document.getElementById("add_button").addEventListener("click", function(){
	if(input_element.value.length > 0){
		let text = input_element.value;
		input_element.value = "";
		var new_element = document.createElement("li");
		var last_id = output_element.querySelectorAll("li").length;
		new_element.setAttribute("id", "item_" + last_id);
		new_element.innerHTML = text + "<button id=\"del_button_"+last_id+"\" class=\"button_delete\">✕</button>";
		output_element.append(new_element);
	}
});

output_element.addEventListener('click', function(event){
 	let idElement = event.target.id;
 	if(idElement.indexOf("del_button") != -1){
 		let id = idElement.slice(11);
 		document.getElementById("item_"+id).remove();
 		var i = 0;
 		output_element.querySelectorAll('li').forEach(function(node) {
			node.setAttribute("id", "item_"+i);
			node.querySelector("button").setAttribute("id", "del_button_"+i);
			i++;
		});
 	}
});

