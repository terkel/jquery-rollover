/*!
 * jQuery Rollover Image plugin v0.9.5
 * https://github.com/terkel/jquery-rolloverimage
 *
 * Copyright (c) 2013 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 */
(function ($) {

    $.fn.rolloverImage = function (options) {

        options = $.extend({}, $.fn.rolloverImage.defaults, options);

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
                $link = $image.closest('a'),
                $el = $link.length? $link: $image,
                handlerIn,
                handlerOut;

            if (options.fade && $.support.opacity) {
                $image.before($rolloverImage.css({ opacity: 0, position: 'absolute' }));
                handlerIn = function () {
                    var duration = options.fadeInDuration,
                        easing = options.fadeInEasing;
                    $rolloverImage.
                        attr('alt', originalAlt).
                        stop(true).
                        animate({ opacity: 1 }, duration, easing);
                    $image.
                        attr('alt', '').
                        stop(true).
                        animate({ opacity: 0 }, duration, easing);
                };
                handlerOut = function () {
                    var duration = options.fadeOutDuration,
                        easing = options.fadeOutEasing;
                    $rolloverImage.
                        attr('alt', '').
                        stop(true).
                        animate({ opacity: 0 }, duration, easing);
                    $image.
                        attr('alt', originalAlt).
                        stop(true).
                        animate({ opacity: 1 }, duration, easing);
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
        fadeOutDuration: 250,
        fadeInEasing:    'swing',
        fadeOutEasing:   'swing'
    };

})(jQuery);
