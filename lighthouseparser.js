const fs = require('fs');

const propertyMap = [
	'first-contentful-paint',
	'first-meaningful-paint',
	'speed-index',
	'first-cpu-idle',
	'interactive',
	'max-potential-fid'
];

function lighthouseParser(json){
	return propertyMap.reduce((output, key) => {
		output.push(Math.round(json.lighthouseResult.audits[key].numericValue));
		return output;
	}, [
		new Date(json.lighthouseResult.fetchTime), 
		json.lighthouseResult.requestedUrl, 
		json.lighthouseResult.configSettings.emulatedFormFactor
	]);
}

module.exports = lighthouseParser;