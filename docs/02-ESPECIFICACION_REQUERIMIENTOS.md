# ESPECIFICACIÓN DE REQUERIMIENTOS DE SOFTWARE (SRS) - Pl4nificash

## 1. INTRODUCCIÓN

### 1.1 Propósito
Este documento especifica los requerimientos funcionales y no-funcionales de Pl4nificash, una aplicación de gestión de finanzas personales que permite a los usuarios registrar, monitorear y planificar sus movimientos financieros.

### 1.2 Alcance
La aplicación cubre:
- Gestión de usuarios (registro, autenticación, perfil)
- Registro de movimientos de dinero (ingresos y egresos)
- Configuración de movimientos recurrentes
- Visualización del estado financiero en dashboard
- Historial y reportes básicos de movimientos

### 1.3 Definiciones y Acrónimos
- **API:** Interfaz de Programación de Aplicaciones
- **JWT:** JSON Web Token
- **DTO:** Data Transfer Object
- **SDD:** Sistema de Desarrollo de Software
- **UI:** User Interface
- **UX:** User Experience

---

## 2. DESCRIPCIÓN GENERAL DEL SISTEMA

### 2.1 Perspectiva del Producto
Pl4nificash es una aplicación web que actúa como un asistente financiero personal, permitiendo:
- Control detallado de ingresos y gastos
- Automatización de operaciones recurrentes
- Visualización clara del estado financiero
- Toma de decisiones informadas basadas en datos

### 2.2 Funciones del Producto
1. **Autenticación y Gestión de Usuarios**
   - Registro de nuevos usuarios
   - Inicio de sesión seguro
   - Gestión de perfil de usuario

2. **Gestión de Movimientos**
   - Crear movimientos (ingresos/egresos)
   - Editar movimientos existentes
   - Eliminar movimientos
   - Listar y filtrar movimientos

3. **Movimientos Recurrentes**
   - Crear movimientos recurrentes
   - Establecer frecuencias (diaria, semanal, mensual, etc.)
   - Gestionar movimientos recurrentes

4. **Dashboard**
   - Mostrar resumen financiero
   - Indicadores clave (saldo disponible, ingresos, egresos)
   - Vista rápida de últimos movimientos

---

## 3. REQUERIMIENTOS FUNCIONALES

### 3.1 Módulo de Autenticación

#### RF-AUTH-001: Registro de Usuario
- **Descripción:** El sistema debe permitir a un nuevo usuario registrarse
- **Precondiciones:** Usuario no debe existir en el sistema
- **Flujo Principal:**
  1. Usuario ingresa email, nombre y contraseña
  2. Sistema valida que el email sea único
  3. Sistema valida formato de contraseña (mínimo 8 caracteres)
  4. Sistema crea cuenta y envía confirmación
  5. Usuario es redirigido al login
- **Postcondiciones:** Usuario registrado en base de datos

#### RF-AUTH-002: Login de Usuario
- **Descripción:** El sistema debe autenticar usuarios con email y contraseña
- **Precondiciones:** Usuario debe estar registrado
- **Flujo Principal:**
  1. Usuario ingresa email y contraseña
  2. Sistema valida credenciales
  3. Sistema genera JWT
  4. Usuario es redirigido al Dashboard
- **Postcondiciones:** Sesión activa, JWT almacenado en cliente

#### RF-AUTH-003: Cierre de Sesión
- **Descripción:** El sistema debe permitir cerrar sesión
- **Flujo Principal:**
  1. Usuario hace clic en logout
  2. Sistema elimina JWT del cliente
  3. Usuario es redirigido a login
- **Postcondiciones:** Sesión cerrada

---

### 3.2 Módulo de Movimientos

#### RF-MOV-001: Crear Movimiento
- **Descripción:** El sistema debe permitir crear un nuevo movimiento
- **Precondiciones:** Usuario autenticado
- **Datos Requeridos:**
  - Monto (decimal, positivo)
  - Tipo (INGRESO o EGRESO)
  - Descripción (texto)
  - Fecha
  - Categoría (opcional)
- **Validaciones:**
  - Monto debe ser > 0
  - Tipo debe ser válido
  - Descripción no puede estar vacía
  - Fecha no puede ser futura
- **Postcondiciones:** Movimiento creado en BD

#### RF-MOV-002: Listar Movimientos
- **Descripción:** El sistema debe mostrar todos los movimientos del usuario
- **Precondiciones:** Usuario autenticado
- **Criterios de Búsqueda:**
  - Por rango de fechas
  - Por tipo (ingreso/egreso)
  - Por descripción
  - Ordenar por fecha (ascendente/descendente)
- **Resultados:** Lista paginada de movimientos

#### RF-MOV-003: Editar Movimiento
- **Descripción:** El sistema debe permitir editar un movimiento existente
- **Precondiciones:** 
  - Usuario autenticado
  - Movimiento existe
  - Usuario es propietario del movimiento
- **Campos Editables:**
  - Monto
  - Tipo
  - Descripción
  - Fecha
  - Categoría
- **Postcondiciones:** Movimiento actualizado

#### RF-MOV-004: Eliminar Movimiento
- **Descripción:** El sistema debe permitir eliminar un movimiento
- **Precondiciones:**
  - Usuario autenticado
  - Usuario es propietario del movimiento
- **Flujo:** Usuario confirma eliminación → Sistema elimina registro
- **Postcondiciones:** Movimiento eliminado de BD

---

### 3.3 Módulo de Movimientos Recurrentes

