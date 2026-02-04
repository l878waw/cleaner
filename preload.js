const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    scanSystem: () => ipcRenderer.invoke('scan-system'),
    cleanItem: (path) => ipcRenderer.invoke('clean-item', path),
});
