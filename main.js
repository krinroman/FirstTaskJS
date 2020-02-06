let inputElement = document.getElementById("input");
let outputElement = document.getElementById("list_out");

function getMaxNumber(){
	let max = 0;
	outputElement.querySelectorAll("li").forEach(function(node){
			let num = node.querySelector("span[id=number]").textContent;
			if(parseInt(num) > max) max = parseInt(num);
	});
	return max;
}

function getIndexCheckedRadioButton(){
	let rad=document.getElementsByName('sort');
	for (let i=0;i<rad.length; i++) {
        if (rad[i].checked) {
            return i;
        }
    }
}

function sort(){
	let index = getIndexCheckedRadioButton();
	let nodeList = outputElement.querySelectorAll("li");
	//так как NodeList не имеет метода sort, преобразуем его к Array
	let itemsArray = Array.prototype.slice.call(nodeList);
	switch (index) {
		case 0:{
			itemsArray = itemsArray.sort(function(nodeA, nodeB){
				//childNodes[0] - это span с id "number"
				let val1 = parseInt(nodeA.childNodes[0].textContent);
				let val2 = parseInt(nodeB.childNodes[0].textContent);
				if(val1 > val2) return 1;
				if(val1 == val2) return 0;
				if(val1 < val2) return -1;
			});
		}break;
		case 1:{
			itemsArray.sort(function(nodeA, nodeB){
				//childNodes[0] - это span с id "number"
				let val1 = parseInt(nodeA.childNodes[0].textContent);
				let val2 = parseInt(nodeB.childNodes[0].textContent);
				if(val1 < val2) return 1;
				if(val1 == val2) return 0;
				if(val1 > val2) return -1;
			});
		}break;
		case 2:{
			itemsArray = itemsArray.sort(function(nodeA, nodeB){
				//childNodes[2] - это span с id "value"
				let val1 = nodeA.childNodes[2].textContent;
				let val2 = nodeB.childNodes[2].textContent;
				if(val1 > val2) return 1;
				if(val1 == val2) return 0;
				if(val1 < val2) return -1;
			});
		}break;
		case 3:{
			itemsArray = itemsArray.sort(function(nodeA, nodeB){
				//childNodes[2] - это span с id "value"
				let val1 = nodeA.childNodes[2].textContent;
				let val2 = nodeB.childNodes[2].textContent;
				if(val1 < val2) return 1;
				if(val1 == val2) return 0;
				if(val1 > val2) return -1;
			});
		}break;
		default: break;
	}
	outputElement.innerHTML = '';
	itemsArray.forEach(function(node, index){
		node.setAttribute("id", "item_"+index);
		node.querySelector("button[id=edit_button]").setAttribute("data-id", index);
		node.querySelector("button[id=del_button]").setAttribute("data-id", index);
		outputElement.append(node);
	});
}

document.getElementById("add_button").addEventListener("click", function(){
	if(inputElement.value.length > 0){
		let text = inputElement.value;
		let num = parseInt(getMaxNumber()) + 1;
		inputElement.value = "";
		let newElement = document.createElement("li");
		let lastId = outputElement.querySelectorAll("li").length;
		newElement.setAttribute("id", "item_"+lastId);
		newElement.innerHTML =  "<span id=\"number\">"+num+"</span><span>.</span>" +
							"<span id=\"value\">"+text+"</span>" +
							"<button id=\"edit_button\" data-id=\""+lastId+"\" class=\"button-edit\">✐</button>" +
							"<button id=\"del_button\" data-id=\""+lastId+"\" class=\"button-delete\">✕</button>";
		outputElement.append(newElement);
		sort();
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
 		let text = editElement.querySelector("span[id=value]").textContent;
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
		let editOutputElement = document.getElementById("item_"+id);
		if(event.target.id == "ok_button"){
			editOutputElement.querySelector("span[id=value]").textContent = text;
		}
		editOutputElement.style.display = 'list-item';
		editElement.remove();
 	}

});

document.getElementById("radio_box").addEventListener("click", function(){
	sort();
});



