import { View, Text } from 'react-native'
import { styles } from './Menu.styles'
import {List} from 'react-native-paper'
import {map} from 'lodash'
import {accountMenu, appMenu} from "./Menu.data"
import { useNavigation } from '@react-navigation/native'

export function Menu() {
    const navigation = useNavigation()

    const alertLogout = () => {
      console.log("Cerrar sesión")
    }

  return (
    <>
      <List.Section>
      <List.Subheader style={{ color: "#000" }}>Mi cuenta</List.Subheader>
        {map(accountMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            descriptionStyle={{ color: "#000" }}
            left={(props) => <List.Icon {...props} icon={item.leftIcon} color="#000" />}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
      <List.Subheader style={{ color: "#000" }}>App</List.Subheader>
        {map(appMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            descriptionStyle={{ color: "#000" }}
            left={(props) => <List.Icon {...props} icon={item.leftIcon} color="#000" />}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
        <List.Item
          title="Cerrar sesión"
          titleStyle={styles.titleLogoutItem}
          description="Cierra sesión de tu cuenta"
          descriptionStyle={{ color: "#000" }}
          left={(props) => <List.Icon {...props} icon="logout" color="#000" />}
          onPress={alertLogout}
        />
      </List.Section>
    </>
  )
}