interface FormField {
    type: 'text' | 'select' | 'file';
    label: string;
    options?: Option[];
  required?: boolean;
  }