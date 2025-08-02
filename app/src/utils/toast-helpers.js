import Toast from 'react-native-root-toast';

export const showServerErrorToast = (
  error,
  action = 'realizar la operación'
) => {
  let message = '';

  if (error.message?.includes('500') || error.status === 500) {
    message = `⚠️ Error del servidor (500): No se pudo ${action}. El servidor tiene problemas internos. Se reintentó automáticamente.`;
  } else if (error.message?.includes('401') || error.status === 401) {
    message = `🔒 Sesión expirada. Por favor, inicia sesión nuevamente.`;
  } else if (error.message?.includes('400') || error.status === 400) {
    message = `❌ Datos inválidos. Verifica la información ingresada.`;
  } else if (error.message?.includes('403') || error.status === 403) {
    message = `🚫 No tienes permisos para realizar esta acción.`;
  } else if (
    error.message?.includes('Network') ||
    error.message?.includes('network')
  ) {
    message = `🌐 Error de conexión. Verifica tu red. Se reintentó automáticamente.`;
  } else {
    message = error.message || `❌ Error al ${action}`;
  }

  Toast.show(message, {
    position: Toast.positions.CENTER,
    duration: Toast.durations.LONG,
    backgroundColor: '#d32f2f',
    textColor: 'white',
  });
};

export const showSuccessToast = message => {
  Toast.show(`✅ ${message}`, {
    position: Toast.positions.CENTER,
    duration: Toast.durations.SHORT,
    backgroundColor: '#388e3c',
    textColor: 'white',
  });
};

export const showWarningToast = message => {
  Toast.show(`⚠️ ${message}`, {
    position: Toast.positions.CENTER,
    duration: Toast.durations.LONG,
    backgroundColor: '#f57c00',
    textColor: 'white',
  });
};

export const showRetryToast = (attempt, maxAttempts, operation) => {
  Toast.show(`🔄 Reintentando ${operation} (${attempt}/${maxAttempts})...`, {
    position: Toast.positions.CENTER,
    duration: Toast.durations.SHORT,
    backgroundColor: '#2196f3',
    textColor: 'white',
  });
};
