import * as React from "react";
import {
  View,
  Dimensions,
  Button,
  Text,
  ImageSourcePropType,
} from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import { SERVER_URL } from "@/constants/serverURL";
import { SBImageItem } from "@/components/SBImageItem";

const scale = 1;
const PAGE_WIDTH = Dimensions.get("window").width * scale;
const PAGE_HEIGHT = 240 * scale;

const ImageCarousel = ({ images, onRemoveImage }: { images: string[], onRemoveImage: (image: string) => void }) => {
  // State to keep track of removed images
  const [currentImages, setCurrentImages] = React.useState<string[]>(images);

  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const rotateZ = `${interpolate(value, [-1, 0, 1], [-45, 0, 45])}deg`;
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH]
    );

    return {
      transform: [{ rotateZ }, { translateX }],
      zIndex,
    };
  }, []);

  // Function to handle image removal
  const removeImage = (image: string) => {
    setCurrentImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        autoPlayInterval={2000}
        scrollAnimationDuration={2000}
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={currentImages}
        renderItem={({ item, index }) => (
          <View
            style={{ flex: 1 }}
          >
            <SBImageItem
              index={index}
              img={{ uri: `${SERVER_URL}/Uploads/${item}` }}
              showIndex={false}
            />
            <Button title="Remove" onPress={() => {onRemoveImage(item); removeImage(item);}} />
          </View>
        )}
        autoPlay={true}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default ImageCarousel;
