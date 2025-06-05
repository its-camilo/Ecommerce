import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#fff',
    width,
    height,
  },

  historyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderBottomWidth: 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: '#53005f',
    fontWeight: 'bold',
  }
});
