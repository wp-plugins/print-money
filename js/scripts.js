jQuery(document).ready(function($) { console.log(pm_settings);
	// Global Variables
	var button_text = pm_settings['button_text'];
	var container = pm_settings['container'];
	var page = pm_settings['page'];
	var position = pm_settings['position'];
	var url = "http://www.dotphoto.com/WPLand.asp";
	var returnURL = pm_settings['return_url'];
	var affiliateID = pm_settings['affliateID'];
		
	
	/* Container Loop */
	$.each(container,function( index, className ) {
  		var content = $('.'+className);
		content.find('img').each(function(index, element) {
			$(this).removeAttr('class');
			var parentLink = $(this).parent('a');
			var imgURL = parentLink[0] ? parentLink.attr('href') : $(this).attr('src');
			var imgClass = $(this).attr('class');
			var imgHeight = $(this).innerHeight();
			var imgWidth = $(this).innerWidth();
			console.log(imgHeight);
			var pmUrl = url+'?imgURL='+imgURL+'&returnURL='+returnURL+'&affiliateID='+affiliateID;
			var button = '<i class="btn-img '+position+'" data-href="'+pmUrl+'">'+button_text+'</i>';
        	$(this).wrap('<b class="print-money-wrapper '+imgClass+'" style="height:'+imgHeight+'px;"></b>');   
			$(button).insertAfter(this);
        });
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

		$.post( click_count.url, { img_url:parent.find('img').attr('src'), current_url: currenturl });
		window.open(url, '_self');
	});
	
});