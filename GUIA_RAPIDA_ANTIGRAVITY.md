# 🚀 Guía Rápida: Desplegar en Antigravity

## ⚡ 5 Pasos para Desplegar

### Paso 1: Preparar el Build
Tu proyecto ya está construido y listo. La carpeta `dist/` contiene todo lo necesario.

### Paso 2: Subir Archivos a Antigravity

**Opción A: Panel de Control Web**
1. Accede a tu cuenta de Antigravity
2. Busca "New Site" o "Nuevo Sitio"
3. Arrastra la carpeta `dist/` completa
4. O sube archivo por archivo manteniendo la estructura

**Opción B: FTP/SFTP**
1. Conecta por FTP usando las credenciales de Antigravity
2. Sube TODO el contenido de `dist/` a la raíz web
   - Normalmente es `/public_html/` o `/www/` o `/html/`

### Paso 3: Configurar Variables de Entorno

En el panel de Antigravity, configura:

```
VITE_SUPABASE_URL=https://bmgbpnwheaalmalyusep.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZ2JwbndoZWFhbG1hbHl1c2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NDE2NzEsImV4cCI6MjA4NzExNzY3MX0.C8xsjo1MMYvuvO5qG3SGshDNLCA4fzn6C-pXRf-oRUI
```

**Nota:** Estas variables ya están incluidas en el build, pero es mejor configurarlas también.

### Paso 4: Configurar Routing

**IMPORTANTE:** Para que la app funcione, necesitas configurar el routing SPA.

Busca en Antigravity una opción de "Rewrites" o "Redirects" y configura:
```
/* → /index.html (Status: 200)
```

Si no encuentras esta opción, los archivos `_redirects` y `.htaccess` ya están incluidos en el proyecto y deberían funcionar automáticamente.

### Paso 5: Verificar

Abre tu sitio y verifica:
- ✅ La página principal carga
- ✅ Puedes registrarte/iniciar sesión
- ✅ El dashboard funciona
- ✅ Los cuestionarios cargan

---

## 📁 Estructura que Debes Subir

```
Tu sitio en Antigravity debe quedar así:

/public_html/ (o /www/ o la raíz que te den)
├── index.html
├── assets/
│   ├── index-BcczNeMN.css
│   ├── icons-vendor-DGCMAzxw.js
│   ├── index-Dp6nb6dm.js
│   ├── supabase-vendor-D0umE-SA.js
│   └── react-vendor-DhfgfegJ.js
├── icon-*.png (8 archivos)
├── manifest.json
├── sw.js
├── _redirects
└── .htaccess
```

---

## ⚠️ Si Algo Sale Mal

### Problema: Pantalla en blanco
**Solución:** Abre DevTools (F12) y revisa la consola. Probablemente faltan archivos de `assets/`.

### Problema: Error 404 al recargar
**Solución:** El routing no está configurado. Contacta soporte de Antigravity para configurar rewrites.

### Problema: No puedes iniciar sesión
**Solución:** Verifica las variables de entorno en Antigravity.

---

## 🎯 Checklist Rápido

- [ ] Subí toda la carpeta `dist/` a Antigravity
- [ ] Configuré las variables de entorno
- [ ] Configuré el routing (/* → /index.html)
- [ ] La página principal carga sin errores
- [ ] El login funciona

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas específicos con Antigravity:
1. Comparte capturas del panel de control
2. Indica qué método de subida usas (FTP, panel web, Git)
3. Muestra cualquier error que aparezca en consola

---

**¡Tu app está lista para usuarios!** 🎉

Para más detalles, consulta `ANTIGRAVITY_DEPLOY.md`
