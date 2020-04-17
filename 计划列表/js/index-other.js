
(function(window) {
	
	
	
	let underwayList = document.getElementById('underway_list');
	let finishedList = document.getElementById('finished_list');
	let input = document.querySelector('.input');
	let itemDelete = document.querySelectorAll('.item_delete');
	let underwayItem = document.querySelectorAll('.underway_item');
	

	let ischecked = document.querySelector('.item_checkbox').checked;

	// 正在进行 
	input.addEventListener('keydown', function(target) {
		
		if (target.keyCode == 13) { // enter键 添加
			let text = input.value;
			// console.log(!/[\S]+/.test(text));
			if (!/[\S]+/.test(text)) return;
			let li = `
				<li class="underway_item">
					<input class="item_checkbox" type="checkbox" />
					<span class="item_text"> ${ text } </span>
					<button class="item_delete" type="button">删除</button>
				</li>
			`;
				
			underwayList.innerHTML += li;
			input.value = '';
			console.log(underwayItem);
		}
		
		
	});
	
	// 选中的 添加到finishedList中
	for (let j = 0; j < underwayItem.length; j++) {
		underwayItem[j].addEventListener('change', function() {
			
			
			if (this.childNodes[1].checked) {
				finishedList.appendChild(this);
				this.className = 'finished_item';
				this.style.opacity = '.5';
			} else {
				underwayList.appendChild(this);
				this.className = 'underway_item';
				this.style.opacity = '1';
			}
			
		});
	}
	
	// 删除对应item
	for (let i = 0; i < itemDelete.length; i++) {
		itemDelete[i].addEventListener('click', function() {
			// console.log(this.parentNode);
			this.parentNode.remove();
		});
	};

	
	
	
	
	
})(window);