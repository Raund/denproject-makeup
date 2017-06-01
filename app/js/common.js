$(function(){

    var windowHeight = $( window ).height();
    var windowWidth = $( window ).width();
    if($('div').is('.content')){
        var marTop = +($('.content').css('height').slice(0,-2));
    };
    var hoverTrigger = 1;
    var projectId;

/***********Trigger for scroll page or item in gallery by mouse wheel*************/
/*
    $('.r-carousel-wrap').hover(
        function () {
            hoverTrigger = 0;
        },
        function () {
            hoverTrigger = 1;
        }
    );
*/
/***********END trigger for scroll page or item in gallery by mouse wheel*************/

/***********Function for scroll page*************/
    function scrollPage(pageOld,UpOrDown) {
        if(UpOrDown == 'Up'){
            var pageNum = +pageOld - 1;
            if(pageNum == 1){
                $('.arrow-up').css({'display': 'none'});
            };
            $('.arrow-down').css({'display':'block'});
        };
        if(UpOrDown == 'Down'){
            var pageNum = +pageOld + 1;
            if(pageNum == 4){
                $('.arrow-down').css({'display': 'none'});
            };
            $('.arrow-up').css({'display':'block'});
        };
        $('[data-page-num]').removeClass('active');
        $('body').find('[data-page-num=' + pageNum + ']').addClass('active');
        $('.content-wrap').css({'margin-top' : - marTop * (pageNum - 1)});
        $('.r-carousel-wrap').css({'opacity':0,'z-index':-1});
        $('.project-item').show();
    };
/***********END function for scroll page*************/

/***********Function for scroll-down gallery item*************/
    function scrollGalleryDown() {
        $('#project-carousel-' + projectId).find('.owl-next').trigger('click');
        if($('#project-carousel-' + projectId + ' .owl-item:last-child').hasClass('active')){
            $('.arrow-gallery-down').hide();
        } else{
            $('.arrow-gallery-down').show();
        }
        if($('#project-carousel-' + projectId + ' .owl-item:not(first-child)').hasClass('active')){
            $('.arrow-gallery-up').show();
        };
    };
/***********END function for scroll-down gallery item*************/

/***********Function for scroll-up gallery item*************/
    function scrollGalleryUp() {
        $('#project-carousel-' + projectId).find('.owl-prev').trigger('click');
        if($('#project-carousel-' + projectId + ' .owl-item:first-child').hasClass('active')){
            $('.arrow-gallery-up').hide();
        };
        if($('#project-carousel-' + projectId + ' .owl-item:not(last-child)').hasClass('active')){
            $('.arrow-gallery-down').show();
        };
    };
/***********END function for scroll-up gallery item*************/

/***********height screen*************/
    $('.mob-block_about,.mob-block_contact').css({height : (windowHeight - $('.mob-header').css('height').slice(0,-2)) + 'px'});
    $('.header, .footer').css({height : (windowHeight - marTop)/2 + 'px'});
    $('.content').css({'top' : (windowHeight - marTop)/2 + 'px'});
    $('.sidebar_right_wrap').css({'bottom' : (windowHeight - marTop)/2 + 'px'});
    $('nav').css({width : windowHeight + 'px'});
/***********END height screen*************/

/***********Navigation menu and click on logo*************/
    $('.nav a, .logo').on("click", function (e) {
        hoverTrigger = 1;
        $('.project-item').show();
        $('.r-carousel-wrap').css({'opacity':0,'z-index':-1});  // hide all gallery
        $('.arrow').show();                                     //show arrow for page pagination
        $('.arrow-gallery').hide();                             //hide arrow for img pagination in gallery
        $('.arrow-gallery-up, .arrow-gallery-down').show();
        $('[data-page-num]').removeClass('active');
        var pageNum = $(this).attr('data-page-num');
        if(pageNum == 1){
            $('.arrow-up').css({'display': 'none'});
        } else {
            $('.arrow-up').css({'display': 'block'});
        };
        if(pageNum == 4){
            $('.arrow-down').css({'display': 'none'});
        } else {
            $('.arrow-down').css({'display': 'block'});
        };
        $('body').find('[data-page-num=' + pageNum + ']').addClass('active');
        $('.content-wrap').css({'margin-top' : - marTop * (pageNum - 1)});
        e.preventDefault();
    });
/***********END navigation menu and click on logo*************/

/***********Paggination page*************/
    $('.arrow-up').on("click", function () {
        var pageOld = $('body').find('.nav_item.active').attr('data-page-num');
        scrollPage(pageOld, 'Up');
    });

    $('.arrow-down').on("click", function () {
        var pageOld = $('body').find('.nav_item.active').attr('data-page-num');
        scrollPage(pageOld, 'Down');
    });

    /***********Paggination by mouse wheel*************/
    $('body').bind('mousewheel', function(e){
        var pageOld = $('body').find('.nav_item.active').attr('data-page-num');
        if(hoverTrigger == 1){  //scroll page
            if((e.originalEvent.wheelDelta < 0) && pageOld <= 3) {
                scrollPage(pageOld, 'Down');
            };
            if((e.originalEvent.wheelDelta > 0) && pageOld >= 2)  {
                scrollPage(pageOld, 'Up');
            };
            return false;
        } else {    //scroll gallery item
            if((e.originalEvent.wheelDelta < 0) && pageOld <= 3) {
                scrollGalleryDown();
            };
            if((e.originalEvent.wheelDelta > 0) && pageOld >= 2)  {
                scrollGalleryUp();
            };
            return false;
        }
    });
    /***********END paggination by mouse wheel*************/

/***********END paggination*************/

/***********Show gallery*************/
    $('.project-item').on('click', function () {
        hoverTrigger = 0;
        $('.project-item').hide();
        projectId = $(this).attr('data-id');
        $('.content').find('#project-carousel-' + projectId).css({'opacity':1,'z-index':1});
        $('.arrow-back, .arrow-gallery').show();
        $('.arrow').hide();
        if($('#project-carousel-' + projectId + ' .owl-item:first-child').hasClass('active')){
            $('.arrow-gallery-up').hide();
        };
    });

    $('.arrow-gallery-down').on('click', function () {
        scrollGalleryDown();
    });

    $('.arrow-gallery-up').on('click', function () {
        scrollGalleryUp();
    });

    $('.arrow-back').on('click', function () {
        hoverTrigger = 1;
        $('.project-item').show();
        $('.r-carousel-wrap').css({'opacity':0,'z-index':-1});
        $(this).hide();
        $('.arrow').show();
        $('.arrow-gallery').hide();
        $('.arrow-gallery-up, .arrow-gallery-down').show();
    });
/***********END show gallery*************/

/***********Show gallery on mobile*************/
    $('.mob-project-item').on('click', function () {
        projectId = $(this).attr('data-id');
        $('body').find('#mob-project-carousel-' + projectId).toggleClass('active');
    });

    $('.mob-close-gallery').on('click', function () {
        $(this).parent().toggleClass('active');
    });
/***********END show gallery on mobile*************/

/***********Adaptive menu*************/
    $('.button-menu').click(function(){
        $(this).toggleClass('active');
        $('.mob-nav').toggleClass('active');
        $('.button-menu .icon').toggleClass('menu-i').toggleClass('close');
    });
/***********END adaptive menu*************/

/**********scrollTo**************/
/*
    $(".mob-nav li a").click(function(e) {
        var scrollId = $(this).attr('data-scroll-id');
        $('html, body').animate({
            scrollTop: $("#" + scrollId).offset().top
        }, 1000);
        $('.button-menu').trigger('click');
        e.preventDefault();
    });
*/
/**********END scrollTo**************/
    
/**********Center alignment img in mobile gallery**************/
    $(window).load(function () {
        $('.mob-gallery-item img').each(function () {
            var imgHeight = $(this).height();
            console.info(imgHeight);
            var imgMar = (windowHeight - imgHeight)/2;
            $(this).css({'margin-top': imgMar + 'px'});
        });
    });
    $('.mob-gallery-item').css({'height': windowHeight + 'px','width': windowWidth + 'px'});
    $('.mob-gallery-item img').css({'max-height': windowHeight + 'px','max-width': windowWidth + 'px'});
/**********END center alignment img in mobile gallery**************/
   
    if(windowHeight <= 900 ||  windowWidth <= 1200){
        $('.nav img').each(function () {
            var imgSrc = $(this).attr('src').slice(0,-4) + '_min.png';
            $(this).attr('src', imgSrc);
        });
    };

/***********Owl-carousel*************/
    $('.owl-carousel').owlCarousel({
        items:1,
        singleItem: true,
        nav: true,
        navText: "",
        animateOut: "fadeOut",
        animateIn: "fadeIn"
    });
/***********END owl-carousel*************/

});