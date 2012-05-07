var ie=document.all;
var ns6=document.getElementById && !document.all;

$(document).ready(function () {
	show_boxed_report();
	
	jQuery('#kuponiada_box').html('<iframe src="http://www.kuponiada.ro/widget.html?type=dynamic&site=Wall-Street.ro" width="300" height="250" frameborder="0" scrolling="no" allowtransparency="true" style="border: medium none; overflow: hidden; width: 300px; height: 250px;" ></iframe>');
	$('#fb_share_button').html('<a name="fb_share" type="button_count" href="http://www.facebook.com/sharer.php?u='+escape(_GPD.PAGE.url)+'&t='+_GPD.PAGE.title+'">Share</a><script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"></script>');
	$('#fb_recom_button').html('<iframe src="http://www.facebook.com/plugins/like.php?href='+escape(_GPD.PAGE.url)+'&amp;layout=standard&amp;show_faces=true&amp;width=650&amp;action=recommend&amp;colorscheme=light" scrolling="no" frameborder="0" allowTransparency="true" style="border:none; overflow:hidden; width:100%; height:80px"></iframe>');
	$('#fb_like_box').html('<iframe src="//www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FWallStreetRo&amp;width=300&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=false&amp;header=false&amp;appId=167283376670031" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:258px;" allowTransparency="true"></iframe>');
	$('#fb_like_button_top').html('<iframe src="http://www.facebook.com/plugins/like.php?href='+escape(_GPD.PAGE.url)+'&amp;layout=standard&amp;show_faces=false&amp;width=650&amp;action=like&amp;colorscheme=light" scrolling="no" frameborder="0" allowTransparency="true" style="border:none;  width:650px; height:35px"></iframe>');
	$('#fb_like_button_bottom').html('<iframe src="http://www.facebook.com/plugins/like.php?href='+escape(_GPD.PAGE.url)+'&amp;layout=button_count&amp;show_faces=true&amp;width=640&amp;action=like&amp;colorscheme=light" scrolling="no" frameborder="0" allowTransparency="true" style="border:none; overflow:hidden; width:640px; height:20px;"></iframe>');
});


function show_boxed_report() {
	if (document.getElementById('box_report')) {
		$('body').prepend('<div id="box_report_overlayer">&nbsp;</div>');
		$('#box_report_overlayer').width($(document).width()).height($(document).height()).css({ opacity: 0.5 }).click(function() { hide_boxed_report(); });
		$('#box_report').fadeIn();
	}
}

function hide_boxed_report() {
	$('#box_report').fadeOut('fast'); 
	$('#box_report_overlayer').hide();
	return false;
}

function showPopUp(){
	document.getElementById('pWinConfg').style.visibility='visible';
}
function hidePopUp(){
	document.getElementById('pWinConfg').style.visibility='hidden';
}
function startPopUp(){
	timerID=setTimeout('showPopUp()',3000);
}

function save_to_inbox(user_id, article_id) {
	
	$.ajax({
	   type: "GET",
	   url: "http://www.wall-street.ro/ajax.php?act=save_to_inbox",
	   data: "user_id="+user_id+"&article_id="+article_id,
	   success: function(msg){
			alert( "Articolul a fost salvat cu succes!" );
	   }
	});
}

function save_review_rating(user_id, article_id, rating_id) {
	if (!LOGGED_IN) {
		if (confirm('Pentru a putea vota trebuie sa fiti logat!\nDoriti sa va inregistrati/logati pe Wall-Street?')) {
			document.location.href = 'http://www.wall-street.ro/forum/register.html';
			return false;
		}
		return false;
	}
	$.ajax({
		type: "GET",
		url: "http://www.wall-street.ro/ajax.php?act=save_review_rating",
		data: "user_id="+user_id+"&article_id="+article_id+"&rating_id="+rating_id,
		success: function(r){
			if (typeof r.already_voted != 'undefined') {
				alert("Ai notat deja aceasta recenzie.");
			}
			else {
				alert("Nota ta a fost salvata! Multumim pentru vot.");
				var fmessage = '<strong>Nota medie '+r.rating+' din '+r.raters+' voturi.</strong>';
				var tmessage = '<div class="nota"><span style="font-size:29px;">'+r.rating+'</span></div><div class="din"><span style="font-size:12px;">din<br /><strong>'+r.raters+'</strong><br />voturi</span></div>';
				
				$('#review_rating_note').html(fmessage).show();
				$('#top_review_rating_note').html(tmessage).show();
				
				for (var i = 1; i <= 5; i++) {
					var rater = $('#review_rating_note_'+i).children(':first');
					rater.attr('src', rater.attr('src').replace(/\/(on|off|rate)\.png$/ig, '/'+(i <= parseInt(r.rating) ? 'on' : 'off')+'.png'));
				}
			}
		},
		dataType: 'json'
	});
}

