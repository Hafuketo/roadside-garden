/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function showNav() {
	let x = document.querySelector("#topnav") as any;
	let y = document.getElementsByClassName("rotate") as any;
	let bar1 = document.getElementById("bar1");
	let bar2 = document.getElementById("bar2");
	let bar3 = document.getElementById("bar3");

	if (x.style.display == "block") {
		x.style.display = "none";
		x.style.height = "0";

		bar1.classList.remove("rotate");
		bar2.classList.remove("rotate");
		bar3.classList.remove("rotate");
	} else {
		x.style.display = "block";
		x.style.height = "100vh";
		bar1.classList.add("rotate");
		bar2.classList.add("rotate");
		bar3.classList.add("rotate");
	}
}

/* API fetcher */

// API source
//const url = "http://localhost/Webutv3/Projekt/webbtjanst/rest.php";
const url = "http://haffupaffu.com/w3p/webbtjanst/bookings.php";

// Läsa in menyer från extern källa
function fetchMenus(func) {
	fetch(url).then((response) => {
		if (response.status != 200) {
			return;
		}
		return response.json().then((data) => {
			func(data);
		});
	});
}

/*  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Week calculation ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  */

let currWeek = document.querySelector(".currWeek") as HTMLElement | null;

let currentDate: any = new Date();
let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
let days: any = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

let weekNumber: any = Math.ceil(days / 7);

// Display the calculated result
if (currWeek != null) {
	currWeek.innerText = weekNumber;
}
