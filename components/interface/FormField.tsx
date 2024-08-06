interface FormField {
    type: 'text' | 'select' | 'file' | 'imagePicker' | 'image';
    label: string;
    options?: Option[];
  required?: boolean;
  }