function get_cookie(Name) {
  var search = Name + "="
  var returnvalue = "";
  if (document.cookie.length > 0) {
    offset = document.cookie.indexOf(search)
    if (offset != -1) { // if cookie exists
      offset += search.length
      // set index of beginning of value
      end = document.cookie.indexOf(";", offset);
      // set index of end of cookie value
      if (end == -1)
         end = document.cookie.length;
      returnvalue=unescape(document.cookie.substring(offset, end))
      }
   }
  return returnvalue;
}
function setCookie( name, value, expires, path, domain, secure ) 
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct 
expires time, the current script below will set 
it for x number of days, to make it for hours, 
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
( ( path ) ? ";path=" + path : "" ) + 
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}

function loadornot(){
	if (get_cookie('popunder')=='true'){
		startPopUp();
		setCookie("popunder","false",1,"/","www.wall-street.ro");
	}
}
//loadornot();


var current_tab='top_day';

function objGet_(x) {
  if (typeof x != 'string') return x;
  else if (Boolean(document.getElementById)) return document.getElementById(x);
  else if (Boolean(document.all)) return eval('document.all.'+x);  // pro MSIE 4
  else return null;
}
function objSetStyle_ (obj,prop,val) {
	var o = objGet_(obj);
	if (o && o.style) {
		eval ('o.style.'+prop+'="'+val+'"');
	  return true;
	}
	else return false;
}

function switch_div(src_div, dest_div, change_tab){
	objSetStyle_(objGet_(src_div),'display','none');
	objSetStyle_(objGet_(dest_div),'display','block');
	if (change_tab){
		current_tab=dest_div;
	}
}

function submit_cotatii(){
	if (document.getElementById('simbol').value!='' && document.getElementById('simbol').value!='simbol'){
		document.location='http://www.wall-street.ro/index.php?action=cotatii&simbol='+document.getElementById('simbol').value+document.getElementById('goto').options[document.getElementById('goto').selectedIndex].value;}else{alert('Completati simbolul!');}
}

function init_print() {
		isNS=(document.layers==1);
		window.print();
		
		// inchide fereastra dupa printare sau la apasarea butonului Cancel
//		 if (isNS) window.close(); 
//		 else self.close();

		return true;
}

// text resizing
var currentTextSize = null;
var currentLineHeight = null;
// check for cookie
if (get_text_cookie("artFontSize")) {
    currentTextSize = parseInt(get_text_cookie("artFontSize"));
    currentLineHeight = parseInt(get_text_cookie("artLineHeight"));
} else {
    currentTextSize = 15;
    currentLineHeight = 23;
    setCookie("artFontSize",currentTextSize,1,"/","www.wall-street.ro");
    setCookie("artLineHeight",currentLineHeight,1,"/","www.wall-street.ro");
}

function textSize(dir,elem) {
    if (dir == 'up') {
        if (currentTextSize < 15) {
            currentTextSize += 1;
        }
    } else if (dir == 'down') {
        if (currentTextSize > 12) {
            currentTextSize -= 1;
        }
    }else{
    	currentTextSize=13;
    }
	
	switch (currentTextSize) {
		case 12: currentLineHeight = 17; break;
		case 13: currentLineHeight = 19.5; break;
		case 14: currentLineHeight = 19.5; break;
		case 15: currentLineHeight = 22; break;
		default: currentLineHeight = 19.5; break;		
	}
	
    $(elem).css('font-size', currentTextSize + 'px');

    // write/rewrite cookie
    setCookie("artFontSize",currentTextSize,1,"/","www.wall-street.ro");
    setCookie("artLineHeight",currentLineHeight,1,"/","www.wall-street.ro");
}

function get_text_cookie ( cookie_name )
{
  var results = document.cookie.match ( cookie_name + '=(.*?)(;|$)' );

  if ( results ) {
    return ( unescape ( results[1] ) );
  }
  else { return null; }
}

objects = document.getElementsByTagName("object");
for (var i = 0; i < objects.length; i++)
{
    objects[i].outerHTML = objects[i].outerHTML;
}

	function highlight_boxes(nr) {
	
		for (i=0; i<=nr; i++) {

			element_name = 'star_'+i;
			document.getElementById(element_name).src = 'http://img.wall-street.ro/images/vot_on.gif';

		}

	}
	
	function unhighlight_boxes() {
		for (i=0; i<=4; i++) {
			element_name = 'star_'+i;
			document.getElementById(element_name).src = 'http://img.wall-street.ro/images/vot_off.gif';
		}

	}
	
