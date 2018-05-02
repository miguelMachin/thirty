function init(){
  seeRequests();
  searchAllMessages();
}

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else { 
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className = 
        x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
}

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

function validation(){
    let isOk = true;
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let paswd = document.getElementById("passwd");
    let passwdRepe = document.getElementById("passwdRepe");
    let city = document.getElementById("city");
    if (name.value == "" ){
      name.style.borderColor= "red";
      isOk = false;
    }
    if (email.value == "" ){
      email.style.borderColor= "red";
      isOk = false;
    }
    if (passwd.value == "" ){
      passwd.style.borderColor= "red";
      isOk = false;
    }
    if (passwdRepe.value == "" || passwdRepe.value != paswd.value ){
      passwdRepe.style.borderColor= "red";
      isOk = false;
    }
    if (city.value == "" ){
      city.style.borderColor= "red";
      isOk = false;
    }
    if (isOk == false){

      document.getElementById("message").innerHTML = "<span style=\"color:red\">Los campos no pueden estar vacios y las contraseñas deben ser iguales</span>";
    }
    return isOk;
  }

  function updateName(){
    let name = document.getElementById("name");
    name.style.borderColor="#ced4da";
    if (name.value == ""){
        name.style.borderColor="red";
       // document.getElementById("errSpan").innerHTML = "Los campos no pueden estar vacios";
        document.getElementById("updateErrorName").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">Los campos no pueden estar vacios</span>";
    }else{
      let data = {name:name.value};
      $.ajax({
            type: "POST",
            url: "updateName",
            data: data,
            success: function(res){
                document.getElementById("updateErrorName").innerHTML = res;
                if (!res.includes("error")){
                   document.getElementById("showName").innerHTML = name.value;
                }
            }
      });
    }
  }

  function updatePasswd(){
    let oldPasswd = document.getElementById("oldPasswd");
    let newPasswd = document.getElementById("newPasswd");
    let repeatPasswd = document.getElementById("repeatPasswd");

    oldPasswd.style.borderColor="#ced4da";
    newPasswd.style.borderColor="#ced4da";
    repeatPasswd.style.borderColor="#ced4da";
    
    if(oldPasswd.value == "" || newPasswd.value == "" || repeatPasswd.value == "" ){
      oldPasswd.style.borderColor="red";
      newPasswd.style.borderColor="red";
      repeatPasswd.style.borderColor="red";
      document.getElementById("updateErrorPasswd").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">Los campos no pueden estar vacios</span>";
    }else{
        if (newPasswd.value != repeatPasswd.value){
          repeatPasswd.style.borderColor="red";
          document.getElementById("updateErrorPasswd").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">Las contraseñas deben ser iguales</span>";
        }else{
           let data = {oldPasswd:oldPasswd.value,newPasswd:newPasswd.value,repeatPasswd:repeatPasswd.value};
            $.ajax({
            type: "POST",
            url: "updatePasswd",
            data: data,
            success: function(res){
              document.getElementById("updateErrorPasswd").innerHTML = res;
            }
          });
        }
    }
  }
  
  function changeForm(id){
    let opt = document.getElementsByTagName("li");
    for(let i = 0; i < opt.length; i++){
      opt[i].className = "liMenu"
    }
    let forModifyPasswd = document.getElementById("forModifyPasswd");
    let forModifyName = document.getElementById("forModifyName");
    let forModifyMood = document.getElementById("forModifyMood");
    
    if(id == "liName"){
      console.log("liName");
      forModifyName.style.visibility = "visible";
      forModifyName.style.display = "block";
      forModifyPasswd.style.visibility = "hidden";
      forModifyPasswd.style.display = "none";
      forModifyMood.style.visibility = "hidden";
      forModifyMood.style.display = "none";
      formModifyAvatar.style.visibility = "hidden";
      formModifyAvatar.style.display = "none";
      let liName = document.getElementById("liName");
      liName.className = "liMenuSelect";
    }
     if(id == "liPasswd"){
      forModifyName.style.visibility = "hidden";
      forModifyName.style.display = "none";
      forModifyPasswd.style.visibility = "visible";
      forModifyPasswd.style.display = "block";
      forModifyMood.style.visibility = "hidden";
      forModifyMood.style.display = "none";
      formModifyAvatar.style.visibility = "hidden";
      formModifyAvatar.style.display = "none";
      let liPasswd = document.getElementById("liPasswd");
      liPasswd.className = "liMenuSelect";
    }
     if(id == "liMood"){
      forModifyName.style.visibility = "hidden";
      forModifyName.style.display = "none";
      forModifyPasswd.style.visibility = "hidden";
      forModifyPasswd.style.display = "none";
      forModifyMood.style.visibility = "visible";
      forModifyMood.style.display = "block";
      formModifyAvatar.style.visibility = "hidden";
      formModifyAvatar.style.display = "none";
      let liMood = document.getElementById("liMood");
      liMood.className = "liMenuSelect";
    }
    if(id == "liAvatar"){
      forModifyName.style.visibility = "hidden";
      forModifyName.style.display = "none";
      forModifyPasswd.style.visibility = "hidden";
      forModifyPasswd.style.display = "none";
      forModifyMood.style.visibility = "hidden";
      forModifyMood.style.display = "none";
      formModifyAvatar.style.visibility = "visible";
      formModifyAvatar.style.display = "block";
      let liAvatar = document.getElementById("liAvatar");
      liAvatar.className = "liMenuSelect";
    }
  }

  function updateMood(){
    let mood = document.getElementById("mood");
    mood.style.borderColor="#ced4da";
    if (mood.value == ""){
        mood.style.borderColor="red";
       document.getElementById("updateErrorMood").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">Los campos no pueden estar vacios</span>";
    }else{
      let data = {mood:mood.value};
      $.ajax({
            type: "POST",
            url: "updateMood",
            data: data,
            success: function(res){
                document.getElementById("updateErrorMood").innerHTML = res;
                if (!res.includes("error")){
                  let moodT = mood.value.split(" ");
                  for (let i = 0; i < moodT.length; i++) {
                      if(moodT[i].includes("http") || moodT[i].includes("https")){
                          moodT[i] = "<a href="+moodT[i]+">"+moodT[i]+"</a>";
                      }    
                  }
                  document.getElementById("showMood").innerHTML = moodT;
                }
            }
      });
    }
  }
  
  function updateAvatar(){
    let avatar = document.getElementById("avatar");
    if (avatar.value == "" ||  (avatar.value.includes("jpg") == false && avatar.value.includes("jpeg") == false)){
        document.getElementById("updateErrorAvatar").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">El campo no puede estar vacio y debe ser jpg o jpeg</span>";
    }else{
     let formData = new FormData($("#formUpload")[0]);
    //formData = {avatar:avatar.value};
    $.ajax({
              type: "POST",
              url: "updateAvatar",
              data: formData,
              contentType: false,
              processData: false,

              success: function(res){
                  document.getElementById("updateErrorAvatar").innerHTML = res;
                  if (!res.includes("error")){
                     $.ajax({type: "POST",
                            url: "changeAvatar",
                            data: formData,
                            contentType: false,
                            processData: false,
                            success: function(res){
                                document.getElementById("img").innerHTML = res;
                            }
                     });
                  }
              }
        });
      }
  }

