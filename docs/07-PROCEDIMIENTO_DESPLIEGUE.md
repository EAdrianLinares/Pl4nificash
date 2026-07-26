# PROCEDIMIENTO DE DESPLIEGUE - Pl4nificash

## 1. INTRODUCCIÓN

Este documento especifica cómo desplegar Pl4nificash en diferentes ambientes (desarrollo, staging, producción).

---

## 2. AMBIENTES

### 2.1 Ambiente de Desarrollo
- **URL:** http://localhost:3000 (backend), http://localhost:5173 (frontend)
- **Base de Datos:** PostgreSQL local
- **Propósito:** Desarrollo activo

### 2.2 Ambiente de Staging
- **URL:** https://staging-api.planificash.com, https://staging.planificash.com
- **Base de Datos:** PostgreSQL staging
- **Propósito:** Pruebas pre-producción

### 2.3 Ambiente de Producción
- **URL:** https://api.planificash.com, https://planificash.com
- **Base de Datos:** PostgreSQL productivo (con backups)
- **Propósito:** Usuarios finales

---

## 3. REQUISITOS PRE-DESPLIEGUE

### 3.1 Checklist Técnico

```
BACKEND:
- [ ] npm run lint (sin errores)
- [ ] npm run test (cobertura > 80%)
- [ ] npm run build (sin errores)
- [ ] Revisar .env para producción
- [ ] Base de datos migrada
- [ ] Variables de entorno seguras

FRONTEND:
- [ ] npm run lint (sin errores)
- [ ] npm run build (sin errores)
- [ ] Build size < 1MB gzipped
- [ ] Verificar VITE_API_URL correcta
- [ ] Progressive Web App (PWA) testado

GENERAL:
- [ ] Documentación actualizada
- [ ] README.md actualizado
- [ ] Changelog preparado
- [ ] Plan de rollback disponible
- [ ] Backups de BD configurados
```

### 3.2 Checklist Funcional

```
- [ ] Todos los requerimientos implementados
- [ ] Bugs críticos resueltos
- [ ] Flujos E2E testeados
- [ ] Autenticación verificada
- [ ] Permisos verificados
- [ ] Performance validada
- [ ] Seguridad auditada
- [ ] Versión documentada
```

---

## 4. DESPLIEGUE A STAGING

### 4.1 Build de Staging

```bash
# 1. Backend build
cd planificash-backend
npm run lint
npm run test
npm run build

# 2. Frontend build
cd ../planificash-frontend
npm run lint
npm run build

# 3. Verificar builds
ls planificash-backend/dist    # Debe existir
ls planificash-frontend/dist   # Debe existir
```

### 4.2 Configurar Staging

```bash
# Crear .env.staging en backend
NODE_ENV=staging
DB_HOST=staging-postgres.example.com
DB_PORT=5432
DB_USERNAME=planificash_staging
DB_PASSWORD=<staging-password>
DB_NAME=planificash_staging
JWT_SECRET=<staging-jwt-secret>
PORT=3000
```

### 4.3 Despliegue con Docker

```bash
# Dockerfile Backend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

```bash
# Build image
docker build -t planificash-backend:staging -f Dockerfile.backend .

# Push a registry (Docker Hub, ECR, etc.)
docker tag planificash-backend:staging myregistry/planificash-backend:staging
docker push myregistry/planificash-backend:staging
```

### 4.4 Deploy con Docker Compose (Staging)

```yaml
version: '3.8'

services:
  postgres_staging:
    image: postgres:15
    environment:
      POSTGRES_USER: planificash_staging
      POSTGRES_PASSWORD: <password>
      POSTGRES_DB: planificash_staging
    volumes:
      - postgres_staging_data:/var/lib/postgresql/data
    ports:
      - "5433:5432"

  backend_staging:
    image: myregistry/planificash-backend:staging
    ports:
      - "3001:3000"
    environment:
      NODE_ENV: staging
      DB_HOST: postgres_staging
      DB_PORT: 5432
      DB_USERNAME: planificash_staging
      DB_PASSWORD: <password>
      DB_NAME: planificash_staging
      JWT_SECRET: <staging-jwt-secret>
    depends_on:
      - postgres_staging

  frontend_staging:
    image: myregistry/planificash-frontend:staging
    ports:
      - "5174:80"
    environment:
      VITE_API_URL: https://staging-api.planificash.com

