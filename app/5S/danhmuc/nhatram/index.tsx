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
} from "native-base";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import CustomSelect from "@/components/CustomSelect";
import CustomStack from "@/components/CustomStack";
import HiddenSwipeItem from "@/components/HiddenSwipeItem";
import { useModal } from "@/hooks/useModal";
import GlobalModal from "@/components/GlobalModal";
import { SwipeListView } from "react-native-swipe-list-view";
import cshtService from "@/components/services/cshtService";
import CustomHeader from "@/components/CustomHeader";
import SkeletonLoading from "@/components/SkeletionLoading";

export default function DanhSachCSHT() {
  const [donvi, setDonvi] = useState("");
  const [toquanly, setToQuanLy] = useState("");
  const [csht, setCSHT] = useState("");
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const { isShowModal, showModal, closeModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<cshtItem | null>(null);
  const [dsCSHT, setDsCSHT] = useState<cshtItem[]>([]);
  const [donviOptions, setDonviOptions] = useState([]);
  const [toquanlyOptions, setToquanlyOptions] = useState([]);
  const [cshtOptions, setCshtOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await cshtService.GetDanhSachCSHT();
        setDsCSHT(response);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch CSHT items", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchOptions = async () => {
      try {
        // const donviResponse = await cshtService.GetDonViOptions();
        // const toquanlyResponse = await cshtService.GetToQuanLyOptions();
        // const cshtResponse = await cshtService.GetLoaiCSHTOptions();
        // setDonviOptions(donviResponse.data.map((item: any) => ({ label: item.name, value: item.id })));
        // setToquanlyOptions(toquanlyResponse.data.map((item: any) => ({ label: item.name, value: item.id })));
        // setCshtOptions(cshtResponse.data.map((item: any) => ({ label: item.name, value: item.id })));
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    };

    fetchData();
    fetchOptions();
  }, []);
  const itemData = [
    {
      icon: require("@/assets/images/btn/icon/create.png"),
      title: "Nhập mới",
      onPress: () => {
        setModalType("create");
        showModal();
      },
    },
  ];
  const buttonInItem = [
    {
      icon: require("@/assets/images/btn/icon/Sua.png"),
      title: "Sửa",
      onPress: () => {
        setModalType("edit");
        showModal();
      },
    },
    {
      icon: require("@/assets/images/btn/icon/delete.png"),
      title: "Xóa",
      onPress: () => showModal(),
    },
    {
      icon: require("@/assets/images/btn/icon/Gan.png"),
      title: "Gán loại trạm",
      onPress: () => showModal(),
    },
  ];

  const initialData: Record<string, FormField> = {
    donVi: {
      type: "select",
      label: "Đơn Vị",
      options: [
        { label: "Đơn Vị 1", value: "type1" },
        { label: "Đơn Vị 2", value: "type2" },
      ],
      required: true,
    },
    toQuanLy: {
      type: "select",
      label: "Tổ Quản Lý",
      options: [
        { label: "Tổ Quản Lý 1", value: "type1" },
        { label: "Tổ Quản Lý 2", value: "type2" },
      ],
      required: true,
    },
    loaiCSHT: {
      type: "select",
      label: "Loại CSHT",
      options: [
        { label: "Loại CSHT 1", value: "type1" },
        { label: "Loại CSHT 2", value: "type2" },
      ],
      required: true,
    },
    maCSHT: { type: "text", label: "Mã CSHT", required: true },
    tenCSHT: { type: "text", label: "Tên CSHT", required: true },
    diaChi: { type: "text", label: "Địa chỉ", required: false },
    anhTram: { type: "file", label: "Ảnh Trạm", required: false },
  };
  const editData: Record<string, any> = {
    donVi: "type2",
    toQuanLy: "type2",
    loaiCSHT: "type1",
    anhTram:
      "https://image.nhandan.vn/Uploaded/2024/unqxwpejw/2023_09_24/anh-dep-giao-thong-1626.jpg",
  };

  const handleCreate = async (data: cshtItem) => {
    try {
      const response = await cshtService.AddCSHT(data);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch CSHT items", error);
    }
  };

  const handleDelete = (item: any) => {
    console.log("haha");
  };

  return (
    <>
      <CustomHeader isBack={true} title="Danh Sach CSHT" />
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
              onChange={setDonvi}
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
              options={cshtOptions}
              value={csht}
              onChange={setCSHT}
              label="Chọn CSHT"
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
          >
            <Text bold fontSize={18} w="70%" textAlign="center">
              Danh sách CHST
            </Text>
            <Box alignSelf="end">
              <CustomStack items={itemData} />
            </Box>
          </HStack>

          <Box style={{ flex: 1 }}>
            {isLoading ? (
              <SkeletonLoading />
            ) : (
              <SwipeListView
                data={dsCSHT}
                renderItem={({ item }) => (
                  <InfrastructureListItem item={item} />
                )}
                renderHiddenItem={({ item }) => (
                  <HiddenSwipeItem items={buttonInItem} />
                )}
                rightOpenValue={-120}
                keyExtractor={(item) => item.idCSHT.toString()}
              />
            )}
          </Box>
        </Center>
      </View>
      {/* {modalType === "edit" && (
        <GlobalModal
          isOpen={isShowModal}
          onClose={() => {
            closeModal();
            setModalType(null);
          }}
          headerTitle="Sửa CSHT"
          data={initialData}
          initialData={editData}
          onSubmitModal={handleEdit}
          action="Sửa"
        />
      )}
      {modalType === "create" && (
        <GlobalModal
          isOpen={isShowModal}
          onClose={() => {
            closeModal();
            setModalType(null);
          }}
          headerTitle="Tạo CSHT"
          data={initialData}
          onSubmitModal={handleCreate()}
          action="Tạo"
        />
      )}  */}
    </>
  );
}

