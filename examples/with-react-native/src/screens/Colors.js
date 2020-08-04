import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getColors} from '../services/color';

const keyExtractor = (user) => user.id;

const renderItem = ({item, index}) => {
  console.log(`Color_${item.id}`);
  return (
    <View style={{backgroundColor: item.color}} testID={`Color_${item.id}`}>
      <View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );
};

const Component = ({componentId}) => {
  const [colors, setColors] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const loadMore = useCallback(
    (p) => {
      if (page <= total) {
        getColors(p).then(({data, total: dataTotal}) => {
          setColors([...colors, ...data]);
          setPage(p + 1);
          setTotal(dataTotal);
        });
      }
    },
    [colors, page, total],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadMore(1), []);

  const onEndReached = useCallback(() => loadMore(page), [page, loadMore]);

  return (
    <FlatList
      data={colors}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Component;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    height: 300,
  },
  name: {
    fontSize: 30,
  },
});
