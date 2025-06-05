# Network Tools for Codespaces 🌐

Este proyecto ahora incluye herramientas de red para que puedas obtener información sobre tu IP y configuración de red en Codespaces.

## 🚀 Herramientas Instaladas

Después de reconstruir el devcontainer, tendrás acceso a:

- `ifconfig` - Mostrar interfaces de red
- `ip` - Herramientas modernas de red de Linux
- `ping` - Probar conectividad
- `nslookup` / `dig` - Herramientas DNS
- `netcat` - Utilidad de red
- `netstat` - Estadísticas de red

## 📝 Comandos Útiles

### Obtener tu IP pública:
```bash
curl https://ifconfig.me
```

### Ver todas las interfaces de red:
```bash
ip addr show
# o
ifconfig
```

### Ver tu IP interna:
```bash
hostname -I
```

### Script completo de información de red:
```bash
./.devcontainer/network-info.sh
```

### Ver puertos en uso:
```bash
netstat -tuln
# o
ss -tuln
```

### Ver rutas de red:
```bash
ip route show
```

## 🔧 Cómo Usar

1. **Reconstruir el Devcontainer**: Después de estos cambios, necesitas reconstruir tu Codespace:
   - En VS Code, abre la paleta de comandos (Ctrl+Shift+P)
   - Busca "Dev Containers: Rebuild Container"
   - Selecciona esa opción

2. **Una vez reconstruido**, puedes usar cualquiera de los comandos arriba mencionados.

3. **Para información completa de red**, simplemente ejecuta:
   ```bash
   ./.devcontainer/network-info.sh
   ```

## 🎯 Casos de Uso Comunes

- **Obtener IP pública**: `curl https://ifconfig.me`
- **Verificar si un puerto está abierto**: `netstat -tuln | grep :8081`
- **Probar conectividad**: `ping google.com`
- **Ver configuración DNS**: `cat /etc/resolv.conf`

## ⚠️ Nota Importante

Estas herramientas solo estarán disponibles **después de reconstruir el devcontainer**. Si intentas usarlas antes de la reconstrucción, verás errores de "command not found".