#### RF-REC-001: Crear Movimiento Recurrente
- **Descripción:** El sistema permite crear movimientos que se repiten automáticamente
- **Datos Requeridos:**
  - Monto
  - Tipo (INGRESO/EGRESO)
  - Descripción
  - Frecuencia (diaria, semanal, mensual, anual)
  - Fecha de inicio
  - Fecha de fin (opcional)
- **Validaciones:**
  - Monto > 0
  - Frecuencia válida
  - Fecha inicio <= Fecha fin
- **Postcondiciones:** Movimiento recurrente creado

#### RF-REC-002: Ejecutar Movimientos Recurrentes
- **Descripción:** El sistema debe ejecutar automáticamente movimientos recurrentes según su frecuencia
- **Precondiciones:** Movimiento recurrente activo, próxima fecha vencida
- **Flujo:**
  1. Sistema detecta movimientos recurrentes vencidos
  2. Crea movimiento correspondiente
  3. Actualiza próxima fecha de ejecución
- **Postcondiciones:** Nuevo movimiento creado, recurrente actualizado

#### RF-REC-003: Gestionar Recurrentes
- **Descripción:** Permitir crear, editar, listar y eliminar movimientos recurrentes
- **Precondiciones:** Usuario autenticado
- **Operaciones:** CRUD completo

---

### 3.4 Módulo de Dashboard

#### RF-DASH-001: Mostrar Resumen Financiero
- **Descripción:** Dashboard debe mostrar indicadores clave
- **Indicadores:**
  - Saldo total
  - Ingresos (período actual)
  - Egresos (período actual)
  - Balance neto
  - Últimos 10 movimientos
- **Actualización:** En tiempo real

#### RF-DASH-002: Visualizar Gráficos
- **Descripción:** Mostrar representación visual de datos financieros
- **Gráficos Básicos:**
  - Ingresos vs Egresos (pasado mes)
  - Evolución de saldo
  - Top categorías

---

## 4. REQUERIMIENTOS NO-FUNCIONALES

### 4.1 Rendimiento
- **RNF-PERF-001:** Tiempo de respuesta API < 200ms para 95% de operaciones
- **RNF-PERF-002:** Tiempo de carga de UI < 3 segundos en conexión 4G
- **RNF-PERF-003:** Sistema soporta mínimo 1000 usuarios concurrentes

### 4.2 Seguridad
- **RNF-SEC-001:** Todas las contraseñas deben estar hasheadas con bcrypt
- **RNF-SEC-002:** JWT con expiración de 24 horas
- **RNF-SEC-003:** HTTPS obligatorio en producción
- **RNF-SEC-004:** Validación de entrada en todos los endpoints
- **RNF-SEC-005:** SQL injection prevention mediante ORM

### 4.3 Usabilidad
- **RNF-USA-001:** Interfaz intuitiva y responsive
- **RNF-USA-002:** Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)
- **RNF-USA-003:** Accesible en dispositivos móviles
- **RNF-USA-004:** Soporte multiidioma (español/inglés) - futuro

### 4.4 Confiabilidad
- **RNF-CON-001:** Disponibilidad > 99.5%
- **RNF-CON-002:** Backup de datos diarios
- **RNF-CON-003:** Recovery Time Objective (RTO) < 1 hora
- **RNF-CON-004:** Recovery Point Objective (RPO) < 24 horas

### 4.5 Mantenibilidad
- **RNF-MANT-001:** Código con cobertura de tests > 80%
- **RNF-MANT-002:** Documentación de API (Swagger)
- **RNF-MANT-003:** Logs detallados de operaciones
- **RNF-MANT-004:** Fácil escalabilidad horizontal

### 4.6 Compatibilidad
- **RNF-COMPAT-001:** Compatible con PostgreSQL 12+
- **RNF-COMPAT-001:** Compatible con Node.js 18+
- **RNF-COMPAT-003:** Compatible con navegadores con soporte ES2020+

---

## 5. RESTRICCIONES Y LIMITACIONES

### 5.1 Restricciones Técnicas
- Base de datos: PostgreSQL
- Backend: NestJS/Node.js
- Frontend: React + TypeScript
- Autenticación: JWT
- ORM: TypeORM

### 5.2 Restricciones Regulatorias
- GDPR compliance para datos de usuarios (futuro)
- Cumplimiento de normas financieras locales

### 5.3 Limitaciones Iniciales
- No incluye integración bancaria
- No soporta múltiples monedas (v1.0)
- No incluye notificaciones por email
- No incluye autenticación biométrica

---

## 6. CRITERIOS DE ACEPTACIÓN

### 6.1 Para Completar Desarrollo
1. ✅ Todos los requerimientos funcionales implementados
2. ✅ Tests unitarios > 80% cobertura
3. ✅ API documentada en Swagger
4. ✅ Validación de seguridad completada
5. ✅ Performance testing exitoso
6. ✅ Documentación técnica completa

### 6.2 Para Pasar a Producción
1. ✅ Code review aprobado
2. ✅ Tests E2E exitosos
3. ✅ Configuración de infraestructura
4. ✅ Backup y recovery testeados
5. ✅ Monitoreo y alertas configurados
6. ✅ Plan de contingencia documentado

---

## 7. DEPENDENCIAS EXTERNAS

- Ninguna dependencia crítica externa en v1.0
- Futuras: integración con APIs bancarias, servicios de email

---

## 8. GLOSARIO

| Término | Definición |
|---------|-----------|
| Movimiento | Transacción financiera (ingreso o egreso) |
| Recurrente | Movimiento que se repite periódicamente |
| JWT | Token de autenticación con expiración |
| DTO | Objeto para transferencia de datos entre capas |
| Dashboard | Página principal con resumen financiero |

