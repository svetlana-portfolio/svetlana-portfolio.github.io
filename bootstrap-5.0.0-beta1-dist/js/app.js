/*
  VENDOR.JS:
  * jQyery (https://jquery.com/)
*/

svg4everybody();

jQuery(document).ready(function($) {
// ready start

    $('#js-menu-btn').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('#menu').toggleClass('active');
    });

    (function () {
        // Плавная прокрутка по ссылке
        var smooth_scrolling_to_anchor = {
            init: function () {
                this.listeners();
            },
            listeners: function () {
                var hash = window.location.hash;
                if (hash != '') {
                    smooth_scrolling_to_anchor.scrolling(hash);
                }
                // ко всем ссылкам навигации по якорю добавить атрибут data-anchor
                $('[data-anchor]').on('click', function () {
                    var address = $(this).attr('href');
                    $('#menu').removeClass('active');
                    $('#js-menu-btn').removeClass('active');
                    smooth_scrolling_to_anchor.scrolling(address);
                });
            },
            scrolling: function (address) {
                // анимируем скроллинг
                var el = $(address);
                var target = el[0];
                $('html, body').stop().animate({'scrollTop': target.offsetTop}, 1000);
            },
        }
        smooth_scrolling_to_anchor.init();
    }());

    (function () {
        // parallax
        var parallax = {
            init: function () {
                this.listeners();
            },
            listeners: function () {
                $(window).on('scroll', function(event) {
                    var header_bg = $('.header-sand');
                    var scroll = $(this).scrollTop();
                    var move = scroll/10;

                    $(header_bg).css('top', '-' + move + 'px');
                });
            }
        }
        parallax.init();
    }());

    (function () {
        // slider
        var slider = {
            init: function () {
                this.listeners();
            },
            listeners: function () {
                $('#slider').on('click', '.prev', function(event) {
                    var el = $(this);
                    var move = 'prev';
                    slider.change_slide(move, el);
                });

                $('#slider').on('click', '.next', function(event) {
                    var el = $(this);
                    var move = 'next';
                    slider.change_slide(move, el);
                });
            },
            change_slide: function (move, el) {
                var parent = $(el).parents('.slider');
                var slides = $(parent).find('.slide');
                var total = $(slides).length;
                var active_id = $(slides).filter('.active').index();

                if ( move == 'next' ) {
                    var next_id = active_id + 1;
                }
                if ( move == 'prev' ) {
                    var next_id = active_id - 1;
                }

                $(slides).removeClass('active');

                if ( next_id > (total - 1) ) {
                    next_id = 0;
                }

                if ( next_id < 0 ) {
                    next_id = (total - 1);
                }

                $(slides).eq(next_id).addClass('active');

                slider.change_btn(el, move, next_id, total);
            },
            change_btn: function (el, move, next_id, total) {

                var controls = $(el).parent('.slider-nav');
                var prevs = $(controls).find('.prev').find('.control');
                var nexts = $(controls).find('.next').find('.control');

                var prev_id = next_id - 1;
                var next_id = next_id + 1;

                if ( prev_id < 0 ) {
                    prev_id = total - 1;
                }

                if ( next_id > (total - 1) ) {
                    next_id = 0;
                }

                $(prevs).removeClass('active');
                $(nexts).removeClass('active');

                $(prevs).eq(prev_id).addClass('active');
                $(nexts).eq(next_id).addClass('active');
            },
        }
        slider.init();
    }());

    (function () {
        // SVG Diagram
        var diagram = {
            init: function () {
                this.listeners();
            },
            listeners: function () {
                // берем все блоки с диаграммой
                var el = $('.skill-diagram');

                $.each(el, function(index, el) {
                    // берем значение процента
                    var percent = $(el).attr('data-percent');
                    // берем элемент с обводкой
                    var circle = $(el).find('.circle');
                    // заполняем обводку
                    diagram.fill_diagram(circle, percent);
                });
            },
            fill_diagram: function (circle, percent) {
                // берем диаметр
                var diameter = $(circle).attr('r');
                // длинна окружности = 2 * число пи * радиус бордера
                var length = 2 * 3.15 * diameter;
                // та часть, где пусто
                var pie = ( (100 - percent) / 100) * length;
                // устанавливаем атрибуты
                $(circle).attr('stroke-dasharray', length);
                $(circle).attr('stroke-dashoffset', pie);
            }
        }
        diagram.init();
    }());

// ready end
});
//# sourceMappingURL=../maps/app.js.map