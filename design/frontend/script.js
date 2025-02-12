  document.getElementById("loginButton").addEventListener("click", function() {
    location.window.href = "Map.HTML";
  });

document.getElementById("menuBack").addEventListener("click", function () {
    document.getElementById("sideMenu").style.width = "250px";
});

document.getElementById("closeMenu").addEventListener("click", function () {
    document.getElementById("sideMenu").style.width = "0";
});
