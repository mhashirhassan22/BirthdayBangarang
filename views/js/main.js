
function openNav(){
    document.getElementById('nav').style.width="100%";
}
function closeNav(){
    document.getElementById('nav').style.width="0%";
}

function openNav(){
    document.getElementById('nav').style.height="100%";
}
function closeNav(){
    testing();
    document.getElementById('nav').style.height="0%";
}

function openNav2(){
    document.getElementById('nav2').style.width="100%";
    document.getElementById('nav').style.height = "0%";


}
function closeNav2(){
    document.getElementById('nav2').style.width="0%";
    document.getElementById('nav3').style.display="block";

}
function openNav2(){
    document.getElementById('nav2').style.height="100%";
}
function closeNav2(){
    document.getElementById('nav2').style.height="0%";
}

function testing(){
    if(logged_in){
        document.getElementById("login_btn").style.display="none";
        document.getElementById("logout_btn").style.display="block";
        logged_in = !logged_in;
    }
    else{
        document.getElementById("login_btn").style.display="block";
        document.getElementById("logout_btn").style.display="none";
        logged_in = !logged_in;
    }

}
