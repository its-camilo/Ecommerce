import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { storageCtrl } from '../../../api/storage';

export function ServerHealthCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState(null);

  const checkServer = async () => {
    setIsChecking(true);

    try {
      // Verificar conectividad básica
      const connectionResult = await storageCtrl.testServerConnection();
      console.log('🔍 Connection test:', connectionResult);

      // Verificar salud específica de Strapi
      const healthResult = await storageCtrl.checkStrapiHealth();
      console.log('🏥 Health check:', healthResult);

      let message = '';
      let toastType = 'info';

      if (
        connectionResult.status === 'ok' &&
        healthResult.status === 'healthy'
      ) {
        message = '✅ Servidor Strapi funcionando correctamente';
        toastType = 'success';
      } else if (
        connectionResult.status === 'ok' &&
        healthResult.status === 'unhealthy'
      ) {
        message = '⚠️ Servidor accesible pero Strapi tiene problemas internos';
        toastType = 'warning';
      } else {
        message = `❌ ${connectionResult.message || healthResult.message}`;
        toastType = 'error';
      }

      setLastCheck({
        timestamp: new Date().toLocaleTimeString(),
        message,
        status: healthResult.status,
      });

      Toast.show(message, {
        position: Toast.positions.CENTER,
        duration: Toast.durations.LONG,
      });
    } catch (error) {
      console.error('Error en verificación del servidor:', error);
      Toast.show('Error al verificar el servidor', {
        position: Toast.positions.CENTER,
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
      }}
    >
      <Button
        mode="outlined"
        onPress={checkServer}
        loading={isChecking}
        disabled={isChecking}
        style={{ marginBottom: 8 }}
      >
        🔍 Verificar Estado del Servidor
      </Button>

      {lastCheck && (
        <Text style={{ fontSize: 12, textAlign: 'center', color: '#666' }}>
          Última verificación: {lastCheck.timestamp}
        </Text>
      )}

      {lastCheck && (
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            marginTop: 4,
            color: lastCheck.status === 'healthy' ? 'green' : 'red',
          }}
        >
          {lastCheck.message}
        </Text>
      )}
    </View>
  );
}
