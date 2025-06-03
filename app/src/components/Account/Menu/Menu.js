import { View, Text, Alert } from 'react-native';
import { styles } from './Menu.styles';
import { List } from 'react-native-paper';
import { map } from 'lodash';
import { accountMenu, appMenu } from './Menu.data';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks';

export function Menu() {
  const navigation = useNavigation();

  const { logout } = useAuth();

  const alertLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'No',
        },
        {
          text: 'Si',
          onPress: () => console.log('Cerrar sesión'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader style={{ color: '#000' }}>Mi cuenta</List.Subheader>
        {map(accountMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            descriptionStyle={{ color: '#000' }}
            left={props => (
              <List.Icon {...props} icon={item.leftIcon} color="#000" />
            )}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
        <List.Subheader style={{ color: '#000' }}>App</List.Subheader>
        {map(appMenu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            description={item.description}
            descriptionStyle={{ color: '#000' }}
            left={props => (
              <List.Icon {...props} icon={item.leftIcon} color="#000" />
            )}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>

      <List.Section>
        <List.Item
          title="Cerrar sesión"
          titleStyle={styles.titleLogoutItem}
          description="Cierra sesión de tu cuenta"
          descriptionStyle={{ color: '#000' }}
          left={props => <List.Icon {...props} icon="logout" color="#000" />}
          onPress={alertLogout}
        />
      </List.Section>
    </>
  );
}
