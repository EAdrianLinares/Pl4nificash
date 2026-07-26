# DOCUMENTACIÓN DE API REST - Pl4nificash

## 1. BASE URL
```
Desarrollo: http://localhost:3000
Producción: https://api.planificash.com (ejemplo)
```

## 2. AUTENTICACIÓN

### Esquema de Autenticación
- **Tipo:** Bearer Token (JWT)
- **Header:** `Authorization: Bearer <token>`
- **Expiración:** 24 horas

### Estructura JWT
```json
{
  "sub": "usuario-id",
  "email": "usuario@example.com",
  "iat": 1234567890,
  "exp": 1234654290
}
```

---

## 3. ENDPOINTS DE AUTENTICACIÓN

### 3.1 Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "nombre": "Juan Pérez",
  "password": "MiPassword123!"
}
```

**Respuesta Exitosa (201):**
```json
{
  "id": "uuid-v4",
  "email": "usuario@example.com",
  "nombre": "Juan Pérez",
  "createdAt": "2025-07-25T21:20:16Z"
}
```

**Errores:**
- `400`: Email ya registrado
- `400`: Validación fallida
- `500`: Error servidor

---

### 3.2 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "MiPassword123!"
}
```

**Respuesta Exitosa (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

**Errores:**
- `401`: Credenciales inválidas
- `404`: Usuario no encontrado
- `500`: Error servidor

---

## 4. ENDPOINTS DE USUARIOS

### 4.1 Obtener Perfil Actual
```http
GET /usuarios/me
Authorization: Bearer <token>
```

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid-v4",
  "email": "usuario@example.com",
  "nombre": "Juan Pérez",
  "createdAt": "2025-07-25T21:20:16Z"
}
```

**Errores:**
- `401`: No autenticado
- `404`: Usuario no encontrado

---

### 4.2 Obtener Todos los Usuarios (Admin)
```http
GET /usuarios
Authorization: Bearer <token>
```

**Parámetros Query:**
- `page`: Número de página (default: 1)
- `limit`: Registros por página (default: 10)
- `search`: Buscar por email o nombre

**Respuesta Exitosa (200):**
```json
{
  "data": [
    {
      "id": "uuid-v4",
      "email": "usuario1@example.com",
      "nombre": "Usuario 1",
      "createdAt": "2025-07-25T21:20:16Z"
    },
    {
      "id": "uuid-v4",
      "email": "usuario2@example.com",
      "nombre": "Usuario 2",
      "createdAt": "2025-07-25T21:20:16Z"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10
}
```

---

### 4.3 Obtener Usuario por ID
```http
GET /usuarios/{id}
Authorization: Bearer <token>
```

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid-v4",
  "email": "usuario@example.com",
  "nombre": "Juan Pérez",
  "createdAt": "2025-07-25T21:20:16Z"
}
```

**Errores:**
- `401`: No autenticado
- `404`: Usuario no encontrado

---

### 4.4 Actualizar Usuario
```http
PATCH /usuarios/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Juan Pérez Actualizado",
  "email": "nuevo@example.com"
}
```

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid-v4",
  "email": "nuevo@example.com",
  "nombre": "Juan Pérez Actualizado",
  "createdAt": "2025-07-25T21:20:16Z"
}
```

**Errores:**
- `401`: No autenticado
- `403`: Permisos insuficientes
- `404`: Usuario no encontrado
- `400`: Email ya en uso

---

### 4.5 Eliminar Usuario
```http
DELETE /usuarios/{id}
Authorization: Bearer <token>
```

**Respuesta Exitosa (204):**
```
Sin contenido
```

**Errores:**
- `401`: No autenticado
- `403`: Permisos insuficientes
- `404`: Usuario no encontrado

---

## 5. ENDPOINTS DE MOVIMIENTOS

### 5.1 Listar Movimientos
```http
GET /movimientos
Authorization: Bearer <token>
```

**Parámetros Query:**
- `page`: Número de página (default: 1)
- `limit`: Registros por página (default: 20)
- `tipo`: Filtrar por tipo (INGRESO, EGRESO)
- `desde`: Fecha inicio (ISO 8601)
- `hasta`: Fecha fin (ISO 8601)
- `categoria`: Filtrar por categoría
- `ordenar`: Campo de orden (fecha, monto)
- `direccion`: asc | desc

**Respuesta Exitosa (200):**
```json
{
  "data": [
    {
      "id": "uuid-v4",
      "monto": 1000.50,
      "tipo": "INGRESO",
      "descripcion": "Salario mes de julio",
      "fecha": "2025-07-25",
      "categoria": "Salario",
      "createdAt": "2025-07-25T21:20:16Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

---

### 5.2 Obtener Movimiento por ID
```http
GET /movimientos/{id}
Authorization: Bearer <token>
```

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid-v4",
  "monto": 1000.50,
  "tipo": "INGRESO",
  "descripcion": "Salario mes de julio",
  "fecha": "2025-07-25",
  "categoria": "Salario",
  "createdAt": "2025-07-25T21:20:16Z"
}
```

---

### 5.3 Crear Movimiento
```http
POST /movimientos
Authorization: Bearer <token>
Content-Type: application/json

{
  "monto": 1000.50,
  "tipo": "INGRESO",
  "descripcion": "Salario mes de julio",
  "fecha": "2025-07-25",
  "categoria": "Salario"
}
```

**Validaciones:**
- `monto`: Número positivo requerido
- `tipo`: INGRESO o EGRESO requerido
- `descripcion`: String no vacío requerido
- `fecha`: Fecha válida no futura requerida
- `categoria`: String opcional

**Respuesta Exitosa (201):**
```json
{
  "id": "uuid-v4",
  "monto": 1000.50,
  "tipo": "INGRESO",
  "descripcion": "Salario mes de julio",
  "fecha": "2025-07-25",
  "categoria": "Salario",
  "createdAt": "2025-07-25T21:20:16Z"
}
```

**Errores:**
- `400`: Validación fallida
- `401`: No autenticado
- `500`: Error servidor

---

### 5.4 Actualizar Movimiento
```http
PATCH /movimientos/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "monto": 1050.00,
  "descripcion": "Salario julio (corregido)"
}
```

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid-v4",
  "monto": 1050.00,
  "tipo": "INGRESO",
  "descripcion": "Salario julio (corregido)",
  "fecha": "2025-07-25",
  "categoria": "Salario",
  "createdAt": "2025-07-25T21:20:16Z"
}
```

**Errores:**
- `404`: Movimiento no encontrado
- `403`: Permisos insuficientes
- `400`: Validación fallida

---

### 5.5 Eliminar Movimiento
```http
DELETE /movimientos/{id}
Authorization: Bearer <token>
```

**Respuesta Exitosa (204):**
```
Sin contenido
```

**Errores:**
- `404`: Movimiento no encontrado
- `403`: Permisos insuficientes

---

## 6. ENDPOINTS DE MOVIMIENTOS RECURRENTES

### 6.1 Listar Movimientos Recurrentes
```http
GET /movimientos-recurrentes
Authorization: Bearer <token>
```

**Parámetros Query:**
- `page`: Número de página
- `limit`: Registros por página
- `activos`: true | false

**Respuesta Exitosa (200):**
```json
{
  "data": [
    {
      "id": "uuid-v4",
      "monto": 500.00,
      "tipo": "EGRESO",
      "descripcion": "Renta apartamento",
      "frecuencia": "MENSUAL",
      "proximaFecha": "2025-08-25",
      "fechaFin": null,
      "activo": true,
      "createdAt": "2025-07-25T21:20:16Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

---

### 6.2 Crear Movimiento Recurrente
```http
POST /movimientos-recurrentes
Authorization: Bearer <token>
Content-Type: application/json

{
  "monto": 500.00,
  "tipo": "EGRESO",
  "descripcion": "Renta apartamento",
  "frecuencia": "MENSUAL",
  "proximaFecha": "2025-08-25",
  "fechaFin": null
}
```

**Valores válidos para `frecuencia`:**
- `DIARIA` - Cada día
- `SEMANAL` - Cada semana
- `QUINCENA` - Cada 15 días
- `MENSUAL` - Cada mes
- `TRIMESTRAL` - Cada 3 meses
- `SEMESTRAL` - Cada 6 meses
- `ANUAL` - Cada año

**Respuesta Exitosa (201):**
```json
{
  "id": "uuid-v4",
  "monto": 500.00,
  "tipo": "EGRESO",
  "descripcion": "Renta apartamento",
  "frecuencia": "MENSUAL",
  "proximaFecha": "2025-08-25",
  "fechaFin": null,
  "activo": true,
  "createdAt": "2025-07-25T21:20:16Z"
}
```

---

### 6.3 Actualizar Movimiento Recurrente
```http
PATCH /movimientos-recurrentes/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "monto": 550.00,
  "descripcion": "Renta apartamento (aumentada)"
}
```

**Respuesta Exitosa (200):**
```json
{
  "id": "uuid-v4",
  "monto": 550.00,
  "tipo": "EGRESO",
  "descripcion": "Renta apartamento (aumentada)",
  "frecuencia": "MENSUAL",
  "proximaFecha": "2025-08-25",
  "fechaFin": null,
  "activo": true,
  "createdAt": "2025-07-25T21:20:16Z"
}
```

---

### 6.4 Eliminar Movimiento Recurrente
```http
DELETE /movimientos-recurrentes/{id}
Authorization: Bearer <token>
```

**Respuesta Exitosa (204):**
```
Sin contenido
```

---

## 7. CÓDIGOS DE ESTADO HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 204 | No Content - Solicitud exitosa, sin contenido |
| 400 | Bad Request - Parámetros inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Permisos insuficientes |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Email duplicado, etc. |
| 500 | Internal Server Error - Error servidor |

---

## 8. FORMATOS DE RESPUESTA

### Respuesta Exitosa
```json
{
  "statusCode": 200,
  "message": "OK",
  "data": { /* contenido */ },
  "timestamp": "2025-07-25T21:20:16Z"
}
```

### Respuesta Error
```json
{
  "statusCode": 400,
  "message": "Validación fallida",
  "error": "Bad Request",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ],
  "timestamp": "2025-07-25T21:20:16Z"
}
```

---

## 9. PAGINACIÓN

Todos los endpoints que retornan listas soportan paginación:

```json
{
  "data": [ /* items */ ],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

---

## 10. RATE LIMITING (Futuro)

- **Límite:** 100 solicitudes por minuto por usuario
- **Header de respuesta:** `X-RateLimit-Remaining`

---

## 11. EJEMPLOS CURL

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"MiPassword123!"}'
```

### Crear Movimiento
```bash
curl -X POST http://localhost:3000/movimientos \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "monto": 1000,
    "tipo": "INGRESO",
    "descripcion": "Salario",
    "fecha": "2025-07-25"
  }'
```

### Listar Movimientos
```bash
curl -X GET "http://localhost:3000/movimientos?tipo=INGRESO&page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```

