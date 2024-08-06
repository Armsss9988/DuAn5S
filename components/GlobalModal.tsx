import React, { useState } from "react";
import {
  Modal,
  FormControl,
  Button,
  Input,
  FlatList,
  useToast,
  Image,
  Box,
  Text,
  Stack,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import RedAsteriskText from "./RedAsteriskText";
import CustomSelect from "./CustomSelect";
import * as ImagePicker from "expo-image-picker";
import hoancongService from "./services/hoancongService";
import ImageCarousel from "./ImageCarousel";
import { Platform } from "react-native";
import { ImageInfo } from "./services/hoancongService";
import ImageCarouselSource from "./ImageCarouselSource";
import ImageCarouselURI from "./ImageCarouselURI";

const GlobalModal: React.FC<GlobalModalProps> = ({
  isOpen,
  onClose,
  headerTitle,
  data,
  image,
  initialData = {},
  onSubmitModal,
  action,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Record<string, any>>({
    defaultValues: initialData,
  });
  const toast = useToast();
  const handleRemoveImage = (key: string,image: string) => {
    const existingImages: ImageInfo = control._getWatch(key) || {
      FileNameList: [],
      FileContentList: [],
      deletedFileNames:[],
      URI: [],
    };
    // existingImages.deletedFileNames = [existingImages.deletedFileNames?,image]

  };
  const validateNotEmpty = (value: string) => {
    return (
      value.trim() !== "" ||
      "Trường này là bắt buộc và không được chứa chỉ khoảng trắng"
    );
  };

  const onSubmit = (formData: Record<string, any>) => {
    console.log("Form Data: " + formData);
    onSubmitModal(formData);
    reset();
    onClose();
    toast.show({ title: "Form submitted successfully" });
  };

  const pickImage = async (key: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, fileName } = result.assets[0];
      let path = uri;
      if (Platform.OS === "ios") {
        path = "~" + path.substring(path.indexOf("/Documents"));
      }
      var getFileName = fileName;
      if (!fileName) getFileName = path.split("/").pop();
      console.log("uri: " + uri);
      console.log("fileName: " + getFileName);
      const reader = new FileReader();
      const response = await fetch(uri);
      const blob = await response.blob();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Data = reader.result?.toString()?.split(",")[1];
        if (base64Data) {
          const existingImages: ImageInfo = control._getWatch(key) || {
            FileNameList: [],
            FileContentList: [],
            deletedFileNames:[],
            URI: [],
          };
          const newFileNameList: string[] =
            existingImages.FileNameList?.filter((name) => !!name) || [];
          const newFileContentList: string[] = [
            ...existingImages.FileContentList,
            base64Data,
          ];
          const newURI: string[] = existingImages.URI?.filter((name) => !!name) || [];
          if (getFileName) {
            const newImg: ImageInfo = {
              FileNameList: [...newFileNameList, getFileName],
              FileContentList: newFileContentList,
              deletedFileNames:[],
              URI: [...newURI, uri],
            };
            setValue(key, newImg, { shouldValidate: true });
            console.log("FIle: " + getValues(key).FileNameList);
          }
        }
      };
    }
  };
  const handleRemoveImagePicked = (key: string, image: string) => {
    const currentValue: ImageInfo = control._getWatch(key) || {
      FileNameList: [],
      FileContentList: [],
      deletedFileNames:[],
      URI: [],
    };
    const index = currentValue.URI?.indexOf(image);
    if (index !== -1) {
      // Remove the image from FileNameList and FileContentList
      const updatedFileNameList = currentValue.FileNameList.filter((_, i) => i !== index);
      const updatedFileContentList = currentValue.FileContentList.filter((_, i) => i !== index);
      const updatedURI = currentValue.URI?.filter((_, i) => i !== index)||[];
  
      // Set the updated values
      setValue(
        key,
        {
          FileNameList: updatedFileNameList,
          FileContentList: updatedFileContentList,
          URI: updatedURI,
        },
        { shouldValidate: true }
      );
      console.log("FIle after deleted: " + getValues(key).URI);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Body>
          <FlatList
            data={Object.keys(data)}
            renderItem={({ item: key }) => {
              const field = data[key];
              return (
                <FormControl key={key} isInvalid={key in errors} my="2">
                  {field.required ? (
                    <RedAsteriskText error={errors[key]?.message}>
                      {field.label}
                    </RedAsteriskText>
                  ) : (
                    <Text bold>{field.label}</Text>
                  )}
                  <Controller
                    control={control}
                    name={key}
                    rules={
                      field.required
                        ? {
                            required: `${field.label} là bắt buộc`,
                            validate: validateNotEmpty,
                          }
                        : {}
                    }
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        {field.type === "text" && (
                          <Input
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={"Chọn " + field.label}
                          />
                        )}
                        {field.type === "select" && (
                          <CustomSelect
                            options={field.options!}
                            value={value}
                            onChange={onChange}
                            placeholder={"Chọn " + field.label}
                          />
                        )}
                        {field.type === "imagePicker" && (
                          <Stack>
                            <Button onPress={() => pickImage(key)}>
                              Chọn ảnh
                            </Button>
                            {value &&
                              console.log("Value: " + value.FileNameList)}
                            {value && Array.isArray(value.FileNameList) && (
                              <ImageCarouselURI
                              onRemoveImage={(image) => handleRemoveImagePicked(key, image)}
                                images={value.URI}
                              />
                            )}
                          </Stack>
                        )}
                        {initialData.hinhAnhCoSan && (
                          <ImageCarousel
                            onRemoveImage={(image) => handleRemoveImage(key,image)}
                            images={initialData.hinhAnhCoSan}
                          />
                        )}
                        <Stack></Stack>
                      </>
                    )}
                  />
                </FormControl>
              );
            }}
            keyExtractor={(item) => item}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2} alignItems="end" alignContent="end">
            <Button
              w="40%"
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                reset();
                onClose();
              }}
            >
              Hủy
            </Button>
            <Button w="40%" onPress={handleSubmit(onSubmit)}>
              {action}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default GlobalModal;
