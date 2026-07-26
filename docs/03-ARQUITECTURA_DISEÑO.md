# MANUAL DE ARQUITECTURA Y DISEÑO - Pl4nificash

## 1. INTRODUCCIÓN A LA ARQUITECTURA

### 1.1 Patrones Arquitectónicos
Pl4nificash implementa:
- **Arquitectura Modular:** Separación por dominios/módulos
- **Patrón MVC Adaptado:** Model (Entity), View (Components), Controller (API Routes)
- **Inyección de Dependencias:** Proporcionado por NestJS
- **Separación en Capas:** API, Negocio, Datos

### 1.2 Principios de Diseño
- **SOLID:**
  - Single Responsibility: Cada clase una responsabilidad
  - Open/Closed: Abierto a extensión, cerrado a modificación
  - Liskov Substitution: Interfaces intercambiables
  - Interface Segregation: Interfaces específicas
  - Dependency Inversion: Depender de abstracciones

- **DRY (Don't Repeat Yourself):** Reutilización de código
- **KISS (Keep It Simple, Stupid):** Simplicidad en diseño

---

## 2. ARQUITECTURA DEL BACKEND

### 2.1 Capas del Backend

```
┌─────────────────────────────────────┐
│      HTTP / REST Clients            │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Controllers (Rutas HTTP)       │  ← Reciben requests
├─────────────────────────────────────┤
│   DTOs (Validación de Datos)        │  ← Validan entrada
├─────────────────────────────────────┤
│    Services (Lógica de Negocio)     │  ← Procesamiento
├─────────────────────────────────────┤
│    Entities (Modelos de Datos)      │  ← Estructura DB
├─────────────────────────────────────┤
│   TypeORM (ORM, Repositorios)       │  ← Acceso a BD
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      PostgreSQL Database            │
└─────────────────────────────────────┘
```

### 2.2 Estructura de Módulos

#### App Module (Módulo Raíz)
```typescript
// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({...}),
    AuthModule,
    UsuariosModule,
    MovimientosModule,
    MovimientosRecurrentesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

**Responsabilidad:** Orquestar todos los módulos del sistema

#### Auth Module
```
AuthModule
├── AuthController
│   └── POST /auth/register
│   └── POST /auth/login
├── AuthService
│   ├── register(dto): Usuario
│   ├── login(dto): {access_token}
│   └── validateUser(email, password): Usuario
├── JwtStrategy
│   └── validate(payload): Usuario
└── JwtAuthGuard
    └── canActivate(context): boolean
```

**Responsabilidad:** Gestionar autenticación y autorización

#### Usuarios Module
```
UsuariosModule
├── UsuariosController
│   ├── findAll()
│   ├── findOne(id)
│   ├── create(dto)
│   ├── update(id, dto)
│   └── delete(id)
├── UsuariosService
│   └── (Operaciones CRUD)
└── UsuarioEntity
    ├── id: UUID
    ├── email: string
    ├── nombre: string
    ├── contraseña: string (hasheada)
    └── movimientos: Movimiento[]
```

**Responsabilidad:** Gestión completa de usuarios

#### Movimientos Module
```
MovimientosModule
├── MovimientosController
│   ├── findAll(filters)
│   ├── findOne(id)
│   ├── create(dto)
│   ├── update(id, dto)
│   └── delete(id)
├── MovimientosService
│   └── (Lógica de negocio)
├── MovimientoEntity
│   ├── id: UUID
│   ├── usuarioId: UUID
│   ├── monto: decimal
│   ├── tipo: enum (INGRESO|EGRESO)
│   ├── descripcion: string
│   ├── fecha: Date
│   └── usuario: Usuario (FK)
└── Movement.Enum
    └── INGRESO | EGRESO
```

**Responsabilidad:** Gestión de movimientos individuales

#### Movimientos Recurrentes Module
```
MovimientosRecurrentesModule
├── MovimientosRecurrentesController
│   ├── findAll()
│   ├── findOne(id)
│   ├── create(dto)
│   ├── update(id, dto)
│   └── delete(id)
├── MovimientosRecurrentesService
│   ├── (Operaciones CRUD)
│   ├── procesarRecurrentes(): void
│   └── generarProximaFecha(): Date
├── MovimientoRecurrenteEntity
│   ├── id: UUID
│   ├── usuarioId: UUID
│   ├── monto: decimal
│   ├── tipo: enum
│   ├── descripcion: string
│   ├── frecuencia: enum
│   ├── proximaFecha: Date
│   ├── fechaFin: Date (nullable)
│   └── usuario: Usuario (FK)
└── TipoMovimientos.Enum
    └── INGRESO | EGRESO
```

**Responsabilidad:** Automatización de movimientos periódicos

### 2.3 Flujo de Autenticación

```
┌─────────────────────────────────────────────┐
│ Cliente (React)                             │
└────────────┬────────────────────────────────┘
             │ 1. POST /auth/login
             │    {email, password}
             ▼
┌─────────────────────────────────────────────┐
│ AuthController.login()                      │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ AuthService.validateUser()                  │
│ - Busca usuario por email                   │
│ - Compara password (bcrypt)                 │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ Generar JWT                                 │
│ - Payload: {id, email}                      │
│ - Expiración: 24h                           │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ Cliente recibe token                        │
│ - Almacena en localStorage                  │
│ - Lo adjunta en Authorization header        │
└─────────────────────────────────────────────┘

Solicitudes Posteriores:
─────────────────────────
Authorization: Bearer <JWT_TOKEN>
        │
        ▼
┌─────────────────────────────────────────────┐
│ JwtAuthGuard                                │
│ - Extrae token del header                   │
│ - Valida signature                          │
│ - Valida expiración                         │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ JwtStrategy.validate()                      │
│ - Decodifica payload                        │
│ - Retorna usuario autenticado               │
└─────────────────────────────────────────────┘
```

### 2.4 Modelo de Datos (ER Diagram)

```
┌──────────────────┐
│    USUARIOS      │
├──────────────────┤
│ id (PK)          │ ◄─────────────┐
│ email (UNIQUE)   │               │ 1
│ nombre           │               │
│ password (hash)  │               ├─────── N ┌──────────────────────┐
│ created_at       │               │          │   MOVIMIENTOS        │
└──────────────────┘               │          ├──────────────────────┤
                                   └──────────┤ id (PK)              │
                                              │ usuario_id (FK)      │
                                              │ monto (DECIMAL)      │
                                              │ tipo (ENUM)          │
                                              │ descripcion (TEXT)   │
                                              │ fecha (DATE)         │
                                              │ created_at           │
                                              └──────────────────────┘

┌──────────────────────────┐
│  MOVIMIENTOS_RECURRENTES │
├──────────────────────────┤
│ id (PK)                  │
│ usuario_id (FK) ─────────┼────────► USUARIOS
│ monto (DECIMAL)          │
│ tipo (ENUM)              │
│ descripcion (TEXT)       │
│ frecuencia (ENUM)        │
│ proxima_fecha (DATE)     │
│ fecha_fin (DATE, NULL)   │
│ activo (BOOLEAN)         │
│ created_at               │
└──────────────────────────┘
```

### 2.5 DTOs (Data Transfer Objects)

#### Login DTO
```typescript
export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;
}
```

#### Create Movimiento DTO
```typescript
export class CreateMovimientoDto {
  @IsPositive()
  @IsNumber()
  monto: number;

