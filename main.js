const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const execPromise = util.promisify(exec);

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        titleBarStyle: 'hiddenInset',
        backgroundColor: '#121212',
        show: false, // Don't show until ready
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers
ipcMain.handle('scan-system', async () => {
    try {
        // Scan standard cache directories
        // Note: In production we might need a more robust way to handle permissions
        // For now we scan user-accessible directories
        const userHome = process.env.HOME;
        const cacheDir = path.join(userHome, 'Library/Caches');
        const logsDir = path.join(userHome, 'Library/Logs');

        // Helper to get size
        const getSize = async (dir) => {
            try {
                const { stdout } = await execPromise(`du -sh "${dir}" | cut -f1`);
                return stdout.trim();
            } catch (e) {
                return "N/A";
            }
        };

        const cacheSize = await getSize(cacheDir);
        const logsSize = await getSize(logsDir);

        return {
            success: true,
            data: [
                { name: "User Cache", path: cacheDir, size: cacheSize, type: "cache" },
                { name: "User Logs", path: logsDir, size: logsSize, type: "logs" }
            ]
        };
    } catch (error) {
        console.error("Scan error:", error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('clean-item', async (event, itemPath) => {
    try {
        // SAFETY CHECK: Only allow deleting standard cache paths
        if (!itemPath.includes('Library/Caches') && !itemPath.includes('Library/Logs')) {
            throw new Error("Safety Block: Attempted to delete outside allowed directories.");
        }

        await execPromise(`rm -rf "${itemPath}"/*`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});
