export interface FormField {
    name: string;           
    label: string;         
    type?: string;         
    placeholder?: string;
    fullWidth?: boolean;
  }
  
  export interface BaseFormProps<T> {
    initialData: T;
    onSave: (data: T & { imageUrl?: string }) => Promise<void>;
    onCancel: () => void;
    submitLabel?: string;
  }