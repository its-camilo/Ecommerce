import { View, Text } from 'react-native';

export function Separator(props) {
  const { height } = props;

  return (
    <View style={{ height }}/>
  );
}