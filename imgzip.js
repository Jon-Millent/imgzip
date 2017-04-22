(function(root) {
	//private
	var defineConfig = {
		width : 100,//宽
		height : 100,//高
		quality : 0.7//图片质量
	}
	var index = 0;
	function zip(path, obj, callback){
		var img = new Image();
		img.src = path;
		img.onload = function() {
		    var that = this;
		    var w = that.width,
		        h = that.height,
		        scale = w / h;
		    w = obj.width || w;
		    h = obj.height || (w / scale);
		    var quality = 0.7; // 默认图片质量为0.7
		    //生成canvas
		    var canvas = document.createElement('canvas');
		    var ctx = canvas.getContext('2d');
		    // 创建属性节点
		    var anw = document.createAttribute("width");
		    anw.nodeValue = w;
		    var anh = document.createAttribute("height");
		    anh.nodeValue = h;
		    canvas.setAttributeNode(anw);
		    canvas.setAttributeNode(anh);
		    ctx.drawImage(that, 0, 0, w, h);
		    // 图像质量
		    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
		        quality = obj.quality;
		    }
		    // quality值越小，所绘制出的图像越模糊
		    var base64 = canvas.toDataURL('image/jpeg', quality);
		    // 回调函数返回base64的值
		    callback(base64);
		}

	}
	function drowImg(files,fn){
		var read = new FileReader();
		read.readAsDataURL(files[index]);
		read.onload=function(){
			zip(this.result,defineConfig,function(data){
				index++;
				if(index<files.length){
					drowImg(files,fn);
				}
				fn(data);
			})
		}
	}
	function ImgZip(){

	}
	ImgZip.prototype.zipImages = function(files,config,callback){
		for(var i in config){
			defineConfig[i] = config[i];
		}
		drowImg(files,callback)
	}

	window.ImgZip = ImgZip;
})(window)
