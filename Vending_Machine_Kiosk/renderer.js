const { ipcRenderer } = require('electron');

window.onload = function() {
    function totalPrice(){
        let cnt = document.getElementById('cnt').innerText;

        const price = 1500 * cnt;
        const total_price = price.toLocaleString();

        document.getElementById('total_price').innerText = "₩" + total_price; 
    }
    document.getElementById('plus').addEventListener('click',() => {
        const cnt = document.getElementById('cnt');

        let num = cnt.innerText;
        if (num == 5) {
            alert("최대 수량입니다.");
        }
        else{
            num = parseInt(num) + 1;
            cnt.innerText = num;
            totalPrice();
        }
    });
    document.getElementById('minus').addEventListener('click', () => {
        const cnt = document.getElementById('cnt');

        let num = cnt.innerText;
        if (num == 1) {
            alert("최저 수량입니다.");
        }
        else{
            num = parseInt(num) - 1;
            cnt.innerText = num;
            totalPrice();
        }
    });
    document.getElementById('modal_btn').addEventListener('click', () => {
        document.querySelector('.NFC_reload').style.display = 'none';
        document.querySelector('.NFC_ready').style.display = 'none';
        document.querySelector('.No_money').style.display = 'none';
        document.querySelector('.Pay_success').style.display = 'none';
        document.querySelector('.modal_frame').style.display = 'block';
        document.getElementById('frame').style.background = 'rgba(177,177,177,1)';
        document.getElementById('cnt').innerText = 1; //reset Cnt
        totalPrice();
    });
    document.getElementById('modal_close').addEventListener('click', () => {
        document.querySelector('.modal_frame').style.display = 'none';
        document.getElementById('frame').style.background = 'rgba(255,255,255,1)';
    });
    
    document.getElementById('buy').addEventListener('click', () => {
        document.querySelector('.order').style.display = 'none';
        document.querySelector('.NFC_ready').style.display = 'block';

        let PayInfo = {'price' : document.getElementById('total_price').innerText,
                        'cnt' : document.getElementById('cnt').innerText};

        ipcRenderer.send('Pay', PayInfo);
        ipcRenderer.on('res', (event, arg) => {
            console.log(arg);

            if(arg == 'error\n'){ //태그 오류
                document.querySelector('.NFC_ready').style.display = 'none';
                document.querySelector('.NFC_reload').style.display = 'block';
                setTimeout(() => {
                    location.href = "./index.html";
                }, 5000);
                setTimeout(() => {
                    document.querySelector('.NFC_reload').style.display = 'none';
                    document.querySelector('.modal_frame').style.display = 'none';
                }, 10000);
            }

            else if(arg == 'no money'){ //돈 부족
                document.querySelector('.NFC_ready').style.display = 'none';
                document.querySelector('.NFC_reload').style.display = 'none';
                document.querySelector('.No_money').style.display = 'block';
                setTimeout(() => {
                    location.href = "./index.html";
                }, 5000);
                setTimeout(() => {
                    document.querySelector('.No_money').style.display = 'none';
                    document.querySelector('.modal_frame').style.display = 'none';
                }, 10000);
            }

            else{ //결제 성공
                document.querySelector('.NFC_ready').style.display = 'none';
                document.querySelector('.NFC_reload').style.display = 'none';
                document.querySelector('.Pay_success').style.display = 'block';
                setTimeout(() => {
                    location.href = "./index.html";
                }, 5000);
                setTimeout(() => {
                    document.querySelector('.Pay_success').style.display = 'none';
                    document.querySelector('.modal_frame').style.display = 'none';
                }, 10000);
            }

        })
    })
};