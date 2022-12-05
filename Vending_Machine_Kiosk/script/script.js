window.onload = function() {
    function onClick() {
        document.querySelector('.modal_frame').style.display = 'block';
        document.getElementById('frame').style.background = 'rgba(177,177,177,1)';
        document.getElementById('cnt').innerText = 1; //reset Cnt
    }
    function offClick() {
        document.querySelector('.modal_frame').style.display = 'none';
        document.getElementById('frame').style.background = 'rgba(255,255,255,1)';
    }
    function plusCnt(){
        const cnt = document.getElementById('cnt');

        let num = cnt.innerText;
        if (num == 5) {
            alert("최대 수량입니다.");
        }
        else{
            num = parseInt(num) + 1;
            cnt.innerText = num; 
        }
        
    }
    function minusCnt(){
        const cnt = document.getElementById('cnt');

        let num = cnt.innerText;
        if (num == 1) {
            alert("최저 수량입니다.");
        }
        else{
            num = parseInt(num) - 1;
            cnt.innerText = num; 
        }
        
    }
    document.getElementById('plus').addEventListener('click', plusCnt);
    document.getElementById('minus').addEventListener('click', minusCnt);
    document.getElementById('modal_btn').addEventListener('click', onClick);
    document.getElementById('modal_close').addEventListener('click', offClick);
};