const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv);
	/*
	  resolve victory-native as victory for the Web app
	  https://formidable.com/open-source/victory/docs/faq/#expo-web-apps-that-use-victory-native
	*/
	config.resolve.alias['victory-native'] = 'victory';

	return config;
};