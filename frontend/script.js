const username=localStorage.getItem("username");

if(username){
    showLoggedInuser(username);
}

function showLoggedInuser(name){
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("signLink").style.display = "none";
    document.getElementById("welcomuser").style.display = "inline";
    document.getElementById("logoutLink").style.display = "inline";
    document.getElementById("welcomuser").textContent = `Hello, ${name}`;
}

function logout(){
     localStorage.removeItem("username");
    location.reload();
}


