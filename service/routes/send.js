var cp = require("child_process"),
    send = function (remote, key) {
        cp.exec("irsend -# 2 -d /dev/lircd1 SEND_ONCE " + remote + " " + key);
    };

module.exports = {
    get: function (req, res) {
	if (!req.query.remote || !req.query.key) {
	    res.send(500);
	} else {
	    send(req.query.remote, req.query.key);
	    res.send(200);
	}
    }
}
