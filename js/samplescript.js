/* sample script here */

jQuery.noConflict();
(function( $ ) {
    'use strict';
    $( document ).ready(function() {

        var url = "http://www.dotphoto.com/WPLand.asp";
	    var returnURL = encodeURIComponent(document.location.href);
        var affiliateID = encodeURIComponent(document.location.host);
        
		
        var data =  {action: "fetch_data", 'postType': 'img-print-btn-txt,img-print-btn-size,img-print-btn-roles,img-print-btn-postio,img-print-btn-pgs,img-print-btn-cats,img-print-btn-css'};
		var data1 =  {action: "fetch_data", 'postType': 'img-print-btn-class'};

        var btnText = "Print Me";
        var btnSize = "sm";
        var btnPosition = "on-img-hover-btm-right";
        var btnUserRole,imgContainerClasses1,btnPages;
        var btnCats;
		var btnClass;
        var customCSS;
		var mytest=0;

		var imgContainerClasses = "justified-image-grid,nexgen-gallery,entry-content,post-thumbnail";
        var imgContainerClassesSplit;
		// var appendTos = "nexgen-gallery";
		
		/*for button data*/
		var postAjax1 = $.get(ajaxurl, data1, function(response) {
        }).done(function(response) {

            var obj = jQuery.parseJSON(response);

			if(obj["img-print-btn-class"]!='')
			{
				btnClass=String(obj["img-print-btn-class"]);
				imgContainerClasses =imgContainerClasses+','+btnClass;
				imgContainerClassesSplit = imgContainerClasses.split(',');
				
			}
			else
			{
				imgContainerClassesSplit = imgContainerClasses.split(',');
			}
        });
		
		/*for button data*/
		
        var postAjax = $.get(ajaxurl, data, function(response) {
        }).done(function(response) {

            var obj = jQuery.parseJSON(response);

			
            if(obj["img-print-btn-txt"]!='')
			{
				
				btnText = String(obj["img-print-btn-txt"]).split(',').join('');
			}
			if(obj["img-print-btn-size"]!='')
			{
            	btnSize = obj["img-print-btn-size"];
			}
			if(obj["img-print-btn-postio"]!='')
			{
				btnPosition = obj["img-print-btn-postio"];
			}
            if(!obj["img-print-btn-roles"])
			{
               btnUserRole = ["0"];
            }
			else
			{
               btnUserRole = obj["img-print-btn-roles"];
            }

            if(!obj["img-print-btn-pgs"]) {
                btnPages = ["0"];
            } else {
                btnPages = obj["img-print-btn-pgs"];

            }

            if(!obj["img-print-btn-cats"]) {
                btnCats = ["0"];
            } else {
                btnCats = obj["img-print-btn-cats"];
            }


            customCSS = obj["img-print-btn-css"];


        });
		
		
		
		$(".btn-img").live("click", function(e) {

           // e.preventDefault();

            var myHref = $(this).find("a").attr('href');


            var postAjax = $.post(ajaxurl, {action: "click", href: myHref}, function(response) {


            });

        });

        postAjax.done(function() {
			postAjax1.done(function() {
			
            $('.ngg-gallery-thumbnail').click(function(e) {

                $("#fancybox-wrap div.btn-img").remove();
              //  $("#fancybox-wrap").append("ddd");
                var d = $(this).closest('div').find(".btn-img").clone().appendTo("#fancybox-wrap");
                //$("#fancybox-wrap").append(d);

                $("#fancybox-wrap #fancybox-left").remove();
                $("#fancybox-wrap #fancybox-right").remove();

            });
            if(customCSS != "") {
                $('head').append('<style type="text/css">'+customCSS+'</style>');
            }
            $(btnUserRole).each(function() {
                if(currentUserRole == '') {

                }
				else if(currentUserRole == this) {

                    return false;

                }
                $(btnPages).each(function() {
					if(currentPage == '') {

                    }
					else if(currentPage  == this) {

                        return false;
                    }
                    $(btnCats).each(function() {

                        if(currentCat == '') {

                        }
						else if(currentCat == this) {

                            return false;
                        }
                        var imgConClassesCount = 0;

                        $(imgContainerClassesSplit).each(function(v) {
							
                           // alert(imgContainerClassesSplit[imgConClassesCount]);

                            if(imgContainerClassesSplit[imgConClassesCount] == "nexgen-gallery") {

                                var nexgenGallery = $(document).find('.ngg-galleryoverview');

                                var imgs = $(".ngg-galleryoverview").find(".ngg-gallery-thumbnail-box").find("a");
								

                            }
							else if(imgContainerClassesSplit[imgConClassesCount] == "justified-image-grid") {

                               var justifiedImageGrid = $(document).find('.justified-image-grid');

                               var imgs = $(".justified-image-grid").find(".jig-overflow").find("a");

                            }
							else if(imgContainerClassesSplit[imgConClassesCount] == "entry-content") {
							
                                if($('.btn-img')[0]) {

                                    return false;

                                } else {

                                }

                                var entryContent = $(document).find('img');

                                var imgs = $(".entry-content").find("img");

                            }
							else if(imgContainerClassesSplit[imgConClassesCount] == "post-thumbnail") {
								var postthumbnail = $(document).find('img');
                                var imgs = $(".post-thumbnail").find("img");
							}
							else
							{
								var myimages = $(document).find('img');
                                var imgs = $("."+imgContainerClassesSplit[imgConClassesCount]).find("img");
								var mytest=1;
							
							}








                    var i = 0;

                    $.each(imgs, function (key, value) {
						
                        if(nexgenGallery)
						{
                            var imgSrc = $(this).attr('data-src');
					    }
						else if (justifiedImageGrid)
						{
                            var imgSrc = $(this).find("img").attr('src');
                        }
						else if (entryContent)
						{
                            var imgSrc = $(this).parent('a').attr('href');
						}
						else if(postthumbnail)
						{
							var imgSrc = $(this).parent('a').attr('data-src');
						}
						else
						{
							var imgSrc = $(this).parent('a').attr('href');
						}
						
//encoding problem needs to be solved here
                        var html = "<div class='btn-img " + btnSize + "-btn-img'><a href='" + url + "?imgURL=" + encodeURIComponent(imgSrc) + "&returnURL=" + returnURL + "&affiliateID=" + affiliateID + "'> <img src='" + imgSrc + "'> <span>" + btnText + "</span> </a></div>";
						if (btnPosition == "above-img") {

                                $(this).before(html);
								$(".btn-img").css("position", 'absolute');	


                        }

                        if (btnPosition == "below-img") {

                                $(this).after(html);
								var imgw=$(".btn-img").css('width');
								var pimagewhalf=parseInt(this.width/2);
								var pimagehhalf=parseInt(this.height/2);
								var imgh=$(".btn-img").css('height');
								$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))));
								$(".btn-img").css("position", 'absolute');										

                        }

                        if (btnPosition == "on-img-btm-right") {

                            if (entryContent || postthumbnail) {
                                $(this).after(html);
                            } 
							else if(mytest=='1')
							{
								$(this).after(html);
								var imgw=$(".btn-img").css('width');
								var pimagewhalf=parseInt(this.width/2);
								var pimagehhalf=parseInt(this.height/2);
								var imgh=$(".btn-img").css('height');
								$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))));
								$(".btn-img").css("position", 'absolute');		
							}
							else {
                                $(this).find("img").after(html);
                            }

                            $(this).find(".btn-img").css("display", "block").addClass("on-img-btm-right");
								
                        }

                        if (btnPosition == "on-img-btm-left") {
							if(entryContent || postthumbnail)
							{
                                $(this).after(html);
                            } 
							else if(mytest=='1')
							{
								$(this).after(html);
								var imgw=$(".btn-img").css('width');
								var pimagewhalf=parseInt(this.width/2);
								var pimagehhalf=parseInt(this.height/2);
								var imgh=$(".btn-img").css('height');
								$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))));
								$(".btn-img").css("position", 'absolute');		
							}
							else
							{
 	                            $(this).find("img").after(html);
                            }
                            $(this).find(".btn-img").css("display", "block").addClass("on-img-btm-left");
                        }
                        if (btnPosition == "on-img-top-right") {
                            if(entryContent || postthumbnail)
							{
                                $(this).after(html);
                            } 
							else if(mytest=='1')
							{
								$(this).after(html);
								var imgw=$(".btn-img").css('width');
								var pimagewhalf=parseInt(this.width/2);
								var pimagehhalf=parseInt(this.height/2);
								var imgh=$(".btn-img").css('height');
								$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))));
								$(".btn-img").css("position", 'absolute');		
							}
							else
							{
 	                            $(this).find("img").after(html);
								
                            }
                            $(this).find(".btn-img").css("display", "block");
							$(this).find(".btn-img").addClass("on-img-top-right");
                        }

                        if (btnPosition == "on-img-top-left") {
                           if(entryContent || postthumbnail)
							{
                                $(this).after(html);
                            } 
							else if(mytest=='1')
							{
								$(this).after(html);
								var imgw=$(".btn-img").css('width');
								var pimagewhalf=parseInt(this.width/2);
								var pimagehhalf=parseInt(this.height/2);
								var imgh=$(".btn-img").css('height');
								$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))));
								$(".btn-img").css("position", 'absolute');		
							}
							else
							{
 	                            $(this).find("img").after(html);
                            }
                            $(this).find(".btn-img").css("display", "block").addClass("on-img-top-left");
                        }

                        if (btnPosition == "on-img-hover-btm-right") {
                            if (entryContent) {
								
                                $(".entry-content").css("position","relative");
                                $(this).after(html);

                                $('.entry-content').find(".btn-img").hide();
                            } 
							else if (postthumbnail) {
                                $(".post-thumbnail").css("position","relative");
                                $(this).after(html);

                                $('.post-thumbnail').find(".btn-img").hide();
                            }
							else if(justifiedImageGrid)
							{
								$(this).find("img").after(html);
                                $(this).find(".btn-img").hide();
							}
							else {
		                        $(this).after(html);
                                $(".btn-img").hide();
					        }


                            $(this).hover(
							  function (e) {
									
                                    e.preventDefault();
                                    if (entryContent) {
										
										var p = $(this);
										$(this).parent().width();
										var position = p.position();
										
									    $(this).parent('a').find(".btn-img").css("height", '25px');
										var imgw=$(".btn-img").css('width');
										var pimagewhalf=parseInt(this.width/2);
										var pimagehhalf=parseInt(this.height/2);
                                        var imgh=$(".btn-img").css('height');
										$(this).parent().find(".btn-img").addClass("on-img-btm-right-hover").css("margin-left", (pimagewhalf+(pimagewhalf-parseInt(imgw)))).show();
										$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))));
									
                                    }
									else if (postthumbnail) {
										 
										var pimagewhalf=parseInt(this.width/2);
										var pimagehhalf=parseInt(this.height/2);
                                        var imgh=$(".btn-img").css('height');
										$('.post-thumbnail').find(".btn-img").addClass("on-img-btm-right-hover").css("margin-left",'0px').show();
										$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))))
										
									}
									else if(justifiedImageGrid)
									{
										$(this).find(".btn-img").addClass("on-img-btm-right-hover1").css("right", this.width).show();
										
									}
									 else {
										var imgw=$(".btn-img").css('width');
										var pimagewhalf=parseInt(this.width/2);
										var pimagehhalf=parseInt(this.height/2);
                                        var imgh=$(".btn-img").css('height');
										
										$(this).parent().find(".btn-img").addClass("on-img-btm-right-hover").css("margin-left", (pimagewhalf+(pimagewhalf-parseInt(imgw)))).show();
										$(".btn-img").css("margin-top", (pimagehhalf-(pimagehhalf+parseInt(imgh))));
										//alert();
                                    }
                                }, function () {
                                    if (entryContent) {
                                       $('.entry-content').find(".btn-img").addClass("on-img-btm-right-hover").hide();
                                    }
									else if (postthumbnail) {
                                        $('.post-thumbnail').find(".btn-img").addClass("on-img-btm-right-hover").hide();
                                    } else {
                                        $(this).parent().find(".btn-img").addClass("on-img-btm-right-hover").hide();
                                    }
                                }
                            );
                        }


                        $(document).find(".btn-img").find("img").addClass("imgBorderPage");





                        i++;

                    });

                            imgConClassesCount++;



                        });

                });
                });

            });

        });
    });
	 });
})(jQuery);