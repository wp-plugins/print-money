/* sample script here */

jQuery.noConflict();
(function( $ ) {
    'use strict';
    $( document ).ready(function() {

        var url = "http://www.dotphoto.com/WPLand.asp";
	    var returnURL = encodeURIComponent(document.location.href);
        var affiliateID = encodeURIComponent(document.location.host);
        
		
        var data =  {action: "fetch_data", 'postType': 'img-print-btn-txt,img-print-btn-size,img-print-btn-roles,img-print-btn-postio,img-print-btn-pgs,img-print-btn-cats,img-print-btn-css'};

        var btnText = "Print Me";
        var btnSize = "sm";
        var btnPosition = "on-img-hover-btm-right";
        var btnUserRole;
        var btnPages;
        var btnCats;
        var customCSS;

      var imgContainerClasses = "justified-image-grid,nexgen-gallery,entry-content";

       var imgContainerClassesSplit = imgContainerClasses.split(',');




        // var appendTos = "nexgen-gallery";



        var postAjax = $.get(ajaxurl, data, function(response) {
        }).done(function(response) {

            var obj = jQuery.parseJSON(response);


            btnText = obj["img-print-btn-txt"];
            btnSize = obj["img-print-btn-size"];
            btnPosition = obj["img-print-btn-postio"];


            if(!obj["img-print-btn-roles"]) {
                btnUserRole = ["0"];
            } else {
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

//
                if(currentUserRole == '') {

                }  else if(currentUserRole == this) {

                    return false;

                }

                $(btnPages).each(function() {

                    if(currentPage == '') {

                    } else if(currentPage  == this) {

                        return false;
                    }




                    $(btnCats).each(function() {

                        if(currentCat == '') {

                        } else if(currentCat == this) {

                            return false;
                        }



                        var imgConClassesCount = 0;

                        $(imgContainerClassesSplit).each(function(v) {

                           // alert(imgContainerClassesSplit[imgConClassesCount]);

                            if(imgContainerClassesSplit[imgConClassesCount] == "nexgen-gallery") {

                                var nexgenGallery = $(document).find('.ngg-galleryoverview');

                                var imgs = $(".ngg-galleryoverview").find(".ngg-gallery-thumbnail-box").find("a");

                            }else if(imgContainerClassesSplit[imgConClassesCount] == "justified-image-grid") {

                               var justifiedImageGrid = $(document).find('.justified-image-grid');

                               var imgs = $(".justified-image-grid").find(".jig-overflow").find("a");

                            }else if(imgContainerClassesSplit[imgConClassesCount] == "entry-content") {

                                if($('.btn-img')[0]) {

                                    return false;

                                } else {

                                }

                                var entryContent = $(document).find('img');

                                var imgs = $(".entry-content").find("img");

                            }








                    var i = 0;

                    $.each(imgs, function (key, value) {

                        if(nexgenGallery) {

                            var imgSrc = $(this).find("img").attr('src');

                        } else if (justifiedImageGrid) {

                            var imgSrc = $(this).find("img").attr('src');
                        } else if (entryContent) {

                            var imgSrc = $(this).attr('src');

                        } else {
                            return false;
                        }

//encoding problem needs to be solved here
                        var html = "<div class='btn-img " + btnSize + "-btn-img'><a href='" + url + "?imgURL=" + encodeURIComponent(imgSrc) + "&returnURL=" + returnURL + "&affiliateID=" + affiliateID + "'> <img src='" + imgSrc + "'> <span>" + btnText + "</span> </a></div>";




                        if (btnPosition == "above-img") {

                                $(this).before(html);


                        }

                        if (btnPosition == "below-img") {

                                $(this).after(html);

                        }

                        if (btnPosition == "on-img-btm-right") {

                            if (entryContent) {
                                $(this).after(html);
                            } else {
                                $(this).find("img").after(html);
                            }

                            $(this).find(".btn-img").css("display", "block").addClass("on-img-btm-right");
                        }

                        if (btnPosition == "on-img-btm-left") {
                            if (!entryContent) {
                                $(this).find("img").after(html);
                            } else {
                                $(this).after(html);
                            }
                            $(this).find(".btn-img").css("display", "block").addClass("on-img-btm-left");
                        }
                        if (btnPosition == "on-img-top-right") {
                            if (!entryContent) {
                                $(this).find("img").after(html);
                            } else {
                                $(this).after(html);
                            }
                            $(this).find(".btn-img").css("display", "block").addClass("on-img-top-right");
                        }

                        if (btnPosition == "on-img-top-left") {
                            if (!entryContent) {
                                $(this).find("img").after(html);
                            } else {
                                $(this).after(html);
                            }
                            $(this).find(".btn-img").css("display", "block").addClass("on-img-top-left");
                        }

                        if (btnPosition == "on-img-hover-btm-right") {
                            if (entryContent) {
                                $(".entry-content").css("position","relative");
                                $(this).after(html);

                                $('.entry-content').find(".btn-img").hide();
                            } else {
                                $(this).find("img").after(html);
                                $(this).find(".btn-img").hide();
                            }


                            $(this).hover(
                                function (e) {
                                    e.preventDefault();
                                    if (entryContent) {
                                        $('.entry-content').find(".btn-img").addClass("on-img-btm-right-hover").css("right", this.width).show();

                                    } else {
                                        $(this).find(".btn-img").addClass("on-img-btm-right-hover").css("right", this.width).show();
                                    }
                                }, function () {
                                    if (entryContent) {
                                        $('.entry-content').find(".btn-img").addClass("on-img-btm-right-hover").hide();
                                    } else {
                                        $(this).find(".btn-img").addClass("on-img-btm-right-hover").hide();
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
})(jQuery);