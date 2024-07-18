import React from 'react';
import { Modal, FormControl, Button, Input, VStack, ScrollView, useToast, Image, Box, Text, Stack } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import RedAsteriskText from './RedAsteriskText';
import CustomSelect from './CustomSelect'; 
import * as ImagePicker from 'expo-image-picker';


const GlobalModal: React.FC<GlobalModalProps> = ({ isOpen, onClose, headerTitle, data, initialData = {}, onSubmitModal, action }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Record<string, any>>({
    defaultValues: initialData,
  });

  const toast = useToast();

  const validateNotEmpty = (value: string) => {
    return value.trim() !== '' || 'Trường này là bắt buộc và không được chứa chỉ khoảng trắng';
  };

  const onSubmit = (formData: Record<string, any>) => {
    onSubmitModal(formData);
    reset();
    onClose();
    toast.show({ title: "Form submitted successfully"});
  };

  const pickImage = async (onChange: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          {headerTitle}
        </Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={4}>
              {Object.keys(data).map((key, index) => {
                const field = data[key];
                return (
                  <FormControl key={index} isInvalid={key in errors}>
                    {field.required ? (
                      <RedAsteriskText error={errors[key]?.message}>{field.label}</RedAsteriskText>
                    ) : (
                      <Text>{field.label}</Text>
                    )}
                    <Controller
                      control={control}
                      name={key}
                      rules={field.required ? { required: `${field.label} là bắt buộc`, validate: validateNotEmpty } : {}}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          {field.type === 'text' && (
                            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                          )}
                          {field.type === 'select' && (
                            <CustomSelect
                              options={field.options!}
                              value={value}
                              onChange={onChange}
                            />
                          )}
                          {field.type === 'file' && (
                            <Stack>
                              <Button onPress={() => pickImage(onChange)}>Chọn ảnh</Button>
                              {value && (
                                <Box mt={2} alignSelf='center'>
                                  <Image source={{ uri: value }} style={{ width: 200, height: 200 }} alt="Selected Image" />
                                </Box>
                              )}
                            </Stack>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                );
              })}
            </VStack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                reset();
                onClose();
              }}
            >
              Hủy
            </Button>
            <Button onPress={handleSubmit(onSubmit)}>
              {action}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default GlobalModal;
