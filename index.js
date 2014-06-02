var Baaar = require('baaar');

module.exports = function(instance) {
    if(!instance instanceof Baaar) instance = new Baaar();

    return function(request) {
        request.on('progress', function(e) {
            console.log('progress', e);
            //instance.set();
        });
        request.on('end', function(e) {
            console.log('end', e);
            instance.destroy();
        });
    }
};