volumes:
  postgres_staging_data:
```

### 4.5 Ejecutar Staging

```bash
# Deploy
docker-compose -f docker-compose.staging.yml up -d

# Ver logs
docker-compose -f docker-compose.staging.yml logs -f backend_staging

# Verificar
curl https://staging-api.planificash.com/health
```

---

## 5. DESPLIEGUE A PRODUCCIÓN

### 5.1 Pre-Producción (1 día antes)

```bash
# 1. Crear rama de release
git checkout -b release/v1.0.0

# 2. Actualizar versión
# package.json: "version": "1.0.0"
# docs/CHANGELOG.md: Documentar cambios

# 3. Hacer commit de release
git commit -am "chore: release v1.0.0"

# 4. Crear tag
git tag -a v1.0.0 -m "Release v1.0.0"

# 5. Merge a main
git checkout main
git merge --ff-only release/v1.0.0

# 6. Push
git push origin main --tags
```

### 5.2 Build para Producción

```bash
# Backend
cd planificash-backend
npm ci --only=production
npm run build
npm run test  # Tests finales

# Frontend
cd ../planificash-frontend
npm ci --only=production
npm run build  # Optimizado para producción

# Verificar size
du -sh planificash-frontend/dist/
```

### 5.3 Configuración de Producción

**Backend .env.production:**
```env
NODE_ENV=production
DB_HOST=prod-postgres.example.com
DB_PORT=5432
DB_USERNAME=planificash_prod
DB_PASSWORD=<secure-password-from-vault>
DB_NAME=planificash_db
JWT_SECRET=<secure-jwt-secret-from-vault>
PORT=3000
LOG_LEVEL=info
```

**Frontend .env.production:**
```env
VITE_API_URL=https://api.planificash.com
VITE_APP_NAME=Pl4nificash
```

### 5.4 Migraciones de BD

```bash
# Backup de producción
pg_dump -h prod-postgres.example.com \
        -U planificash_prod \
        -d planificash_db > backup_prod_$(date +%Y%m%d_%H%M%S).sql

# Ejecutar migraciones
npm run typeorm migration:run -- --dataSource src/database/config.ts

# Verificar
psql -h prod-postgres.example.com \
     -U planificash_prod \
     -d planificash_db \
     -c "SELECT COUNT(*) FROM usuarios;"
```

### 5.5 Deploy en Producción (AWS Ejemplo)

```bash
# 1. Build images
docker build -t planificash-backend:v1.0.0 -f Dockerfile.backend .
docker build -t planificash-frontend:v1.0.0 -f Dockerfile.frontend .

# 2. Push a ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

docker tag planificash-backend:v1.0.0 \
           123456789.dkr.ecr.us-east-1.amazonaws.com/planificash-backend:v1.0.0
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/planificash-backend:v1.0.0

# 3. Update ECS Task Definition
aws ecs update-service --cluster prod-cluster \
                       --service planificash-backend \
                       --force-new-deployment

# 4. Wait for deployment
aws ecs wait services-stable --cluster prod-cluster \
                             --services planificash-backend

# 5. Health check
curl https://api.planificash.com/health

# 6. Smoke tests
npm run test:e2e:production
```

### 5.6 Post-Deploy en Producción

```bash
# 1. Verificar salud de aplicación
curl https://api.planificash.com/health
curl https://planificash.com

# 2. Verificar logs
aws logs tail /aws/ecs/planificash-backend --follow

