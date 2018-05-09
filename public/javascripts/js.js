let isPerfil = false;
function init() {
  seeRequests();
  searchAllMessages();
  seeNotifications();
}

function date(){
  let today = new Date();
  let dd = today.getDate() < 10 ? "0"+today.getDate():today.getDate();
  let mm = today.getMonth()+1 < 10 ? "0"+(today.getMonth()+1):today.getMonth()+1; 
  let yyyy = today.getFullYear();
  today = yyyy+'-'+mm+'-'+dd;
  document.getElementById("birthdate").setAttribute("max", today);
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

function validation() {
  let isOk = true;
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let paswd = document.getElementById("passwd");
  let passwdRepe = document.getElementById("passwdRepe");
  let birthdate = document.getElementById("birthdate");
  let city = document.getElementById("city");
  name.style.borderColor = "#ced4da";
  email.style.borderColor = "#ced4da";
  passwd.style.borderColor = "#ced4da";
  passwdRepe.style.borderColor = "#ced4da";
  birthdate.style.borderColor = "#ced4da";
  city.style.borderColor = "#ced4da";

  if (name.value == "") {
    name.style.borderColor = "red";
    isOk = false;
    document.getElementById("message").innerHTML = "<span style=\"color:red\">Debes escribir un nombre</span>";
    return isOk;
  }
  if (email.value == "") {
    email.style.borderColor = "red";
    isOk = false;
    document.getElementById("message").innerHTML = "<span style=\"color:red\">Debes escribir un correo electrónico</span>";
    return isOk;
  }
  if (passwd.value == "") {
    passwd.style.borderColor = "red";
    isOk = false;
    document.getElementById("message").innerHTML = "<span style=\"color:red\">Indique una contraseña</span>";
    return isOk;
  }
  if (passwdRepe.value == "" || passwdRepe.value != paswd.value) {
    passwdRepe.style.borderColor = "red";
    isOk = false;
    document.getElementById("message").innerHTML = "<span style=\"color:red\">Las contraseñas deben coincidir</span>";
    return isOk;
  }
  if (birthdate.value == ""){
    birthdate.style.borderColor = "red";
    isOk = false;
    document.getElementById("message").innerHTML = "<span style=\"color:red\">Introduce la fecha de nacimiento</span>";
    return isOk;
  }
  if (city.value == "") {
    city.style.borderColor = "red";
    isOk = false;
    document.getElementById("message").innerHTML = "<span style=\"color:red\">Introduce la fecha de nacimiento</span>";
    return isOk;
  }
  return isOk;
}

function updateName() {
  document.getElementById("updateErrorName").style.display= "";
  let name = document.getElementById("name");
  name.style.borderColor = "#ced4da";
  if (name.value == "") {
    name.style.borderColor = "red";
    // document.getElementById("errSpan").innerHTML = "Los campos no pueden estar vacios";
    document.getElementById("updateErrorName").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">Los campos no pueden estar vacios</span>";
  } else {
    let data = { name: name.value };
    $.ajax({
      type: "POST",
      url: "updateName",
      data: data,
      success: function (res) {
        document.getElementById("updateErrorName").innerHTML = res;
        document.getElementById("updateErrorName").style.display="";
        if (!res.includes("error")) {
          document.getElementById("showName").innerHTML = name.value;
        }
      }
    });
  }
}

function updatePasswd() {
  document.getElementById("updateErrorPasswd").style.display= "";
  let oldPasswd = document.getElementById("oldPasswd");
  let newPasswd = document.getElementById("newPasswd");
  let repeatPasswd = document.getElementById("repeatPasswd");

  oldPasswd.style.borderColor = "#ced4da";
  newPasswd.style.borderColor = "#ced4da";
  repeatPasswd.style.borderColor = "#ced4da";

  if (oldPasswd.value == "" || newPasswd.value == "" || repeatPasswd.value == "") {
    oldPasswd.style.borderColor = "red";
    newPasswd.style.borderColor = "red";
    repeatPasswd.style.borderColor = "red";
    document.getElementById("updateErrorPasswd").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">Los campos no pueden estar vacios</span>";
  } else {
    if (newPasswd.value != repeatPasswd.value) {
      repeatPasswd.style.borderColor = "red";
      document.getElementById("updateErrorPasswd").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">Las contraseñas deben ser iguales</span>";
    } else {
      let data = { oldPasswd: oldPasswd.value, newPasswd: newPasswd.value, repeatPasswd: repeatPasswd.value };
      $.ajax({
        type: "POST",
        url: "updatePasswd",
        data: data,
        success: function (res) {
          document.getElementById("updateErrorPasswd").innerHTML = res;
          document.getElementById("updateErrorPasswd").style.display="";
        }
      });
    }
  }
}

function changeForm(id) {
  let opt = document.getElementsByTagName("li");
  for (let i = 0; i < opt.length; i++) {
    opt[i].className = "liMenu"
  }
  let forModifyPasswd = document.getElementById("forModifyPasswd");
  let forModifyName = document.getElementById("forModifyName");
  let forModifyMood = document.getElementById("forModifyMood");

  if (id == "liName") {
    console.log("liName");
    forModifyName.style.visibility = "visible";
    forModifyName.style.display = "block";
    forModifyPasswd.style.visibility = "hidden";
    forModifyPasswd.style.display = "none";
    forModifyMood.style.visibility = "hidden";
    forModifyMood.style.display = "none";
    formModifyAvatar.style.visibility = "hidden";
    formModifyAvatar.style.display = "none";
    document.getElementById("updateErrorName").style.display="none";
    let liName = document.getElementById("liName");
    liName.className = "liMenuSelect";
  }
  if (id == "liPasswd") {
    forModifyName.style.visibility = "hidden";
    forModifyName.style.display = "none";
    forModifyPasswd.style.visibility = "visible";
    forModifyPasswd.style.display = "block";
    forModifyMood.style.visibility = "hidden";
    forModifyMood.style.display = "none";
    formModifyAvatar.style.visibility = "hidden";
    formModifyAvatar.style.display = "none";
    document.getElementById("updateErrorPasswd").style.display="none";
    let liPasswd = document.getElementById("liPasswd");
    liPasswd.className = "liMenuSelect";
  }
  if (id == "liMood") {
    forModifyName.style.visibility = "hidden";
    forModifyName.style.display = "none";
    forModifyPasswd.style.visibility = "hidden";
    forModifyPasswd.style.display = "none";
    forModifyMood.style.visibility = "visible";
    forModifyMood.style.display = "block";
    formModifyAvatar.style.visibility = "hidden";
    formModifyAvatar.style.display = "none";
    document.getElementById("updateErrorMood").style.display="none";
    let liMood = document.getElementById("liMood");
    liMood.className = "liMenuSelect";
  }
  if (id == "liAvatar") {
    forModifyName.style.visibility = "hidden";
    forModifyName.style.display = "none";
    forModifyPasswd.style.visibility = "hidden";
    forModifyPasswd.style.display = "none";
    forModifyMood.style.visibility = "hidden";
    forModifyMood.style.display = "none";
    formModifyAvatar.style.visibility = "visible";
    formModifyAvatar.style.display = "block";
    document.getElementById("updateErrorAvatar").style.display="none";
    let liAvatar = document.getElementById("liAvatar");
    liAvatar.className = "liMenuSelect";
  }
}

function updateMood() {
  document.getElementById("updateErrorMood").style.display= "";
  let mood = document.getElementById("mood");
  mood.style.borderColor = "#ced4da";
  if (mood.value == "" || mood.value.length > 21) {
    mood.style.borderColor = "red";
    document.getElementById("updateErrorMood").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">El campo no puede estar vacío y no puede superar los 20 caracteres</span>";
  } else {
    let data = { mood: mood.value };
    $.ajax({
      type: "POST",
      url: "updateMood",
      data: data,
      success: function (res) {
        document.getElementById("updateErrorMood").innerHTML = res;
        document.getElementById("updateErrorName").style.display="";
        if (!res.includes("error")) {
          let moodT = mood.value.split(" ");
          for (let i = 0; i < moodT.length; i++) {
            if (moodT[i].includes("http") || moodT[i].includes("https")) {
              moodT[i] = "<a href=" + moodT[i] + ">" + moodT[i] + "</a>";
            }
          }
          moodT = moodT.join(" ");
          document.getElementById("showMood").innerHTML = moodT;
        }
      }
    });
  }
}

function updateAvatar() {
  document.getElementById("updateErrorAvatar").style.display= "";
  let avatar = document.getElementById("avatar");
  if (avatar.value == "" || (avatar.value.includes("jpg") == false && avatar.value.includes("jpeg") == false)) {
    document.getElementById("updateErrorAvatar").innerHTML = "<span id=\"errSpan\" class=\"errSpan error \">El campo no puede estar vacio y debe ser jpg o jpeg</span>";
  } else {
    let formData = new FormData($("#formUpload")[0]);
    $.ajax({
      type: "POST",
      url: "updateAvatar",
      data: formData,
      contentType: false,
      processData: false,
      success: function (res) {
        document.getElementById("updateErrorAvatar").innerHTML = res;
        document.getElementById("updateErrorAvatar").style.display="";
        if (!res.includes("error")) {
          $.ajax({
            type: "POST",
            url: "changeAvatar",
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
              document.getElementById("img").innerHTML = res;
            }
          });
        }
      }
    });
  }
}

