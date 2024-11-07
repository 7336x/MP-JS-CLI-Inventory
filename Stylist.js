import { v4 as uuid4 } from "uuid";
import salonData from "./data/stylists.js";

class Salon {
  static services = [];  

  static create(service) {
    service.id = Salon.services.length + 1;  
    this.services.push(service);
  }

  static find() {
    return this.services;
  }

  static findById(id) {
    return this.services.find(service => service.id === id);
  }

  static update(updatedService) {
    const index = this.services.findIndex(service => service.id === updatedService.id);
    if (index !== -1) {
      this.services[index] = updatedService;  
    }
  }

  static delete(id) {
    this.services = this.services.filter(service => service.id !== id);
  }
}

export default Salon;
