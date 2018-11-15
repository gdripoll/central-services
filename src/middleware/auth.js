//
// Auth
//
var fs = require('fs')

class Auth {

    /**
     * Constructor
     */
    constructor() {
        this.logHead = `{Auth:`
        var logFunc=`${this.logHead}constructor}`
        console.log(logFunc)
    }

    /**
     * Setup de autorizacion
     * @param {string} path 
     */
    setup(path) {
        var logFunc=`${this.logHead}setup}`
        this.config_path = path
        console.log(logFunc,`config [${this.config_path}]`)

        this.config=JSON.parse(fs.readFileSync(`${path}/config.json`,'utf8'))

        // console.log(logFunc,this.config)
    }

    /**
     * MiddleWare 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    go(req, res, next) {
        console.log(this)
        var logFunc=`# >----- {Auth:go}`
        console.log(logFunc,`url [${req.originalUrl}]`);
        next();
        console.log('# <-----');
    }

}

module.exports = new Auth()