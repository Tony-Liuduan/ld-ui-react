/**
 * Created by huangchengwen on 17/2/27.
 */
module.exports = function(imitator) {
    // /
	imitator({
        action: 'get',
		url: '/',
        result: {
            'data': 'bugfix'
        }
	});

	// /test
	imitator({
		url: '/test',
		result: imitator.file('./data/test.json')
	});

	// /citylist
	imitator({
		url: '/citylist',
		result: imitator.file('./data/citylist.json')
	});

	// /exist/identity

	imitator({
		url: '/exist/identity',
		action: "post",
		result: imitator.file('./data/identity.json')
	});
}
