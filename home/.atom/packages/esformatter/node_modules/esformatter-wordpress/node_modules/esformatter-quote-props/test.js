'use strict';

var assert = require('assert');

var mocha = require('mocha');
var esformatter = require('esformatter');

var quotePropsPlugin = require('./');

esformatter.register(quotePropsPlugin);

mocha.describe('quote props plugin', function() {
	mocha.it('should remove quotes around properties', function() {
		// Given.
		var codeStr = "var obj = {\
			'dropDown': 'setField'\
		}";

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, 'var obj = {\n' +
			"  dropDown: 'setField'\n" +
		'}');
	});

	mocha.it('should remove quotes in compound data', function() {
		// Given.
		var codeStr = "var obj = {\
			'dropDown': 'setField',\
			'button': 'clickButton',\
			'field': 'setField',\
			'fields': 'setField',\
			'hybridField': 'setField',\
			'state': 'setState'\
		}";

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, 'var obj = {\n' +
			"  dropDown: 'setField',\n" +
			"  button: 'clickButton',\n" +
			"  field: 'setField',\n" +
			"  fields: 'setField',\n" +
			"  hybridField: 'setField',\n" +
			"  state: 'setState'\n" +
		'}');
	});

	mocha.it('should remove quotes in mixed compound data', function() {
		// Given.
		var codeStr = "var t = {\
			'subject': subject,\
			data: null,\
            777: true\
		};";

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, 'var t = {\n' +
			'  subject: subject,\n' +
			'  data: null,\n' +
            '  777: true\n' +
		'};');
	});
});
