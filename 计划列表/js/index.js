// 获取元素
let input = document.getElementById('input');
let clear = document.getElementById('clear');
let container = document.getElementById('container');

let underwayList = document.getElementById('underway_list');
let finishedList = document.getElementById('finished_list');
let underwayTotal = document.getElementById('underway_total');
let finishedTotal = document.getElementById('finished_total');

let itemDelete = container.getElementsByClassName('item_delete');

// 添加正在进行 
input.addEventListener('keydown', function(target) {
	if (target.keyCode == 13) {
		let text = input.value;
		if (/[\S]+/.test(text)) {
			let li = `
				<li class="item">
					<input class="item_checkbox" type="checkbox" />
					<span class="item_text"> ${ text } </span>
					<button class="item_delete" type="button">删除</button>
				</li>
			`;
			underwayList.innerHTML += li;
			input.value = '';
		} else {
			alert('不能为空');
		}
	}
	total();
	return false;
});

// 添加已经完成
container.addEventListener('change', function(e) {
	let li = e.target.parentNode;
	if (e.target.type === 'checkbox') {
		if (e.target.checked) {
			finishedList.appendChild(li);
			li.style.opacity = '.5';
		} else {
			underwayList.appendChild(li);
			li.style.opacity = '1';
		}
	}
	total();
});

// 修改文本
let text;
container.addEventListener('focusout', function(e) {
	if (e.target.className === 'item_changeText') {
		let value = e.target.value;
		if (value === '') {
			e.target.parentNode.innerHTML = text;
		} else {
			e.target.parentNode.innerHTML = value;
		}
	}
});

// 修改选项卡
container.addEventListener('click', function(e) {
	// 替换输入框
	if (e.target.className === 'item_text') {
		text = e.target.innerText;
		let input = document.createElement('input');
		input.className = 'item_changeText';
		input.type = 'text';
		input.placeholder = '修改内容';
		e.target.innerHTML = '';
		e.target.appendChild(input);
		e.target.children[0].focus();
	}
	// 删除选项卡
	if (e.target.className === 'item_delete') {
		e.target.parentNode.remove();
	}
	total();
});

// 清空全部
clear.addEventListener('click', function() {
	let li = document.querySelectorAll('li');
	if (!li.length) return;
	li.forEach(value => {
		value.remove();
	});
	total();
});

// 触发函数
total();

// 计算总数
function total() {
	underwayTotal.innerHTML = underwayList.querySelectorAll('.item').length;
	finishedTotal.innerHTML = finishedList.querySelectorAll('.item').length;
};