//MAKE ACTIVE AJAX BEGIN
	function callAHAH(url, pageElement, callMessage, errorMessage) {
     document.getElementById(pageElement).innerHTML = callMessage;
     try {
     req = new XMLHttpRequest(); /* e.g. Firefox */
     } catch(e) {
       try {
       req = new ActiveXObject("Msxml2.XMLHTTP");  /* some versions IE */
       } catch (e) {
         try {
         req = new ActiveXObject("Microsoft.XMLHTTP");  /* some versions IE */
         } catch (E) {
          req = false;
         } 
       } 
     }
     req.onreadystatechange = function() {responseAHAH(pageElement, errorMessage);};
     req.open("GET",url,true);
     req.send(null);
  }

function responseAHAH(pageElement, errorMessage) {
   var output = '';
   if(req.readyState == 4) {
      if(req.status == 200) {
         output = req.responseText;
         document.getElementById(pageElement).innerHTML = output;
         } else {
         document.getElementById(pageElement).innerHTML = errorMessage+"\n"+output;
         }
      }
  }


function makeactive(url1,target) { 
callAHAH(url1, target, '<center><img src="./img/loading.gif" /></center>', 'Error');
} 

function writeCookieRezolutie() 
{
	 var today = new Date();
	 var the_date = new Date("December 31, 2023");
	 var the_cookie_date = the_date.toGMTString();
	 var the_cookie = "rezolutie="+ screen.width +"x"+ screen.height;
	 var the_cookie = the_cookie + ";expires=" + the_cookie_date + "; path=/";
	 document.cookie=the_cookie;									 
}


function x_track_click(feature) {
	
	obj = document.getElementById('tod_frame');
	if(obj) {
		obj.src = "http://www.wall-street.ro/track.php?feature="+feature;
	}
	
}
function copyit(theField) {
var selectedText = document.selection;
if (selectedText.type == 'Text') {
var newRange = selectedText.createRange();
theField.focus();
theField.value = newRange.text;
} else {
alert('select a text in the page and then press this button');
}
}

function open_picture_window(url) {
	var fWP = window.open(url, 'gallery_photo', 'location=1,status=1,scrollbars=1,resize=0,width=1000,height=780');
	fWP.focus();
	
	return false;
}

// WS Article Ticker

var js_ticker_status = 'static';
var js_ticker_width = 220; 
var js_ticker_touched = false;

function ticker_auto_slide() {
	if (!js_ticker_touched) {
		ticker_go_right(true);
		setTimeout('ticker_auto_slide()', 5000);
	}
}

$(document).ready(function () {
	if (document.getElementById('ticker_slider')) {
		setTimeout('ticker_auto_slide()', 2000);
	}
});

function ticker_go_right(auto_moved) {
	if(js_ticker_status != "static") return false;
	
	if (typeof auto_moved === 'undefined') auto_moved = false;
	if (!auto_moved) js_ticker_touched = true;
	
	if (document.getElementById('ticker_slider')) {
		var js_current_left = $('#ticker_slider').css('marginLeft').replace(/px/, '');
		js_current_left = parseInt(js_current_left);
		
		if(js_current_left > ($('#ticker_slider .ticker_item').size()-4)* - js_ticker_width) {		
		//	update_ticker_buttons();
			js_ticker_status = 'moving';	
			$('#ticker_slider').animate({'marginLeft': js_current_left-js_ticker_width}, {duration: 'fast', complete: function(){js_ticker_status='static'}});
		}
		else {
			js_ticker_status = 'moving';	
			$('#ticker_slider').animate({'marginLeft': 0}, {duration: 'fast', complete: function(){js_ticker_status='static'}});
		}
	}
}

function ticker_go_left(auto_moved) {
	if(js_ticker_status != "static") return false;
	
	if (typeof auto_moved === 'undefined') auto_moved = false;
	if (!auto_moved) js_ticker_touched = true;
	
	if (document.getElementById('ticker_slider')) {
		var js_current_left = $('#ticker_slider').css('marginLeft').replace(/px/, '');
		js_current_left = parseInt(js_current_left);	
		
		if(js_current_left!=0) {		
		//	update_ticker_buttons();
			js_ticker_status = 'moving';
			$('#ticker_slider').animate({'marginLeft': js_current_left+js_ticker_width}, {duration: 'fast', complete: function(){js_ticker_status='static'}});
		}
	}
}

