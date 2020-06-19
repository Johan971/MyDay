
/*______________________REQUEST FUNCTIONS_____________________________*/

function getReq(pathApi, callback) {

  var xhr = new XMLHttpRequest()

  xhr.open("get", pathApi)
  xhr.send();


  xhr.onreadystatechange = (event) => {
    if (xhr.readyState == 4) {
      //console.log(xhr.response)
      var data = JSON.parse(xhr.response);
      callback(data);
      ///var date = new Date(jsonResponse[0]["timeStamp"]*1000) test date
      ///console.log(date);

    }
  }
}

function postReq(pathApi, obj) {

  var xhr = new XMLHttpRequest();

  xhr.open("POST", pathApi, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(obj));

  console.log("posted" + JSON.stringify(obj));
}

