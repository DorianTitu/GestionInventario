# Gestión de Inventario

Aplicación web para gestionar inventario de productos con almacenamiento en JSON y localStorage.

## Características

- CRUD completo (crear, leer, actualizar, eliminar)
- Búsqueda en tiempo real
- Almacenamiento local en JSON
- Exportación de datos
- Interfaz minimalista y responsiva
- Alerta de stock bajo

## Requisitos

- Node.js 14+
- npm

## Instalación

```bash
npm install
```

## Uso

Iniciar servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Operaciones

- **Agregar**: Button "Agregar" para crear nuevo producto
- **Editar**: Button "Editar" en la fila del producto
- **Eliminar**: Button "Eliminar" y confirmar eliminación
- **Buscar**: Campo de búsqueda filtra por nombre, ID, color o material
- **Exportar**: Button "Exportar" descarga los datos en JSON

## Estructura de datos

```json
{
  "id": "FIL-001",
  "nombre": "Producto",
  "material": "PLA",
  "color": "Negro",
  "precioVenta": 22.00,
  "proveedor": "Proveedor",
  "stockActual": 50
}
```

## Tecnologías

- React 18
- Vite
- CSS3

## Almacenamiento

Los datos se guardan automáticamente en localStorage. No requiere backend.

## Campos disponibles

| Campo | Tipo |
|-------|------|
| ID | Texto |
| Nombre | Texto |
| Material | Selección |
| Color | Texto |
| Precio Venta | Número |
| Proveedor | Texto |
| Stock | Número |
