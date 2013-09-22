/*!
 * jQuery Rollover Image plugin v0.9.4
 * https://github.com/terkel/jquery-rolloverimage
 *
 * Copyright (c) 2013 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 */
(function ($) {

    $.fn.rolloverImage = function (options) {

        options = $.extend({}, $.fn.rolloverImage.defaults, options);

        var $this = $(this),
            $images = $this.find('img, input[type="image"]').add($this.filter('img, input[type="image"]')),
            ext = '(\\.gif|\\.jpe?g|\\.png|\\.webp)$',
            originalRegex = new RegExp('(' + options.originalSuffix + ')' + ext, 'i');

        $images.each(function () {

            var $image = $(this),
                originalSrc = $image.attr('src'),
                rolloverSrc,
                $rolloverImage,
                $link,
                $el,
                handlerIn,
                handlerOut;

            if (!originalRegex.test(originalSrc)) {
                return;
            }

            rolloverSrc = originalSrc.replace(originalRegex, options.rolloverSuffix + '$2');
            $rolloverImage = $('<img/>').attr('src', rolloverSrc);
            $link = $image.closest('a');
            $el = $link.length? $link: $image;

            if (options.fade && $.support.opacity) {
                $image.before($rolloverImage.css({ opacity: 0, position: 'absolute' }));
                handlerIn = function () {
                    $rolloverImage.stop(true).animate({ opacity: 1 }, options.fadeInDuration);
                    $image.stop(true).animate({ opacity: 0 }, options.fadeInDuration);
                };
                handlerOut = function () {
                    $rolloverImage.stop(true).animate({ opacity: 0 }, options.fadeOutDuration);
                    $image.stop(true).animate({ opacity: 1 }, options.fadeOutDuration);
                };
            } else {
                handlerIn = function () {
                    $image.attr('src', rolloverSrc);
                };
                handlerOut = function () {
                    $image.attr('src', originalSrc);
                };
            }

            $el.
                off('.rolloverImage').
                on({
                    'mouseenter.rolloverImage focus.rolloverImage': handlerIn,
                    'mouseleave.rolloverImage blur.rolloverImage': handlerOut
                });

        });

        return this;
    };

    $.fn.rolloverImage.defaults = {
        originalSuffix:  '-off',
        rolloverSuffix:  '-on',
        fade:            false,
        fadeInDuration:  125,
        fadeOutDuration: 250
    };

})(jQuery);
