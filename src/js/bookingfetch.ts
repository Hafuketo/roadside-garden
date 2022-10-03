"use strict";

/*  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Elements ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  */

// Booking button
const addBookingBtn = document.getElementById("addBookingBtn");

// Get message-boxes
const guestsMsg = document.getElementById("guestsMsg");
const dateMsg = document.getElementById("dateMsg");
const nameMsg = document.getElementById("nameMsg");
const emailMsg = document.getElementById("emailMsg");
const takeMsg = document.getElementById("takeMsg");
const otherMsg = document.getElementById("otherMsg");

// Get Input elements
const bookingIdInput: any = document.getElementById("booking-id");
const bookingGuestsInput: any = document.getElementById("booking-guests");
const bookingDateInput: any = document.getElementById("booking-date");
const bookingNameInput: any = document.getElementById("booking-name");
const bookingEmailInput: any = document.getElementById("booking-email");
const bookingOtherInput: any = document.getElementById("booking-other");

//let radioBtns = document.querySelectorAll('input[name = "booking-takeaway"]');
let bookingTakeInput: any = document.querySelector(
	'input[name = "booking-takeaway"]:checked'
);

// Finds which radio button is checked
function findSelected() {
	bookingTakeInput.value;
}
findSelected();

// API source
//const bookingurl = "http://localhost/Webutv3/Projekt/webbtjanst/bookings.php";
const bookingurl = "http://haffupaffu.com/w3p/webbtjanst/bookings.php";

const msgBox = document.getElementById("msgBox");

// Check length of input, return true or false
function inputChecker(input, msg) {
	if (input.value.length > 128 || input.value.length < 1) {
		msg.innerText = `Måste vara mellan 1-128 tecken`;
		return false;
	} else {
		msg.innerText = "";
		return true;
	}
}

// Check length of input, return true or false
function otherChecker() {
	if (bookingOtherInput.value.length > 512) {
		otherMsg.innerText = `Måste vara mellan 0-512 tecken`;
		return false;
	} else {
		otherMsg.innerText = "";
		return true;
	}
}

// Check length of input, return true or false
function dateChecker() {
	if (!bookingDateInput.value) {
		dateMsg.innerText = `Datum måste fyllas i`;
		return false;
	} else {
		dateMsg.innerText = "";
		return true;
	}
}

addBookingBtn.addEventListener("click", addBooking);

// Add booking when form is filled
function addBooking(event) {
	event.preventDefault();

	// Checks which button is pressed
	findSelected();

	// Clear msg box next to button
	msgBox.innerHTML = "";

	// Check if inpute values are up to standards
	let dateBool = dateChecker();
	let nameBool = inputChecker(bookingNameInput, nameMsg);
	let emailBool = inputChecker(bookingEmailInput, emailMsg);
	let otherBool = otherChecker();

	// Run if all fields are ok
	if (dateBool && nameBool && emailBool && otherBool) {
		let jsonStr = JSON.stringify({
			booking_guests: bookingGuestsInput.value,	booking_date: bookingDateInput.value, booking_name: bookingNameInput.value,
			booking_email: bookingEmailInput.value, booking_takeaway: bookingTakeInput.value, booking_other: bookingOtherInput.value,
		});

		fetch(bookingurl, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: jsonStr,
		})
			.then((response) => response.json())
			.then((data) => {
				JSON.stringify(data);
				msgBox.innerHTML = `${data["message"]}. Vi kommer att maila er så snart vi behandlat er bokning.`;
				bookingNameInput.value = "";
				bookingEmailInput.value = "";
				bookingOtherInput.value = "";
				addBookingBtn.style.visibility = "hidden";
			});
	}
}
