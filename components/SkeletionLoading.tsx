import { Skeleton, Center, VStack, HStack } from "native-base";
const SkeletonLoading = () => {
  return (
    <Center w="100%" h="100%">
      <VStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="blue.100" />
        <Skeleton size="5" rounded="full" />
        <Skeleton size="5" rounded="full" />
        <Skeleton size="5" rounded="full" />
        <Skeleton size="5" rounded="full" />
        <Skeleton size="5" rounded="full" />
      </VStack>
    </Center>
  );
};

export default SkeletonLoading;
