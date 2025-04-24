import { ScrollView } from 'react-native'
import { Search, MyStatusBar } from "../components/Shared"

export function BasicLayout(props) {
    const { children, hideSearch = false } = props
  return (
    <>
      <MyStatusBar backgroundColor="#16222b" barStyle="light-content" translucent={false} />
      {!hideSearch && <Search.Input />}
      <ScrollView>{children}</ScrollView>
    </>
  )
}

/*
import { ScrollView, StatusBar as RNStatusBar, SafeAreaView } from 'react-native'
import { Search } from "../components/Shared"

export function BasicLayout(props) {
    const { children, hideSearch = false } = props
  return (
    <>
      <RNStatusBar backgroundColor="#16222b" barStyle="light-content" />
      <SafeAreaView style={{backgroundColor: "#16222b", height: 20}} />
      {!hideSearch && <Search.Input />}
      <ScrollView>{children}</ScrollView>
    </>
  )
}
  */