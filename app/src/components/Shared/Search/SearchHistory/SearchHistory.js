import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './SearchHistory.styles';
import { useState, useEffect } from "react";
import Toast from 'react-native-root-toast';
import { searchHistoryCtrl } from '@/src/api';
import { map } from 'lodash';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSearch } from '@/src/hooks';

export function SearchHistory(props) {
  const { open, height, onSearch } = props;
  const [history, setHistory] = useState(null);
  const { setSearchText } = useSearch();

  const containerStyles = { top: height };

  useEffect(() => {
    if (open) {
      getHistory();
    }
  }, [open]);

  const getHistory = async () => {
    try {
      const response = await searchHistoryCtrl.get();
      setHistory(response);
    } catch (error) {
      Toast.show('Error obteniendo historial de búsqueda', {
        position: Toast.positions.CENTER,
      });

    }
  }

  const onSearchWrapper = (text) => {
    onSearch(text);
    setSearchText(text);
  }

  if (!open) return null;
  return (
    <View style={[containerStyles, styles.container]}>
      {map(history, (item, index) => (
        <TouchableOpacity key={index} onPress={() => onSearchWrapper(item.search)}>
          <View style={styles.historyItem}>
            <Text style={styles.text}> {item.search} </Text>
            <AwesomeIcon name="arrow-right" size={16}/>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