  @IsEnum(Movement)
  tipo: Movement;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: Date;

  @IsOptional()
  @IsString()
  categoria?: string;
}
```

### 2.6 Validación de Datos

**Pipeline de Validación:**
1. DTO validation (class-validator)
2. Business logic validation
3. Database constraints
4. Response mapping

---

## 3. ARQUITECTURA DEL FRONTEND

### 3.1 Estructura de Carpetas

```
src/
├── pages/              # Vistas principales
│   ├── Dashboard.tsx
│   ├── Movimientos.tsx
│   ├── Recurrentes.tsx
│   ├── login.tsx
│   └── Register.tsx
├── components/         # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── MovimientoList.tsx
│   ├── ModalMovimiento.tsx
│   └── DisponibleCard.tsx
├── layouts/           # Layouts base
│   └── MainLayout.tsx
├── routes/            # Rutas protegidas
│   └── PrivateRoutes.tsx
├── hooks/             # Custom hooks
│   └── useMovimientos.ts
├── api/               # Llamadas HTTP
│   ├── auth.ts
│   ├── movimientos.ts
│   └── recurrentes.ts
├── types/             # Tipos TypeScript
│   └── movimiento.ts
├── utils/             # Funciones auxiliares
│   ├── normalizers.ts
│   └── movimientosUtils.ts
├── constants/         # Constantes globales
│   └── movimientos.ts
├── App.tsx            # Componente raíz
└── main.tsx           # Entry point
```

### 3.2 Flujo de Componentes

```
App.tsx
├── <Routes>
│   ├── <Route path="/login" element={<login />} />
│   ├── <Route path="/register" element={<Register />} />
│   └── <Route element={<PrivateRoutes />}>
│       ├── <Route path="/dashboard" element={<Dashboard />} />
│       ├── <Route path="/movimientos" element={<Movimientos />} />
│       └── <Route path="/recurrentes" element={<Recurrentes />} />
└── <Navbar />
```

### 3.3 Estado Global (Context/Hooks)

```typescript
// useMovimientos.ts - Custom Hook
export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovimientos = async (filters) => {
    // Lógica para obtener movimientos
  };

  const createMovimiento = async (data) => {
    // Lógica para crear movimiento
  };

  return { movimientos, loading, fetchMovimientos, createMovimiento };
};
```

### 3.4 Llamadas a API

```typescript
// api/movimientos.ts
export const movimientosAPI = {
  getAll: (filters) => 
    api.get('/movimientos', { params: filters }),
  
  getOne: (id) => 
    api.get(`/movimientos/${id}`),
  
  create: (data) => 
    api.post('/movimientos', data),
  
  update: (id, data) => 
    api.patch(`/movimientos/${id}`, data),
  
  delete: (id) => 
    api.delete(`/movimientos/${id}`),
};
```

### 3.5 Ciclo de Vida de Componente

```
Componente Montado
├── useEffect (fetch datos)
├── Renderizar con datos
├── Usuario interactúa
│   ├── Modal abre
│   ├── Formulario se llena
│   ├── Usuario envía
│   └── API call
├── Estado actualizado
└── Re-render
```

---

## 4. FLUJOS DE NEGOCIO CLAVE

### 4.1 Flujo: Crear Movimiento

```
1. Usuario en página de Movimientos
   │
