# GUÍA DE INSTALACIÓN Y DESARROLLO - Pl4nificash

## 1. REQUISITOS PREVIOS

### Hardware Mínimo
- 4GB RAM
- 10GB disco libre
- Procesador dual-core

### Software Requerido
- **Node.js:** v18.0.0 o superior
- **npm:** v9.0.0 o superior
- **PostgreSQL:** v12.0 o superior
- **Git:** v2.30.0 o superior
- **Visual Studio Code (Recomendado)**

### Software Opcional
- **Docker & Docker Compose** (para desarrollo con contenedores)
- **Postman/Insomnia** (para testing de API)
- **pgAdmin** (para gestión visual de BD)

---

## 2. INSTALACIÓN LOCAL

### 2.1 Clonar el Repositorio
```bash
git clone https://github.com/EAdrianLinares/Pl4nificash.git
cd Pl4nificash
```

### 2.2 Estructura Inicial
```bash
# Verificar directorios
ls -la
# Deberías ver:
# - planificash-backend
# - planificash-frontend
# - docs
# - web_init
# - .git
```

---

## 3. INSTALACIÓN DEL BACKEND

### 3.1 Navegar al Directorio
```bash
cd planificash-backend
```

### 3.2 Instalar Dependencias
```bash
npm install
```

**Dependencias principales instaladas:**
- `@nestjs/core` - Framework NestJS
- `@nestjs/typeorm` - Integración ORM
- `typeorm` - ORM para Node.js
- `pg` - Driver PostgreSQL
- `passport` - Autenticación
- `@nestjs/jwt` - Tokens JWT
- `bcrypt` - Hash de contraseñas
- `class-validator` - Validación DTOs

### 3.3 Configurar Variables de Entorno
```bash
# Crear archivo .env en la raíz de backend
cp .env.example .env  # Si existe
# O crear manualmente:
```

**Contenido de `.env`:**
```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=planificash_user
DB_PASSWORD=tu_contraseña_segura
DB_NAME=planificash_db

# JWT
JWT_SECRET=tu_secret_muy_largo_y_seguro_aqui
JWT_EXPIRATION=86400  # 24 horas en segundos

# Aplicación
NODE_ENV=development
PORT=3000

# Logs
LOG_LEVEL=debug
```

### 3.4 Crear Base de Datos PostgreSQL
```bash
# Conectarse a PostgreSQL (requiere estar instalado)
psql -U postgres

# En la consola de PostgreSQL:
CREATE USER planificash_user WITH PASSWORD 'tu_contraseña_segura';
CREATE DATABASE planificash_db OWNER planificash_user;

# Dar permisos
GRANT ALL PRIVILEGES ON DATABASE planificash_db TO planificash_user;

# Salir
\q
```

### 3.5 Ejecutar Migraciones (Automáticas)
```bash
# TypeORM sincroniza esquema automáticamente en desarrollo
# (En producción usar migrations formales)
npm run start:dev
# La BD se sincronizará automáticamente
```

### 3.6 Verificar Backend Funcionando
```bash
# El servidor debería estar ejecutándose en:
# http://localhost:3000

# Probar con curl:
curl http://localhost:3000

# Deberías recibir respuesta JSON
```

---

## 4. INSTALACIÓN DEL FRONTEND

### 4.1 Navegar al Directorio
```bash
cd ../planificash-frontend
```

### 4.2 Instalar Dependencias
```bash
npm install
```

**Dependencias principales:**
- `react` - Librería UI
- `react-router-dom` - Enrutamiento
- `bootstrap` - Framework CSS
- `vite` - Build tool
- `typescript` - Tipado estático

### 4.3 Configurar Variables de Entorno
```bash
# Crear .env.development
```

**Contenido de `.env.development`:**
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Pl4nificash
```

### 4.4 Ejecutar Servidor de Desarrollo
```bash
npm run dev

# Output esperado:
# Local:        http://localhost:5173/
# Ready in 230ms
```

### 4.5 Verificar Frontend
```bash
# Abrir en navegador: http://localhost:5173
# Deberías ver la pantalla de login
```

---

## 5. VERIFICACIÓN DE LA INSTALACIÓN

### 5.1 Checklist Backend
```bash
cd planificash-backend

# 1. Verificar instalación
npm list @nestjs/core

# 2. Ver scripts disponibles
npm run
# Deberías ver: start, start:dev, test, lint, etc.

# 3. Ejecutar linting
npm run lint

# 4. Ejecutar tests
npm run test

# 5. Ejecutar en modo desarrollo
npm run start:dev
```

### 5.2 Checklist Frontend
```bash
cd ../planificash-frontend

# 1. Verificar instalación
npm list react

