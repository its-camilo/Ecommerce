import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function useDocumentTitle(title) {
  const titleRef = useRef(title);

  // Actualizar la referencia cuando el título cambie
  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  // Establecer el título cuando el componente se monta o el título cambia
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = title || 'Ecommerce App';
    }
  }, [title]);

  // Restaurar el título cuando la pantalla vuelve a estar en foco (navegación entre screens)
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        document.title = titleRef.current || 'Ecommerce App';
      }
    }, [])
  );

  // Manejar eventos de visibilidad de la página (cambio entre pestañas del navegador)
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          // La pestaña volvió a ser visible
          document.title = titleRef.current || 'Ecommerce App';
        }
      };

      const handleFocus = () => {
        // La ventana volvió a tener foco
        document.title = titleRef.current || 'Ecommerce App';
      };

      // Agregar listeners para diferentes eventos
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);

      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, []);
}

export function setDocumentTitle(title) {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.title = title || 'Ecommerce App';
  }
}
