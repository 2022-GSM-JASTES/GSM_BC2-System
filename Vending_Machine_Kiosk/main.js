const { app, BrowserWindow, ipcMain } = require('electron');
const exec = require('child_process').exec;

ipcMain.on('Pay',(event, arg) => {
    console.log(arg);
    exec('python ./system/tag.py', (err,out,stderr) => {
        console.log(out);
        event.sender.send('res', out);
    })

})

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 480,
        webPreferences: {
                        nodeIntegration: true,
                        contextIsolation: false
                    }
    });

    win.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});