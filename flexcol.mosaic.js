/* @preserve
 *
 * Flexcol.mosaic v1.0.0
 * https://github.com/sunpietro/flexcol-mosaic
 *
 * Copyright 2015 Piotr Nalepa/sunpietro
 * http://blog.piotrnalepa.pl
 *
 * Released under the MIT license
 * https://github.com/sunpietro/flexcol-mosaic/blob/master/LICENSE
 *
 * Date: 2015-08-06T18:00Z
 */
;(function (window, document) {
    'use strict';

    var flexcolMosaic = function (customParams) {
        var params = {
                columns: 3,
                containerSelector: '.flexcol-container',
                itemSelector: '.flexcol-item'
            },
            overflowInitValue = 0.5,
            overflowIncreaseValue = 0.25,
            calculationsTimeout,
            setFlexContainerHeight,
            makeHeightCalculations,
            correctOverflow,
            setColumns,
            container,
            items,
            key;

        for (key in customParams) {
            if (customParams.hasOwnProperty(key)) {
                params[key] = customParams[key];
            }
        }

        container = document.querySelector(params.containerSelector);
        items = Array.prototype.slice.call(container.querySelectorAll(params.itemSelector));

        setFlexContainerHeight = function setFlexContainerHeight () {
            window.clearTimeout(calculationsTimeout);

            params.columns = parseInt(params.columns, 10);

            calculationsTimeout = window.setTimeout(makeHeightCalculations, 100);
        };

        setColumns = function setColumns (columnsNumber) {
            params.columns = columnsNumber;

            setFlexContainerHeight();
        };

        correctOverflow = function correctOverflow (finalHeight, itemMinHeight) {
            function checkOverflow (height, multiply) {
                if (container.offsetWidth < container.scrollWidth) {
                    container.style.height = finalHeight + (height * multiply) + 'px';

                    checkOverflow(height, multiply + overflowIncreaseValue);
                }
            }

            checkOverflow(itemMinHeight, overflowInitValue);
        };

        makeHeightCalculations = function makeHeightCalculations () {
            var itemsHeight = 0,
                itemMaxHeight = 0,
                itemMinHeight = 0,
                finalHeight = 0;

            container.style.height = 'auto';

            items.forEach(function (item) {
                var itemOffset = item.getBoundingClientRect();

                itemMaxHeight = itemOffset.height > itemMaxHeight ? itemOffset.height : itemMaxHeight;
                itemMinHeight = !itemMinHeight || itemOffset.height < itemMinHeight ? itemOffset.height : itemMinHeight;
                itemsHeight += itemOffset.height;
            });

            finalHeight = (itemsHeight / params.columns);
            container.style.height = finalHeight + 'px';

            correctOverflow(finalHeight, itemMinHeight);
        };

        window.addEventListener('load', setFlexContainerHeight);
        window.addEventListener('resize', setFlexContainerHeight);
        window.addEventListener('orientationchange', setFlexContainerHeight);

        return {
            setColumns: setColumns
        };
    };

    window.FlexcolMosaic = flexcolMosaic;
})(window, window.document);
