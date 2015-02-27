(function colorTopic() {
    var titleToTimestamp = function (title) {
        var matches = title.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})([^0-9a-z])/i);
        if (!matches) {
            return 0;
        }
        return parseInt((new Date(matches[1])).getTime() / 1000, 10);
    };

    var maxColorShiftTimediff = 86400 * 14;

    var timediffToColor = function (timediff) {
        var ceilingedDiff = Math.min(timediff, maxColorShiftTimediff);
        return parseInt((ceilingedDiff / maxColorShiftTimediff) * 55, 10);
    };

    var refresh = function () {
        var now = parseInt((new Date()).getTime() / 1000, 10);
        var topicRows = document.querySelectorAll('.category-item .topic-row');
        Array.prototype.forEach.call(topicRows, function (topicRow) {
            var meta = topicRow.querySelector('meta[itemprop="name"]');
            var topicTime = titleToTimestamp(meta.getAttribute('content'));

            if (topicTime === 0) {
                return;
            }

            var color = timediffToColor(Math.abs(now - topicTime));

            var rgba;
            var r = 255;
            var g = 255;
            var b = 255;
            var a = 1;

            if (now - topicTime > 0) {
                g -= color;
                b -= color;
            } else {
                r -= color;
                g -= color;
            }


            rgba = [r, g, b, a].join(', ');

            console.log(rgba);
            console.log(topicRow);
            topicRow.style.backgroundColor = 'rgba(' + rgba + ')';
        });
    };

    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded');
        refresh();
    });

    window.setInterval((function () {
        var lastUrl = document.location.href;
        return function () {
            var newUrl = document.location.href;
            if (newUrl !== lastUrl) {
                lastUrl = newUrl;
                refresh();
            }
        };
    }()), 1000);
}());
