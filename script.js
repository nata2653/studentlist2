"use strict";
document.addEventListener("DOMContentLoaded", start);
//Array for students
let students = [];

function start() {
  console.log("page loaded");

  // Filter variable
  let filter = "all";

  // Sort variable
  let sort;

  //Filter-loop forEach - addEventlistener for filter
  document.querySelectorAll("#filter-by").forEach(option => {
    option.addEventListener("change", filterBy);
  });

  //Filter-loop forEach - addEventlistener for sort
  document.querySelectorAll("#sort-by").forEach(option => {
    option.addEventListener("change", sortBy);
  });

  // fetch JSON-data
  async function getJson() {
    let jsonData = await fetch("http://petlatkea.dk/2019/students1991.json");
    students = await jsonData.json();

    //Call function to show fetched data/studentlist
    showStudents();
  }

  //Call getJson
  getJson();

  //function to show data/students
  function showStudents() {
    console.log(students);
    // Empty .student-list
    document.querySelector(".studentlist").innerHTML = "";

    //create variable for template
    let temp = document.querySelector("template");

    //Create variable for destination
    let dest = document.querySelector(".studentlist");

    // Create forEach function for each student
    students.forEach(student => {
      // Find the first space in fullname
      const firstSpace = student.fullname.indexOf(" ");

      // Find the firstname in fullname
      let firstname = student.fullname.substring(0, firstSpace);

      // Find the lastname in fullname
      let lastname = student.fullname.substring(firstSpace + 1);

      student.firstname = firstname;

      student.lastname = lastname;

      console.log(firstname + " " + lastname);

      // If statement - filter
      if (filter == student.house || filter == "all") {
        //Clone variable
        let klon = temp.cloneNode(!0).content;

        // show fullname in h2
        klon.querySelector(".student h2").innerHTML = student.fullname;

        //show house in h3
        klon.querySelector(".student h3").innerHTML = student.house;

        klon.querySelector(".student").setAttribute("house", student.house);

        dest.appendChild(klon);
      }
    });
    //Call modal when click
    document.querySelectorAll(".student").forEach(student => {
      student.addEventListener("click", showModal);
    });
    //Function to show modal
    function showModal() {
      let house = this.getAttribute("house");
      console.log(house);

      console.log("show modal");
      //If statements to make the modal show depending on choice/click
      if (house == "Gryffindor") {
        document.querySelector(".gryffindor").classList.remove("hide");
        document
          .querySelector(".gryffindor")
          .addEventListener("click", function() {
            document.querySelector(".gryffindor").classList.add("hide");
          });
      } else if (house == "Slytherin") {
        document.querySelector(".slytherin").classList.remove("hide");
        document
          .querySelector(".slytherin")
          .addEventListener("click", function() {
            document.querySelector(".slytherin").classList.add("hide");
          });
      } else if (house == "Ravenclaw") {
        document.querySelector(".ravenclaw").classList.remove("hide");
        document
          .querySelector(".ravenclaw")
          .addEventListener("click", function() {
            document.querySelector(".ravenclaw").classList.add("hide");
          });
      } else if (house == "Hufflepuff") {
        document.querySelector(".hufflepuff").classList.remove("hide");
        document
          .querySelector(".hufflepuff")
          .addEventListener("click", function() {
            document.querySelector(".hufflepuff").classList.add("hide");
          });
      }
    }
  }

  //Function to sort
  function sortBy() {
    console.log("Sort json");

    //Change filter by variable
    sort = this.value;

    console.log(sort);

    // If statement to sort by selection
    // If firstname sort by firstname
    if (sort == "Firstname") {
      console.log(sort);

      //Function to sort by firstname
      students.sort(function(a, b) {
        return a.firstname.localeCompare(b.firstname);
      });

      //If lastname: sort by lastname
    } else if (sort == "Lastname") {
      console.log(sort);

      //Function to sort by lastname
      students.sort(function(a, b) {
        return a.lastname.localeCompare(b.lastname);
      });

      //If house sort by house
    } else if (sort == "House") {
      console.log(sort);

      //Function to sort by house
      students.sort(function(a, b) {
        return a.house.localeCompare(b.house);
      });

      //Reset sorting
    } else if (sort == "none") {
      start();
    }
    //Call showStudents to show studenlist again
    showStudents();
  }
  //Function to filter
  function filterBy() {
    console.log("Filter json");

    // Change filter
    filter = this.value;

    //call function to show studentlist again
    showStudents();
  }
}
