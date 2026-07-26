# ANÁLISIS DEL PROYECTO - Pl4nificash

## 📋 Información General del Proyecto

**Nombre:** Pl4nificash  
**Tipo:** Aplicación Web Full-Stack  
**Propósito:** Gestión de finanzas personales y movimientos de dinero  
**Descripción:** Sistema integral para planificar, registrar y controlar movimientos financieros con soporte para operaciones recurrentes.

---

## 🏗️ Arquitectura General

### Stack Tecnológico

#### Backend
- **Framework:** NestJS (Node.js)
- **Lenguaje:** TypeScript
- **Base de Datos:** PostgreSQL
- **ORM:** TypeORM
- **Autenticación:** JWT + Passport
- **Validación:** class-validator, class-transformer
- **Seguridad:** bcrypt para contraseñas

#### Frontend
- **Framework:** React 19.2.4
- **Lenguaje:** TypeScript 6.0.2
- **Build Tool:** Vite
- **Enrutamiento:** React Router v7
- **Estilos:** Bootstrap 5.3.8
- **Linter:** ESLint

---

## 📦 Estructura del Proyecto

```
Pl4nificash/
├── planificash-backend/          # API REST en NestJS
│   ├── src/
│   │   ├── auth/                 # Módulo de autenticación
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── guards/
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   └── entities/
│   │   │       └── auth.entity.ts
│   │   ├── usuarios/             # Módulo de usuarios
│   │   │   ├── usuarios.controller.ts
│   │   │   ├── usuarios.service.ts
│   │   │   ├── usuarios.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-usuario.dto.ts
│   │   │   │   └── update-usuario.dto.ts
│   │   │   └── entities/
│   │   │       └── usuario.entity.ts
│   │   ├── movimientos/          # Módulo de movimientos
│   │   │   ├── movimientos.controller.ts
│   │   │   ├── movimientos.service.ts
│   │   │   ├── movimientos.module.ts
│   │   │   ├── enum/
│   │   │   │   └── movement.enum.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-movimiento.dto.ts
│   │   │   │   └── update-movimiento.dto.ts
│   │   │   └── entities/
│   │   │       └── movimiento.entity.ts
│   │   ├── movimientos-recurrentes/  # Módulo de movimientos recurrentes
│   │   │   ├── movimientos-recurrentes.controller.ts
│   │   │   ├── movimientos-recurrentes.service.ts
│   │   │   ├── movimientos-recurrentes.module.ts
│   │   │   ├── enums/
│   │   │   │   └── tipo-movimientos.enum.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-movimiento-recurrente.dto.ts
│   │   │   │   └── update-movimiento-recurrente.dto.ts
│   │   │   └── entities/
│   │   │       └── movimiento-recurrente.entity.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/                     # Tests E2E
│   ├── dist/                     # Build compilado
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── README.md
│
├── planificash-frontend/         # Aplicación React
│   ├── src/
│   │   ├── pages/               # Páginas principales
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Movimientos.tsx
│   │   │   ├── Recurrentes.tsx
│   │   │   ├── login.tsx
│   │   │   └── Register.tsx
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── Navbar.tsx
│   │   │   ├── MovimientoList.tsx
│   │   │   ├── ModalMovimiento.tsx
│   │   │   └── DisponibleCard.tsx
│   │   ├── layouts/             # Layouts
│   │   │   └── MainLayout.tsx
│   │   ├── routes/              # Rutas protegidas
│   │   │   └── PrivateRoutes.tsx
│   │   ├── hooks/               # Custom hooks
│   │   │   └── useMovimientos.ts
│   │   ├── api/                 # Llamadas API
│   │   │   ├── auth.ts
│   │   │   ├── movimientos.ts
│   │   │   └── recurrentes.ts
│   │   ├── types/               # Tipos TypeScript
│   │   │   └── movimiento.ts
│   │   ├── utils/               # Utilidades
│   │   │   ├── normalizers.ts
│   │   │   └── movimientosUtils.ts
│   │   ├── constants/           # Constantes
│   │   │   └── movimientos.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── vercel.json
│   └── README.md
│
├── docs/                        # Documentación SDD
├── web_init/                    # Scripts de inicialización
└── copilot-instructions.md      # Guía de codificación
```

---

## 🔧 Módulos Principales del Backend

### 1. **Módulo de Autenticación (Auth)**
**Responsabilidad:** Gestionar registro, login y validación de usuarios  
**Componentes:**
- JWT Strategy: Validación de tokens JWT
- JWT Auth Guard: Protección de rutas
- AuthService: Lógica de autenticación
- AuthController: Endpoints de auth

**Endpoints principales:**
- POST `/auth/register` - Registro de usuario
- POST `/auth/login` - Login de usuario

---

### 2. **Módulo de Usuarios**
**Responsabilidad:** Gestión de datos de usuarios  
**Componentes:**
- UsuariosService: Operaciones CRUD
- UsuariosController: Endpoints HTTP

**Endpoints principales:**
- GET `/usuarios` - Obtener todos
- GET `/usuarios/:id` - Obtener uno
- POST `/usuarios` - Crear
- PATCH `/usuarios/:id` - Actualizar
- DELETE `/usuarios/:id` - Eliminar

---

### 3. **Módulo de Movimientos**
**Responsabilidad:** Gestionar movimientos de dinero (ingresos/egresos)  
**Componentes:**
- MovimientosService: Lógica de negocio
- MovimientosController: Endpoints HTTP
- Movement Enum: Tipos de movimiento

