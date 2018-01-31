

/*login con firebase*/
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
  } else {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  // alert(userEmail + userPass);

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  });
}//final función login

function logout(){
  firebase.auth().signOut();
}//final función logout


function newUser(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  if (error) {
    window.alert("Error : " + errorMessage);
  } else {
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
  }
});
}//final función newUser