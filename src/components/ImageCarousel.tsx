import 
  React, 
  { 
    useRef, 
    useState 
  } from 'react';
import { 
  FlatList, 
  Image, 
  Pressable, 
  StyleSheet,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import { WIDTH } from '../constants/Constants';

const ImageCarousel = ({
  images,
}: {
  images: string[];
}) => {
  const flatListRef = useRef<FlatList | null>(null);
  const viewConfig = { viewAreaCoveragePercentThreshold: 95}
  const [ activeIndex, setActiveIndex ] = useState(0);
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if(changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    };
  });

  const handlePressLeft = () => {
    if(activeIndex === 0) 
    return flatListRef.current?.scrollToIndex({
      animated: false,
      index: images.length - 1,
    });

    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1,
    });
  };

  const handlePressRight = () => {
    if(activeIndex === images.length - 1)
    return flatListRef.current?.scrollToIndex({
      animated: false,
      index: 0
    });

    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
    });
  };

  return (
    <>
      <FlatList
        data={images}
        horizontal
        ref={(ref) => (flatListRef.current = ref)}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='center'
        pagingEnabled
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfig}
        renderItem={({item, index}) => (
          <Image
            source={{ uri: item}}
            style={styles.img}  
          />
        )}
      />
      <Pressable
        onPress={handlePressLeft}
        style={{
          position: 'absolute',
          top: 95,
          left: 5
        }}
      >
        <MaterialCommunityIcons
          name='chevron-left' 
          size={42}
          color={colors.gray_light} 
        />
      </Pressable>
      <Pressable
        onPress={handlePressRight}
        style={{
          position: 'absolute',
          top: 95,
          right: 5
        }}
      >
        <MaterialCommunityIcons
          name='chevron-right' 
          size={42}
          color={colors.gray_light} 
        />
      </Pressable>
    </>
  )
}

export default ImageCarousel

const styles = StyleSheet.create({
  img: {
    height: 200, 
    width: WIDTH, 
    borderTopLeftRadius: 5, 
    borderTopRightRadius: 5, 
  }
})