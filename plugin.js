var
    _ = require('underscore'),
    titleToTimestamp = _.memoize(function (title) {
        var matches = title.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})[^a-z0-9]/i);
        if (!matches) {
            return 0;
        }
        return parseInt((new Date(matches[1])).getTime() / 1000, 10);
    });

module.exports.colorTopic = function (data, cb) {

    var now = parseInt((new Date()).getTime() / 1000, 10);

    data.topics.forEach(function (topic) {
        topic.referencetime = titleToTimestamp(topic.title) || topic.lastposttime;
    });
    data.topics = data.topics.sort(function (a, b) {
        if (b.pinned && !a.pinned) {
            return 1;
        } else if (!b.pinned && a.pinned) {
            return -1;
        }
        return b.referencetime - a.referencetime;
    });

    cb(null, data);
};

