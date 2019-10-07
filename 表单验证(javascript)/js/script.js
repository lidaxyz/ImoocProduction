//获取元素
var input = document.getElementsByName("input"),
	tips = document.getElementsByName('tips'),
	information = document.querySelectorAll(".information"),
	submitBtn = document.getElementById("submitBtn"),
	strength = document.querySelectorAll(".strength"),
	agree = document.getElementById("agree");
	agreeFlag = false;

console.log(strength);
//正则表达式
var pattern = {
	username:      /^[a-z]\w{5,29}$/i,
	password:      /^\S{6,20}$/i,
	name:          /^(?:[\u4e00-\u9fa5]{2,15}|[a-z]{3,30})$/i,
	idNumber:      /^[1-9](?:\d{17}|\d{16}[x])$/i,
	email:         /^[\w|-]+@[\w|-]+\.[\w|-]+$/i,
	phone:         /^1[^12]\d{9}$/
};

//错误提示
var errormas = {
	username:      "6-20位字母、数字或‘_’,字母开头",
	password:      "请输入6-20位字母、数字或符号",
	name:          "姓名只能包含中文或者英文,且字符在3-30个之间！",
	idNumber:      "请输入18位身份证号码",
	email:         "请输入正确的邮箱",
	phone:         "您输入订单手机号码不是有效的格式！"
};


//声明符合条件 布尔值  用于最终提交遍历跳转
var pass = [];
for (var i = 0, len = input.length; i < len; i++) {
	pass.push("false");
}


//失去焦点 验证value 不能为空 错误返回 正确返回
for(var i = 0, len = input.length; i < len; i++) {
	input[i].title = i;
	input[i].onblur = function() {

		if(this.value == '') {
			information[this.title].innerHTML = tips[this.title].innerHTML + "不能为空";
			information[this.title].style.color = 'rgb(251, 116, 3)';
		} else {

			if(!pattern[this.id].exec(this.value)) {
				
				information[this.title].innerHTML = errormas[this.id];
				information[this.title].style.color = 'red';
			} else {
				information[this.title].innerHTML = tips[this.title].innerHTML + "输入正确";
				information[this.title].style.color = 'green';
				this.style.boxShadow = '0 0 0 transparent';
				pass[this.title] = 'true';
			}
		}		
	}
}


/*  如果输入的密码满足条件，内容是纯数字、纯字母或者纯符号，密码强度为低，输入框后面的小方块不变；
    如果是两种类型的结合，那么密码强度为一般，也就是第二块变为橘色；
	如果是三种类型的结合，那么密码强度为高，第三块变为绿色 */
input[1].onblur = function() {

	var pat1 = /^(?:[\d]|[a-z]|[\_\W]){6,20}$/i;   //纯数字、纯字母或者纯符号
	var pat2 = /^(?![0-9]+$)(?![a-z]+$)(?![\_\W]+$)[\_\W0-9a-z]{6,20}$/i;  //两种类型的结合
	var pat3 = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[\_\W].*)[0-9a-z\_\W]{6,20}$/i;   //三种类型的结合



	if(input[1].value == '') {
		information[1].innerHTML = tips[1].innerHTML + "不能为空";
		information[1].style.color = 'rgb(251, 116, 3)';

		//重置色块
			strength[0].style.backgroundColor = "red";
			strength[1].style.backgroundColor = "#dfe6e9";
			strength[2].style.backgroundColor = "#dfe6e9";
	} else {

		if(!pattern[input[1].id].exec(input[1].value)) {
			
			information[1].innerHTML = errormas[input[1].id];
			information[1].style.color = 'red';

			//重置色块
			strength[0].style.backgroundColor = "red";
			strength[1].style.backgroundColor = "#dfe6e9";
			strength[2].style.backgroundColor = "#dfe6e9";


		} else {
			information[1].innerHTML = tips[1].innerHTML + "输入正确";
			information[1].style.color = 'green';
			input[1].style.boxShadow = '0 0 0 transparent';
			pass[1] = 'true';

			console.log(pat1.exec(input[1].value));
			console.log(pat2.exec(input[1].value));
			console.log(pat3.exec(input[1].value));

			//改变色块的颜色
			if (pat3.test(input[1].value)) {
				strength[0].style.backgroundColor = "green";
				strength[1].style.backgroundColor = "green";
				strength[2].style.backgroundColor = "green";
			} else if (pat2.test(input[1].value)) {
				strength[0].style.backgroundColor = "orange";
				strength[1].style.backgroundColor = "orange";
				strength[2].style.backgroundColor = "#dfe6e9";
			} else if (pat1.test(input[1].value)) {
				strength[0].style.backgroundColor = "red";
				strength[1].style.backgroundColor = "#dfe6e9";
				strength[2].style.backgroundColor = "#dfe6e9";
			}

		}
	}


}

//验证 确认密码是否与登录密码一致 登录密码正确 再验证一致性
input[2].onblur = function() {
	
		if (input[2].value == '') {
			information[2].innerHTML = "确认密码不能为空";
		} else {
			if (pattern[input[1].id].test(input[1].value)) {
				if (input[2].value !== input[1].value) {
					information[2].innerHTML = "两次密码输入不一致，请重新输入";
					information[2].style.color = 'red';
				} else {
					information[2].innerHTML = "两次输入一致";
					information[2].style.color = 'green';
					this.style.boxShadow = '0 0 0 transparent';
					pass[2] = 'true';
				}
			} else {
				information[2].innerHTML = "登录密码格式不正确";
				information[2].style.color = 'red';
			}
		}
}

// 多选框发生改变 判断是否勾选 是返回true 否返回false
// 
//
agree.onchange = function() {
	if (agree.checked) {
		agreeFlag = true;
	} else {
		agreeFlag = false;
	}
}




submitBtn.onclick = function() {
		
	console.log(pass);
	console.log(agree.checked);
	//声明变量用于 验证所有inputd都正确
	var num = 0;
	for (var j = 0; j < pass.length; j++) {
		if (pass[j] == 'true' && agreeFlag) {  //这里agree.checed 代替agreeFlag 同样可以实现
			num++;
		}
	}
	if (num == pass.length) {
		window.open("http://www.imooc.com", '_self');
	} else {
		//若有空白  提示错误信息 不跳转
		for (var i = 0; i < input.length; i++) {
			if (input[i].value == '') {
				information[input[i].title].innerHTML = tips[input[i].title].innerHTML + "不能为空";
				information[input[i].title].style.color = 'rgb(251, 116, 3)';
				input[i].style.boxShadow = '0 0 3px #f00';
				pass[i] = 'false';
			}
		}
	}

}