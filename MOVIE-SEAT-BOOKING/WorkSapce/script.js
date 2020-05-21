const container = document.querySelector(".container");
//get all seat HTML elements, hence I used "All"
const allseats = document.querySelectorAll(".seat");

// get the seats which are not occupied
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value);
// loging the inital price of the tkt for the movie which is selected by default

console.log(ticketPrice);
// read the earlier saved values from local storage and populate UI
populateUI();
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsUnOccupied = document.querySelectorAll(".seat");
  // Prints the nodeLinst
  console.log(selectedSeats);
  // I want the selected seat index
  // Here we have used spread index of JavaScript

  const seatsIndex = [...selectedSeats].map(function (seat) {
    console.log(seat + " seat");
    console.log(seatsUnOccupied + " Allseat");
    return [...seatsUnOccupied].indexOf(seat);
  });

  console.log(seatsIndex);
  // use local storage to store.
  // localStorage is in built into item
  var hardcodedIndex = [65, 44, 12, 4];
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
// Get data from localStorage and populate UI
function populateUI() {
  // get from local storage, parse is used because while storing
  // stringfy function is used
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log("Populate UI " + selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // check if index is present in arr of selected index
      if (selectedSeats.indexOf(index) > -1) {
        console.log("adding selected");
        seat.classList.add("selected");
      }
    });
  }

  //get the selected movie index from storage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    // update the HTML element with selected index
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event. This is not click event, this is selection change event

movieSelect.addEventListener("change", (e) => {
  // + helps in converting string into int
  ticketPrice = +e.target.value;
  console.log("printing the tkt price");
  console.log(ticketPrice);
  //log the selected item and it price
  console.log(e.target.selectedIndex, e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
//event listener on container, arrow function syntax is used
// you can use normal function syntax
container.addEventListener("click", (e) => {
  // console.log(e.target);
  // find that click event has happened on the seat div
  // e.target contains the element on which click event has happened
  if (e.target.classList.contains("seat")) {
    // console.log(e.target);

    // find out that, user has clicked on ticket which is not occupied
    if (!e.target.classList.contains("occupied")) {
      console.log(e.target);
      //toggle the class to selected class
      e.target.classList.toggle("selected");
      updateSelectedCount();
    }
  }
});

//initial count and total set
updateSelectedCount();
