import { View, Animated, Keyboard } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styles } from './SearchInput.styles';
import { AnimatedIcon, searchAnimation } from './SearchInput.animation';
import { useState } from 'react';
import { SearchHistory } from '../SearchHistory';
import { searchHistoryCtrl } from '@/src/api';
import { useSearch } from '@/src/hooks';
import { useNavigation } from '@react-navigation/native';
import { screensName } from '@/src/utils';

export function SearchInput() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [openHistory, setOpenHistory] = useState(false);
  const { searchText, setSearchText } = useSearch();
  const openCloseHistory = () => setOpenHistory(prevState => !prevState);
  const navigation = useNavigation();

  const openSearch = () => {
    searchAnimation.transition.start();
    openCloseHistory();
  };

  const closeSearch = () => {
    searchAnimation.transitionReset.start();
    Keyboard.dismiss();
    openCloseHistory();
  };

  const onSearch = async (reuseSearch) => {
    const isReuse = typeof reuseSearch === "string";

    if (!isReuse) {
      await searchHistoryCtrl.update(searchText);
    }

    closeSearch();
    navigation.navigate(screensName.home.search);
  };

  return (
    <View
      style={styles.container}
      onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, searchAnimation.arrow]}
          onPress={closeSearch}
        />
        <Animated.View
          style={[searchAnimation.input, { width: searchAnimation.inputWidth }]}
        >
          <Searchbar
            placeholder="Busca tu producto"
            autoCapitalize="none"
            style={styles.searchBar}
            onFocus={openSearch}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={onSearch}
          />
        </Animated.View>
      </View>
      <SearchHistory
        open={openHistory}
        height={containerHeight}
        onSearch={onSearch}
      />
    </View>
  );
}
