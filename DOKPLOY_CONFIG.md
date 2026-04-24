# Configuración de Dokploy

## Variables de Entorno Requeridas

Cuando despliegues en **Dokploy**, debes configurar la siguiente variable de entorno:

- **API_TARGET**: URL completa de tu API backend
  - Ejemplo: `https://tu-api.com`
  - O si está en el mismo servidor: `http://localhost:8001`

## Cómo Configurar en Dokploy

1. Ve a tu aplicación en Dokploy
2. Ve a **Variables de Entorno** o **Environment**
3. Añade una nueva variable:
   - Nombre: `API_TARGET`
   - Valor: `https://tu-api-real.com` (reemplaza con tu URL real)
4. Haz click en **Guardar** o **Deploy**

## Cómo Funciona

- **En desarrollo** (`npm run dev`):
  - Vite actúa como proxy: `/api` → `http://localhost:8001`
  
- **En producción** (Dokploy):
  - Nginx hace proxy: `/api` → valor de `API_TARGET`
  - El script `docker-entrypoint.sh` sustituye la variable de entorno en tiempo de runtime

## Troubleshooting

Si ves el error `Respuesta no es JSON válido: <!doctype html>...`:

1. Verifica que `API_TARGET` esté correctamente configurada en Dokploy
2. Comprueba que tu API esté accesible en esa URL
3. Asegúrate de que tu API devuelva JSON (no HTML)
4. Reinicia el contenedor después de cambiar `API_TARGET`
