import * as React from "react";
import { View, Dimensions, Image, ImageSourcePropType } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import { SERVER_URL } from "@/constants/serverURL";
import { SBImageItem } from "@/components/SBImageItem";
import { useToggleButton } from "@/hooks/useToggleButton";
import { Button } from "native-base";

const scale = 1;
const PAGE_WIDTH = Dimensions.get("window").width * scale;
const PAGE_HEIGHT = 240 * scale;

const ImageCarouselURI = ({
  images,
  onRemoveImage,
}: {
  images: string[];
  onRemoveImage: (image: string) => void;
}) => {
  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const rotateZ = `${interpolate(value, [-1, 0, 1], [-45, 0, 45])}deg`;
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH]
    );
    // Function to handle image removal

    return {
      transform: [{ rotateZ }, { translateX }],
      zIndex,
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        autoPlayInterval={2000}
        scrollAnimationDuration={2000}
        style={{
          width: PAGE_WIDTH,
          height: 240,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={images}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1 }}>
              <SBImageItem
                index={index}
                img={{ uri: item }}
                showIndex={false}
              />
              <Button
                onPress={() => {
                  onRemoveImage(item);
                }}
              >
                Remove
              </Button>
            </View>
          );
        }}
        autoPlay={true}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default ImageCarouselURI;
