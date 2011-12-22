/*!
 * jQuery Rollover plugin v0.9
 * https://github.com/terkel/jquery-rollover
 *
 * Copyright (c) 2011 Takeru Suzuki, http://terkel.jp/
 * Licensed under the MIT license: http://www.opensource.org/licenses/MIT
 */
(function ($) {
    $.fn.rollover = function (options) {
        var opts = $.extend({}, $.fn.rollover.defaults, options),
            originalRegex = new RegExp('(' + opts.originalSuffix + ')?(\.gif|\.jpe?g|\.png)$', 'i'),
            currentRegex = new RegExp('(' + opts.currentSuffix + ')(\.gif|\.jpe?g|\.png)$', 'i');
        return this.each(function () {
            var $this = $(this),
                $link = $this.closest('a'),
                $elem = $link.is('a')? $link: $this,
                originalSrc = $this.attr('src'),
                rolloverSrc = (currentRegex.test(originalSrc))?
                    originalSrc.replace(currentRegex, opts.currentRolloverSuffix + '$2'):
                    originalSrc.replace(originalRegex, opts.rolloverSuffix + '$2'),
                $rolloverImg = $('<img />').attr('src', rolloverSrc);
            if (opts.fade) {
                if ($.support.opacity) {
                    $this.css({ position: 'relative' });
                    $this.before($rolloverImg.css({ opacity: 0, position: 'absolute' }));
                    $elem.bind({
                        mouseenter: function () {
                            $rolloverImg.stop().animate({ opacity: 1 }, opts.fadeInDuration);
                            $this.stop().animate({ opacity: 0 }, opts.fadeInDuration);
                        },
                        mouseleave: function () {
                            $rolloverImg.stop().animate({ opacity: 0 }, opts.fadeOutDuration);
                            $this.stop().animate({ opacity: 1 }, opts.fadeOutDuration);
                        }
                    });
                } else {
                    bindDefaultRollover();
                }
            } else {
                bindDefaultRollover();
            }
            function bindDefaultRollover () {
                $elem.bind({
                    mouseenter: function () {
                        $this.attr('src', rolloverSrc);
                    },
                    mouseleave: function () {
                        $this.attr('src', originalSrc);
                    }
                });
            }
        });
    };
    $.fn.rollover.defaults = {
        originalSuffix:        '-o',
        rolloverSuffix:        '-r',
        currentSuffix:         '-c',
        currentRolloverSuffix: '-cr',
        fade:                  false,
        fadeInDuration:        200,
        fadeOutDuration:       400
    };
})(jQuery);