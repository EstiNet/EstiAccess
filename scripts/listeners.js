require('electron').ipcRenderer.on('updateConsole', (event, message) => {
    updateLog();
});