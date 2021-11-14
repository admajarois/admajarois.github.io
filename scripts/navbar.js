document.addEventListener("DOMContentLoaded", function () {
    let element = document.querySelectorAll(".navbar-nav");
    loadNav();
    function loadNav() {
        let xhttp =new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".navbar-nav, .foot-nav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".navbar-nav a, .footnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        let navbar = document.querySelector(".navbar-nav");

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page)
                    });
                });
            }
        };
        xhttp.open("GET", "../nav.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage();

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                let content = document.querySelector("#mainContent");

                if (page === "home") {
                    getHome();
                } else if (page === "portfolio") {
                    getPortfolio();
                } else if (page === "about") {
                    getAbout();
                } else if (page === "contact") {
                    getContact();
                }
            
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 400) {
                    content.innerHTML = "<h1>404 Halaman tidak ditemukan </h1>";
                } else {
                    content.innerHTML = "<h1>403 Halaman tidak dapat diakses </h1>";
                }       
            }
        };

        xhttp.open("GET", "../pages/"+page+".html", true);
        xhttp.send();
    }
});