(function (window, document) {
    'use strict';

    var configHash = [{
            className: 'cols-2',
            columns: 2
        }, {
            className: 'cols-3',
            columns: 3
        }, {
            className: 'cols-4',
            columns: 4
        }, {
            className: 'cols-5',
            columns: 5
        }],
        containerClassName = 'flexcol-container',
        containerSelector = '.' + containerClassName,
        container = document.querySelector(containerSelector),
        headline = document.getElementById('columns-count'),
        mosaic = new window.FlexcolMosaic(),
        activeConfig = configHash[1];

    window.setInterval(function () {
        var configs = configHash.filter(function (config) {
            return config.columns !== activeConfig.columns;
        });

        activeConfig = configs[Math.floor(Math.random() * configs.length)];

        container.className = containerClassName;
        headline.innerHTML = activeConfig.columns;

        container.classList.add(activeConfig.className);
        mosaic.setColumns(activeConfig.columns);
    }, 5000);
})(window, window.document, window.console);
