;(function($) {
    
    $(document).ready(function(){

        // = Вешаем событие прокрутки к нужному месту
        //	 на все ссылки якорь которых начинается на #
        $('a[href^="#"]').bind('click.smoothscroll',function (e) {
            e.preventDefault();

            var target = this.hash,
            $target = $(target);
            console.log($target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top

            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });

       $('.list-item__body_button').hover(
            function(){
                $(this).closest('.prices__list-item').addClass("hovered");

            },
            function(){
                $(this).closest('.prices__list-item').removeClass("hovered");
            }
       );

        //инициализация слайдеров 
        $('.prices__slider > .owl-carousel').owlCarousel({
            items: 1
        });
        $('.about-us__slider .owl-carousel, .trainer-slider .owl-carousel').owlCarousel({
            items: 1,
            dots: false,
            nav: true
        });
        
        
        $('#trial_form').submit(function(event) {
            event.preventDefault();
            $(this).validate();      
            $.validator.addClassRules({
               required_name: {
                    required: true,
                    minlength: 3
                },
                required_phone: {
                    required: true,
                    minlength: 5
                }
            });
            
            
        })
    });
    
})(jQuery);