const InfrastructureListItem: React.FC<{ item: cshtItem }> = ({ item }) => (
  <Box
    style={styles.itemContainer}
    minWidth="99%"
    maxWidth="99%"
    borderRadius="md"
    rounded="8"
    overflow="hidden"
    borderWidth="1"
    borderColor="coolGray.300"
    bg="primary.600"
    my="1"
  >
    <HStack>
      <VStack maxWidth="49%" minWidth="49%" alignContent="left" bg="blue.200">
        <HStack borderColor="blue.100" borderRadius="8">
          <Text bold fontSize="xs">
            Đơn vị:{" "}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
            {item.tenDonVi}
          </Text>
        </HStack>
        <HStack>
          <Text bold fontSize="xs">
            Tổ Quản lý:{" "}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
            {item.tenToQuanLy}
          </Text>
        </HStack>
        <HStack>
          <Text bold fontSize="xs">
            Loại CSHT:{" "}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
            {item.tenLoaiCSHT}
          </Text>
        </HStack>
      </VStack>

      <VStack maxWidth="58%" minWidth="58%" alignContent="left" bg="blue.100">
        <HStack>
          <Text bold fontSize="xs">
            Mã CSHT:{" "}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
            {item.maCSHT}
          </Text>
        </HStack>
        <HStack>
          <Text bold fontSize="xs">
            Tên CSHT
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
            {item.tenCSHT}
          </Text>
        </HStack>
        <HStack>
          <Text bold fontSize="xs">
            Loại Trạm:{" "}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
            {item.tenLoaiTram}
          </Text>
        </HStack>
      </VStack>
    </HStack>

    <HStack minWidth="100%" bg="blue.300">
      <Text bold fontSize="xs">
        Địa Chỉ:{" "}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xs">
        {item.diaChi}
      </Text>
    </HStack>
  </Box>
);

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
const cshtOptions = [
  { label: "Nhà trạm", value: "ux" },
  { label: "Cloud", value: "ux" },
];
const toquanlyOptions = [
  { label: "Tổng hợp - Hành Chính", value: "th" },
  { label: "Phòng giải pháp 1", value: "web" },
  { label: "Phòng giải pháp 2", value: "cross" },
  { label: "Phòng kinh doanh", value: "ui" },
];
const donviOptions = [{ label: "Công đoàn trung tâm CNTT", value: "ux" }];
