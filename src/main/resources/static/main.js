var _realTotal;
var _previousTotal;
var _statusLayer=1;
var _customEnabled=0;
var _optionsVis=0;
var _seperator="";
var _prefix="";
var _suffix="";
var _wordPrefix="";
var _defaultTxt = "在这输入关键词";

$(document).ready(function(){
    $("#add").click(function(){

        var column_box = document.createElement('div');
        column_box.classList.add("column","grid_4");

                        $("#threeColumns").append(column_box);
                         // 设置li中显示的内容
                        column_box.innerHTML +=`
                        <textarea class="editText"  rows="10" cols="40">在这输入关键词</textarea> 
                        `;
    }
)
	$('#txtCustom').hide();
	$('#txtCustom').css("opacity", 0);
						   
	$("#mergeButton").click(function(event){
		var target_offset = $("#resultsTextArea").offset();
		var target_top = target_offset.top;
		var scrPos = $(window).height() + $(window).scrollTop();
		if (scrPos < target_top) {
			scrollTo("resultAnch");
		}
		merge();
	});


    var editText=document.getElementsByClassName("editText");
    $('#threeColumns').on('focusin', '.editText', function(){
        if ( $(this).val() == _defaultTxt){
            		$(this).val("");
                }
    })
    $('#threeColumns').on('focusout', '.editText', function(){
        if ( $(this).val() == "") {
			$(this).val(_defaultTxt);
		}
    })

	
	$(".scroll").click(function(event){
		//prevent the default action for the click event
		event.preventDefault();

		//get the full url - like mysitecom/index.htm#home
		var full_url = this.href;

		//split the url by # and get the anchor target name - home in mysitecom/index.htm#home
		var parts = full_url.split("#");
		var trgt = parts[1];

		//get the top offset of the target anchor
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;

		//goto that anchor by setting the body scroll top to anchor top
		$('html, body').animate({scrollTop:target_top}, 1100);
	});
	
	$("#optionsOpen").click(function(event){

		if (_optionsVis == 0) {
			$(this).removeClass("open");						
			$(this).addClass("close");						
			//$("#optionsBox").show("fast");
			$('#extraOptions').animate({
				height: 80
				}, 200, function() {
					// Animation complete.
				});

			$("#optionsBox").stop(true,true).fadeIn("fast", function() {});
			_optionsVis = 1;
		} else {
			$(this).removeClass("close");						
			$(this).addClass("open");						

			$('#extraOptions').animate({
				height: 38
				}, 200, function() {
					$("#optionsBox").hide();
					// Animation complete.
				});
			$("#optionsBox").stop(true,true).fadeOut("fast", function() {});


			_optionsVis = 0;
		}
	});

	$("#optionsClose").click(function(event){
		//$("#optionsOpen").stop(true,true).fadeIn("fast", function() {});
		$("#optionsBox").hide();
	});
	
	$(".seperators").click(function(event){
		$('.seperators').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$(this).addClass("pressed");						

		if ($(this).attr("id") == "sepCustom")
		{
			_customEnabled = 1;
			$('#sepCustom').animate({
				width: "90px"
				}, 200, function() {
					$('#txtCustom').show();
					$('#txtCustom').focus();
					$('#txtCustom').animate({
						opacity: 1
						}, 100, function() {
							// Animation complete.
						});

					// Animation complete.
			});
		} else {

			if (_customEnabled == 1) {
				$('#txtCustom').hide();
				$('#txtCustom').css("opacity", 0);
				$('#sepCustom').animate({
					width: "50px"
					}, 200, function() {
					// Animation complete.
				});
			}
			_customEnabled = 0;
		}
	});

	$(".enclosers").click(function(event){
		$('.enclosers').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$(this).addClass("pressed");
	});
	
	$("#sepNothing").click(function(event){
		_seperator="";
		// _wordPrefix="";
	});	
	$("#sepSpace").click(function(event){
		_seperator=" ";
		// _wordPrefix="";
	});	
	$("#sepDash").click(function(event){
		_seperator="-";
		// _wordPrefix="";
	});	
	$("#sepPlus").click(function(event){
		_seperator="+";
		// _wordPrefix="+";
	});	
	$("#sepCustom").click(function(event){
		_seperator=$("#txtCustom").val();
		// _wordPrefix="";
	});	
	$("#txtCustom").keyup(function(event){
		_seperator=$("#txtCustom").val();
		// _wordPrefix="";
	});	
	

	$("#encNothing").click(function(event){
		_prefix="";
		// _suffix="";
	});	
	$("#encQuotes").click(function(event){
		_prefix='""';
		// _suffix="\"";
	});	
	$("#encBrackets").click(function(event){
		_prefix="[]";
		// _suffix="]";
	});	


	$("#loadSampleDomaining").click(function(event){
		var smpC1 = "iphone\nipad\nipod\nimac\nmacbook";								 
		var smpC2 = "world\nlife\nweb\nplanet\nhub\ncenter\nclub\ncentral\nspot\nbase\nstuff";								 
		var smpC3 = ".com\n.net\n.org";								 

		$("#colText1").val(smpC1);
		$("#colText2").val(smpC2);
		$("#colText3").val(smpC3);
		
		$('.seperators').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$("#sepNothing").addClass("pressed");
		_seperator="";

		$('.enclosers').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$("#encNothing").addClass("pressed");
		_prefix="";
		_suffix="";
		_wordPrefix="";
		countPossibilities();
	});
	
	$("#loadSampleLinkbuilding").click(function(event){
		var smpC1 = "mountaineering\nclimbing\nhiking\ntrekking";								 
		var smpC2 = "websites\nlinks\n\"add url\"\n\"suggest a site\"";								 
		var smpC3 = "intitle:list\ninurl:resources\nOR \"suggest URL\"\nOR resources";								 

		$("#colText1").val(smpC1);
		$("#colText2").val(smpC2);
		$("#colText3").val(smpC3);
		
		$('.seperators').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$("#sepSpace").addClass("pressed");
		_seperator=" ";

		$('.enclosers').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$("#encNothing").addClass("pressed");
		_prefix="";
		_suffix="";
		_wordPrefix="";
		countPossibilities();
	});

	$("#loadSampleAdwords").click(function(event){
		var smpC1 = "ladies\nwomen\ndesigner\nfashion";								 
		var smpC2 = "shoes\nboots\nsandals\nstiletto heels";								 
		var smpC3 = "New York\nNew Jersey\nLong Island City\nManhattan";								 

		$("#colText1").val(smpC1);
		$("#colText2").val(smpC2);
		$("#colText3").val(smpC3);
		
		$('.seperators').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$("#sepSpace").addClass("pressed");
		_seperator=" ";

		$('.enclosers').each(function(index) {
			$(this).removeClass("pressed");						
		  });									
		$("#encNothing").addClass("pressed");
		_prefix="";
		_suffix="";
		_wordPrefix="";
		countPossibilities();
	});

	
});

