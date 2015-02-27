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
        return parseInt((ceilingedDiff / maxColorShiftTimediff) * 255, 10);
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
            var rgba = '0, 0, 0, 0';

            if (now - topicTime > 0) {
                rgba = color + ', 0, 0, 0.2';
            } else {
                rgba = '0, 0, ' + color + ', 0.2';
            }

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
