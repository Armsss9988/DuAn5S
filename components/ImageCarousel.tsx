import * as React from "react";
import { useEffect } from "react";
import {
  View,
  Dimensions,
  Button,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";
import { SERVER_URL } from "@/constants/serverURL";
import Item from "./Item";
const scale = 1;
const PAGE_WIDTH = Dimensions.get("window").width * scale;
const PAGE_HEIGHT = 240 * scale;

export type ImageSource = string | ImageSourcePropType;



const ImageCarousel = ({
  images,
  onRemoveImage,
}: {
  images: ImageSource[] | any;
  onRemoveImage: (image: ImageSource) => void;
}) => {
  const [currentImages, setCurrentImages] =
    React.useState<ImageSource[]>(images);
    useEffect(() => {
      setCurrentImages(images);
    }, [images]);
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

  const renderImage = (item: ImageSource) => {
    // console.log(`${item} is ${typeof item}`);
    if (typeof item === "string") {
      // Assume it's a URI or file name
      if (
        item.startsWith("http://") ||
        item.startsWith("https://") ||
        item.startsWith("data:image") ||
        item.startsWith("file://")
      ) {
        // It's a URI
        return <Image source={{ uri: item }} style={styles.image} />;
      } else {
        // It's a file name; construct URI from file name
        return (
          <Image
            source={{ uri: `${SERVER_URL}/Uploads/${item}` }}
            style={styles.image}
          />
        );
      }
    } else {
      // Direct ImageSourcePropType
      return <Image source={item} style={styles.image} />;
    }
  };

  const removeImage = (image: ImageSource) => {
    setCurrentImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        autoPlayInterval={2000}
        scrollAnimationDuration={2000}
        style={styles.carousel}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={currentImages}
        renderItem={({ item, index }) => (
          <View style={styles.carouselItem}>
            {renderImage(item)}
            <View style={styles.removeButtonContainer}>
              <Item
                title="Remove"
                onPress={() => {
                  onRemoveImage(item);
                  removeImage(item);
                }}
                icon={require("@/assets/images/btn/icon/create.png")}
              />
            </View>
          </View>
        )}
        autoPlay={true}
        customAnimation={animationStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  removeButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 40,
  },
});

export default ImageCarousel;
