/**
 * Maneja respuestas de API de forma segura, evitando problemas de stream ya leído
 */
export const safeResponseHandler = {
  /**
   * Lee el texto de una respuesta de forma segura
   */
  async readText(response) {
    try {
      return await response.text();
    } catch (error) {
      return `Error ${response.status}`;
    }
  },

  /**
   * Lee el JSON de una respuesta de forma segura
   */
  async readJson(response) {
    try {
      return await response.json();
    } catch (error) {
      return { error: `Error ${response.status}` };
    }
  },

  /**
   * Maneja errores de respuesta con mensajes específicos
   */
  createErrorMessage(status, errorText) {
    switch (status) {
      case 400:
        return `Datos inválidos (400): ${errorText}`;
      case 401:
        return `No autorizado (401): Sesión expirada`;
      case 403:
        return `Prohibido (403): Sin permisos`;
      case 404:
        return `No encontrado (404): ${errorText}`;
      case 500:
        return `Error del servidor (500): Problema interno del servidor`;
      default:
        return `Error ${status}: ${errorText}`;
    }
  },

  /**
   * Verifica si una respuesta es exitosa y maneja errores de forma consistente
   */
  async handleResponse(response, operation = 'realizar la operación') {
    if (response.ok) {
      return response;
    }

    const errorText = await this.readText(response);
    const errorMessage = this.createErrorMessage(response.status, errorText);

    const error = new Error(errorMessage);
    error.status = response.status;
    error.details = errorText;

    throw error;
  },
};