# 3. Monitoreo
# Verificar en CloudWatch/Datadog dashboard

# 4. Smoke tests
# Ejecutar tests básicos contra producción

# 5. Notificar al equipo
# Enviar notificación a Slack/email
```

---

## 6. ROLLBACK PLAN

### 6.1 Si Algo Sale Mal

```bash
# Opción 1: Rollback rápido a versión anterior
docker-compose -f docker-compose.prod.yml down

# Cambiar a versión anterior en Dockerfile
docker build -t planificash-backend:v0.9.9 ...
docker push ...

# Redeploy
aws ecs update-service --cluster prod-cluster \
                       --service planificash-backend \
                       --force-new-deployment

# Opción 2: Restore de backup de BD
psql -h prod-postgres.example.com \
     -U planificash_prod \
     -d planificash_db < backup_prod_20250725_120000.sql
```

### 6.2 Monitoreo Post-Deploy

```bash
# Setupear alertas para:
- [ ] CPU > 80%
- [ ] Memoria > 85%
- [ ] Error rate > 1%
- [ ] Response time > 500ms
- [ ] BD connections > 90%
```

---

## 7. VERSIONADO Y RELEASES

### 7.1 Semantic Versioning

```
MAJOR.MINOR.PATCH
 v1  . 2    . 3
```

- **MAJOR:** Cambios incompatibles
- **MINOR:** Nuevas features compatibles
- **PATCH:** Bug fixes

### 7.2 Release Notes Template

```markdown
# Pl4nificash v1.0.0

## 🎉 New Features
- Feature 1
- Feature 2

## 🐛 Bug Fixes
- Fixed bug 1
- Fixed bug 2

## 🔐 Security
- Security patch 1

## 📝 Documentation
- Updated API docs

## 📦 Dependencies
- Updated dependency X to version Y

## ⚠️ Breaking Changes
- None

## 🔄 Migration Guide
Instructions if needed

## Contributors
- @developer1
- @developer2
```

---

## 8. ROLLOUT STRATEGIES

### 8.1 Blue-Green Deployment

```
1. Blue (actual versión en producción)
2. Green (nueva versión) - deploy aquí
3. Test Green completamente
4. Switch traffic: Blue → Green
5. Green ahora es Blue
6. Green anterior available para rollback
```

### 8.2 Canary Deployment

```
1. Deploy nueva versión a 10% del tráfico
2. Monitorear métricas
3. Si OK: 50% del tráfico
4. Si OK: 100% del tráfico
5. Si algo sale mal: Rollback automático
```

---

## 9. CHECKLIST FINAL DE DESPLIEGUE

### Antes del Deploy
```
PRE-DEPLOY:
- [ ] Código mergeado a main
- [ ] Todos los tests pasando
- [ ] Code review aprobado
- [ ] Security scan completado
- [ ] Backups de BD creados
- [ ] Plan de rollback confirmado
- [ ] Team notificado
- [ ] Maintenance window scheduled
- [ ] Monitoring configurado
- [ ] Alertas activas
```

### Durante el Deploy
```
DURANTE:
- [ ] Iniciado deploy
- [ ] Build completado
- [ ] Health checks pasando
- [ ] Logs monitoreados
- [ ] Team en standby
- [ ] Métrica de error rate monitoreada
```

### Después del Deploy
```
POST-DEPLOY:
- [ ] Aplicación respondiendo
- [ ] BD funcional
- [ ] Autenticación trabajando
- [ ] Movimientos siendo creados
- [ ] Usuarios pueden acceder
- [ ] Logs limpios de errores
- [ ] Performance normal
- [ ] Release notes publicadas
- [ ] Team notificado del éxito
```

---

## 10. REFERENCIAS

- Docker Docs: https://docs.docker.com
- AWS ECS: https://docs.aws.amazon.com/ecs
- PostgreSQL Backups: https://www.postgresql.org/docs/backup
- Semantic Versioning: https://semver.org

