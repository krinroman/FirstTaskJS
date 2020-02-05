window.onload = function(){
	var input_element = document.getElementById("input");
	var output_element = document.getElementById("list_out");
	add_button.onclick = function(){
		if(input_element.value.length > 0){
			let text = input_element.value;
			input_element.value = "";
			var new_element = document.createElement("li");
			new_element.innerHTML = text;
			output_element.append(new_element);
		}
		
	};
};
