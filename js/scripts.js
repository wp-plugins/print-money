jQuery(document).ready(function($) { console.log(pm_settings);
	// Global Variables
	var button_text = pm_settings['button_text'];
	var container = pm_settings['container'];
	var page = pm_settings['page'];
	var position = pm_settings['position'];
	var url = "http://www.dotphoto.com/WPLand.asp";
	var returnURL = pm_settings['return_url'];
	var affiliateID = pm_settings['affliateID'];
	var button_bg_color = pm_settings['button_bg_color'];
	var button_text_color = pm_settings['button_text_color'];
	var image_protection_visitors = pm_settings['image_protection_visitors'];
	var image_protection_users = pm_settings['image_protection_users'];
	var user_logged_in = is_user_logged_in.status;
		

	/* Container Loop */
	$.each(container,function( index, className ) {
  		var content = $('.'+className);
		content.find('img').each(function(index, element) {
			
			var parentLink = $(this).parent('a');
			var imgURL = parentLink[0] ? parentLink.attr('href') : $(this).attr('src');
			var imgClass = $(this).attr('class');
			var imgHeight = $(this).innerHeight();
			var imgWidth = $(this).innerWidth();
			
			var pmUrl = url+'?returnURL='+returnURL+'&affiliateID='+affiliateID;
			var button = '<i class="btn-img '+position+'" data-href="'+pmUrl+'">'+button_text+'</i>';
        	$(this).wrap('<b class="print-money-wrapper '+imgClass+'"></b>');   
			$(button).insertBefore(this);
			$(this).removeClass();
			
        });
	}); 
	/* Add Size */
	$('.print-money-wrapper').each(function(index, element) {
		 var imgwidth = $(this).find('img').attr('width');
		 var imggheight = $(this).find('img').attr('height');
		 $(this).css({ 'width':imgwidth+'px','height':imggheight+'px' });			
    });
	
	/* Override Other Hover Function */
	$('.print-money-wrapper').parent().hover(function(){
		$(this).find('.btn-img').css('display','inline-block');
	},function(){
		$(this).find('.btn-img').css('display','none');
	});
	
	/* Override Other Function to Redirect */
	$('.btn-img').click(function(event){
		event.preventDefault();
		var url = $(this).attr('data-href');
		var currenturl  = window.location.href; 
		var parent = $(this).parent('.print-money-wrapper'); 
		parent.find('img').css('opacity','.1');
		$(this).text('Printing..').show();
		$.post( click_count.url, { img_url:parent.find('img').attr('src'), current_url: currenturl },function(){
			$.post( fullsize_image.url, { img_url:parent.find('img').attr('src') },function(data){
			 var newUrl = url+'&imgURL='+data;
			 window.open(newUrl, '_self');
			});
		});
		
	});
	
	/* Button Style */
	$('.btn-img').css({
		'background':button_bg_color,
		'color':button_text_color
	});
	
	
	/* Image Protection */
	if ( image_protection_visitors == 1 ) {
		$('img').bind("contextmenu",function(e){
				return false;
		});
		$('img').bind("mousedown",function(e){
			return false;
		});
		$('img').bind("click",function(e){
				return false;
		});
	} else if ( user_logged_in == 1 && image_protection_users == 1 ) {
		$('img').bind("contextmenu",function(e){
				return false;
		});
		$('img').bind("mousedown",function(e){
			return false;
		});
		$('img').bind("click",function(e){
				return false;
		});
	}
	
	
	
	function getcss (source) {
    var dom = $(source).get(0);
    var dest = {};
    var style, prop;
    if (window.getComputedStyle) {
        var camelize = function (a, b) {
                return b.toUpperCase();
        };
        if (style = window.getComputedStyle(dom, null)) {
            var camel, val;
            if (style.length) {
                for (var i = 0, l = style.length; i < l; i++) {
                    prop = style[i];
                    camel = prop.replace(/\-([a-z])/, camelize);
                    val = style.getPropertyValue(prop);
                    dest[camel] = val;
                }
            } else {
                for (prop in style) {
                    camel = prop.replace(/\-([a-z])/, camelize);
                    val = style.getPropertyValue(prop) || style[prop];
                    dest[camel] = val;
                }
            }
            return dest;
        }
    }
    if (style = dom.currentStyle) {
        for (prop in style) {
            dest[prop] = style[prop];
        }
        return dest;
    }
    if (style = dom.style) {
        for (prop in style) {
            if (typeof style[prop] != 'function') {
                dest[prop] = style[prop];
            }
        }
    }
    
	var arr = ['margin'];
	for ( dest in cstyle ) {
		if ( $.inArray( cstyle[dest], arr ) ) {
			dest[dest] = cstyle[dest];
			consle.log(cstyle[dest]);
		}
	}
	return dest;
	
};
	
});


