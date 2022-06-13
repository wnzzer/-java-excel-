var _realTotal;
var _previousTotal;
var _statusLayer=1;
var _customEnabled=0;
var _optionsVis=0;
var _seperator=" ";
var _prefix="";
var _suffix="";
var _wordPrefix="";
var _defaultTxt = "在这输入关键词";

$(document).ready(function(){
    $("#add").click(function(){
        // console.log("12");
        // $("#threeColumns").after("<p class='three'>我是子元素prepend</p>");
        var column_box = document.createElement('div');
        column_box.classList.add("column","grid_4");
        // $("#div").addClass(“类名1 类名2 类名3”);
                           // 把li添加到DOM树，并且会重新绘制
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

	// $(".editText").focusin(function(event){
    //     console.log("pppppppppppppppppppp");
    //     console.log(this);
	// 	if ( $(this).val() == _defaultTxt){
	// 		$(this).val("");
	// 	}
	// });
    var editText=document.getElementsByClassName("editText");
    $('#threeColumns').on('focusin', '.editText', function(){
        console.log("运行了");
        if ( $(this).val() == _defaultTxt){
            		$(this).val("");
                }
    })
    $('#threeColumns').on('focusout', '.editText', function(){
        console.log("运行了");
        if ( $(this).val() == "") {
			$(this).val(_defaultTxt);
		}
    })
    // $("#threeColumns").on("focusin",function(){
    //     console.log("运行了");
    //     if ( $(this).val() == _defaultTxt){
	// 		$(this).val("");
	// 	}
    // })
    // for(var i=0;i<editText.length;i++){
    //     editText[i].addEventListener("focusin",function(){
    //         if ( $(this).val() == _defaultTxt){
    //             $(this).val("");
    //         }
    //     }
            
    //     )
    // }
	// $(".editText").focusout(function(event){
	// 	if ( $(this).val() == "") {
	// 		$(this).val(_defaultTxt);
	// 	}
	// });

	$(".editText").keyup(function(event){
		countPossibilities();
	});
	
	$("#mergeLink").click(function(event){
		var target_offset = $("#resultsTextArea").offset();
		var target_top = target_offset.top;
		var scrPos = $(window).height() + $(window).scrollTop();
		if (scrPos < target_top) {
			scrollTo("resultAnch");
		}
		merge();
	});
	
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
		//$("#optionsOpen").hide();
		//$("#optionsBox").stop(true,true).fadeIn("fast", function() {});
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
			/*
			$('#extraOptions').animate({
				height: 38
				}, 300, function() {
					// Animation complete.
				});
			$("#optionsBox").stop(true,true).fadeOut("fast", function() {
															$('#extraOptions').animate({
															height: 38
															}, 100, function() {
																					// Animation complete.
																				});
																		});
			*/


			//$("#optionsBox").stop(true,true).fadeOut("fast", function() {});
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
		_wordPrefix="";
	});	
	$("#sepSpace").click(function(event){
		_seperator=" ";
		_wordPrefix="";
	});	
	$("#sepDash").click(function(event){
		_seperator="-";
		_wordPrefix="";
	});	
	$("#sepPlus").click(function(event){
		_seperator=" ";
		_wordPrefix="+";
	});	
	$("#sepCustom").click(function(event){
		_seperator=$("#txtCustom").val();
		_wordPrefix="";
	});	
	$("#txtCustom").keyup(function(event){
		_seperator=$("#txtCustom").val();
		_wordPrefix="";
	});	
	

	$("#encNothing").click(function(event){
		_prefix="";
		_suffix="";
	});	
	$("#encQuotes").click(function(event){
		_prefix="\"";
		_suffix="\"";
	});	
	$("#encBrackets").click(function(event){
		_prefix="[";
		_suffix="]";
	});	
	$("#encPlus").click(function(event){
		_prefix="";
		_suffix="";
		_wordPrefix="+";
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


function countPossibilities() {
	var t1,t2,t3;
	var c1,c2,c3;
	var tot;

	t1 = $("#colText1").val();
	t2 = $("#colText2").val();
	t3 = $("#colText3").val();
	
	c1 = t1.split("\n").length;
	c2 = t2.split("\n").length;
	c3 = t3.split("\n").length;
	
	tot = (c1 * c2 * c3);
	tot = FormatNumber(tot); 
	_realTot = tot;
	
	
	if (_previousTotal != _realTot) {
		_previousTotal = _realTot
		if (_statusLayer ==1) {
			$("#combinationsText2").html( tot + ((tot == 1)?" 个关键词":" 个关键词") + " 组合");
			$("#combinationsText2").stop(true,true).fadeIn("fast", function() {});
			$("#combinationsText1").stop(true,true).fadeOut("fast", function() {});
			_statusLayer =2;
		} else {
			$("#combinationsText1").html( tot + ((tot == 1)?" 个关键词":" 个关键词") + " 组合");
			$("#combinationsText1").stop(true,true).fadeIn("fast", function() {});
			$("#combinationsText2").stop(true,true).fadeOut("fast", function() {});
			_statusLayer =1;
		}
	}
}

//给接口的值。
function merge()
{
	var arry1='';
    var editText=document.getElementsByClassName("editText");
    console.log(editText[1]);
    for(var i=0;i<editText.length;i++){
        var t=editText[i].value
        // console.log(editText[i].value);
        if(editText[i].value==_defaultTxt){
            editText[i].value="";
        }
        var c=t.split("\n");
	// 	if(i==editText.length-1){
	// 		var arry1 =arry1+c.join('|');
	// 	}else{
	// 		var arry1 =arry1+c.join('|')+",";
	//
	// 	}
	//
	// 	console.log(arry1);
    // }
	// var arry2=arry1.split(",");
	// console.log(arry2);
	// 	if(i==editText.length-1){
	// 		var arry1 =arry1+c.join('|');
	// 	}else{
	// 		var arry1 =arry1+c.join('|')+",";
	//
	// 	}
	// 	console.log(arry1);
	// }
	// var arry2=arry1.split(",");
	// console.log(arry2);
			if(i==editText.length-1){
				var arry1 =arry1+c.join(',');
			}else{
				var arry1 =arry1+c.join(',')+"ncvj%";

			}

			console.log(arry1);
		}
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
		// 	{
		// 	arraylist:JsonArray,
		// 	symbol:JSON.stringify( "string"),
		// 	symbol: JSON.stringify( "string"),
		//
		// },

			JSON.stringify({
			"arraylist":arry2,
			"symbol": "string",
			"symbol2": "string"
		}),
		success:function (res) {
			if(res.status==200){
				console.log(JsonArray);
				console.log("成功了");
				console.log(res.data);
			}
			else{
				console.log(res.status);
				console.log(JsonArray);
				console.log("失败了");
			}
		},

	})

	// 		if(i==editText.length-1){
	// 		var arry1 =arry1+'"'+c.join(',')+'"';
	// 	}else{
	// 		var arry1 =arry1+'"'+c.join(',')+'"'+",";
			
	// 	}
		
	// 	console.log(arry1);
    // }

	// var arry2=[arry1];
	// console.log(arry2);
	
    console.log("总数为"+editText.length);
	var t1,t2,t3;
	var c1,c2,c3;
	var tot;

	t1 = $("#colText1").val();
	t2 = $("#colText2").val();
	t3 = $("#colText3").val();
	
	// if (t1 == _defaultTxt){ t1 = "";}
	// if (t2 == _defaultTxt){ t2 = "";}
	// if (t3 == _defaultTxt){ t3 = "";}
	
	c1 = t1.split("\n");
	c2 = t2.split("\n");
	c3 = t3.split("\n");
	
	tot = (c1.length * c2.length * c3.length);
	tot = FormatNumber(tot);
	
	var seperator = _seperator; //" ";
	var prefix = _prefix;
	var suffix = _suffix;
	var wordPrefix = _wordPrefix;
	
	
	var buf = "";
	var ln = "";
	var cnt = 0;
	
	for (var i1=0; i1 < c1.length; i1++)
	{
		for (var i2=0; i2 < c2.length; i2++)
		{
			for (var i3=0; i3 < c3.length; i3++)
			{
				c1[i1] = jQuery.trim(c1[i1]);
				c2[i2] = jQuery.trim(c2[i2]);
				c3[i3] = jQuery.trim(c3[i3]);
				
				if 	(c3[i3] != "") {
					ln = prefix + c1[i1] + seperator + c2[i2] + seperator + c3[i3] + suffix;
					//buf += prefix + c1[i1] + seperator + c2[i2] + seperator + c3[i3] + suffix + "\n";
				} 
				else
					if 	(c2[i2] != "") {
						ln = prefix + c1[i1] + seperator + c2[i2] + suffix;
						//buf += prefix + c1[i1] + seperator + c2[i2] + suffix + "\n";
					}
					else	
					{
						ln = prefix + c1[i1] + suffix;
						//buf += prefix + c1[i1] + seperator + c2[i2] + suffix + "\n";
					}
				if (wordPrefix != "")
				{
					ln = " " + ln;
					//ln = ln.replace(" "," +");

					ln = ln.replace(/ /g," +");
				}
				console.log(".....................");
					console.log(ln);
				buf += jQuery.trim(ln) + "\n";
				// console.log(".....................");
				// console.log(buf);
				cnt++;
			}
			//stats.value = cnt;
		}
	}
	
	$("#resultText").val(buf);
	
	if (_statusLayer ==1) {
		$("#combinationsText2").html( tot + ((tot == 1)?" 个关键词":" 个关键词") + " 合成!");
		$("#combinationsText2").stop(true,true).fadeIn("fast", function() {});
		$("#combinationsText1").stop(true,true).fadeOut("fast", function() {});
		_statusLayer =2;
	} else {
		$("#combinationsText1").html( tot + ((tot == 1)?" 个关键词":" 个关键词") + " 合成!");
		$("#combinationsText1").stop(true,true).fadeIn("fast", function() {});
		$("#combinationsText2").stop(true,true).fadeOut("fast", function() {});
		_statusLayer =1;
	}
	
	//scrollTo("resultAnch");
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