function searchAll() {
  isPerfil = false;
  $.ajax({
    type: "POST",
    url: "searchAll",
    contentType: false,
    processData: false,
    success: function (res) {
      document.getElementById("resul").innerHTML = res;
    }
  });
}

function searchPerson(name) {
  console.log(name);
  let data = { name: name };
  $.ajax({
    type: "post",
    url: "searchPerson",
    data: data,
    success: function (res) {
      console.log("entre");
      document.getElementById("resul").innerHTML = res;
    }
  });
}

function perfilPerson(id) {
  isPerfil = true;
  $.ajax({
    type: "get",
    url: "perfilPerson",
    data: id,
    contentType: false,
    processData: false,
    success: function (res) {
      document.getElementById("resul").innerHTML = res;
    }
  });
}

function addFriendPeding(id) {
  let data = { id: id };
  $.ajax({
    type: "POST",
    url: "addFriendPeding",
    data: data,
    success: function (res) {
      console.log("add");
    }
  });
}

function removeFriendPeding(id) {
  let data = { id: id };
  $.ajax({
    type: "POST",
    url: "removeFriendPeding",
    data: data,
    success: function (res) {
      console.log("entre");
      seeRequests();
    }
  });
}

function removeFriendPerfil(id) {
  let data = { id: id };
  $.ajax({
    type: "POST",
    url: "removeFriend",
    data: data,
    success: function (res) {
      perfilPerson(id);
    }
  });
}

