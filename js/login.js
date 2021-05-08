function getCredentials(CheckCredentials){
    var username = document.getElementById("uname").value
    var password = document.getElementById("pwd").value
    return CheckCredentials(username,password)
}

function validate(uname,pwd){
   if(uname=="admin"&&pwd=="12345"){
       localStorage.setItem('user',true)
       return true
   }
   else{
       document.getElementById("error").innerText="Please enter valid credentials"
       return false
   }
}

function OnClickListener(){
    return getCredentials(validate)
    
}