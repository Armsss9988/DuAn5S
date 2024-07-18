interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
  }