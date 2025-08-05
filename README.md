# Ecommerce

Ecommerce es una aplicación full-stack de comercio electrónico construida con **React Native (Expo)** para el frontend y **Strapi** como backend headless CMS. Permite la gestión de productos, usuarios, pedidos y cuenta con autenticación JWT, carrito persistente y búsqueda avanzada.

## Características principales

- **Frontend:** App móvil y web con Expo/React Native y soporte para Expo Router.
- **Backend:** Strapi CMS con base de datos SQLite (desarrollo) y endpoints RESTful.
- **Gestión de estado:** Context API para autenticación, carrito y búsqueda.
- **Persistencia:** AsyncStorage para datos locales (carrito, sesión, historial).
- **UI:** React Native Paper y componentes reutilizables.
- **Autenticación:** JWT, expiración automática y manejo de sesión.
- **Notificaciones:** Toasts para feedback al usuario.

## Estructura del proyecto

```
├── app/         # Frontend Expo/React Native
│   ├── src/
│   │   ├── api/           # Lógica de consumo de APIs
│   │   ├── components/    # Componentes organizados por dominio
│   │   ├── contexts/      # Contextos globales (Auth, Cart, Search)
│   │   ├── hooks/         # Custom hooks
│   │   ├── layouts/       # Layouts reutilizables
│   │   ├── lib/           # Utilidades de autenticación y fetch
│   │   ├── navigation/    # Navegación (Tabs, Stacks)
│   │   ├── screens/       # Pantallas agrupadas por dominio
│   │   ├── styles/        # Estilos globales y de formularios
│   │   └── utils/         # Constantes, helpers y utilidades
│   └── assets/            # Imágenes y fuentes
├── server/      # Backend Strapi
│   ├── config/           # Configuración de Strapi
│   ├── data/             # Datos de ejemplo y uploads
│   ├── src/              # Código fuente de Strapi
│   └── scripts/          # Scripts de seed
└── README.md
```

## Instalación y desarrollo

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/its-camilo/Ecommerce.git
   cd Ecommerce
   ```

2. **Instalar dependencias:**
   ```bash
   yarn install
   cd app && yarn install
   cd ../server && yarn install
   ```

3. **Configurar variables de entorno:**
   - Edita `app/src/utils/constants.js` y actualiza `API_URL` con tu IP local para desarrollo.

4. **Iniciar el backend (Strapi):**
   ```bash
   yarn develop
   # o desde la carpeta server
   cd server && yarn develop
   ```

5. **Iniciar el frontend (Expo):**
   ```bash
   cd app && yarn start
   ```

6. **(Opcional) Poblar datos de ejemplo:**
   ```bash
   cd server && yarn seed:example
   ```

## Accesos rápidos

- **Strapi Admin:** http://localhost:1337/admin
- **Frontend Expo:** http://localhost:8081

## Principales convenciones y patrones

- Navegación centralizada en `src/utils/screensName.js`.
- Todos los screens usan el layout `BasicLayout`.
- API calls en `src/api/` y fetch autenticado con `authFetch`.
- Contextos en `src/contexts/` y hooks personalizados en `src/hooks/`.
- Componentes compartidos en `src/components/Shared/`.
- Formularios con Formik + Yup.

## Licencia

MIT

