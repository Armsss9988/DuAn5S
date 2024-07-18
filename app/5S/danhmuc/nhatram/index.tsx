import { Box, View, Center, HStack, Text, VStack, Divider } from "native-base";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import CustomStack from "@/components/CustomStack";
import CustomFlatList from "@/components/CustomFlatList";
import { useModal } from "@/hooks/useModal";
import GlobalModal from "@/components/GlobalModal";

export default function DanhSachCSHT() {
  const [donvi, setDonvi] = useState("");
  const [toquanly, setToQuanLy] = useState("");
  const [csht, setCSHT] = useState("");
  const {
    isShowCreate,
    showCreate,
    closeCreate,
    isShowEdit,
    showEdit,
    closeEdit,
  } = useModal();

  const itemData = [
    {
      icon: require("@/assets/images/btn/icon/LayDS.png"),
      title: "Lấy DS",
      onPress: () => showCreate(),
    },
    {
      icon: require("@/assets/images/btn/icon/create.png"),
      title: "Nhập mới",
      onPress: () => showCreate(),
    },

    {
      icon: require("@/assets/images/btn/icon/Sua.png"),
      title: "Sửa",
      onPress: () => showEdit(),
    },
    {
      icon: require("@/assets/images/btn/icon/delete.png"),
      title: "Xóa",
      onPress: () => showEdit(),
    },
    {
      icon: require("@/assets/images/btn/icon/Gan.png"),
      title: "Gán loại trạm",
      onPress: () => showEdit(),
    },
    {
      icon: require("@/assets/images/btn/icon/Gan.png"),
      title: "Gán loại trạm",
      onPress: () => showEdit(),
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

  const handleSave = (data: Record<string, any>) => {
    console.log("Saved data:", data);
    // handle save logic
  };

  return (
    <>
      <View borderRadius="md" style={{ flex: 1 }}>
        <CustomStack items={itemData} />
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
        <HStack alignItems="center" my='1'>
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
          <Text style={styles.title} bold fontSize={18}>
            Danh sách CHST
          </Text>
          <Box style={{ flex: 1 }}>
            <CustomFlatList
              data={infrastructureData}
              renderItem={({ item }) => <InfrastructureListItem item={item} />}
              keyExtractor={(item) => item.codeCSHT}
            />
          </Box>
        </Center>
      </View>
      <GlobalModal
        isOpen={isShowEdit}
        onClose={() => closeEdit()}
        headerTitle="Sửa CSHT"
        data={initialData}
        initialData={editData}
        onSubmitModal={handleSave}
        action="Sửa"
      />
      <GlobalModal
        isOpen={isShowCreate}
        onClose={() => closeCreate()}
        headerTitle="Tạo CSHT"
        data={initialData}
        onSubmitModal={handleSave}
        action="Tạo"
      />
    </>
  );
}

const infrastructureData: InfrastructureItem[] = [
  {
    donvi: "ha",
    toquanly: "ah",
    typeCSHT: "d",
    codeCSHT: "fdsdf",
    nameCSHT: "sdsdv",
    typeTram: "cxcvx",
    address: "wewe",
  },
  {
    donvi: "vvv",
    toquanly: "ccc",
    typeCSHT: "hahahahahahahahahaah",
    codeCSHT: "zz",
    nameCSHT: "bb",
    typeTram: "nn",
    address: "tt",
  },
  {
    donvi: "vvv",
    toquanly: "ccc",
    typeCSHT: "hahahahahahahahahaah",
    codeCSHT: "zz",
    nameCSHT: "bb",
    typeTram: "nn",
    address: "tt",
  },
  {
    donvi: "vvv",
    toquanly: "ccc",
    typeCSHT: "hahaha",
    codeCSHT: "zsz",
    nameCSHT: "bb",
    typeTram: "nnsssssssssss",
    address: "tt",
  },
];
const InfrastructureListItem: React.FC<{ item: InfrastructureItem }> = ({
  item,
}) => (
  <Box
    style={styles.itemContainer}
    minWidth="99%"
    maxWidth="99%"
    mt="6"
    borderRadius="md"
    rounded="8"
    overflow="hidden"
    borderWidth="1"
    borderColor="coolGray.300"
    bg="primary.600"
  >
    <HStack>
      <VStack maxWidth="49%" minWidth="49%" alignContent="left" bg="blue.200">
        <HStack borderColor="blue.100" borderRadius="8">
          <Text bold>Đơn vị: </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.donvi}
          </Text>
        </HStack>
        <HStack>
          <Text bold>Tổ Quản lý: </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.toquanly}
          </Text>
        </HStack>
        <HStack>
          <Text bold>Loại CSHT: </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.typeCSHT}
          </Text>
        </HStack>
      </VStack>

      <VStack maxWidth="58%" minWidth="58%" alignContent="left" bg="blue.100">
        <HStack>
          <Text bold>Mã CSHT: </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.codeCSHT}
          </Text>
        </HStack>
        <HStack>
          <Text bold>Tên CSHT</Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.nameCSHT}
          </Text>
        </HStack>
        <HStack>
          <Text bold>Loại Trạm: </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.typeTram}
          </Text>
        </HStack>
      </VStack>
    </HStack>

    <HStack minWidth="100%" bg="blue.300">
      <Text bold>Địa Chỉ: </Text>
      <Text numberOfLines={1} ellipsizeMode="tail">
        {item.address}
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
