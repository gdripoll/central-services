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
        var logFunc = `${this.logHead}constructor}`
        console.log(logFunc)
    }

    /**
     * Setup de autorizacion
     * @param {string} path 
     */
    setup(path) {
        var logFunc = `${this.logHead}setup}`
        this.config_path = path
        console.log(logFunc, `config [${this.config_path}]`)

        this.config = JSON.parse(fs.readFileSync(`${path}/config.json`, 'utf8'))

        // console.log(logFunc,this.config)
        return this
    }

    /**
     * MiddleWare 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    go(req, res, next) {
        var logFunc = `${this.logHead}go}`
        console.log('\n\n# >-----');
        console.log(logFunc, `url [${req.originalUrl}]`);

        if (!req.session.views) req.session.views = 0
        req.session.views++

        if (this.checkUrl(req.originalUrl)) {
            next()
        } else {

            if (req.session.logged) {
                next()
            } else {
                console.log('### Redirecting...');
                res.redirect('/users/login')
                console.log('### Redirected.');
            }

        }
        console.log(logFunc, `session=`, req.session)
        console.log('# <-----');
    }

    checkUrl(url) {
        try {
            var logFunc = `${this.logHead}checkUrl}`
            // CHECK TOKEN
            var data = this.config['auth'];
            var segments = url.split('/')
            segments.shift() // no el primero
            //
            // ACCESS Check
            console.log(logFunc, `url=[${url}] segments=[${segments}]`)
            var segment_tokens = this.buildBubbleTokens(segments);
            console.log(logFunc, 'segments =', segment_tokens)
            if (data['default-access'] == 'allow') {
                console.log(logFunc, `[allow]`)
                if (!data['deny'].includes('none')) {
                    return !this.anyRouteInRoutes(segment_tokens, data['deny']) // si esta prohibido
                }
                return true // else, admito todo
            } else if (data['default-access'] == 'deny') {
                console.log(logFunc, `[deny]`)
                return this.anyRouteInRoutes(segment_tokens, data['allow']) // si no esta permitido
            } else {
                var err = new Exception("Internal missconfiguration -- Please report to admin.");
                err.outputJson();
                die;
            }
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Builds tokens taking as a base the parameter info
     *
     * @param array $segments
     * @return array contains the tokens
     */
    buildBubbleTokens(segments) {
        var logFunc = `${this.logHead}buildBubbleTokens}`
        var res = [];
        var last = segments.length - 1;
        for (var i = 0; i < segments.length; i++) {
            var segment = segments.slice(0, i + 1).join('.');
            // console.log(i, last, segment)
            if (segment) {
                if (i != last) {
                    res.push(`${segment}.*`);
                } else {
                    res.push(segment)
                }
            }
        }
        console.log(logFunc, 'segments =', res)
        return res;
    }

    /**
     * Searches routes into the defined list of routes
     *
     * @param array $proposed routes to search for
     * @param array $routes list of defined routes
     * @return boolean true if at least one proposed route is found into the defined list of routes, false otherwise
     */
    anyRouteInRoutes(proposed, routes) {
        var logFunc = `${this.logHead}anyRouteInRoutes}`
        console.log(logFunc, `proposed=[${proposed}] routes=[${routes}]`)
        for (var i in proposed) {
            var prop = proposed[i]
            console.log(logFunc, `check=[${prop}]`)
            if (routes.includes(prop)) {
                console.log(logFunc, `ok=[${prop}]`)
                return true;
            }
        }
        // Logger::debug("MWARE|Authenticate:anyRouteInRoutes not found", [implode(" | ", $proposed), implode(" | ", $routes)]);
        return false;
    }

    login(req, res, user, pass) {
        var logFunc = `${this.logHead}login}`
        req.session.logged=true
        req.session.auth={
            user:user,
            pass:pass
        }
        console.log(req.session.auth)
        return true
    }

    logout(req,res){
        var logFunc = `${this.logHead}logout}`
        req.session.logged=false
        req.session.auth=null
        console.log(req.session.auth)
        return true
    }
}


module.exports = new Auth()