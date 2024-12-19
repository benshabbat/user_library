export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserLocation {
  street: {
    name: string;
    number: number;
  };
  city: string;
  country: string;
}

export interface EditableUser {
  name: UserName;
  email: string;
  location: UserLocation;
  picture?: {
    medium: string;
  };
}

export interface User extends EditableUser {
  login: {
    uuid: string;
  };
}

export interface ApiResponse {
  results: User[];
  info: any;
}

export interface ValidationError {
  field: string;
  message: string;
}