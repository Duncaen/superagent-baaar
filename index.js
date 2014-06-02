var Baaar = require('baaar');

module.exports = function(bar) {
    if(!(bar instanceof Baaar)) bar = new Baaar();
    var n = 0;
    var end = false;

    var work = function() {
        setTimeout(function() {
            if(end) return;
            n = clamp(n + Math.round(Math.random() * 15), 1, 100);
            bar.set(n);
            work();
        }, 800);
    };

    return function(request) {
        request.on('request', function(e) {
            end = false;
            work();
        }).on('progress', function(e) {
            // TODO: add progress for uploads
        }).on('end', function(e) {
            end = true;
            n = 0;
            bar.set(100);
            setTimeout(function() {
                bar.destroy();
            }, 800);
        });
    };
};

function clamp(n, min, max) {
    if(n < min) return min;
    if(n > max) return max;
    return n;
}
