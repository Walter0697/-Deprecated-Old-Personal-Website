import $ from 'jquery';
import apikeyData from '../json/apikey.json';

var Airtable = require('airtable');

const BASE = apikeyData.airtable_base;
const API_KEY = apikeyData.airtable_key;

var base = new Airtable({apiKey: API_KEY}).base(BASE);

export function sendingFeedback(data)
{
	//getting ip address so I have some idea about who you are
	$.getJSON('https://ipinfo.io/json', function(ipdata) {
	  airtable_create({ "Suggestion": data, "Time": new Date(), "ipAddress": ipdata.ip, "City": ipdata.city });
	});
}

function airtable_create(data)
{
	base('Suggestions').create(data, function(err, record) {
		if (err) {console.error(err); return;}
	});
}