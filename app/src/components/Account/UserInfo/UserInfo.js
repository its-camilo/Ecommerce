import { View, Text } from 'react-native';
import { styles } from './UserInfo.styles';
import { useAuth } from '../../../hooks';

export function UserInfo() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, </Text>
      <Text style={styles.name}>
        {user?.firstname && user?.lastname
          ? `${user.firstname} ${user.lastname}`
          : user?.email}
      </Text>
    </View>
  );
}
