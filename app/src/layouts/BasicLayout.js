import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import { Search, MyStatusBar } from "../components/Shared"
import { useNavigation } from '@react-navigation/native'

export function BasicLayout(props) {
  const { children, hideSearch = false, showBack = true, textTitleCenter = "" } = props
  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <>
      <MyStatusBar backgroundColor="#16222b" barStyle="light-content" translucent={false} />
      
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#16222b', padding: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {showBack && (
            <TouchableOpacity onPress={goBack}>
              <Text style={{ color: 'white', marginRight: 10 }}>{"<"} Back</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {textTitleCenter ? (
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{textTitleCenter}</Text>
          </View>
        ) : null}
        
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {!hideSearch && <Search.Input />}
        </View>
      </View>
      
      <ScrollView>{children}</ScrollView>
    </>
  )
}