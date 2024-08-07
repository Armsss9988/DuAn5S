import {
  Box,
  View,
  Center,
  HStack,
  Text,
  VStack,
  Divider,
  IconButton,
  Icon,
  Spinner,
  Button,
  Pressable,
  Image,
} from "native-base";
import { StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import CustomSelect from "@/components/CustomSelect";
import CustomStack from "@/components/CustomStack";
import HiddenSwipeItem from "@/components/HiddenSwipeItem";
import { useModal } from "@/hooks/useModal";
import GlobalModal, { ModalFormData } from "@/components/GlobalModal";
import { SwipeListView } from "react-native-swipe-list-view";
import cshtService from "@/components/services/cshtService";
import CustomHeader from "@/components/CustomHeader";
import SkeletonLoading from "@/components/SkeletionLoading";
import hoancongService, {
  ImageInfo,
  HoanCongItemReq,
  HoanCongItemRes,
  LoadThongTinHoanCongRes,
  ToQuanlyReq,
} from "@/components/services/hoancongService";
import { AuthContext } from "@/components/services/AuthProvider";
import { getImages } from "../../../../utils/get-images";

export default function PhieuHoanCong() {
  const [donvi, setDonvi] = useState("");
  const [toquanly, setToQuanLy] = useState("");
  const [loaiCSHT, setLoaiCSHT] = useState("");
  const [phongtrao, setPhongtrao] = useState("");
  const [modalType, setModalType] = useState<"hoancong" | "khoaphieu" | null>(
    null
  );
  const { isShowModal, showModal, closeModal } = useModal();
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [dsPhieu, setDsPhieu] = useState<HoanCongItemRes[]>([]);
  const [donviOptions, setDonviOptions] = useState([]);
  const [toquanlyOptions, setToquanlyOptions] = useState([]);
  const [loaiCSHTOptions, setLoaiCSHTOptions] = useState([]);
  const [phongtraoOptions, setPhongTraoOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState<Record<string, any>>();
  const [selectedImage, setSelectedImage] = useState<string[]>();
  const [selectedImageContent, setSelectedImageContent] = useState<
    string[] | {}
  >();
  const [deletedImage, setDeletedImage] = useState<string[] | {}>();
  const [initModalData, setInitModalData] = useState<ImageInfo | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data: ToQuanlyReq = {
          idNhanvien: userInfo.id,
          idDonVi: userInfo.donViId,
        };
        try {
          const donviResponse = await hoancongService.LoadDonVi(data);
          const donviOptionsRes = donviResponse.map((item: any) => ({
            label: item.tenDonVi,
            value: item.id,
          }));
          donviOptionsRes.unshift({ label: "Tất cả", value: 0 });
          setDonviOptions(donviOptionsRes);
        } catch {
          console.log("Error fetch or set Donvi");
        }

        const phongtraoResponse = await hoancongService.LoadPhongTrao();
        const phongtraoOptionsRes = phongtraoResponse.map((item: any) => ({
          label: item.tenPhongTrao,
          value: item.id,
        }));
        phongtraoOptionsRes.unshift({ label: "Tất cả", value: 0 });
        setPhongTraoOptions(phongtraoOptionsRes);

        const cshtResponse = await hoancongService.LoadLoaiCSHT();
        const loaiCSHTOptionRes = cshtResponse.map((item: any) => ({
          label: item.tenLoaiCSHT,
          value: item.id,
        }));
        loaiCSHTOptionRes.unshift({ label: "Tất cả", value: 0 });
        setLoaiCSHTOptions(loaiCSHTOptionRes);
      } catch (error) {
        console.error("Failed to fetch items", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dsPhieu]);

  const HandleDanhSachPhieu = async () => {
    setIsLoading(true);
    const phieuData: HoanCongItemReq = {
      donVi: donvi,
      idPhongTrao: phongtrao,
      toQuanly: toquanly,
      loaiCSHT: loaiCSHT,
      idNhanVien: userInfo.id,
    };
    console.log(phieuData);
    try {
      const phieuResponse = await hoancongService.GetDanhSachPhieu(phieuData);
      setDsPhieu(phieuResponse);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoading(false);
    }
  };
  const HandleDonViChange = async (selectedValue: string) => {
    setDonvi(selectedValue);
    try {
      const toQuanLyResponse = await hoancongService.LoadDonViByToQuanLy(
        parseInt(selectedValue)
      );
      const toQuanlyOptionsRes = toQuanLyResponse.map((item: any) => ({
        label: item.tenDonVi,
        value: item.id,
      }));
      toQuanlyOptionsRes.unshift({ label: "Tất cả", value: 0 });
      setToquanlyOptions(toQuanlyOptionsRes);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };
  const handleUpdateAnh = async (formData: Record<string, any>) => {
    try {
      console.log("Form Data: " + JSON.stringify(formData));
      await hoancongService.LoadPhongTrao();
      Alert.alert("Update Ảnh", "Hoàn công thành công phiếu: " + formData?.id);
    } catch (error) {
      console.error("Failed to fetch CSHT items", error);
    }
  };

  const handleLongPress = (item: HoanCongItemRes) => {
    setIsMultiSelectMode(true);
    setSelectedItems((prevSelected) => new Set(prevSelected).add(item.id));
  };

  const handleItemPress = (item: HoanCongItemRes) => {
    if (isMultiSelectMode) {
      setSelectedItems((prevSelected) => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(item.id)) {
          newSelected.delete(item.id);
        } else {
          newSelected.add(item.id);
        }
        return newSelected;
      });
    }
  };

  const handleCompleteSelected = () => {
    // Handle the completion of selected items
    Alert.alert("Hoàn Công", "Hoàn công các phiếu đã chọn");
  };

  const handleLockSelected = () => {
    // Handle the locking of selected items
    Alert.alert("Khóa Phiếu", "Khóa các phiếu đã chọn");
  };
  const itemData = [
    {
      icon: require("@/assets/images/btn/icon/create.png"),
      title: "Lấy danh sách",
      onPress: () => {
        HandleDanhSachPhieu();
      },
    },
  ];
  const buttonInItem = (item: HoanCongItemRes) => {
    return [
      {
        icon: require("@/assets/images/btn/icon/save.png"),
        title: "Cập Nhật Ảnh",
        onPress: async () => {
          try {
            await SelectImage(item.id);
            setModalType("hoancong");
            showModal();
          } catch (error) {
            console.error("Failed to fetch items", error);
          }
        },
      },
      {
        icon: require("@/assets/images/btn/icon/khoaphieu.png"),
        title: "Khóa Phiếu",
        onPress: async () => {
          try {
            await SelectImage(item.id);
            setModalType("khoaphieu");
          } catch (error) {
            console.error("Failed to fetch items", error);
          } finally {
            showModal();
          }
        },
      },
    ];
  };

  const initData: Record<string, FormField> = {
    hinhAnh: { type: "imagePicker", label: "Ảnh", required: true },
  };
  const SelectImage = async (id: number) => {
    try {
      const res: LoadThongTinHoanCongRes =
        await hoancongService.LoadThongTinHoanCong(id);
      console.log("Hinh anh co thong tin la: " + res.hinhAnh);
      setInitModalData(res.hinhAnh ? res.hinhAnh : undefined);
      setSelectedImage(res.hinhAnh ? res.hinhAnh.FileNameList : []);
      setSelectedImageContent(res.hinhAnh ? res.hinhAnh.FileContentList : []);
      setDeletedImage(res.hinhAnh ? res.hinhAnh.deletedFileNames : []);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  const handleHoanCong = async () => {
    try {
    } catch (error) {
      console.error("Failed to fetch CSHT items", error);
    }
  };

  const handleDelete = (item: any) => {
    console.log("haha");
  };
  const HoanCongListItem: React.FC<{ item: HoanCongItemRes }> = ({ item }) => {
    const isSelected = selectedItems.has(item.id);
    return (
      <Pressable
        onLongPress={() => handleLongPress(item)}
        onPress={() => handleItemPress(item)}
        style={{
          ...styles.itemContainer,
        }}
      >
        <Box
          style={styles.itemContainer}
          minWidth="99%"
          maxWidth="99%"
          borderRadius="md"
          rounded="8"
          overflow="hidden"
          borderWidth={isSelected ? "3" : "1"}
          borderColor={isSelected ? "black.300" : "coolGray.200"}
          bg="primary.600"
          my="1"
        >
          <HStack>
            <VStack
              maxWidth="49%"
              minWidth="49%"
              alignContent="left"
              bg="blue.200"
            >
              <HStack borderColor="blue.100" borderRadius="8">
                <Text bold fontSize="xs">
                  Mã CSHT:{" "}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
                  {item.maCSHT}
                </Text>
              </HStack>
              <HStack>
                <Text bold fontSize="xs">
                  Tên CSHT{" "}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
                  {item.tenCSHT}
                </Text>
              </HStack>
              <HStack>
                <Text bold fontSize="xs">
                  Loại CSHT:{" "}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
                  {item.loaiCSHT}
                </Text>
              </HStack>
            </VStack>

            <VStack
              maxWidth="58%"
              minWidth="58%"
              alignContent="left"
              bg="blue.100"
            >
              <HStack>
                <Text bold fontSize="xs">
                  Loại Trạm:{" "}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
                  {item.loaiTram}
                </Text>
              </HStack>
              <HStack>
                <Text bold fontSize="xs">
                  Trạng Thái Phiếu:
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
                  {item.trangThaiPhieuGiaoNhanVien}
                </Text>
              </HStack>
              <HStack>
                <Text bold fontSize="xs">
                  Nhân Viên QL:{" "}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
                  {item.nhanVienQuanLy}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <HStack minWidth="100%" bg="blue.300">
            <Text bold fontSize="xs">
              Địa Chỉ:{" "}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs"></Text>
          </HStack>
        </Box>
      </Pressable>
    );
  };
  return (
    <>
      <CustomHeader isBack={true} title="Hoàn Công 5S" />
      <View borderRadius="md" style={{ flex: 1 }}>
        <Text fontSize={15} bold textAlign="left">
          Thông tin tra cứu
        </Text>
        <HStack alignItems="center">
          <Text fontSize={12} bold w="30%">
            Đơn vị
          </Text>
          <Box flex={1}>
            <CustomSelect
              options={donviOptions}
              value={donvi}
              onChange={HandleDonViChange}
              label="Chọn đơn vị"
            />
          </Box>
        </HStack>
        <HStack alignItems="center" my="1">
          <Text fontSize={12} bold w="30%">
            Tổ quản lý
          </Text>
          <Box flex={1}>
            <CustomSelect
              options={toquanlyOptions}
              value={toquanly}
              onChange={setToQuanLy}
              label="Chọn tổ quản lý"
            />
          </Box>
        </HStack>
        <HStack alignItems="center">
          <Text fontSize={12} bold w="30%">
            Loại CSHT
          </Text>
          <Box flex={1}>
            <CustomSelect
              options={loaiCSHTOptions}
              value={loaiCSHT}
              onChange={setLoaiCSHT}
              label="Chọn CSHT"
            />
          </Box>
        </HStack>
        <HStack alignItems="center">
          <Text fontSize={12} bold w="30%">
            Phong Trào
          </Text>
          <Box flex={1}>
            <CustomSelect
              options={phongtraoOptions}
              value={phongtrao}
              onChange={setPhongtrao}
              label="Chọn phong trào"
              defaultValue={phongtraoOptions[0]}
            />
          </Box>
        </HStack>
        <Divider mt="1" />
        <Center style={{ flex: 1 }} bg="gray.200">
          <HStack
            style={styles.title}
            bg="blue.100"
            w="100%"
            borderBottomRadius="5"
            borderColor="blue.900"
            borderWidth="3"
            borderRadius="5"
            alignContent="space-evenly"
            pr="2"
          >
            <Text bold fontSize={18} w="70%" textAlign="center">
              Danh sách Phiếu
            </Text>
            <Box alignSelf="end">
              <CustomStack items={itemData} />
            </Box>
          </HStack>

          <Box style={{ flex: 1 }}>
            {isLoading ? (
              <Spinner flex={1} accessibilityLabel="Đang lấy danh sách..." />
            ) : dsPhieu && dsPhieu.length > 0 ? (
              <SwipeListView
                data={dsPhieu}
                renderItem={({ item }) => <HoanCongListItem item={item} />}
                renderHiddenItem={({ item }) => (
                  <HiddenSwipeItem items={buttonInItem(item)} />
                )}
                rightOpenValue={-120}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text>Không có phiếu nào</Text>
            )}
          </Box>
          {isMultiSelectMode && (
            <HStack
              justifyContent="space-between"
              px={4}
              py={2}
              bg="primary.500"
            >
              <Button bgColor="blue" onPress={handleCompleteSelected}>
                Hoàn Công
              </Button>
              <Button bgColor="blue" onPress={handleLockSelected}>
                Khóa Phiếu
              </Button>
              <Button
                bgColor="blue"
                onPress={() => {
                  setIsMultiSelectMode(false);
                  setSelectedItems(new Set());
                }}
              >
                Hủy
              </Button>
            </HStack>
          )}
        </Center>
      </View>
      {modalType === "khoaphieu" && (
        <GlobalModal
          isOpen={isShowModal}
          onClose={() => {
            closeModal();
            setModalType(null);
          }}
          headerTitle="Sửa CSHT"
          data={initData}
          onSubmitModal={handleHoanCong}
          action="Sửa"
        />
      )}
      {modalType === "hoancong" && (
        <GlobalModal
          isOpen={isShowModal}
          onClose={() => {
            closeModal();
            setModalType(null);
          }}
          headerTitle="Cập Nhật Ảnh"
          data={initData}
          images={selectedImage ? selectedImage : []}
          onSubmitModal={
            async (formData) => {
              console.log("formdata: " + formData);
              await handleUpdateAnh(formData);
              setModalType(null);
            }
          }
          action="Cập Nhật"
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flex: 1,
    minWidth: 80,
    height: 80,
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 10,
  },
  title: {},
  itemContainer: {},
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
