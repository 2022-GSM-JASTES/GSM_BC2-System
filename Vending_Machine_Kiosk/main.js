const { app, BrowserWindow, ipcMain } = require('electron');
const exec = require('child_process').exec;
//import fetch from 'node-fetch'
const fetch = require('electron-fetch').default;
//import axios from 'axios'

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

            const block = {
                "email" : money.email,
                "balance" : account,
                "menu" : arg.menu,
                "price" : price,
                "quantity" : Number(arg.cnt)
            };

            const data = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'
              },
              //body: block
              body: `{"email" : "${money.email}","balance" : ${account},"menu" : "${arg.menu}","price" : ${price},"quantity" : ${arg.cnt}}`
            };
            console.log(data)
            fetch('http://10.82.20.0:3000/send', data);

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