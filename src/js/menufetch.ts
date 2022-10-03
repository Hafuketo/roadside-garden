"use strict";

window.onload = initMenu;

function initMenu() {
	// Läsa in menyer
	fetchMenus(currentMenu);
}

// Skriv ut menyer till DOM
function currentMenu(Menus) {
	const menuEl = document.getElementById("currMenu");

	// Default menu if no menu current week
	menuEl.innerHTML = `
		<p>Ingen meny har satts för denna vecka. Vänligen kontakta oss för mer information.</p>`;

	// Go through menus
	Menus.forEach((menu) => {
		// Print same week as current week
		if (menu.menu_id == weekNumber) {
			menuEl.innerHTML = `
				<p>Dessert ingår alltid. Denna veckan serveras: ${menu.menu_de}</p>
				<h2>Måndag</h2>
				<p>${menu.menu_mo}</p>
				<h2>Tisdag</h2>
				<p>${menu.menu_tu}</p>
				<h2>Onsdag</h2>
				<p>${menu.menu_we}</p>
				<h2>Torsdag</h2>
				<p>${menu.menu_th}</p>
				<h2>Fredag</h2>
				<p>${menu.menu_fr}</p>
				<h2>Lördag</h2>
				<p>${menu.menu_sa}</p>
				<h2>Söndag</h2>
				<p>${menu.menu_su}</p>`;
		}
	});
}
