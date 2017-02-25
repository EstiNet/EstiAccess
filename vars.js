const expor = module.exports = {};

expor.sessionArray = [{'name': 'test', 'ip': 'localhost', 'port': '1', 'password': 'help', 'socketid': '0'}];
expor.curOpenSession = -1;
expor.sessionOnline = [];
expor.sessions = [];
expor.sessionLog = [];

expor.getSessionIDFromName = function (name) {
    expor.sessionArray.forEach(function (element) {
        if (element.name == name) {
            return element.socketid;
        }
    });
    return null;
};