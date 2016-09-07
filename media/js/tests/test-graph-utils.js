var assert = require('assert');
var Treegrowth = require('../src/treegrowth/graph-utils.js').Treegrowth;

describe('parseDate', function() {
    it('should parse dates based on the expected format', function() {
        var dates = [
            '1995-10-31 01:00:00',
            '2016-09-01 01:00:00',
            '2016-09-29 01:48:33',
            '2017-03-07 08:20:00'
        ];

        for (var i = 0; i < dates.length; i++) {
            assert.strictEqual(
                Date.parse(dates[i]),
                Treegrowth.parseDate(dates[i]));
        }
    });
});

describe('splitData', function() {
    it('should accept an empty array', function() {
        assert.strictEqual(0, Treegrowth.splitData([]).length);
    });

    it('should produce the expected output', function() {
        assert.deepEqual([
            [
                [ 100, 2 ],
                [ 101, 3 ],
                [ 102, 6 ],
                [ 103, 9 ]
            ],
            [
                [ 100, 4 ],
                [ 101, 1 ],
                [ 102, 2 ],
                [ 103, 3 ]
            ]
        ], Treegrowth.splitData([
            [ 100, 2, 4 ],
            [ 101, 3, 1 ],
            [ 102, 6, 2 ],
            [ 103, 9, 3 ]
        ]));
    });
});
