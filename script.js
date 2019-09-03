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

        dest.appendChild(klon);
      }
    });
  }
  function filterBy() {
    console.log("Filter json");

    // Change filter
    filter = this.value;

    //call function to show studentlist again
    showStudents();
  }

  // Call function to show studentlist again and create loop
  showStudents();
}