2. Click en "Nuevo Movimiento"
   │
3. Modal se abre
   │
4. Usuario completa formulario:
   ├── Monto
   ├── Tipo (Ingreso/Egreso)
   ├── Descripción
   ├── Fecha
   └── Categoría (opcional)
   │
5. Usuario hace click en "Guardar"
   │
6. Frontend valida:
   ├── Campos requeridos ✓
   ├── Formatos válidos ✓
   └── Lógica de negocio ✓
   │
7. Envía POST /movimientos
   │
8. Backend valida (DTO)
   │
9. Backend valida reglas de negocio
   │
10. Crea registro en BD
    │
11. Retorna 201 Created
    │
12. Frontend actualiza lista
    │
13. Muestra confirmación
```

### 4.2 Flujo: Procesar Movimientos Recurrentes

```
Programador (Scheduler) cada medianoche:
│
├── Buscar movimientos_recurrentes
│   WHERE proxima_fecha <= HOY
│   AND activo = true
│   AND (fecha_fin IS NULL OR fecha_fin >= HOY)
│
├── Para cada movimiento recurrente:
│   ├── Crear movimiento ordinario
│   │   ├── usuario_id (mismo)
│   │   ├── monto (mismo)
│   │   ├── tipo (mismo)
│   │   ├── descripcion (mismo)
│   │   ├── fecha = proxima_fecha
│   │
│   ├── Calcular próxima fecha
│   │   ├── Si frecuencia = DIARIA: +1 día
│   │   ├── Si frecuencia = SEMANAL: +7 días
│   │   ├── Si frecuencia = MENSUAL: +1 mes
│   │   └── Si frecuencia = ANUAL: +1 año
│   │
│   └── Actualizar movimiento_recurrente
│       ├── proxima_fecha = nueva fecha
│       └── Desactivar si fecha_fin vencida
│
└── Fin
```

### 4.3 Flujo: Dashboard

```
Usuario accede a /dashboard
│
├── Página carga
│   │
│   ├── Obtener usuario autenticado (JWT)
│   │
│   ├── Paralelo:
│   │   ├── GET /movimientos?limit=10 (últimos 10)
│   │   ├── GET /movimientos?stats=true (resumen)
│   │   └── GET /movimientos-recurrentes?activos=true
│   │
│   ├── Calcular indicadores:
│   │   ├── Saldo total = SUM(ingresos) - SUM(egresos)
│   │   ├── Ingresos mes = SUM(INGRESO) mes actual
│   │   ├── Egresos mes = SUM(EGRESO) mes actual
│   │   └── Balance = Ingresos - Egresos
│   │
│   └── Renderizar:
│       ├── Cards con indicadores
│       ├── Tabla de últimos movimientos
│       └── Próximos movimientos recurrentes
│
└── Usuario visualiza estado financiero
```

---

## 5. PATRONES DE INTEGRACIÓN

### 5.1 Patrón Backend-Frontend

```
Frontend                   Backend
   │                          │
   ├─ HTTP Request ──────────►│
   │  (JSON)                  │
   │                          ├─ Validar DTO
   │                          ├─ Lógica Negocio
   │                          ├─ Acceso BD
   │                          │
   │                    HTTP Response ──┐
   │◄─────────────────────────(JSON)  │
   │                                   │
   ├─ Procesar Datos                  │
   ├─ Actualizar Estado                │
   └─ Re-render UI                    │
```

### 5.2 Patrón Inyección de Dependencias (Backend)

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuariosModule {}

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}
}

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
}
```

---

## 6. CONSIDERACIONES DE ESCALABILIDAD

### 6.1 Para Aumentar Usuarios

1. **Caché:** Implementar Redis para sesiones
2. **BD:** Índices en campos frecuentemente consultados
3. **API:** Load balancing con múltiples instancias
4. **Archivos:** CDN para assets estáticos

### 6.2 Para Aumentar Datos

1. **Particionamiento:** Dividir datos por usuario/fecha
2. **Archivado:** Movimientos antiguos a tablas históricas
3. **Agregación:** Pre-calcular resúmenes diarios/mensuales

---

## 7. DOCUMENTACIÓN DE INTEGRACIÓN

Ver `API-DOCUMENTATION.md` para endpoints completos.

