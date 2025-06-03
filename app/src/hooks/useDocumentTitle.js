import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function useDocumentTitle() {
  const FIXED_TITLE = 'Ecommerce App';

  // Función para actualizar el título
  const updateTitle = React.useCallback(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = FIXED_TITLE;
    }
  }, []);

  // Establecer el título cuando el componente se monta
  useEffect(() => {
    updateTitle();
  }, [updateTitle]);

  // Restaurar el título cuando la pantalla vuelve a estar en foco (navegación entre screens)
  useFocusEffect(
    React.useCallback(() => {
      updateTitle();
    }, [updateTitle])
  );

  // Manejar eventos de visibilidad de la página (cambio entre pestañas del navegador)
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          updateTitle();
        }
      };

      const handleFocus = () => {
        updateTitle();
      };

      const handlePageShow = () => {
        updateTitle();
      };

      // Agregar listeners para diferentes eventos
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);
      window.addEventListener('pageshow', handlePageShow);

      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('pageshow', handlePageShow);
      };
    }
  }, [updateTitle]);
}

export function setDocumentTitle() {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.title = 'Ecommerce App';
  }
}
