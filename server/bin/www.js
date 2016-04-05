require('dotenv').load();

var app = require('../app');
// 80 is for production
// 3001 is for dev
var port = process.env.PORT || 80;

// if(process.env.NODE_ENV == 'dev'){
	app.listen(port, function(){
		console.log('Server started on port %s', port);
		// break;
	});	
// }

