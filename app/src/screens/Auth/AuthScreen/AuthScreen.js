import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { styles } from './AuthScreen.styles';
import { RegisterForm, LoginForm } from '../../../components/Auth';
import { useDocumentTitle } from '../../../hooks';
import logo from '../../../../assets/images/logo.png';

export function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);

  // Establecer el título del documento (siempre será "Ecommerce App")
  useDocumentTitle();

  const onShowLoginRegister = () => setShowLogin(prevState => !prevState);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {showLogin ? (
          <LoginForm showRegister={onShowLoginRegister} />
        ) : (
          <RegisterForm showLogin={onShowLoginRegister} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
