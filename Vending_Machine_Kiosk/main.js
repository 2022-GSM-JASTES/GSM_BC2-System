const { app, BrowserWindow, ipcMain } = require('electron');
const exec = require('child_process').exec;

ipcMain.on('Pay',(event, arg) => {
    console.log(arg);
    exec('python ./system/tag.py', (err,out,stderr) => {
        out = out.replace(/\n/g, ""); //개행문자 제거
        let price = parseInt(arg.price.replace(",","").replace("₩","")); //원화 표시 제거
        let money = JSON.parse(out);

        if(out != 'error' && price > money.account) //잔액 부족 로직
            event.sender.send('res', 'no money');
        else{
            let account = money.account - price;

            let block = {
                'id' : money.email,
                'money' : account,
                'menu' : arg.menu,
                'price' : price,
                'quantity' : arg.cnt
            };

            console.log(block);
            event.sender.send('res', out);
        }
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