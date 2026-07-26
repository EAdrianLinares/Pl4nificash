# 📚 DOCUMENTACIÓN DE PROYECTO - Pl4nificash

Bienvenido a la documentación del proyecto Pl4nificash. Esta carpeta contiene toda la información necesaria para desarrollar, desplegar y mantener la aplicación.

## 🚀 Inicio Rápido

**¿Primera vez aquí?** Comienza con:
1. Lee: [`00-INDICE_DOCUMENTACION.md`](./00-INDICE_DOCUMENTACION.md) - Resumen general
2. Lee: [`01-ANALISIS_PROYECTO.md`](./01-ANALISIS_PROYECTO.md) - Entender el proyecto
3. Sigue: [`05-INSTALACION_DESARROLLO.md`](./05-INSTALACION_DESARROLLO.md) - Instalar localmente

---

## 📖 DOCUMENTOS DISPONIBLES

### 📋 Análisis y Requerimientos

| Documento | Descripción | Para |
|-----------|-------------|------|
| **[01-ANALISIS_PROYECTO.md](./01-ANALISIS_PROYECTO.md)** | Descripción completa del proyecto, stack, estructura | Todos |
| **[02-ESPECIFICACION_REQUERIMIENTOS.md](./02-ESPECIFICACION_REQUERIMIENTOS.md)** | SRS: Requerimientos funcionales y no-funcionales | POs, QA, Devs |

### 🏗️ Arquitectura y Diseño

| Documento | Descripción | Para |
|-----------|-------------|------|
| **[03-ARQUITECTURA_DISEÑO.md](./03-ARQUITECTURA_DISEÑO.md)** | Arquitectura técnica, patrones, flujos | Arquitectos, Leads |
| **[04-API_DOCUMENTATION.md](./04-API_DOCUMENTATION.md)** | Endpoints REST, ejemplos, respuestas | Devs Frontend, API consumers |

### 🛠️ Desarrollo y Operaciones

| Documento | Descripción | Para |
|-----------|-------------|------|
| **[05-INSTALACION_DESARROLLO.md](./05-INSTALACION_DESARROLLO.md)** | Setup local, instalación, troubleshooting | Nuevos devs, DevOps |
| **[06-PLAN_PRUEBAS_QA.md](./06-PLAN_PRUEBAS_QA.md)** | Testing strategy, ejemplos, métricas | QA, Testers, Devs |
| **[07-PROCEDIMIENTO_DESPLIEGUE.md](./07-PROCEDIMIENTO_DESPLIEGUE.md)** | Cómo desplegar a staging/prod, rollback | DevOps, Release managers |

### 📑 Ayuda

| Documento | Descripción |
|-----------|-------------|
| **[00-INDICE_DOCUMENTACION.md](./00-INDICE_DOCUMENTACION.md)** | Índice detallado y búsqueda por tema |

---

## 🎯 BUSCAR POR TAREAS

### "Quiero instalar el proyecto"
→ [`05-INSTALACION_DESARROLLO.md`](./05-INSTALACION_DESARROLLO.md)
- Node.js & PostgreSQL setup
- Docker compose
- Troubleshooting

### "Quiero entender la arquitectura"
→ [`03-ARQUITECTURA_DISEÑO.md`](./03-ARQUITECTURA_DISEÑO.md)
- Capas del backend
- Patrones de diseño
- Modelo de datos

### "Quiero crear/consumir una API"
→ [`04-API_DOCUMENTATION.md`](./04-API_DOCUMENTATION.md)
- Todos los endpoints
- Ejemplos curl
- Códigos de estado

### "Quiero escribir tests"
→ [`06-PLAN_PRUEBAS_QA.md`](./06-PLAN_PRUEBAS_QA.md)
- Unit tests
- Integration tests
- E2E tests
- Security tests

### "Quiero desplegar a producción"
→ [`07-PROCEDIMIENTO_DESPLIEGUE.md`](./07-PROCEDIMIENTO_DESPLIEGUE.md)
- Checklist pre-deploy
- Docker build & push
- Rollback procedures

### "Quiero validar requerimientos"
→ [`02-ESPECIFICACION_REQUERIMIENTOS.md`](./02-ESPECIFICACION_REQUERIMIENTOS.md)
- Requerimientos funcionales
- Requerimientos no-funcionales
- Criterios de aceptación

