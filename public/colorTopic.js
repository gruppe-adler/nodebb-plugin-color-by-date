(function colorTopic() {
    var titleToTimestamp = function (title) {
        var matches = title.trim().match(/([0-9]{4}-[0-9]{2}-[0-9]{2})([^0-9a-z])/i);
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
        var topicRows = document.querySelectorAll('.category-item');
        Array.prototype.forEach.call(topicRows, function (categoryItem) {
            var meta = categoryItem.querySelector('meta[itemprop="name"], .topic-title');
            var topicTime = titleToTimestamp(meta.getAttribute('content') || meta.textContent || '');
            var dataRelativeTime = '';
            var timeDiff = now - topicTime;

            if (topicTime === 0) {
                dataRelativeTime = 'now';
            } else if (timeDiff < 86400) {
                dataRelativeTime = 'future';
            } else if (timeDiff > 86400) {
                dataRelativeTime = 'past'
            }

            categoryItem.setAttribute('data-relative-time', dataRelativeTime);
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
