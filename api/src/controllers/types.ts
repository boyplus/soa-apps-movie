import { Movie, Location } from '../models';

export interface ServiceResponse {
  error?: {
    status: number;
    message: string;
  };
}

/////////////////
// USER
/////////////////

// Login
export interface LoginUserResponse {
  email: string;
  token: string;
}

// Register
export interface RegisterUserResponse {
  message: string;
}

export interface MessageResponse {
  message: string;
}

// Get customer profile
export interface GetCustomerProfileResponse {
  email: string;
  name: string;
}

export interface GetReservationsResponse {}

// Get admin profile
export interface GetAdminProfileResponse {
  email: string;
  name: string;
}

// Get staff profile
export interface GetStaffProfileResponse {
  email: string;
  name: string;
}

/////////////////
// Location
/////////////////

export interface LocationModel {
  id: number;
  name: string;
  address: string;
  phone: string;
  seat: number;
}

/////////////////
// Movie
/////////////////
export interface MovieModel {
  id: number;
  name: string;
  description: string;
  length: number;
  isActive: boolean;
}

/////////////////
// Show
/////////////////

export interface ShowResponse {
  id: number;
  startDate: string;
  startSlot: number;
  isActive: boolean;
  movie: MovieModel;
  location: LocationModel;
}

export interface Seat {
  id: number;
  isReserved: boolean;
}

export interface SpecificShowResponse {
  id: number;
  startDate: string;
  startSlot: number;
  isActive: boolean;
  movie: MovieModel;
  location: {
    id: number;
    name: string;
    address: string;
    phone: string;
    seat: number;
    seatDetail: Seat[];
  };
}

export interface Slot {
  id: number;
  isReserved: boolean;
  movie?: MovieModel;
}

/////////////////
// Reservations
/////////////////
