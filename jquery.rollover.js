/*!
 * jQuery Rollover plugin v0.9.3
 * https://github.com/terkel/jquery-rollover
 *
 * Copyright (c) 2012 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://www.opensource.org/licenses/MIT
 */
(function ($) {

    $.fn.rollover = function (options) {
        var opts = $.extend({}, $.fn.rollover.defaults, options),
            ext = '(\.gif|\.jpe?g|\.png)$',
            originalRegex = new RegExp('(' + opts.originalSuffix + ')?' + ext, 'i'),
            currentRegex = new RegExp('(' + opts.currentSuffix + ')' + ext, 'i');
        return this.each(function () {
            if (opts.ignoreClass && $(this).closest('.' + opts.ignoreClass).length) {
                return;
            }
            if (opts.auto && !originalRegex.test( $(this).attr('src') )) {
                return;
            }
            var $this = $(this),
                $elem = (opts.parent)? $this.closest(opts.parent): $this,
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
        auto:                  false,
        parent:                '',
        originalSuffix:        '-off',
        rolloverSuffix:        '-on',
        currentSuffix:         '-coff',
        currentRolloverSuffix: '-con',
        ignoreClass:           '',
        fade:                  false,
        fadeInDuration:        200,
        fadeOutDuration:       400
    };

})(jQuery);