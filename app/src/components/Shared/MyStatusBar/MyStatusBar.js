import { StatusBar as StatusBarRN, SafeAreaView } from 'react-native';
import { styled } from './MyStatusBar.styles';

export function MyStatusBar(props) {
  const { backgroundColor, ...rest } = props;

  const styles = styled(backgroundColor);

  return (
    <>
      <StatusBarRN backgroundColor={backgroundColor} {...rest} />
      <SafeAreaView style={styles.SafeAreaView} />
    </>
  );
}
