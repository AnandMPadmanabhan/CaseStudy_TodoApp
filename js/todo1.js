$(document).ready(function () {
  if (localStorage.getItem('user')) {
    fetchdata().then(function () {
      counter().then(function (c) {
        alert("Congrats. 5 Tasks have been Successfully Completed")
        $("#completed").append(`<table id="comp-tasks" class="table table-striped table-bordered"><tr><th>Completed Tasks</th></tr>`)
        for(let i=0;i<completed.length;i++){
          $("#comp-tasks").append(`<tr><td>${completed[i]}</td></tr>`)
        }
        $("#comp-tasks").append(`</table>`)
      })
    })
  }
  else {
    $(location).attr('href', window.location.origin+'/index.html')
  }
  $('#logout').click(function () {
    localStorage.removeItem('user');
    $(location).attr('href', window.location.origin+'/index.html')
  })

});

var completed = []
function fetchdata() {
  return new Promise(function (resolve, reject) {

    var xhttp = new XMLHttpRequest()

    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true)
    xhttp.send()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText)
        console.log("Here")
        var table = `<table id="todo-table" class="table table-striped table-bordered"><tr><th>Status</th><th>Task</th></tr>`;
        for (let i = 0; i < response.length; i++) {
          var uid = "";
          var id = 0;
          var title_res = "";
          var status_res = "";
          var title_res = response[i].title;
          var status_res = response[i].completed;
          var id = response[i].id;
          if (status_res) {
            table += `<tr><td><input type="checkbox" checked disabled/></td><td>${title_res}</td></tr>`;
          }
          else {
            table += `<tr id=${id}"><td><input type="checkbox" id="todo-check"/></td><td class="row-data">${title_res}</td></tr>`;
          }
        }
        document.getElementById("todo-data").innerHTML = table + "</table>";
        resolve()
      }
    }

  })


}

function counter() {

  return new Promise(function (resolve, reject) {
    var count = 0

    const btn = document.querySelectorAll('#todo-check');
    btn.forEach((chk) => {
      chk.addEventListener('change', (event) => {
        console.log("Here" + count)
        if (event.currentTarget.checked) {
          var rowId = event.target.parentNode.parentNode.id
          count++
          var data = document.getElementById(rowId).querySelectorAll(".row-data");
          var name = data[0].innerHTML;
          completed.push(name)
          console.log(completed)
          if (count == 5) {
            resolve(completed)
          }
        }
        else {
          count--
          var rowId = event.target.parentNode.parentNode.id
          var data = document.getElementById(rowId).querySelectorAll(".row-data");
          var name = data[0].innerHTML;
          const index = completed.indexOf(name);
          console.log(index)
          if (index > -1) {
            completed.splice(index, 1);
          }
          console.log(completed)
        }
      })
    })

  })
}

function getCompleted(e) {
  var rowId = e.id;
  var data = document.getElementById(rowId).querySelectorAll(".row-data");
  var name = data[0].innerHTML;
  completed.push(name)
  console.log(completed)
}