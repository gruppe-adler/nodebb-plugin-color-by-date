var
    _ = require('underscore'),
    titleToTimestamp = _.memoize(function (title) {
        var matches = title.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})\s/);
        if (!matches) {
            return 0;
        }
        return parseInt((new Date(matches[1])).getTime() / 1000, 10);
    });

module.exports.colorTopic = function (data, cb) {

    data.category.topics.forEach(function (topic) {
        topic.referencetime = titleToTimestamp(topic.title);
    });

    data.category.topics = data.category.topics.sort(function (a, b) {
        return b.referencetime - a.referencetime;
    });

    cb(null, data);
};

