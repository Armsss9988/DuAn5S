import React from 'react';
import { Modal, FormControl, Button, Input, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import RedAsteriskText from './RedAsteriskText';

interface FormData {
  donVi: string;
  toQuanLy: string;
  loaiCSHT: string;
  maCSHT: string;
  tenCSHT: string;
  diaChi: string;
  anhTram: string;

}

interface Props {
  isShowCreate: boolean;
  closeCreate: () => void;
  handleSubmit: (data: FormData) => void;
}
const CreateModal: React.FC<Props> = ({ isShowCreate, closeCreate, handleSubmit }) => {
    const { control, handleSubmit: formSubmit, reset, formState: { errors } } = useForm<FormData>({
      defaultValues: {
        donVi: '',
        toQuanLy: '',
        loaiCSHT: '',
        maCSHT: '',
        tenCSHT: '',
        diaChi: '',
        anhTram: '',
      },
    });
  const toast = useToast();

  const onSubmit = (data: FormData) => {
    handleSubmit(data);
    reset(); 
    closeCreate(); 
    toast.show({ title: "Form submitted successfully" });
  };
  const validateNotEmpty = (value: string) => {
    return value.trim() !== '' || 'Trường này là bắt buộc và không được chứa chỉ khoảng trắng';
  };

  return (
    <Modal isOpen={isShowCreate} onClose={closeCreate} size="full">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Tạo CSHT</Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={'donVi' in errors}>
            <RedAsteriskText error={errors.donVi?.message}>Đơn Vị: </RedAsteriskText>
            <Controller
              control={control}
              name="donVi"
              rules={{ required: 'Đơn vị là bắt buộc', validate: validateNotEmpty }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
          </FormControl>
          <FormControl mt="3" isInvalid={'toQuanLy' in errors}>
            <RedAsteriskText error={errors.toQuanLy?.message}>Tổ Quản Lý: </RedAsteriskText>
            <Controller
              control={control}
              name="toQuanLy"
              rules={{ required: 'Tổ quản lý là bắt buộc', validate: validateNotEmpty }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
          </FormControl>
          <FormControl mt="3" isInvalid={'loaiCSHT' in errors}>
            <RedAsteriskText error={errors.loaiCSHT?.message}>Loại CSHT: </RedAsteriskText>
            <Controller
              control={control}
              name="loaiCSHT"
              rules={{ required: 'Loại CSHT là bắt buộc', validate: validateNotEmpty }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
          </FormControl>
          <FormControl mt="3" isInvalid={'maCSHT' in errors}>
            <RedAsteriskText error={errors.maCSHT?.message}>Mã CSHT: </RedAsteriskText>
            <Controller
              control={control}
              name="maCSHT"
              rules={{ required: 'Mã CSHT là bắt buộc', validate: validateNotEmpty }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
          </FormControl>
          <FormControl mt="3" isInvalid={'tenCSHT' in errors}>
            <RedAsteriskText error={errors.tenCSHT?.message}>Tên CSHT: </RedAsteriskText>
            <Controller
              control={control}
              name="tenCSHT"
              rules={{ required: 'Tên CSHT là bắt buộc', validate: validateNotEmpty }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
          </FormControl>
          <FormControl mt="3" isInvalid={'diaChi' in errors}>
            <RedAsteriskText error={errors.diaChi?.message}>Địa chỉ: </RedAsteriskText>
            <Controller
              control={control}
              name="diaChi"
              rules={{ required: 'Địa chỉ là bắt buộc', validate: validateNotEmpty }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Ảnh Trạm: </FormControl.Label>
            <Controller
              control={control}
              name="anhTram"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                reset();
                closeCreate();
              }}
            >
              Cancel
            </Button>
            <Button onPress={formSubmit(onSubmit)}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CreateModal;