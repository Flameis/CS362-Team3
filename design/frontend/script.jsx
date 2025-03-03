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
        window.location.href = "Login.html";
    }
  });

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
