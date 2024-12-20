export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  country: string;
  city: string;
  street: {
    name: string;
    number: number;
  };
}

export interface EditableUser {
  name: Name;
  email: string;
  location: Location;
  picture?: {
    medium: string;
  };
}

export interface User extends EditableUser {
  login: {
    uuid: string;
  };
}

export interface UserResponse {
  results: User[];
}

export interface ApiResponse {
  results: User[];
  info: any;
}

export interface ValidationError {
  field: string;
  message: string;
}









