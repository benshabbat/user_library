export interface UserLocation {
  country: string;
  city: string;
  street: {
    name: string;
    number: number;
  };
}

export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface User {
  login: {
    uuid: string;
  };
  name: UserName;
  email: string;
  picture: {
    medium: string;
  };
  location: UserLocation;
}

export interface EditableUser {
  name: UserName;
  email: string;
  location: UserLocation;
}