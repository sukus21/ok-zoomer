(function() {
    function setZoomLevel(level) {
        const r = document.querySelector(":root");
        r.style.setProperty("--ok-zoomer-level", "" + level + "%");
    }

    const Preferences = $gmedit["ui.Preferences"];

    const defaultOptions = {
        zoom: 100,
    };
    
    GMEdit.register("ok-zoomer", {
        init: function() {
            if(!Preferences.current.ok_zoomer) {
                Preferences.current.ok_zoomer = {...defaultOptions};
            }
            setZoomLevel(Preferences.current.ok_zoomer.zoom);
        },
    });

    GMEdit.on('preferencesBuilt', function(event) {
        const out = event.target.querySelector('.plugin-settings[for=ok-zoomer]');

        Preferences.addFloatInput(out, "zoom percentage", defaultOptions.zoom, function(level) {
            setZoomLevel(level);
            Preferences.current.ok_zoomer.zoom = level;
            Preferences.save();
        });
    });
})();