# 2. Ver scripts
npm run

# 3. Build de prueba
npm run build

# 4. Ejecutar en desarrollo
npm run dev
```

---

## 6. DESARROLLO CON DOCKER (OPCIONAL)

### 6.1 Crear docker-compose.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: planificash_user
      POSTGRES_PASSWORD: planificash_password
      POSTGRES_DB: planificash_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./planificash-backend
    ports:
      - "3000:3000"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: planificash_user
      DB_PASSWORD: planificash_password
      DB_NAME: planificash_db
      NODE_ENV: development
    depends_on:
      - postgres
    volumes:
      - ./planificash-backend/src:/app/src

  frontend:
    build: ./planificash-frontend
    ports:
      - "5173:5173"
    environment:
      VITE_API_URL: http://localhost:3000
    depends_on:
      - backend

volumes:
  postgres_data:
```

### 6.2 Ejecutar con Docker
```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener
docker-compose down

# Ver servicios corriendo
docker-compose ps
```

---

## 7. ESTRUCTURA DE ARCHIVOS IMPORTANTE

### Backend
```
planificash-backend/
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts        # Módulo raíz
│   └── [módulos]/           # auth, usuarios, movimientos, etc.
├── test/                    # E2E tests
├── dist/                    # Compilado (generado)
├── package.json
├── tsconfig.json
├── .env                     # Variables de entorno
└── jest.config.js
```

### Frontend
```
planificash-frontend/
├── src/
│   ├── pages/              # Páginas
│   ├── components/         # Componentes
│   ├── api/                # Llamadas HTTP
│   ├── hooks/              # Custom hooks
│   ├── types/              # Tipos TS
│   ├── App.tsx
│   └── main.tsx
├── public/                 # Assets estáticos
├── dist/                   # Build (generado)
├── package.json
├── vite.config.ts
└── .env.development
```

---

## 8. COMANDOS ÚTILES

### Backend

```bash
# Desarrollo
npm run start:dev           # Inicia en watch mode

# Producción
npm run build              # Compilar
npm run start:prod         # Ejecutar compilado

# Testing
npm run test              # Tests unitarios
npm run test:watch       # Tests en watch mode
npm run test:cov         # Con coverage
npm run test:e2e         # Tests E2E

# Código
npm run lint             # Linting
npm run format           # Formatear con Prettier
```

### Frontend

```bash
# Desarrollo
npm run dev              # Inicia servidor dev

# Producción
npm run build           # Build para producción
npm run preview         # Preview del build

# Código
npm run lint            # Linting
```

---

## 9. TROUBLESHOOTING

### Backend no inicia - Puerto 3000 en uso
```bash
# Encontrar proceso en puerto 3000
lsof -i :3000

# Matar proceso (macOS/Linux)
kill -9 <PID>

# En Windows: usar Task Manager o:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error de conexión a PostgreSQL
```bash
# Verificar que PostgreSQL está corriendo
psql -U postgres -d postgres

# Verificar credenciales en .env
# Verificar puerto (por defecto 5432)
```

### Módulos npm no encontrados
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### CORS error en frontend
```bash
# Verificar que backend tiene CORS habilitado
# En main.ts del backend:
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### TypeScript compilation errors
```bash
# Limpiar cache de TypeScript
npm run build -- --clean

# Verificar tsconfig.json
```

---

## 10. PRIMERA PRUEBA END-TO-END

### 10.1 Registrar Usuario
```bash
# Asegurarse que backend está en http://localhost:3000
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "nombre": "Test User",
    "password": "TestPassword123!"
  }'

# Respuesta esperada:
# {
#   "id": "uuid",
#   "email": "test@example.com",
#   "nombre": "Test User"
# }
```

### 10.2 Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'

# Respuesta esperada:
# {
#   "access_token": "eyJ...",
#   "token_type": "Bearer",
#   "expires_in": 86400
# }
```

### 10.3 Acceder a Frontend
```
# Abrir en navegador: http://localhost:5173
# Debería ver pantalla de login
# Usar credenciales del paso 10.1
```

---

## 11. PRÓXIMOS PASOS

1. **Leer documentación de archivos en `docs/`**
2. **Familiarizarse con estructura de módulos**
3. **Ejecutar tests:** `npm run test`
4. **Revisar ejemplos de API**
5. **Empezar desarrollo**

---

## 12. RECURSOS Y REFERENCIAS

- **NestJS Docs:** https://docs.nestjs.com
- **React Docs:** https://react.dev
- **TypeORM Docs:** https://typeorm.io
- **PostgreSQL Docs:** https://www.postgresql.org/docs
- **Vite Docs:** https://vitejs.dev

