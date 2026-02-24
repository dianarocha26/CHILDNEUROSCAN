# 🌐 Cómo Desplegar ChildNeuroScan en Hosting Gratuito

## 🎯 Opciones de Hosting GRATIS (100% Funcionales)

Tu app funciona perfectamente en estos servicios gratuitos:

---

## 1️⃣ Netlify (RECOMENDADO)

### ✅ Por qué Netlify:
- 🆓 **100% Gratis** para proyectos personales
- ⚡ **Deploy automático** desde GitHub
- 🌍 **CDN global** (carga rápido en todo el mundo)
- 🔒 **HTTPS automático** (SSL gratis)
- 🔄 **Actualizaciones instantáneas** (solo haces git push)
- 📊 **100 GB bandwidth/mes** gratis
- 🚀 **Build automático** en la nube

### 📋 Pasos para Desplegar:

#### A. Con GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/childneuroscan.git
   git push -u origin main
   ```

2. **Ve a Netlify:**
   - Visita: https://www.netlify.com
   - Crea cuenta (gratis con GitHub)
   - Click en "Add new site" > "Import an existing project"

3. **Conecta GitHub:**
   - Autoriza Netlify a acceder a GitHub
   - Selecciona tu repositorio "childneuroscan"

4. **Configura Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

5. **Añade Variables de Entorno:**
   - Ve a "Site settings" > "Environment variables"
   - Añade:
     - `VITE_SUPABASE_URL` = `https://bmgbpnwheaalmalyusep.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

6. **Deploy:**
   - Click "Deploy site"
   - Espera 2-3 minutos
   - ✅ ¡Listo! Tu URL será algo como: `https://childneuroscan.netlify.app`

#### B. Sin GitHub (Deploy Manual)

1. **Build local:**
   ```bash
   npm run build
   ```

2. **Instala Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

3. **Login:**
   ```bash
   netlify login
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

5. **Añade variables de entorno** desde el dashboard de Netlify

### 🔧 Tu archivo `netlify.toml` ya está configurado:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 2️⃣ Vercel (Tu Actual)

### ✅ Por qué Vercel:
- 🆓 **100% Gratis** para proyectos personales
- ⚡ **Deploy automático** desde GitHub
- 🌍 **Edge Network global**
- 🔒 **HTTPS automático**
- 📊 **100 GB bandwidth/mes**
- 🚀 **Optimizaciones automáticas**

### 📋 Ya lo tienes configurado, pero si quieres reconfigurarlo:

1. **Ve a Vercel:**
   - https://vercel.com
   - Importa desde GitHub

2. **Configuración automática** (Vercel detecta Vite automáticamente)
   ```
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Variables de entorno:**
   - Settings > Environment Variables
   - Añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`

4. **Deploy:**
   - Automático con cada `git push`
   - URL: `https://childneuroscan.vercel.app`

---

## 3️⃣ GitHub Pages (Súper Simple)

### ✅ Por qué GitHub Pages:
- 🆓 **100% Gratis**
- 📦 **Integrado con GitHub**
- 🔒 **HTTPS automático**
- 🌐 **Dominio personalizado gratis** (tu-usuario.github.io)

### 📋 Pasos:

1. **Instala gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Modifica `package.json`:**
   ```json
   {
     "homepage": "https://TU-USUARIO.github.io/childneuroscan",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Añade variables de entorno al build:**
   Crea `.env.production`:
   ```env
   VITE_SUPABASE_URL=https://bmgbpnwheaalmalyusep.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Configura en GitHub:**
   - Ve a tu repo > Settings > Pages
   - Source: "gh-pages" branch
   - ✅ Tu sitio estará en: `https://TU-USUARIO.github.io/childneuroscan`

⚠️ **NOTA:** GitHub Pages tiene limitaciones con SPA routing. Mejor usa Netlify o Vercel.

---

## 4️⃣ Cloudflare Pages (Más Rápido)

### ✅ Por qué Cloudflare Pages:
- 🆓 **100% Gratis ilimitado**
- ⚡ **Red más rápida del mundo** (CDN de Cloudflare)
- 🔒 **HTTPS automático**
- 📊 **Bandwidth ilimitado**
- 🚀 **Deploy automático**

### 📋 Pasos:

1. **Ve a Cloudflare Pages:**
   - https://pages.cloudflare.com
   - Crea cuenta (gratis)

2. **Conecta GitHub:**
   - "Create a project"
   - Conecta tu repositorio

3. **Build settings:**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   ```

4. **Variables de entorno:**
   - Añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`

5. **Deploy:**
   - Automático
   - URL: `https://childneuroscan.pages.dev`

---

## 5️⃣ Render (Backend + Frontend)