function convertor_calc() {
	
	$.post("ajax.php?act=currency_convertor", 
			{ sum: $('#convertor_sum').attr('value'), from: $('#convertor_from').attr('value'), to: $('#convertor_to').attr('value') },
	  function(result){
		$('#convertor_result').val(result);
	  }
	 );
	
}

function google_ad_request_done(google_ads) {
	var s = '';
	var i;
	if (google_ads.length == 0) {
		return;
	}
	if (google_ads[0].type == "flash") {
		s += '<a href=\"' +
		google_info.feedback_url + '\" style="color:#000000"><b>Ads by Google</b></a><br>' + 
		'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
		'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="' +
		google_ad.image_width + '" HEIGHT="' +
		google_ad.image_height + '"> <PARAM NAME="movie" VALUE="' +
		google_ad.image_url + '">' +
		'<PARAM NAME="quality" VALUE="high">' +
		'<PARAM NAME="AllowScriptAccess" VALUE="never">' +
		'<EMBED src="' +
		google_ad.image_url + '" WIDTH="' +
		google_ad.image_width + '" HEIGHT="' +
		google_ad.image_height +
		'" TYPE="application/x-shockwave-flash"' +
		' AllowScriptAccess="never" ' +
		' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';
	} else if (google_ads[0].type == "image") {
		s += '<a href=\"' +
		google_info.feedback_url + '\" style="color:#000000"><b>Ads by Google</b></a><br> <a href="' +
		google_ads[0].url + '" target="_top" title="go to ' +
		google_ads[0].visible_url + '" onmouseout="window.status=\'\'"onmouseover="window.status=\'go to ' +
		google_ads[0].visible_url + '\';return true"><img border="0" src="' +
		google_ads[0].image_url + '"width="' +
		google_ads[0].image_width + '"height="' +
		google_ads[0].image_height + '"></a>';
	} else if (google_ads[0].type == "html") {
		s += google_ads[0].snippet;
	} else {
		if (google_ads.length == 1) {
			var br_html = (ads_shape != 0) ? ' ' : '<br>';
			var rem_brk = (rem_br == 0) ? '<br>' : '&nbsp;';		
			s += '<a href=\"' + google_info.feedback_url + '\" style="float: left; clear: both; color:#000000;font-size:12px; text-decoration: underline;"><b>Anunþuri Google</b></a><br><ul style="list-style: none; padding: 5px 0px 0px 0px; margin: 0px; float: left; clear: both;">'
			for(i = 0; i < google_ads.length; ++i) {
				s += '<li style="'+li_style+'"><a style="'+url_title_style+'" href="' + google_ads[i].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' + google_ads[i].visible_url + '\';return true"> <span style="text-decoration:underline"> ' + google_ads[i].line1 + '</span></a>'+rem_brk+'<span style="'+text_style+'">' +
				google_ads[i].line2 + br_html +
				google_ads[i].line3 + '<br></span> <span><a style="'+url_link_style+'" href="' +
				google_ads[i].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' +
				google_ads[i].visible_url + '\';return true">' +
				google_ads[i].visible_url + '</span></a></li>';
			}
			s += '</ul>';
		} else if (google_ads.length > 1) {
			var br_html = (ads_shape != 0) ? ' ' : '<br>';
			var rem_brk = (rem_br == 0) ? '<br>' : '&nbsp;';		
			s += '<a href=\"' + google_info.feedback_url + '\" style="float: left; clear: both; color:#000000;font-size:12px; text-decoration: underline;"><b>Anunþuri Google</b></a><br><ul style="list-style: none; padding: 5px 0px 0px 0px; margin: 0px; float: left; clear: both;">'
			for(i = 0; i < google_ads.length; ++i) {
				s += '<li style="'+li_style+'"><a style="'+url_title_style+'" href="' + google_ads[i].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' + google_ads[i].visible_url + '\';return true"> <span style="text-decoration:underline"> ' + google_ads[i].line1 + '</span></a>'+rem_brk+'<span style="'+text_style+'">' +
				google_ads[i].line2 + br_html +
				google_ads[i].line3 + '<br></span> <span><a style="'+url_link_style+'" href="' +
				google_ads[i].url + '" onmouseout="window.status=\'\'" onmouseover="window.status=\'go to ' +
				google_ads[i].visible_url + '\';return true">' +
				google_ads[i].visible_url + '</span></a></li>';
			}
			s += '</ul>';
		}
	}
	document.write(s);
	return;
}
