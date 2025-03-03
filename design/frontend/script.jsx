  document.getElementById("loginButton").addEventListener("click", function() {
    location.window.href = "Map.HTML";
  });

  document.getElementById("back").addEventListener("click", function() {
    location.window.href = "Map.HTML";
  });

  document.getElementById("logOut").addEventListener("click", function() {
    //ask user if they want to log out
        const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
      //log out functionality
        window.location.href = "login.html";
    }
  });
