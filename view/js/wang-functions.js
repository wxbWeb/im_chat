var W = function(){
	
	var r = {
		Drag : Drag
	};
	
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
	
	return r;
	
};
