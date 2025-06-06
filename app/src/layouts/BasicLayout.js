import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { MyStatusBar, Search } from '../components/Shared';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDocumentTitle } from '../hooks';

export function BasicLayout(props) {
  const {
    children,
    showBack = true,
    textTitleCenter = '',
    hideSearch = true,
  } = props;

  const navigation = useNavigation();

  // Establecer el título del documento (siempre será "Ecommerce App")
  useDocumentTitle();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <MyStatusBar
        backgroundColor="#16222b"
        barStyle="light-content"
        translucent={false}
      />

      {/* Header con botón de regreso y título */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#16222b',
          padding: 10,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {showBack && (
            <TouchableOpacity
              onPress={goBack}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {textTitleCenter ? (
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {textTitleCenter}
            </Text>
          </View>
        ) : null}

        <View style={{ flex: 1 }} />
      </View>

      {!hideSearch && <Search.Input />}

      <ScrollView>{children}</ScrollView>
    </>
  );
}