### ✅ Por qué Render:
- 🆓 **Plan gratuito generoso**
- 🔧 **Incluye bases de datos** (si necesitas más adelante)
- 🔒 **HTTPS automático**
- 🌐 **Global CDN**

### 📋 Pasos:

1. **Ve a Render:**
   - https://render.com
   - Crea cuenta

2. **New Static Site:**
   - Conecta GitHub
   - Selecciona tu repo

3. **Build settings:**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

4. **Variables de entorno:**
   - Añade tus variables de Supabase

5. **Deploy:**
   - Automático
   - URL: `https://childneuroscan.onrender.com`

⚠️ **NOTA:** Render free tier puede dormir después de 15 min inactivo.

---

## 6️⃣ Firebase Hosting (Google)

### ✅ Por qué Firebase:
- 🆓 **10 GB storage gratis**
- ⚡ **CDN global de Google**
- 🔒 **HTTPS automático**
- 📊 **Bandwidth generoso**

### 📋 Pasos:

1. **Instala Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Inicializa:**
   ```bash
   firebase init hosting
   ```
   - Public directory: `dist`
   - Single-page app: `Yes`
   - GitHub deploys: `No` (o Yes si quieres)

4. **Build:**
   ```bash
   npm run build
   ```

5. **Deploy:**
   ```bash
   firebase deploy
   ```

6. **URL:** `https://childneuroscan.web.app`

---

## 7️⃣ Surge.sh (Más Simple)

### ✅ Por qué Surge:
- 🆓 **Gratis ilimitado**
- ⚡ **Deploy en 10 segundos**
- 🔧 **Súper simple** (solo 2 comandos)

### 📋 Pasos:

1. **Instala Surge:**
   ```bash
   npm install -g surge
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   cd dist
   surge
   ```

4. **Sigue las instrucciones:**
   - Email (primera vez)
   - Dominio (te sugiere uno o eliges)
   - ✅ ¡Listo!

⚠️ **NOTA:** Surge no maneja variables de entorno bien. Mejor usa Netlify.

---

## 📊 Comparación de Opciones

| Servicio | Gratis | Build Auto | CDN Global | HTTPS | Bandwidth | Velocidad Deploy |
|---|---|---|---|---|---|---|
| **Netlify** | ✅ | ✅ | ✅ | ✅ | 100 GB/mes | ⚡⚡⚡ |
| **Vercel** | ✅ | ✅ | ✅ | ✅ | 100 GB/mes | ⚡⚡⚡ |
| **Cloudflare** | ✅ | ✅ | ✅✅✅ | ✅ | Ilimitado | ⚡⚡⚡⚡ |
| **Render** | ✅ | ✅ | ✅ | ✅ | 100 GB/mes | ⚡⚡ |
| **Firebase** | ✅ | ⚠️ Manual | ✅ | ✅ | 10 GB/mes | ⚡⚡ |
| **GitHub Pages** | ✅ | ⚠️ Complejo | ⚠️ Básico | ✅ | 100 GB/mes | ⚡ |
| **Surge** | ✅ | ❌ | ⚠️ Básico | ✅ | Ilimitado | ⚡⚡⚡⚡ |

---

## 🏆 Recomendación Final

### Para tu caso (ChildNeuroScan):

**1. Netlify** (Mejor opción general)
- Deploy automático
- Variables de entorno fáciles
- PWA funciona perfecto
- Free tier generoso

**2. Cloudflare Pages** (Más rápido)
- Si quieres máxima velocidad
- Bandwidth ilimitado
- Mejor red global

**3. Quedarte en Vercel** (Si ya funciona)
- Ya lo tienes configurado
- Deploy automático
- Funciona perfecto

---

## 🚀 Plan de Acción Recomendado

### Opción A: Cambiar a Netlify

```bash
# 1. Asegúrate de tener GitHub repo
git remote -v

# 2. Push a GitHub si no lo has hecho
git push origin main

# 3. Ve a Netlify.com
# 4. Importa desde GitHub
# 5. Añade variables de entorno
# 6. Deploy automático
# 7. ¡Listo! URL: https://childneuroscan.netlify.app
```

### Opción B: Quedarte en Vercel

```bash
# No hagas nada - ya funciona
# Solo asegúrate que:
# 1. Variables de entorno estén configuradas
# 2. Deploy automático esté activo
# 3. HTTPS funcione
```

### Opción C: Usar ambos

```bash
# Puedes tener tu app en múltiples servicios:
# - Vercel: Producción principal
# - Netlify: Backup / Testing
# - Cloudflare: Para usuarios internacionales
```

---

## 🔧 Configuración Post-Deploy

### Después de desplegar en cualquier servicio:

1. **Verifica HTTPS:**
   - Tu URL debe empezar con `https://`
   - Si no, espera 5-10 minutos

2. **Prueba la instalación PWA:**
   - Abre en celular
   - Debe aparecer banner "Instalar app"
   - Instálala y pruébala

3. **Verifica Supabase:**
   - Crea cuenta de prueba
   - Guarda un screening
   - Verifica que se guarde en Supabase

4. **Prueba Offline:**
   - Abre la app
   - Activa modo avión
   - Debe seguir funcionando

5. **Configura Dominio Personalizado** (Opcional):
   - Compra dominio (ej: `childneuroscan.com`)
   - Configúralo en tu servicio de hosting
   - Todos los servicios soportan dominios custom

---

## 🌐 Dominio Personalizado

### Si quieres `childneuroscan.com` en vez de `....netlify.app`:

1. **Compra dominio:**
   - Namecheap: $10/año
   - Google Domains: $12/año
   - Cloudflare: $8/año

2. **Configura DNS:**
   - En Netlify/Vercel/etc: Settings > Domains > Add domain
   - Copia los DNS nameservers
   - Pega en tu registrador de dominios

3. **Espera 24-48h** para propagación

4. **HTTPS automático** se configura solo

---

## 💰 Planes Gratuitos: Límites

### Netlify Free:
- ✅ 100 GB bandwidth/mes
- ✅ 300 build minutos/mes
- ✅ Deploy ilimitados
- ✅ 1 usuario
- ✅ HTTPS automático
- ✅ CDN global

### Vercel Free:
- ✅ 100 GB bandwidth/mes
- ✅ 6000 build minutos/mes
- ✅ Deploy ilimitados
- ✅ HTTPS automático
- ✅ Edge Network

### Cloudflare Pages Free:
- ✅ Bandwidth **ILIMITADO**
- ✅ 500 builds/mes
- ✅ Deploy ilimitados
- ✅ HTTPS automático
- ✅ CDN más rápido del mundo

**¿Cuánto tráfico soportan?**
- 100 GB = ~200,000 visitas/mes (tu app es solo 322 KB)
- Más que suficiente para empezar

---

## 📱 Después de Deploy: Compartir con Usuarios

### Formas de compartir tu app:

1. **Link directo:**
   ```
   https://childneuroscan.netlify.app
   ```

2. **Código QR:**
   - Genera en: https://qr.io
   - Imprime y comparte
   - Escanean e instalan

3. **Redes sociales:**
   - Comparte el link
   - Meta tags ya configurados (preview bonito)

4. **WhatsApp/Email:**
   - Link + instrucciones de instalación
   - Referencia tu guía: `COMO_INSTALAR_EN_DISPOSITIVOS.md`

---

## 🆘 Problemas Comunes

### "Build failed"
**Solución:**
```bash
# Prueba build local primero
npm run build

# Si funciona local pero no en hosting:
# - Verifica versión de Node (usa Node 18+)
# - Verifica que package-lock.json esté en Git
# - Revisa logs de build en el dashboard
```

### "404 al recargar página"
**Solución:**
- Verifica que tu hosting tenga configurado SPA routing
- Netlify: usa `netlify.toml` (ya lo tienes)
- Vercel: usa `vercel.json` (ya lo tienes)

### "Variables de entorno no funcionan"
**Solución:**
- DEBEN empezar con `VITE_`
- Rebuild después de añadirlas
- No incluyas comillas en los valores

### "App no se puede instalar"
**Solución:**
- Verifica que uses HTTPS (no HTTP)
- Checa que `manifest.json` esté accesible: `https://tu-url.com/manifest.json`
- Verifica Service Worker: `https://tu-url.com/sw.js`

---

## ✅ Checklist Final

Antes de compartir tu app:

- [ ] Deploy exitoso en hosting
- [ ] HTTPS activo (URL empieza con https://)
- [ ] Variables de entorno configuradas
- [ ] App carga correctamente
- [ ] Login/registro funciona
- [ ] PWA se puede instalar en celular
- [ ] Funciona offline
- [ ] Supabase conecta correctamente
- [ ] Meta tags para compartir funcionan
- [ ] Dominio personalizado (opcional)

---

## 🎉 ¡Ya Está!

Una vez desplegada, tu app estará disponible 24/7 en:
- ✅ iPhone/iPad
- ✅ Android
- ✅ Windows
- ✅ Mac
- ✅ Linux
- ✅ Cualquier dispositivo con navegador moderno

**Instalable, offline, rápida y completamente gratis de hostear.**

---

**¿Necesitas ayuda desplegando?** Dime qué servicio elegiste y te guío paso a paso.