---

## 📊 INFORMACIÓN GENERAL

### Stack Tecnológico
- **Backend:** NestJS + TypeScript + PostgreSQL
- **Frontend:** React + TypeScript + Vite
- **Autenticación:** JWT + Passport
- **ORM:** TypeORM

### Características Principales
- ✅ Autenticación segura con JWT
- ✅ Gestión de movimientos financieros
- ✅ Movimientos recurrentes automáticos
- ✅ Dashboard con resumen financiero
- ✅ Tipado fuerte con TypeScript

### URLs Útiles
- Desarrollo: http://localhost:3000 (backend) / http://localhost:5173 (frontend)
- Documentación: Ver archivos en `docs/`
- Código: https://github.com/EAdrianLinares/Pl4nificash

---

## ⚡ COMANDOS FRECUENTES

```bash
# Backend
cd planificash-backend
npm install                 # Instalar dependencias
npm run start:dev          # Iniciar en desarrollo
npm run test              # Ejecutar tests
npm run lint              # Linting
npm run build             # Build para producción

# Frontend
cd planificash-frontend
npm install               # Instalar dependencias
npm run dev              # Iniciar servidor de desarrollo
npm run build            # Build para producción
npm run lint             # Linting

# Docker
docker-compose up -d     # Iniciar todos los servicios
docker-compose down      # Detener servicios
docker-compose logs -f   # Ver logs
```

---

## 🔍 TABLA RÁPIDA DE REFERENCIA

| Necesito... | Documento | Sección |
|-------------|-----------|---------|
| Entender el proyecto | 01 | Todo |
| Los requerimientos | 02 | 3-4 |
| Arquitectura del backend | 03 | 2 |
| Flujos de negocio | 03 | 4 |
| Endpoints de API | 04 | 3-6 |
| Instalar localmente | 05 | 2-3 |
| Configurar con Docker | 05 | 6 |
| Escribir tests | 06 | 2 |
| Desplegar a staging | 07 | 4 |
| Desplegar a producción | 07 | 5 |
| Hacer rollback | 07 | 6 |

---

## 📝 CONVENCIONES Y FORMATO

### Cómo están escritos los documentos

- **Markdown:** Todos usan formato Markdown
- **Estructura:** Títulos jerárquicos (H1-H6)
- **Ejemplos:** Código en bloques delimitados
- **Enlaces:** Múltiples referencias cruzadas

### Cómo actualizarlos

1. Abre el archivo en tu editor
2. Haz cambios
3. Guarda con commit descriptivo
4. Actualiza fecha de "última actualización"

---

## 🆘 AYUDA Y SOPORTE

### ¿Encontraste un error?
- Abre un issue en GitHub
- O contacta al equipo de desarrollo

### ¿Algo está desactualizado?
- Actualiza el documento
- Notifica al equipo
- Haz un commit con el cambio

### ¿Necesitas agregar documentación nueva?
- Crea un archivo en `docs/`
- Sigue el formato de los existentes
- Actualiza este README

---

## 📈 EVOLUCIÓN DE DOCUMENTACIÓN

Esta documentación fue creada como parte de la transición del proyecto a **SDD (Sistema de Desarrollo de Software)** y cubre:

- ✅ Análisis integral del proyecto
- ✅ Especificación de requerimientos
- ✅ Arquitectura y diseño
- ✅ Documentación de API
- ✅ Guía de instalación y desarrollo
- ✅ Plan de testing y QA
- ✅ Procedimientos de despliegue

Es un documento **vivo** que evoluciona con el proyecto.

---

## 📄 LICENCIA Y CRÉDITOS

**Proyecto:** Pl4nificash  
**Creada por:** Equipo de Desarrollo  
**Última actualización:** 25 de Julio de 2025  
**Versión de documentación:** 1.0.0

---

## 🎓 RECOMENDACIONES FINALES

1. **Familiarízate con la estructura** - Invierte tiempo leyendo los docs
2. **Mantén los docs actualizados** - Son tan importantes como el código
3. **Comparte cambios** - Comunica cuando actualices documentación
4. **Usa como referencia** - Vuelve a ellos cuando tengas dudas
5. **Enseña a otros** - Usa los docs para onboarding de nuevos devs

---

**¿Listo para empezar?** → [Ir a Instalación](./05-INSTALACION_DESARROLLO.md)

