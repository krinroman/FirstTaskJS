let inputElement = document.getElementById("input");
let outputElement = document.getElementById("list_out");
document.getElementById("add_button").addEventListener("click", function(){
	if(inputElement.value.length > 0){
		let text = inputElement.value;
		inputElement.value = "";
		let newElement = document.createElement("li");
		let lastId = outputElement.querySelectorAll("li").length;
		newElement.setAttribute("id", "item_"+lastId);
		newElement.innerHTML = text +
							" <button id=\"edit_button\" data-id=\""+lastId+"\" class=\"button-edit\">✐</button>" +
							" <button id=\"del_button\" data-id=\""+lastId+"\" class=\"button-delete\">✕</button>";
		outputElement.append(newElement);
	}
});

outputElement.addEventListener('click', function(event){
 	if(event.target.id == "del_button"){
 		let id = event.target.getAttribute("data-id")
 		document.getElementById("item_"+id).remove();
 		outputElement.querySelectorAll('li').forEach(function(node, index) {
			node.setAttribute("id", "item_"+index);
			node.querySelector("button").setAttribute("data-id",index);
		});
 	}

 	if(event.target.id == "edit_button"){
 		let id = event.target.getAttribute("data-id")
 		let editElement = document.getElementById("item_"+id);
 		editElement.style.display = 'none';
 		let text = editElement.textContent;
 		text = text.split(' ')[0];
 		let newElementEdit = document.createElement("li");
 		newElementEdit.setAttribute("id", "item_edit_"+id);
 		newElementEdit.innerHTML = "<input type=\"text\" name=\"edit_text\" id=\"edit_input\" data-id=\""+id+"\" value=\""+text+"\">" +
							" <button id=\"ok_button\" data-id=\""+id+"\" class=\"button-simple\">ок</button>" +
							" <button id=\"cancel_button\" data-id=\""+id+"\" class=\"button-simple\">отмена</button>";
		editElement.after(newElementEdit);
 	}

 	if(event.target.id == "ok_button" || event.target.id == "cancel_button"){
		let id = event.target.getAttribute("data-id");
		let editElement = document.getElementById("item_edit_"+id);
		let text = editElement.querySelector("input").value;
		let outputElement = document.getElementById("item_"+id);
		if(event.target.id == "ok_button"){
			outputElement.innerHTML = text + 
							" <button id=\"edit_button\" data-id=\""+id+"\" class=\"button-edit\">✐</button>" +
							" <button id=\"del_button\" data-id=\""+id+"\" class=\"button-delete\">✕</button>";

		}
		outputElement.style.display = 'list-item';
		editElement.remove();
 	}

});

