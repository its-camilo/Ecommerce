// Contador de errores 500 consecutivos
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

      console.warn(`⚠️ Error 500 #${consecutiveServerErrors} detectado`);

      // Si tenemos muchos errores consecutivos, mostrar alerta
      if (consecutiveServerErrors >= MAX_CONSECUTIVE_ERRORS) {
        console.error('🚨 ALERTA: Múltiples errores 500 detectados');
        console.error(
          '🔧 El servidor Strapi parece estar experimentando problemas'
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
    console.log('🔄 Contador de errores del servidor reiniciado');
  },
};
