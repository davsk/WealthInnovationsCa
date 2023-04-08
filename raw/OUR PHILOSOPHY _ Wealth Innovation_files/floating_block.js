(function($){Drupal.blockFloatStack=function(){if(typeof Drupal.blockFloatStack.blocks=='undefined'){Drupal.blockFloatStack.blocks=[];}
return Drupal.blockFloatStack.blocks;}
Drupal.behaviors.blockFloat={attach:function(context){var settings=Drupal.settings.floating_block.settings;if(navigator.appName=='Microsoft Internet Explorer'&&navigator.userAgent.match(/msie 6/i)){return;}
if(jQuery.isFunction(context.parent)){context=context.parent();}
$.each(settings,function(selector,setting){$(selector.toString()+':not(.blockFloat-processed)',context).each(function(j,block){var blockInfo=[];blockInfo.original_css=[];blockInfo.original_css.left=Drupal.blockFloatCleanCSSValue($(block).css('left'));blockInfo.original_css.top=Drupal.blockFloatCleanCSSValue($(block).css('top'));blockInfo.original_css.position=$(block).css("position");blockInfo.original_css.height=$(block).height();blockInfo.floating=false;blockInfo.reset=true;blockInfo.original_identifier='blockFloat-'+Drupal.blockFloatStack().length;if(setting.container&&$(setting.container.toString()).length>0){blockInfo.container=setting.container;}
if(setting.padding_top){blockInfo.padding_top=setting.padding_top;}
else{blockInfo.padding_top=0;}
if(setting.padding_bottom){blockInfo.padding_bottom=setting.padding_bottom;}
else{blockInfo.padding_bottom=0;}
$(block).width($(block).width());$(block).addClass('blockFloat-processed '+blockInfo.original_identifier);Drupal.blockFloatTracker(blockInfo);Drupal.blockFloatStack().push(blockInfo);});});}}
Drupal.blockFloatTracker=function(blockInfo){var minWidth=Drupal.settings.floating_block.minWidth;if(minWidth&&window.matchMedia){if(!window.matchMedia('(min-width: '+minWidth+')').matches){return;}}
var windowHeight=$(window).height();var blockHeight=blockInfo.original_css.height;if(blockHeight>windowHeight){if(blockInfo.floating==true){}else{Drupal.blockFloatResetPosition(block,blockInfo);return;}}
var scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight;var block=$('.'+blockInfo.original_identifier);if(block.length==0){return;}
if(blockInfo.scrollHeight!=scrollHeight||blockInfo.reset){if(blockInfo.reset){Drupal.blockFloatResetPosition(block,blockInfo);blockInfo.original_offset=$(block).offset();blockInfo.reset=false;}
blockInfo.scrollHeight=scrollHeight;blockInfo.minOffset=blockInfo.original_offset.top-blockInfo.padding_top;if(blockInfo.container){blockInfo.maxOffset=$(blockInfo.container).height()+$(blockInfo.container).offset().top-blockInfo.padding_bottom;}
else{blockInfo.maxOffset=scrollHeight;}}
var vScroll=(document.documentElement.scrollTop||document.body.scrollTop);if(vScroll>blockInfo.minOffset){var topPosition=blockInfo.padding_top;var blockHeight=block.height();if((vScroll+blockHeight)>blockInfo.maxOffset){topPosition=blockInfo.maxOffset-vScroll-blockHeight;}
block.css({left:blockInfo.original_offset.left+'px',position:'fixed',top:topPosition+'px'}).addClass('floating-block-active');blockInfo.floating=true;}
else{Drupal.blockFloatResetPosition(block,blockInfo);}}
Drupal.blockFloatResetPosition=function(block,blockInfo){if(blockInfo.floating){block.css({left:blockInfo.original_css.left,position:blockInfo.original_css.position,top:blockInfo.original_css.top}).removeClass('floating-block-active');blockInfo.floating=false;}}
Drupal.blockFloatCleanCSSValue=function(cssvalue){if(cssvalue=='0px'){cssvalue='';}
return cssvalue;}
Drupal.blockFloatOnScroll=function(){$(Drupal.blockFloatStack()).each(function(){Drupal.blockFloatTracker(this);});};Drupal.blockFloatWindowResize=function(){if(typeof Drupal.blockFloatWindowResize.timer=='undefined'){Drupal.blockFloatWindowResize.timer=false;}
if(Drupal.blockFloatWindowResize.timer){return;}
Drupal.blockFloatWindowResize.timer=setTimeout(function(){$(Drupal.blockFloatStack()).each(function(){this.reset=true;Drupal.blockFloatTracker(this);});Drupal.blockFloatWindowResize.timer=false;},250);};if(!$('body').hasClass('blockFloat-processed')){$('body').addClass('blockFloat-processed');$(window).scroll(Drupal.blockFloatOnScroll);$(document.documentElement).scroll(Drupal.blockFloatOnScroll);$(window).resize(Drupal.blockFloatWindowResize);}})(jQuery);