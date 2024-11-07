import inquirer from "inquirer";
import Salon from "./Stylist.js";  
import showMenu from "./salonMenu.js";


export function addService() {
  inquirer
    .prompt([
      { name: "service", message: "Enter service name:" },
      { name: "stylist", message: "Enter the stylist name:" },
      { name: "category", message: "Enter the category (e.g., Hair, Nails):" },
      {
        name: "duration",
        type: "input",
        message: "Enter the estimated duration (e.g., 45 mins):",
      },
    ])
    .then((service) => {
      Salon.create(service);  
      console.log(`Added service: ${service.service} by ${service.stylist}.`);
      showMenu();
    })
    .catch((error) => {
      console.error("Error adding service:", error);
      showMenu();
    });
}


export function updateService() {
  const services = Salon.find();  
  if (services.length === 0) {
    console.log("No services available to update.");
    return showMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "serviceId",
        message: "Choose a service to update:",
        choices: services.map((service) => ({
          name: service.service,
          value: service.id,
        })),
      },
    ])
    .then(({ serviceId }) => {
      const service = Salon.findById(serviceId);  
      if (!service) {
        console.log("Service not found.");
        return showMenu();
      }

      inquirer
        .prompt([
          {
            name: "service",
            message: "Enter new service name (leave blank to keep current):",
          },
          {
            name: "stylist",
            message: "Enter new stylist name (leave blank to keep current):",
          },
          {
            name: "category",
            message: "Enter new category (leave blank to keep current):",
          },
          {
            name: "duration",
            type: "input",
            message:
              "Enter new estimated duration (leave blank to keep current):",
          },
        ])
        .then((updates) => {
          const { service: newService, stylist, category, duration } = updates;
          if (newService) service.service = newService;  
          if (stylist) service.stylist = stylist;  
          if (category) service.category = category;  
          if (duration) service.duration = duration;  
          
          Salon.update(service);  
          console.log(`Updated service: ${service.service}.`);
          showMenu();
        })
        .catch((error) => {
          console.error("Error updating service:", error);
          showMenu();
        });
    });
}


export function deleteService() {
  const services = Salon.find();
  if (services.length === 0) {
    console.log("No services available to delete.");
    return showMenu();
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "serviceId",
        message: "Choose a service to delete:",
        choices: services.map((service) => ({
          name: service.service,
          value: service.id,
        })),
      },
    ])
    .then(({ serviceId }) => {
      const service = Salon.findById(serviceId);
      if (!service) {
        console.log("Service not found.");
        return showMenu();
      }
      
      Salon.delete(serviceId);  
      console.log(`Deleted service: "${serviceId}".`);
      showMenu();
    })
    .catch((error) => {
      console.error("Error deleting service:", error);
      showMenu();
    });
}


export function viewServices() {
  const services = Salon.find();
  console.log("\nCurrent Salon Services:");
  if (services.length === 0) {
    console.log("No services available.");
  } else {
    console.table(services, ["service", "stylist", "category", "duration"]);
  }
  showMenu();
}
