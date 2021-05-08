$(document).ready(function() {
  if(localStorage.getItem('user')){
  $('#todo-click').click(function(evt) {
    fetchdata(evt)
  })
 }
 else{
  $(location).attr('href','http://127.0.0.1:5500/index.html')
 }
 $('#logout').click(function(){
  localStorage.removeItem('user');
  $(location).attr('href','http://127.0.0.1:5500/index.html')
 })

});


function fetchdata(evt){
  evt.preventDefault();
var xhttp =new XMLHttpRequest()
xhttp.onreadystatechange = function(){
    if(this.readyState==4&&this.status==200){
        var response=JSON.parse(this.responseText)
        console.log("Here")
        var table=`<table class="table table-striped table-bordered"><tr><th>Status</th><th>Task</th></tr>`;
        for(let i=0;i<response.length;i++){
            var uid="";
         var id=0;
        var title_res="";
        var status_res="";
          var title_res=response[i].title;
          var status_res= response[i].completed;
          if(status_res){
            table += `<tr><td><input type="checkbox" checked disabled/></td><td>${title_res}</td></tr>`;
          }
          else{
          table += `<tr><td><input type="checkbox" id="todo-check" onclick="myFunction()"/></td><td>${title_res}</td></tr>`;
          }
        }
        document.getElementById("todo-data").innerHTML=table+"</table>";
    }
}
xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true)
xhttp.send()

}

function alert_user(count){
  return new Promise(function(resolve,reject){
      if(count==5){
        resolve()
      }
     else {
       console.log(count)
       reject()  
   }
     
  })
}

function myFunction() {
  var checkboxes = $('input:checkbox:checked').length-90;
  alert_user(checkboxes)
  .then(function(){window.alert("Congrats. 5 Tasks have been Successfully Completed")})
  .catch(function(){console.log("Not 5")})
  
}