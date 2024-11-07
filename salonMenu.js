import inquirer from "inquirer";
import Salon from "./Stylist.js";  
import { addService, updateService, deleteService, viewServices } from "./stylistControllers.js";

// Menu to interact with the system
function showMenu() {
  console.log("\n");
  const choices = [
    { name: "Add a service", value: "add" },
    { name: "Update a service", value: "update" },
    { name: "Delete a service", value: "delete" },
    { name: "View all services", value: "list" },  // View all services action
    { name: "Search services", value: "search" },  // Search services action
    { name: "Exit", value: "exit" },
  ];
  
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices,
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "add":
          addService();
          break;
        case "update":
          updateService();
          break;
        case "delete":
          deleteService();
          break;
        case "list":
          viewServices();
          break;
        case "search":
          searchServices();  // Call search function when 'Search services' is selected
          break;
        case "exit":
          console.log("Exiting the program.");
          break;
      }
    });
}

// here am adding the new search function to search services by name
function searchServices() {
  //  now  i prompt the user to enter a service name
  inquirer
    .prompt([
      {
        name: "searchTerm",  // the key that stores the user's input
        message: "Enter a service name to search for:",  // prompt message for the user
      },
    ])
    .then(({ searchTerm }) => {  // extract the searchterm from user input
      const services = Salon.find();  // retrieve all services from the Salon class
      const filteredServices = services.filter(service =>
        // now am doing filter services based on the search term, making both case-insensitive by using  to lowercase
        service.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (filteredServices.length === 0) {  // if no services match the search term
        console.log("No services found matching that name.");  // display message if no results
      } else {
        console.table(filteredServices, ["service", "stylist", "category", "duration"]);  // or display matching services in a table
      }
      
      showMenu();  // this is for Showing the menu again after the search results are displayed
    })
    .catch((error) => {
      // in case of an error, print the error and show the menu again
      console.error("Error searching for service:", error);
      showMenu();
    });
}

export default showMenu;
