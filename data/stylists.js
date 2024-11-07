import { v4 as uuid4 } from "uuid";

const stylists  = [
  {
    id: uuid4(),
    service: "Haircut",
    stylist: "Amina Hassan",
    category: "Hair",
    duration: "45 mins",
  },
  {
    id: uuid4(),
    service: "Manicure",
    stylist: "Layla Khalil",
    category: "Nails",
    duration: "30 mins",
  },
  {
    id: uuid4(),
    service: "Full Body Massage",
    stylist: "Sara AlMansouri",
    category: "Spa",
    duration: "60 mins",
  },
  {
    id: uuid4(),
    service: "Facial Treatment",
    stylist: "Mariam Ali",
    category: "Skin Care",
    duration: "50 mins",
  },

];

export default stylists;
