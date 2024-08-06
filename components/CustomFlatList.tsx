import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

const CustomFlatList = <T extends unknown>({
  data,
  renderItem,
  keyExtractor,
}: CustomFlatListProps<T>) => {
  return (
      <FlatList
        nestedScrollEnabled={true}  
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomFlatList;