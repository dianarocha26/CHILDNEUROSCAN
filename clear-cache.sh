#!/bin/bash

echo "🧹 Limpiando cache del proyecto..."

# Limpiar cache local
rm -rf dist
rm -rf node_modules/.vite
rm -rf .cache

# Rebuild
echo "🔨 Reconstruyendo proyecto..."
npm run build

echo "✅ Cache limpiado y proyecto reconstruido!"
echo ""
echo "📋 PASOS PARA VER LA APLICACION ACTUALIZADA:"
echo ""
echo "1. En tu navegador LOCAL:"
echo "   - Cierra TODAS las pestañas de localhost:5173"
echo "   - Abre una NUEVA pestaña"
echo "   - Ve a: http://localhost:5173"
echo ""
echo "2. Si aun ves la version vieja:"
echo "   - Presiona: Ctrl+Shift+Delete (Windows/Linux)"
echo "   - Presiona: Cmd+Shift+Delete (Mac)"
echo "   - Selecciona: 'Cached images and files'"
echo "   - Click: 'Clear data'"
echo ""
echo "3. Para VERCEL:"
echo "   - Ve a: https://vercel.com/dashboard"
echo "   - Encuentra tu proyecto: childneuroscan"
echo "   - Click en: 'Deployments'"
echo "   - Click en: 'Redeploy' en el ultimo deployment"
echo ""
echo "4. Para NETLIFY:"
echo "   - Ve a: https://app.netlify.com"
echo "   - Encuentra tu proyecto: childneuroscan"
echo "   - Click en: 'Deploys'"
echo "   - Click en: 'Trigger deploy' > 'Clear cache and deploy site'"
