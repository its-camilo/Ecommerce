import { View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { styles } from "./SearchInput.styles";

export function SearchInput() {
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Searchbar placeholder="Busca tu producto" autoCapitalize="none" style={styles.searchBar}/>
      </View>
    </View>
  );
}