**Tipos de movimiento:**
- INGRESO: Dinero entrante
- EGRESO: Dinero saliente

**Endpoints principales:**
- GET `/movimientos` - Listar movimientos
- GET `/movimientos/:id` - Obtener detalle
- POST `/movimientos` - Crear nuevo
- PATCH `/movimientos/:id` - Actualizar
- DELETE `/movimientos/:id` - Eliminar

---

### 4. **Módulo de Movimientos Recurrentes**
**Responsabilidad:** Gestionar movimientos que se repiten periódicamente  
**Componentes:**
- MovimientosRecurrentesService: Lógica de recurrencia
- MovimientosRecurrentesController: Endpoints HTTP
- TipoMovimientos Enum: Categorías de movimientos

**Endpoints principales:**
- GET `/movimientos-recurrentes` - Listar recurrentes
- GET `/movimientos-recurrentes/:id` - Obtener detalle
- POST `/movimientos-recurrentes` - Crear recurrente
- PATCH `/movimientos-recurrentes/:id` - Actualizar
- DELETE `/movimientos-recurrentes/:id` - Eliminar

---

## 🎨 Módulos Principales del Frontend

### 1. **Dashboard**
- Vista general de estado financiero
- Resumen de movimientos
- Indicadores visuales

### 2. **Gestión de Movimientos**
- Listado de todos los movimientos
- Crear, editar, eliminar movimientos
- Modal para operaciones
- Filtrado y búsqueda

### 3. **Gestión de Recurrentes**
- Administración de movimientos recurrentes
- Control de frecuencia y fechas

### 4. **Autenticación**
- Página de login
- Página de registro
- Gestión de sesiones

### 5. **Navegación**
- Navbar con opciones principales
- Rutas protegidas
- Layout consistente

---

## 🔐 Modelo de Seguridad

### Autenticación
- **Estrategia:** JWT (JSON Web Tokens)
- **Almacenamiento de Contraseñas:** Bcrypt con salt
- **Protección de Rutas:** JWT Auth Guard

### Validación
- DTO con validadores de class-validator
- Sanitización de datos de entrada
- Type guards en TypeScript

---

## 📊 Modelo de Datos

### Entidades Principales

#### Usuario
- `id` (UUID) - Identificador único
- `email` - Email único
- `nombre` - Nombre del usuario
- `contraseña` (hasheada) - Contraseña
- `fechaCreacion` - Timestamp
- Relación: 1-N con Movimientos

#### Movimiento
- `id` (UUID) - Identificador único
- `usuarioId` - FK a Usuario
- `monto` - Cantidad de dinero
- `tipo` - INGRESO o EGRESO
- `descripcion` - Descripción del movimiento
- `fecha` - Fecha del movimiento
- `categoría` - Categoría (opcional)
- Relación: N-1 con Usuario

#### MovimientoRecurrente
- `id` (UUID) - Identificador único
- `usuarioId` - FK a Usuario
- `monto` - Monto recurrente
- `tipo` - Tipo de movimiento
- `descripcion` - Descripción
- `frecuencia` - (diario, semanal, mensual, etc.)
- `proxima_fecha` - Próxima ejecución
- Relación: N-1 con Usuario

---

## 🚀 Funcionalidades Clave

### Para el Usuario
1. **Registro e Ingreso** - Sistema de autenticación segura
2. **Gestión de Movimientos** - Crear, editar, eliminar, listar
3. **Movimientos Recurrentes** - Automatizar movimientos periódicos
4. **Dashboard** - Visualización del estado financiero
5. **Historial** - Ver todos los movimientos históricos

### Para el Sistema
1. **Autenticación JWT** - Seguridad basada en tokens
2. **Validación de Datos** - DTOs con validadores
3. **ORM Tipado** - TypeORM con TypeScript
4. **Persistencia** - PostgreSQL
5. **API RESTful** - Endpoints estándar HTTP

---

## 📈 Características Futuras Potenciales

1. **Reportes Financieros** - Análisis de gastos/ingresos
2. **Categorización** - Clasificación automática de movimientos
3. **Presupuestos** - Establecer límites de gasto
4. **Exportación** - Descargar datos en PDF/Excel
5. **Gráficos** - Visualización de tendencias
6. **Notificaciones** - Alertas de movimientos
7. **Multi-divisa** - Soporte para diferentes monedas
8. **Integración Bancaria** - Conexión con bancos

---

## 🧪 Calidad del Código

### Testing
- **Unit Tests:** Jest configurado
- **E2E Tests:** Supertest para API
- **Coverage:** Configuración disponible

### Linting & Formatting
- **ESLint:** Configurado con TypeScript
- **Prettier:** Formateador de código
- **TypeScript Strict:** Tipado fuerte

### Mejores Prácticas
- DTOs para validación
- Services para lógica de negocio
- Controllers para rutas HTTP
- Separación de responsabilidades
- TypeScript strict mode

---

## 🔄 Flujo de Desarrollo

1. **Desarrollo Local:** `npm run start:dev`
2. **Build:** `npm run build`
3. **Testing:** `npm run test`
4. **Linting:** `npm run lint`
5. **Production:** `npm run start:prod`

---

## 📝 Notas Importantes

- El proyecto usa TypeScript con tipado fuerte
- Sigue arquitectura modular de NestJS
- Implementa patrones de diseño estándar
- Cuenta con configuración de desarrollo y producción
- Preparado para escalabilidad