function removeFriend(id) {
  let data = { id: id };
  $.ajax({
    type: "POST",
    url: "removeFriend",
    data: data,
    success: function (res) {
      searchAll();
    }
  });
}

function seeRequests() {
  $.ajax({
    type: "POST",
    url: "seeRequests",
    success: function (res) {
      document.getElementById("seeRequests").innerHTML = res;
    }
  });
}

function addFriend(id) {
  let data = { id: id };
  $.ajax({
    type: "POST",
    url: "addFriend",
    data: data,
    success: function (res) {
      seeRequests();
    }
  });
}

function perfilPerson(id) {
  let data = { id: id };
  $.ajax({
    type: "POST",
    url: "perfilPerson",
    data: data,
    success: function (res) {
      document.getElementById("body").innerHTML = res;
      searchAllMessagesPerfil(id);
    }
  });
}

function searchAllMessages() {
  document.getElementById("messageHidden").style.display = "none";
  $.ajax({
    type: "POST",
    url: "searchAllMessages",
    success: function (res) {
      document.getElementById("messages").innerHTML = res;
    }
  });
}

function searchAllMessagesPerfil(id) {
  let data = { id: id };
  $.ajax({
    type: "POST",
    url: "searchAllMessagesPerfil",
    data: data,
    success: function (res) {
      document.getElementById("messageHidden").style.display = "none";
      document.getElementById("messages").innerHTML = res;
      seeNotifications();

    }
  });
}

