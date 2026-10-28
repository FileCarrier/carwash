export interface ServiceOption {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: number;
  basePrice: number;
  options: ServiceOption[];
}

export interface BookingData {
  name: string;
  phone: string;
  carModel: string;
  carClass: string;
  date: string;
  time: string;
  services: string[];
  options: string[];
  totalPrice: number;
  comment: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
