var remote = require('electron').remote;
var sessionArray = remote.getGlobal("sessionArray");
var curOpenSession = remote.getGlobal("curOpenSession");
var sessionOnline = remote.getGlobal("sessionOnline"); //online session
var sessionFromName = remote.getGlobal("sessionFromName");
var sessions = remote.getGlobal("sessions");
var sessionLog = remote.getGlobal("sessionLog");