# imgzip
压缩图片

```html
<script type="text/javascript" src="imgzip.js"></script>
```

```javascript

window.onload = function(){
	var img = new ImgZip();

	var imgs = document.getElementById('test');
	imgs.onchange = function(){
		img.zipImages(this.files,{
			width : 600, //宽度
			height : 600, //高度
      			quality : 0.7 //质量
		},function(data){
			var bb = document.createElement('img');
			bb.setAttribute('src',data);
			document.body.appendChild(bb)
		})
	}
	
}

```
