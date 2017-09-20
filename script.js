const month =
	parseInt(prompt("Podaj miesiąc od 1-12: ", new Date().getMonth() + 1)) - 1;
const days = [];
const weekdays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

function drag(ev) {
	//console.log(ev.dataTransfer);
	// Add this element's id to the drag payload so the drop handler will
	// know which element to add to its tree
	ev.dataTransfer.setData("text", ev.target.id);
	ev.dataTransfer.effectAllowed = "move";
	//console.log(ev.dataTransfer.items);
}

function drop(ev) {
	ev.preventDefault(); //prevents refreshing site
	// Get the id of the target and add the moved element to the target's DOM
	var data = ev.dataTransfer.getData("text");
	//ev.target.parentNode.removeChild(ev.target);
	var newel = ev.target.appendChild(
		document.getElementById(data).cloneNode(true)
	);
	readTable();
}
function allowDrop(ev) {
	ev.preventDefault();
}
// $("#days").on("click", "button", function() {
// 	this.parentNode.remove();
// });
// document.getElementById("days").addEventListener("click", function(ev) {
// 	this.parentNode.remove();
// });
document.getElementById("days").addEventListener("click", function(ev) {
	//this.parentNode.remove();
	ev.path[1].parentNode.removeChild(ev.path[1]);
});
//////////////////////////////////////////////////////////////////////////program code
function numberOfDays(month) {
	total = 0;
	for (i = 0; i < month.length; i++) {
		nOfDays = i;
		return nOfDays;
	}
}
var monthLength;
function getDaysInMonth(month, year) {
	var date = new Date(year, month, 1);

	//var days = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	monthLength = days.length;
}
getDaysInMonth(month, 2017);

//a function to update month and date on site
function displayDate(month) {
	let now, year, cale;
	now = new Date();
	year = now.getFullYear();
	months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	monthYear = document.getElementById("month-year");
	monthYear.textContent = months[month] + " " + year;
}
displayDate(month);

function renderTable(d) {
	var newHTML,
		html =
			'<tr class="days" id="day-%id%" ><td id="date">%01.01%</td><td ondrop="drop(event)" ondragover="allowDrop(event)"> </td><td ondrop="drop(event)" ondragover="allowDrop(event)"> </td><td><input id="comments" type="text"></td></tr>';

	var dayElement = document.getElementById("days");

	for (i = 0; i < days.length; i++) {
		newHTML = html.replace("%id%", i);
		newHTML = newHTML.replace(
			"%01.01%",
			`${weekdays[days[i].getDay()]} ${days[i].toLocaleDateString()}`
		);
		dayElement.insertAdjacentHTML("beforeend", newHTML);
	}
}
renderTable(days);

function readTable() {
	for (i = 0; i < days.length; i++) {
		var tableRow = document.getElementById(`day-${i}`);
		var morning = tableRow.childNodes[1].querySelectorAll(".worker");
		var evening = tableRow.childNodes[2].querySelectorAll(".worker");
		var comments = tableRow.childNodes[3].querySelector("input").value;
		console.log(comments);
		var morIds = [],
			eveIds = [],
			commentsText = [];
		for (k = 0; k < morning.length; k++) {
			morIds.push(morning[k].id);
		}
		for (k = 0; k < evening.length; k++) {
			eveIds.push(evening[k].id);
		}
		// for (k = 0; k < comments.length; k++) {
		// 	comemntsText.push(comments[k]);
		// }
		//console.log(commentsText);
		localStorage.setItem(`${month}-${i}-mor`, JSON.stringify(morIds));
		localStorage.setItem(`${month}-${i}-eve`, JSON.stringify(eveIds));
		localStorage.setItem(`${month}-day-${i}`, JSON.stringify(comments));
		//localStorage.setItem(`${month}-${i}`, JSON.stringify(workerIds));
		//console.log(tableRow);
	}
}

function clearTable() {
	const table = document.getElementById("days");
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
}

function loadTable(month) {
	const drag1 = document.getElementById("drag1").cloneNode(true);
	const drag2 = document.getElementById("drag2").cloneNode(true);
	const drag3 = document.getElementById("drag3").cloneNode(true);
	const drag4 = document.getElementById("drag4").cloneNode(true);
	// const drag5 = document.getElementById("drag5").cloneNode(true);
	// const drag6 = document.getElementById("drag6").cloneNode(true);
	// const drag7 = document.getElementById("drag7").cloneNode(true);

	for (var i = 0; i < monthLength; i++) {
		//console.log(localStorage.getItem(`${month}-${i}-eve`));
		var eveningWorkers = JSON.parse(
			localStorage.getItem(`${month}-${i}-eve`)
		);
		var morningWorkers = JSON.parse(
			localStorage.getItem(`${month}-${i}-mor`)
		);
		var comment = JSON.parse(localStorage.getItem(`${month}-day-${i}`));

		var tableRow = document.getElementById(`day-${i}`);
		var evening = tableRow.childNodes[2];
		var morning = tableRow.childNodes[1];
		tableRow.childNodes[3].querySelector("input").value = comment;
		//comments.map(x => (commentsEl = comments));
		/// evening workers
		eveningWorkers.map(x => {
			if (x === "drag1") {
				evening.appendChild(
					document.getElementById("drag1").cloneNode(true)
				);
			} else if (x === "drag2") {
				evening.appendChild(
					document.getElementById("drag2").cloneNode(true)
				);
			} else if (x === "drag3") {
				evening.appendChild(
					document.getElementById("drag3").cloneNode(true)
				);
			} else if (x === "drag4") {
				evening.appendChild(
					document.getElementById("drag4").cloneNode(true)
				);
			} //else if (x === "drag5") {
			// 	evening.appendChild(
			// 		document.getElementById("drag5").cloneNode(true)
			// 	);
			// } else if (x === "drag6") {
			// 	evening.appendChild(
			// 		document.getElementById("drag6").cloneNode(true)
			// 	);
			// } else if (x === "drag7") {
			// 	evening.appendChild(
			// 		document.getElementById("drag7").cloneNode(true)
			// 	);
			// }
		}); ///
		/// morning workers
		morningWorkers.map(x => {
			if (x === "drag1") {
				morning.appendChild(
					document.getElementById("drag1").cloneNode(true)
				);
			} else if (x === "drag2") {
				morning.appendChild(
					document.getElementById("drag2").cloneNode(true)
				);
			} else if (x === "drag3") {
				morning.appendChild(
					document.getElementById("drag3").cloneNode(true)
				);
			} else if (x === "drag4") {
				morning.appendChild(
					document.getElementById("drag4").cloneNode(true)
				);
			}
		});
	}
}
loadTable(month);
document.getElementById("save").addEventListener("click", readTable);
