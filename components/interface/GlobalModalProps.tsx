interface GlobalModalProps {
    isOpen: boolean;
  onClose: () => void;
  headerTitle: string;
  data: Record<string, FormField>;
  initialData?: Record<string, any>;
  onSubmitModal: (data: Record<string, any>) => void;
  action: string;
  }