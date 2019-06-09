(function() {

    // TODO Step 3.1 create a class
    /* class ScoreComponent constructor */
    function ScoreComponent() {
        var params = parseUrl();
        this.name = params.name;
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    /* method ScoreComponent.render */
    ScoreComponent.prototype.render = render;

    function render() {
        document.getElementById('name').innerText = this.name;
        document.getElementById('size').innerText = this.size;
        document.getElementById('time').innerText = this.time;
    }

    function parseUrl() {
        var url = window.location;
        var query = url.href.split('?')[1] || '';
        var delimiter = '&';
        var result = {};

        var parts = query
            .split(delimiter);
        // TODO Step 3.3: Use Array.map() & Array.reduce()
        for (var i in parts) {
            var item = parts[i];
            var kv = item.split('=');
            result[kv[0]] = kv[1];
        }

        return result;
    }

    window.ScoreComponent = ScoreComponent;
})();
