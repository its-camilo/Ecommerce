/**
 * Sistema de reintentos para peticiones fallidas
 */
export const retryConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 segundo inicial
  backoffMultiplier: 2, // Duplicar el tiempo entre intentos
  retryableStatuses: [500, 502, 503, 504], // Errores de servidor que podemos reintentar
};

export const retryHandler = {
  /**
   * Ejecuta una función con reintentos automáticos
   */
  async executeWithRetry(
    asyncFunction,
    operation = 'operación',
    config = retryConfig
  ) {
    let lastError;

    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      try {
        // Mensaje de intento (opcional: usar logger si se desea)
        const result = await asyncFunction();
        return result;
      } catch (error) {
        lastError = error;
        const isRetryable = this.isRetryableError(error, config);
        if (!isRetryable || attempt === config.maxRetries) {
          // Mensaje de error final (opcional: usar logger si se desea)
          throw error;
        }
        const delay =
          config.retryDelay * Math.pow(config.backoffMultiplier, attempt - 1);
        // Mensaje de reintento (opcional: usar logger si se desea)
        await this.delay(delay);
      }
    }
    throw lastError;
  },

  /**
   * Verifica si un error puede ser reintentado
   */
  isRetryableError(error, config) {
    // Errores de red
    if (
      error.message?.includes('network') ||
      error.message?.includes('Network')
    ) {
      return true;
    }

    // Errores de servidor específicos
    if (error.status && config.retryableStatuses.includes(error.status)) {
      return true;
    }

    // Errores que contienen códigos de estado reintentables
    for (const status of config.retryableStatuses) {
      if (error.message?.includes(status.toString())) {
        return true;
      }
    }

    return false;
  },

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Configuración personalizada para diferentes operaciones
   */
  getConfigForOperation(operationType) {
    switch (operationType) {
      case 'auth':
        return { ...retryConfig, maxRetries: 2 }; // Menos reintentos para auth
      case 'user':
        return { ...retryConfig, maxRetries: 3 }; // Reintentos normales para usuarios
      case 'data':
        return { ...retryConfig, maxRetries: 5 }; // Más reintentos para datos no críticos
      default:
        return retryConfig;
    }
  },
};