function searchAll(){
      $.ajax({type: "POST",
      url: "searchAll",
      contentType: false,
      processData: false,
      success: function(res){
        document.getElementById("resul").innerHTML = res; 
      }
    });
}

function searchPerson(name){
  console.log("esada");
  console.log(name);
    let data = {name:name};
    $.ajax({
      type: "post",
      url: "searchPerson",
      data: data,
    success: function(res){
      document.getElementById("resul").innerHTML = res; 
    }
  });
}

function perfilPerson(id){
    $.ajax({type: "get",
    url: "perfilPerson",
    data: id,
    contentType: false,
    processData: false,
    success: function(res){
      document.getElementById("resul").innerHTML = res; 
    }
  });
}

function addFriendPeding(id){
  let data = {id:id};
  console.log(id);
  $.ajax({
    type: "POST",
    url: "addFriendPeding",
    data: data,
    success: function(res){
        console.log("add");
    }
  });
}

function removeFriendPeding(id){
  let data = {id:id};
  $.ajax({
    type: "POST",
    url: "removeFriendPeding",
    data: data,
    success: function(res){
      console.log("entre");
      seeRequests();
    }
  });
}

function removeFriendPerfil(id){
  let data = {id:id};
  console.log(id);
  $.ajax({
    type: "POST",
    url: "removeFriend",
    data: data,
    success: function(res){
      perfilPerson(id);
    }
  });
}

