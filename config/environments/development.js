let urlstring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodejs_dev';
module.exports = {
	db: urlstring
}
