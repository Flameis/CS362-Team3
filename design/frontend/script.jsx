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
  
  document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
  
    dropdownToggle.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });
  
    // Hide dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
      }
    });
  });
  