function removeFriend(id){
  let data = {id:id};
  console.log(id);
  $.ajax({
    type: "POST",
    url: "removeFriend",
    data: data,
    success: function(res){
      searchAll();
    }
  });
}



function seeRequests(){
  $.ajax({
    type: "POST",
    url: "seeRequests",
    success: function(res){
        document.getElementById("seeRequests").innerHTML = res;
    }
  });
}

function addFriend(id){
  let data = {id:id};
  $.ajax({
    type: "POST",
    url: "addFriend",
    data: data,
    success: function(res){
      seeRequests();
    }
  });
}

function perfilPerson(id){
  let data = {id:id};
  $.ajax({
    type: "POST",
    url: "perfilPerson",
    data: data,
    success: function(res){
      document.getElementById("body").innerHTML = res;
      searchAllMessagesPerfil(id);
    }
  });
}

function searchAllMessages(){
  document.getElementById("messageHidden").style.display="none";
  $.ajax({
    type: "POST",
    url: "searchAllMessages",
    success: function(res){
      document.getElementById("messages").innerHTML = res;

    }
  });
}

function searchAllMessagesPerfil(id){
  let data = {id:id};
 $.ajax({
    type: "POST",
    url: "searchAllMessagesPerfil",
    data:data,
    success: function(res){
      document.getElementById("messageHidden").style.display="none";
      document.getElementById("messages").innerHTML = res;

    }
  });
}

function addMessage(){
    let text = document.getElementById("text");
    let imgUpload = document.getElementById("imgUpload");
    let validate = true;
    console.log(text.value);
    console.log(imgUpload.value);
    if (text.value == "" && imgUpload.value == ""){
      document.getElementById("erroText").innerHTML="Debe contener algo el mensaje";
      text.style.borderColor="red";
    }else{
      if(text.value != "" && imgUpload.value != ""){
        if ((imgUpload.value.includes("jpg") == false && imgUpload.value.includes("jpeg") == false)){
          document.getElementById("erroText").innerHTML="La imagen debe ser jpeg o jpg";
          text.style.borderColor="red";
          validate = false;
        } 
      }
      if (text.value == "" && imgUpload.value != ""){
        if ((imgUpload.value.includes("jpg") == false && imgUpload.value.includes("jpeg") == false)){
          document.getElementById("erroText").innerHTML="La imagen debe ser jpeg o jpg";
          text.style.borderColor="red";
          validate = false;
        }
      }
      if(validate){
        text.style.borderColor="#ced4da";
        document.getElementById("erroText").innerHTML="";
        let formData = new FormData($("#formMessage")[0]);
        $.ajax({
          type: "POST",
          url: "addMessage",
          data: formData,
          contentType: false,
          processData: false,
          success: function(res){
            if (res.ok == "ok"){
              searchAllMessages()
            }
          }
        });
      }
    }
  }

function addFavorites(id){
  let data = {id:id};
  $.ajax({type: "POST",
    url: "addFavorites",
    data: data,
    success: function(res){
      if (res.ok == "ok"){
        searchAllMessages()
      }
    }
  });
}

function removeFavorites(id){
  let data = {id:id};
  $.ajax({type: "POST",
    url: "removeFavorites",
    data: data,
    success: function(res){
      if (res.ok == "ok"){
        searchAllMessages()
      }
    }
  });
}