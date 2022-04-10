module.exports = function override(config, env) {
	return Object.assign({}, config, {
		optimization: {
			minimize: false,
		},
	});
};