function addMessage() {
  let text = document.getElementById("text");
  let imgUpload = document.getElementById("imgUpload");
  let validate = true;
  if (text.value == "" && imgUpload.value == "") {   
    document.getElementById("erroText").innerHTML = "Debe contener algo el mensaje";
    text.style.borderColor = "red";
    document.getElementById("uploadFile").style.borderColor = "red";
  } else {
    if (text.value != "" && imgUpload.value != "") {
      if ((imgUpload.value.includes("jpg") == false && imgUpload.value.includes("jpeg") == false)) {
        document.getElementById("erroText").innerHTML = "La imagen debe ser jpeg o jpg";
        text.style.borderColor = "red";
        document.getElementById("uploadFile").style.borderColor = "red";
        validate = false;
      }
    }
    if (text.value == "" && imgUpload.value != "") {
      if ((imgUpload.value.includes("jpg") == false && imgUpload.value.includes("jpeg") == false)) {
        document.getElementById("erroText").innerHTML = "La imagen debe ser jpeg o jpg";
        text.style.borderColor = "red";
        document.getElementById("uploadFile").style.borderColor = "red";
        validate = false;
      }
    }
    if (validate) {
      document.getElementById("uploadFile").style.borderColor = "#ced4da";
      text.style.borderColor = "#ced4da";
      document.getElementById("erroText").innerHTML = "";
      let formData = new FormData($("#formMessage")[0]);
      $.ajax({
        type: "POST",
        url: "addMessage",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
          if (res.ok == "ok") {
            text.value="";
            imgUpload.value= "";
            searchAllMessages()
          }
        }
      });
    }
  }
}

function addFavorites(id) {
  let data = { id: id };
  let aux = id.split(".");
  $.ajax({
    type: "POST",
    url: "addFavorites",
    data: data,
    success: function (res) {
      if (res.ok == "ok") {
        if (!isPerfil) {
          searchAllMessages();
        } else {
          searchAllMessagesPerfil(aux[1]);
        }
      }
    }
  });
}

function removeFavorites(id) {
  let data = { id: id };
  let aux = id.split(".");
  $.ajax({
    type: "POST",
    url: "removeFavorites",
    data: data,
    success: function (res) {
      if (res.ok == "ok") {
        if (!isPerfil) {
          searchAllMessages();
        } else {
          searchAllMessagesPerfil(aux[1]);
        }
      }
    }
  });
}

function seeNotifications() {
  $.ajax({
    type: "POST",
    url: "seeNotifications",
    success: function (res) {
      document.getElementById("not").innerHTML = res;
    }
  });
}

function readNotification(id) {
  let data = { id: id }
  $.ajax({
    type: "POST",
    url: "readNotification",
    data: data,
    success: function (res) {
      if (res.ok == "ok") {
        seeNotifications();
      }
    }
  });
}

function deleteNotification(id) {
  let data = { id: id }
  $.ajax({
    type: "POST",
    url: "deleteNotification",
    data: data,
    success: function (res) {
      if (res.ok == "ok") {
        seeNotifications();
      }
    }
  });
}

function show(id) {
  document.getElementById(id).style.visibility = "visible";
}

function hide(id) {
  document.getElementById(id).style.visibility = "hidden";
}

function deleteMessage(id) {
  console.log(id);
  let data = { id: id }
  $.ajax({
    type: "POST",
    url: "deleteMessage",
    data: data,
    success: function (res) {
      if (res.ok == "ok") {
        searchAllMessages();
      }
    }
  });
}

function showImage(obj){
  document.getElementById("body").appendChild(document.createElement("DIV")).setAttribute("id", "lightbox");
  let lightbox = document.getElementById("lightbox");
  lightbox.className = "lightbox";
  lightbox.appendChild(document.createElement("DIV")).setAttribute("id", "modal");
  let modal = document.getElementById("modal");
  modal.className = "modal";
  modal.innerHTML = "<img id=\"imgModal\"  class=\"imgModal\"src=\""+obj+"\"/>";
  modal.innerHTML += "<div onclick=\"closeModal();\" id=\"closeModal\" class=\"closeModal colorccc\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></div>";
  let imgModal = document.getElementById("imgModal");
  modal.style.marginTop = "-"+(imgModal.height/2)+"px";
  modal.style.marginLeft = "-"+(imgModal.width/2)+"px";
}

function closeModal(){
  let lightbox = document.getElementById("lightbox");
  lightbox.remove();
}