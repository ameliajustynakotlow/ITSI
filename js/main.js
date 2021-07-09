// PARAMETERS
var parameters = {
	// Speed parameter
	speed: {
		id: 'speed',
		minValue: 18,
		maxValue: 22,
		currentSpeed: null,
		readableSpeed: null,
		kmPerHour: null,
		calculate: function() {
			// Get a random value between min speed (km/s) and max speed (km/s)
			parameters.speed.currentSpeed = (Math.random() * (parameters.speed.maxValue - parameters.speed.minValue) + parameters.speed.minValue);
			parameters.speed.calculate2();
		},
		calculate2: function() {
			// Calculate speed from km/s to km/h
			// Use Math.floor to get whole number
			parameters.speed.readableSpeed = Math.round(parameters.speed.currentSpeed * 3600);

			// Set speed in HTML
			var speed = document.getElementById(parameters.speed.id);
			speed.innerHTML = parameters.speed.readableSpeed + ' km/h';
		}
	},
	// Distance parameter
	distance: {
		id: 'distance-traveled',
		maxValue: 54600000,
		currentValue: 0,
		calculate: function(speed) {
			// Current distance (km) = current distance (km) +current speed (km/s)
			// Function needs to be called very second because speed is in km/s and distance is in km
			// Use Math.floor to get whole number
			parameters.distance.currentValue = Math.round(parameters.distance.currentValue + speed);

			// Set Distance traveled in HTML
			var distanceTraveled = document.getElementById(parameters.distance.id);
			distanceTraveled.innerHTML = parameters.distance.currentValue + ' km';
		}
	},
	// Fuel parameter
	fuel: {
		id: 'fuel',
		maxValue: 100,
		currentvalue: null,
		calculate: function(maxDistance, currentDistance) {
			// Distance left to travel equals maxDistance - current distance traveled
			var distanceToTravel = maxDistance - currentDistance;

			// if distanceToTravel is lower or equal to 0 then fuel should be 0%
			if (distanceToTravel > 0) {
				// Fuel left equals distance to travel / maxDistance x 100%
				var currentFuel = distanceToTravel / maxDistance * 100;
				// use toFixed function to display fuel in 4 decimals
				// With 4 decimals its visible how much fuel is used each second
				parameters.fuel.currentValue = currentFuel.toFixed(4);
			} else {
				parameters.fuel.currentValue = 0;
			}

			// Set fuel in HTML
			var fuel = document.getElementById(parameters.fuel.id);
			fuel.innerHTML = parameters.fuel.currentValue + '%';
		}
	}
};

// Start calculation functions to calculate speed, dinstance and fuel
function setParameters() {
	parameters.speed.calculate();
	parameters.distance.calculate(parameters.speed.currentSpeed);
	parameters.fuel.calculate(parameters.distance.maxValue, parameters.distance.currentValue);
}

// Loop setParameters function every second
// 1000 is in miliseconds
var startFlight = setInterval(function(){
	setParameters();	
}, 1000);

// WELCOME TEXT AND DATE
var passenger = prompt('Enter your name, Passenger:');
var welcomeMessage = 'Welcome Passenger ' + passenger;

document.getElementById("welcome-message").innerHTML = welcomeMessage;

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
var futureDate = new Date(year + 9, month, day);
document.getElementById("date").innerHTML = futureDate;

// BALANCE AND CURRENCY
var currentAccount = {
	balance: 1000000,
	currency: 'EURO'
};

function setBalanceAndCurrency(){
	var balance = document.getElementById('balance');
	var currency = document.getElementById('currency');
	balance.innerHTML = currentAccount.balance;
	currency.innerHTML = currentAccount.currency;
}

setBalanceAndCurrency();

// CURRENCY CONVERTER
var inputEUR = document.getElementById("EUR");
var inputMR = document.getElementById("MR");

function euroToMartianRock (euro){
	var martianRock = euro * 2.6;
	return martianRock;
}

function martianRockToEuro (MR){
	var euro = MR / 2.6;
	return euro;
}

function setMartianRocks() {
	var currentEuros = document.getElementById("EUR").value;
	var currentMartianRocks = euroToMartianRock(currentEuros);
	inputMR.value = currentMartianRocks;
}

function setEuro() {
	var currentMartianRocks = document.getElementById("MR").value;
	var currentEuros = martianRockToEuro(currentMartianRocks);
	inputEUR.value = currentEuros;
}

inputEUR.addEventListener("keyup", setMartianRocks);
inputMR.addEventListener("keyup", setEuro);

// SUPPLIES / MARTIAN ROCK SHOP
var supplies = new Array(
	['Meat', 40000],
	['Vegetables', 35000],
	['Water', 10000],
	['Juice', 15000],
	['Choco snack', 20000],
	['Healthy snack', 20000]
);

// Insert supplies in HTML
var shop = document.getElementById('martian-rock-shop');

for (var i = 0; i < supplies.length; i++) {
	// Create new div
	var div = document.createElement("div");
	// Add class to div to give it css style
	div.classList.add("shop-item");
	// Create new paragraph
	var p = document.createElement("p");
	// Set supply name as text
	var text = document.createTextNode(supplies[i][0]);
	// Create new button element
	var button = document.createElement("button");
	// Add class to button so it can be selected in javascript
	button.classList.add("shop-button");
	// Set supply value as button text
	button.innerHTML = supplies[i][1] + ' MR';
	// Set supply value as button value
	button.value = supplies[i][1];

	// Place all created elements in a div inside shop
	p.appendChild(text);
	div.appendChild(p);
	div.appendChild(button);
	shop.appendChild(div);
}

function buySupplies(price) {
	// convert price to euro
	var priceInEuro = martianRockToEuro(price);

	// Check if balance is high enough
	if (currentAccount.balance - priceInEuro >= 0) {
		currentAccount.balance = Math.round(currentAccount.balance - priceInEuro);
		setBalanceAndCurrency();
	} else {
		// Else warn the passenger
		alert('Passenger ' + passenger + ' your balance is not high enough to buy this item!');
	}
}

// Get all shop buttons and assign event listener
var shopButtons = document.getElementsByClassName('shop-button');
for (var i = 0; i < shopButtons.length; i++) {
	shopButtons[i].addEventListener('click', function() {
		buySupplies(this.value);
	});
}
