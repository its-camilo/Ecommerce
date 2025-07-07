import { ScrollView } from 'react-native';
import { MyStatusBar } from '../components/Shared';

export function CartLayout(props) {
  const { children } = props;

  return (
    <>
      <MyStatusBar backgroundColor="#16222b" barStyle="light-content" />
      <ScrollView>{children}</ScrollView>
    </>
  );
}
