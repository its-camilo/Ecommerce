// Contador de errores 500 consecutivos
import Toast from 'react-native-root-toast';
let consecutiveServerErrors = 0;
let lastServerErrorTime = null;
const MAX_CONSECUTIVE_ERRORS = 3;
const ERROR_RESET_TIME = 60000; // 1 minuto

export const serverErrorTracker = {
  trackError: status => {
    const now = Date.now();

    if (status === 500) {
      // Si han pasado más de 1 minuto desde el último error, reiniciar contador
      if (lastServerErrorTime && now - lastServerErrorTime > ERROR_RESET_TIME) {
        consecutiveServerErrors = 0;
      }

      consecutiveServerErrors++;
      lastServerErrorTime = now;

      // Si tenemos muchos errores consecutivos, mostrar alerta
      if (consecutiveServerErrors >= MAX_CONSECUTIVE_ERRORS) {
        Toast.show(
          `🚨 Problema sistémico detectado (${consecutiveServerErrors} errores 500 consecutivos). Por favor, intenta más tarde.`,
          {
            position: Toast.positions.CENTER,
            backgroundColor: '#D7263D',
            textColor: '#fff',
          }
        );
        return {
          isSystemicIssue: true,
          errorCount: consecutiveServerErrors,
          message: `Detectados ${consecutiveServerErrors} errores consecutivos del servidor. Problema sistémico probable.`,
        };
      }
    } else {
      // Si no es un 500, reiniciar contador
      consecutiveServerErrors = 0;
      lastServerErrorTime = null;
    }

    return {
      isSystemicIssue: false,
      errorCount: consecutiveServerErrors,
      message: null,
    };
  },

  getStatus: () => ({
    consecutiveErrors: consecutiveServerErrors,
    lastErrorTime: lastServerErrorTime,
    isInErrorState: consecutiveServerErrors >= MAX_CONSECUTIVE_ERRORS,
  }),

  reset: () => {
    consecutiveServerErrors = 0;
    lastServerErrorTime = null;
  },
};
