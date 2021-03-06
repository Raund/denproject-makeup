$(function(){

/***********height screen*************/
    $('.header, .footer').css({height : ($( window ).height() - 630)/2 + 'px'});
    $('.content').css({'top' : ($( window ).height() - 630)/2 + 'px'});
    $('.sidebar_right_wrap').css({'bottom' : ($( window ).height() - 630)/2 + 'px'});
    $('nav').css({width : $( window ).height() + 'px'});
/***********END height screen*************/

/***********Navigation menu and click on logo*************/
    var marTop = 630;
    $('.nav a, .logo').on("click", function (e) {
        $('.project-item').show();
        $('.r-carousel-wrap').css({'opacity':0,'z-index':-1});  // hide all gallery
        $('.arrow').show();                                     //show arrow for page pagination
        $('.arrow-gallery').hide();                             //hide arrow for img pagination in gallery
        $('[data-page-num]').removeClass('active');
        var pageNum = $(this).attr('data-page-num');
        if(pageNum == 1){
            $('.arrow-up').css({
                'display': 'none'
            });
        } else {
            $('.arrow-up').css({
                'display': 'block'
            });
        };
        if(pageNum == 4){
            $('.arrow-down').css({
                'display': 'none'
            });
        } else {
            $('.arrow-down').css({
                'display': 'block'
            });
        };
        $('body').find('[data-page-num=' + pageNum + ']').addClass('active');
        $('.content-wrap').css({'margin-top' : - marTop * (pageNum - 1)});
        e.preventDefault();
    });
/***********END navigation menu and click on logo*************/

/***********Paggination arrow*************/
    $('.arrow-up').on("click", function () {
        var pageUpNumOld = $('body').find('.nav_item.active').attr('data-page-num');
        var pageUpNum = +pageUpNumOld - 1;
        $('[data-page-num]').removeClass('active');
        if(pageUpNum == 1){
            $('.arrow-up').css({
                'display': 'none'
            });
        };
        $('.arrow-down').css({
            'display':'block'
        });
        $('body').find('[data-page-num=' + pageUpNum + ']').addClass('active');
        $('.content-wrap').css({'margin-top' : - marTop * (pageUpNum - 1)});
    });

    $('.arrow-down').on("click", function () {
        var pageDownNumOld = $('body').find('.nav_item.active').attr('data-page-num');
        var pageDownNum = +pageDownNumOld + 1;
        if(pageDownNum == 4){
            $('.arrow-down').css({
                'display': 'none'
            });
        };
        $('.arrow-up').css({
            'display':'block'
        });
        $('[data-page-num]').removeClass('active');
        $('body').find('[data-page-num=' + pageDownNum + ']').addClass('active');
        $('.content-wrap').css({'margin-top' : - marTop * (pageDownNum - 1)});
    });
/***********END paggination arrow*************/

/***********Show gallery*************/
    $('.project-item').on('click', function () {
        $('.project-item').hide();
        var projectId = $(this).attr('data-id');
        $('.content').find('#project-carousel-' + projectId).css({'opacity':1,'z-index':1});
        $('.arrow-back, .arrow-gallery').show();
        $('.arrow').hide();
        $('.arrow-gallery-down').on('click', function () {
            $('#project-carousel-' + projectId).find('.owl-next').trigger('click');
        });
        $('.arrow-gallery-up').on('click', function () {
            $('#project-carousel-' + projectId).find('.owl-prev').trigger('click');
        });
    });

    $('.arrow-back').on('click', function () {
        $('.project-item').show();
        $('.r-carousel-wrap').css({'opacity':0,'z-index':-1});
        $(this).hide();
        $('.arrow').show();
        $('.arrow-gallery').hide();
    });
/***********END show gallery*************/

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