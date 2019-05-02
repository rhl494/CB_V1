function countdown(minutes) {

    var seconds = 60;
    function downcount() {
        var counter = document.getElementById("countdown");
        var current_minutes = minutes-1;
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(downcount, 1000);
        } else {
            if(minutes > 1){
                countdown(minutes-1);
            }
        }
        if (minutes === 1 && seconds === 0){
            window.location.replace("/results");
        }
    }
        downcount();
}

