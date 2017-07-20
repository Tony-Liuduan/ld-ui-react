/**
 * Created by huangchengwen on 17/2/27.
 */
module.exports = function(imitator) {
    // /
	imitator({
        action: 'get',
		url: '*',
        result: {
            'data': 'bugfix'
        }
	});

	// /test
	imitator({
		url: '/test',
		result: imitator.file('./data/test.json')
	});
}
