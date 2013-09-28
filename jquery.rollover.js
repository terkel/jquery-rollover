/*!
 * jQuery Rollover plugin v0.9.6
 * https://github.com/terkel/jquery-rolloverimage
 *
 * Copyright (c) 2013 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 */
(function ($) {

    $.fn.rollover = function (options) {

        options = $.extend({}, $.fn.rollover.defaults, options);

        var $this = $(this),
            ext = '(\\.gif|\\.jpe?g|\\.png|\\.webp)$',
            originalRegex = new RegExp('(' + options.originalSuffix + ')' + ext, 'i'),
            imageSelector = 'img, input[type="image"]',
            $images = $this.find(imageSelector).add($this.filter(imageSelector)).filter(function () {
                return originalRegex.test(this.src);
            });

        $images.each(function () {

            var $image = $(this),
                originalAlt = $image.attr('alt'),
                originalSrc = $image.attr('src'),
                rolloverSrc = originalSrc.replace(originalRegex, options.rolloverSuffix + '$2'),
                $rolloverImage = $('<img/>').attr('src', rolloverSrc),
                $link = $image.closest('a, button'),
                $el = $link.length? $link: $image,
                handlerIn,
                handlerOut;

            if (options.fade && $.support.opacity) {
                $image.before($rolloverImage.css({ opacity: 0, position: 'absolute' }));
                handlerIn = function () {
                    crossFadeImages($rolloverImage, $image, originalAlt, options.fadeInDuration, options.fadeInEasing);
                };
                handlerOut = function () {
                    crossFadeImages($image, $rolloverImage, originalAlt, options.fadeOutDuration, options.fadeOutEasing);
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
                off('.rollover').
                on({
                    'mouseenter.rollover focus.rollover': handlerIn,
                    'mouseleave.rollover blur.rollover': handlerOut
                });

        });

        function crossFadeImages ($showImage, $hideImage, alt, duration, easing) {
            $showImage.
                attr('alt', alt).
                stop(true).
                animate({ opacity: 1 }, duration, easing);
            $hideImage.
                attr('alt', '').
                stop(true).
                animate({ opacity: 0 }, duration, easing);
        }

        return this;
    };

    $.fn.rollover.defaults = {
        originalSuffix:  '-off',
        rolloverSuffix:  '-on',
        fade:            false,
        fadeInDuration:  125,
        fadeOutDuration: 250,
        fadeInEasing:    'swing',
        fadeOutEasing:   'swing'
    };

})(jQuery);
