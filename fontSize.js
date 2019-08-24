;(function(){
	var html = document.documentElement
	function font(){
		var width = html.clientWidth > 540 ? 540 : html.clientWidth;
		html.style.fontSize = (width / 750) * 100 +'px'
	}
	font()
	window.addEventListener("resize",function(){
		font()
	})
})();