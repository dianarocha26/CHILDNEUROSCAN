# Solucion de Problemas de Cache

## El Problema

Si ves la version antigua de la aplicacion (con muchas caracteristicas), es porque:

1. **Tu navegador tiene cache** de la version anterior
2. **Vercel/Netlify tienen cache** del deployment anterior
3. **Los archivos no se han actualizado** en el servidor

## La Nueva Version

La aplicacion actual es una **landing page simple** con:
- Selector de idioma EN/ES
- Hero section con titulo "ChildNeuroScan"
- 4 tarjetas de features (Tracking, Analysis, Resources, Community)
- Seccion de videos
- Colores: Azul y cyan (NO purple)

---

## Soluciones

### 1. Desarrollo Local (localhost:5173)

#### Opcion A: Hard Refresh
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

#### Opcion B: Limpiar Cache del Navegador
1. Presiona `Ctrl+Shift+Delete` (Windows) o `Cmd+Shift+Delete` (Mac)
2. Selecciona "Cached images and files"
3. Click "Clear data"
4. Cierra TODAS las pestanas de localhost:5173
5. Abre una NUEVA pestana
6. Ve a http://localhost:5173

#### Opcion C: Modo Incognito
1. Abre una ventana de incognito/privada
2. Ve a http://localhost:5173
3. Deberias ver la version nueva

#### Opcion D: Limpiar y Reconstruir
```bash
npm run build:clean
```

---

### 2. Vercel (Produccion)

#### Pasos Detallados:

1. **Ir al Dashboard**
   - Ve a https://vercel.com/dashboard
   - Busca tu proyecto: `childneuroscan`

2. **Ver Deployments**
   - Click en el proyecto
   - Click en la pestana "Deployments"

3. **Redeploy SIN Cache**
   - Click en el deployment mas reciente (el que esta arriba)
   - Click en los tres puntos `...` en la esquina superior derecha
   - Click en "Redeploy"
   - **IMPORTANTE:** Desmarca la opcion "Use existing Build Cache"
   - Click en "Redeploy"

4. **Esperar**
   - Espera 1-2 minutos a que termine el deployment
   - Veras un checkmark verde cuando este listo

5. **Limpiar Cache del CDN**
   - Ve a Settings > Data Cache
   - Click en "Purge Everything"
   - Confirma

6. **Verificar**
   - Ve a tu URL de produccion: https://tu-proyecto.vercel.app
   - Presiona `Ctrl+Shift+R` para hard refresh
   - Deberias ver la nueva version

---

### 3. Netlify (Produccion)

#### Pasos Detallados:

1. **Ir al Dashboard**
   - Ve a https://app.netlify.com
   - Busca tu proyecto: `childneuroscan`

2. **Clear Cache and Deploy**
   - Click en el proyecto
   - Click en la pestana "Deploys"
   - Click en el boton "Trigger deploy" (dropdown)
   - Selecciona "Clear cache and deploy site"

3. **Esperar**
   - Espera 1-2 minutos a que termine el deployment
   - Veras "Published" cuando este listo

4. **Verificar**
   - Ve a tu URL de produccion: https://tu-proyecto.netlify.app
   - Presiona `Ctrl+Shift+R` para hard refresh
   - Deberias ver la nueva version

---

### 4. GitHub (Si usas GitHub Pages)

1. **Verificar que los archivos estan actualizados**
   ```bash
   git status
   git log --oneline -5
   ```

2. **Si necesitas hacer un nuevo commit**
   ```bash
   git add .
   git commit -m "Update to simple landing page"
   git push origin main
   ```

3. **Force Rebuild en GitHub Actions**
   - Ve a tu repositorio en GitHub
   - Click en "Actions"
   - Click en el workflow mas reciente
   - Click en "Re-run all jobs"

---

### 5. Supabase (Base de Datos)

La base de datos NO afecta lo que ves en la pagina principal. La landing page es estatica y no hace llamadas a Supabase en la pantalla inicial.

---

## Verificacion

### Como saber si estas viendo la version nueva:

✅ **Version NUEVA (correcta):**
- Solo 4 secciones: Hero, Features, Videos
- 4 tarjetas de features: Tracking, Analysis, Resources, Community
- Selector de idioma EN/ES arriba a la derecha
- Colores: Azul y cyan
- Botones: "Get Started Free" y "Sign In"

❌ **Version VIEJA (incorrecta):**
- Muchas secciones
- Menu de navegacion complejo
- Dashboard, Screening, Reports, etc.
- Muchas features y herramientas

---

## Script Automatico

Usa el script incluido para limpiar todo:

```bash
chmod +x clear-cache.sh
./clear-cache.sh
```

Este script:
1. Limpia el cache local
2. Elimina archivos de build anteriores
3. Reconstruye el proyecto
4. Muestra instrucciones para Vercel y Netlify

---

## Aun no funciona?

### Diagnostico:

1. **Verifica que los archivos fuente son correctos:**
   ```bash
   cat src/App.tsx | head -50
   ```
   Deberias ver imports de Hero, Features, VideoSection

2. **Verifica el build:**
   ```bash
   cat dist/index.html | grep -A 5 "script"
   ```
   Deberias ver archivos con hashes nuevos

3. **Verifica las variables de entorno:**
   ```bash
   cat .env
   ```
   Deberias ver VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY

### Ultima Opcion: Rebuild Completo

```bash
# Limpiar TODO
rm -rf dist
rm -rf node_modules
rm -rf node_modules/.vite
rm -rf .cache

# Reinstalar
npm install

# Rebuild
npm run build

# Verificar
npm run preview
```

Luego ve a http://localhost:4173 y verifica que ves la version nueva.

---

## Resumen

El problema es 100% de cache. Los archivos fuente estan correctos. Solo necesitas:

1. **Local:** Hard refresh (Ctrl+Shift+R)
2. **Vercel:** Redeploy sin cache
3. **Netlify:** Clear cache and deploy

Eso es todo! 🎉
