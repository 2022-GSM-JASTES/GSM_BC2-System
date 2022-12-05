window.onload = function() {
    function onClick() {
        document.querySelector('.modal_frame').style.display = 'block';
        document.getElementById('frame').style.background = 'rgba(177,177,177,1)';
    }
    function offClick() {
        document.querySelector('.modal_frame').style.display = 'none';
        document.getElementById('frame').style.background = 'rgba(255,255,255,1)';
    }
    document.getElementById('modal_btn').addEventListener('click', onClick);
    document.getElementById('modal_close').addEventListener('click', offClick);
};