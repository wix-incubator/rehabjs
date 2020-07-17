import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import {useHooks} from './useHooks';

export const Component = ({componentId}) => {
  const {onPushScreenPress, user} = useHooks({componentId});
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Header />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Navigation example</Text>
          <Text style={styles.sectionDescription}>
            <Button
              testID="pushScreen"
              onPress={onPushScreenPress}
              title="Push screen"
            />
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>User info fetched from server</Text>
          <Text style={styles.sectionDescription}>
            {user ? (
              <>
                <Image style={styles.avatar} source={{uri: user.avatar}} />
                <Text>user.email}</Text>
              </>
            ) : null}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
    paddingBottom: 32,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});
