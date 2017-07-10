var W = function(){
	var appkey =  'f4f7e1b69b6ee39f81d3e918d6d1258e';
	var secret = '3514c7033b58';
	var host = 'https://api.netease.im/';
	var server_api = {
		create_id : host + 'nimserver/user/create.action'
	}
	var r = {
		Drag : Drag,
        Server : Server,
		q,
		qa,
		key : appkey
	};

	//获取元素
	function q(name){
		return document.querySelector(name);
	};

	//批量获取元素
	function qa(name) {
		return document.querySelectorAll(name);
	};

	//拖拽元素
	function Drag(op){
		this.op = op || {};
		//检测拖拽元素以及目标拖拽元素是否填写
		if(!this.op.dragEle && !this.op.dragTarget){
			console.error('dragEle 或 dragTarget 必传');
			return;
		};
		//查找拖拽元素是否存在
		this.ele = document.querySelectorAll(this.op.dragEle);
		this.eleTarget = document.querySelectorAll(this.op.dragTarget);
		
		if(!this.ele.length && !this.eleTarget.length){
			console.error('dragEle 或 dragTarget 没有找到');
			return;
		};
		this._mousedown();
	};
	
	Drag.prototype._mousedown = function(){
		var _this = this;
		for(var i=0;i<this.ele.length;i++){
			(function(i){
				_this.ele[i].onmousedown = function(event){
					_this.x = event.clientX - _this.eleTarget[i].offsetLeft;
					_this.y = event.clientY - _this.eleTarget[i].offsetTop;
					_this._move(i);
				};
			})(i);
		};
	};
	
	Drag.prototype._move = function(i){
		var _this = this;
		document.onmousemove = function(event){
			_this.eleTarget[i].style.left = event.clientX - _this.x + 'px';
			_this.eleTarget[i].style.top = event.clientY - _this.y + 'px';
			_this._up();
			event.preventDefault();
			return false;
		};
	};
	
	Drag.prototype._up = function(){
		document.onmouseup = function(){
			this.onmousemove = null;
			this.onmouseup = null;
		};
	};

	//服务端API
	function Server(){
		//生成所需的信息
		var nonce = parseInt(Math.random() * 100000);
        var curTime = parseInt(new Date().getTime() / 1000);
        this.key = {
            AppKey : appkey,
            Nonce : nonce,
            CurTime : curTime,
            CheckSum : sha1(secret + nonce + curTime)
		};
	};

	//创建云信ID
	Server.prototype.createId = function(user,success,err){
		$.ajax({
			url : server_api.create_id,
			type : 'post',
			data : user,
			headers : this.key,
			success: function(response){
                success&&success(response);
			},
			error : function(e){
				err&&err(e);
			}
		});
	};

	return r;
};