function scrollTo(target) {
	var target_offset = $("#"+target).offset();
	var target_top = target_offset.top;

	$('html, body').animate({scrollTop:target_top}, 1100);
}



//给接口的值。
function merge() {
	var arry1 = '';
	var cn = 1;
	var editText = document.getElementsByClassName("editText");
	console.log(editText[1]);
	var empty_box_nume = 0;
	for (var i = 0; i < editText.length; i++) {
		if (editText[i].value == _defaultTxt) {
			empty_box_nume++;
		}
	}
	console.log(empty_box_nume);
	for (var i = 0; i < editText.length-1; i++) {
		if (editText[i].value == _defaultTxt) {
			editText[i].value = "";
			editText[i].innerHTML = "";

		}
	}
	console.log(editText.length - 1);
	console.log(editText[editText.length - 1].value)
	if (editText[editText.length - 1].value == ""){
		for (var i = 0; i < editText.length-1; i++) {
			if (editText[i].value == _defaultTxt) {
				editText[i].value = "";
				editText[i].innerHTML = "";

			}
			var t = editText[i].value
			if (t != "") {
				var c = t.split("\n");

				// console.log(c);
				cn = cn * c.length;
				cn = FormatNumber(cn);

				if (i == editText.length-2) {
					var arry1 = arry1 + c.join(',');
				} else {
					var arry1 = arry1 + c.join(',') + "ncvj%";

				}
			}
		}

	} else{
		for (var i = 0; i < (editText).length; i++) {

			if (editText[i].value == _defaultTxt) {
				editText[i].value = "";
				editText[i].innerHTML = "";

			}
			var t = editText[i].value
			console.log(t);
			if (t != "") {
				var c = t.split("\n");

				// console.log(c);
				cn = cn * c.length;
				cn = FormatNumber(cn);

				if (i == (editText).length - 1) {
					var arry1 = arry1 + c.join(',');
				} else {
					var arry1 = arry1 + c.join(',') + "ncvj%";

				}
			}
		}
}
	console.log(arry1);
		var arry2=arry1.split("ncvj%");
		console.log(arry2);
	const JsonArray=JSON.stringify(arry2);
	console.log(JsonArray);


	$.ajax({
		url:"/combine",
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		type:"POST",
		data:
			JSON.stringify({
			"arraylist":arry2,
			"symbol": _seperator,
			"symbol2": _prefix
		}),
		success:function (res) {
			if(res.status==200){
				console.log(JsonArray);
				console.log("成功了");
				console.log(res.data);
				console.log(res.data.dataInner.join('\n') );
				$("#resultText").val(res.data.dataInner.join('\n'));
				var dataInner2=res.data.dataInner2
				var fileurl="http://localhost:8080/downloadFile?fileName="+dataInner2
				console.log(fileurl);
				document.getElementById("downloadFile").href=fileurl;





			}
			else{
				console.log(res.status);
				console.log(JsonArray);

			}
		},

	})




	
	if (_statusLayer ==1) {
		$("#combinationsText2").html( cn + ((cn == 1)?" 个关键词":" 个关键词") + " 合成!");
		$("#combinationsText2").stop(true,true).fadeIn("fast", function() {});
		$("#combinationsText1").stop(true,true).fadeOut("fast", function() {});
		_statusLayer =2;
	} else {
		$("#combinationsText1").html( cn + ((cn == 1)?" 个关键词":" 个关键词") + " 合成!");
		$("#combinationsText1").stop(true,true).fadeIn("fast", function() {});
		$("#combinationsText2").stop(true,true).fadeOut("fast", function() {});
		_statusLayer =1;
	}

}



function FormatNumber(num, decpoint, sep) {
	// check for missing parameters and use defaults if so
	var sep, decpoint;
	sep = ",";
	decpoint = ".";

	// need a string for operations
	num = num.toString();
	// separate the whole number and the fraction if possible
	a = num.split(decpoint);
	x = a[0]; // decimal
	y = a[1]; // fraction
	z = "";
	
	if (typeof(x) != "undefined") {
		// reverse the digits. regexp works from left to right.
		for (i=x.length-1;i>=0;i--)
			z += x.charAt(i);
		// add seperators. but undo the trailing one, if there
		z = z.replace(/(\d{3})/g, "$1" + sep);
		if (z.slice(-sep.length) == sep)
			z = z.slice(0, -sep.length);
		x = "";
		// reverse again to get back the number
		for (i=z.length-1;i>=0;i--)
			x += z.charAt(i);
		// add the fraction back in, if it was there
		if (typeof(y) != "undefined" && y.length > 0)
			x += decpoint + y;
	}
	return x;
}
