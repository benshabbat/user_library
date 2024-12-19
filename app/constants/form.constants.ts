import { FormField } from '../types/form';

export const FORM_FIELDS: FormField[] = [
  {
    name: 'name.title',
    label: 'Title',
    placeholder: 'e.g. Mr, Mrs, Ms'
  },
  {
    name: 'name.first',
    label: 'First Name',
    placeholder: 'First name'
  },
  {
    name: 'name.last',
    label: 'Last Name',
    placeholder: 'Last name'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email address',
    fullWidth: true
  },
  {
    name: 'location.street.name',
    label: 'Street Name',
    placeholder: 'Street name'
  },
  {
    name: 'location.street.number',
    label: 'Street Number',
    type: 'number',
    placeholder: 'Street number'
  },
  {
    name: 'location.city',
    label: 'City',
    placeholder: 'City'
  },
  {
    name: 'location.country',
    label: 'Country',
    placeholder: 'Country'
  }
];