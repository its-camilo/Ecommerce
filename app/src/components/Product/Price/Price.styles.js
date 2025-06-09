import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerData: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  dataText: {
    fontSize: 18,
    color: '#747474',
    textAlign: 'right',
    width: '45%',
  },

  dataValue: {
    fontSize: 18,
    width: '55%',
    paddingLeft: 55,
  },

  oldPrice: {
    textDecorationLine: 'line-through',
  },

  currentPrice: {
    fontSize: 23,
    color: '#bc0e0d',
  },

  saving: {
    color: '#bc0e0d',
  },
});
