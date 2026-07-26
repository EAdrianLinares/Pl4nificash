# 🎯 GUÍA RÁPIDA DE DOCUMENTACIÓN SDD
## Pl4nificash - Quick Reference

**Última actualización:** 25 de Julio de 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Listo para SDD

---

## 📚 TABLA DE CONTENIDOS RÁPIDA

### 🟢 EMPEZAR AQUÍ
```
NUEVA EN EL PROYECTO?
│
├─► README.md (esta carpeta)
│   └─ Visión general, cómo navegarla
│
├─► RESUMEN_EJECUTIVO.md
│   └─ Overview ejecutivo del análisis
│
└─► 01-ANALISIS_PROYECTO.md
    └─ Qué es Pl4nificash y cómo está hecho
```

---

## 🔍 BUSCA LO QUE NECESITAS

### 🔴 REQUERIMIENTOS & PLANNING
```
NECESITO...                          VE A...
───────────────────────────────────────────────────────
Entender qué debe hacer el sistema   02-ESPECIFICACION_REQUERIMIENTOS.md
Ver criterios de aceptación          02, secc. 6
Conocer restricciones técnicas       02, secc. 5
Entender casos de uso                02, secc. 3-4
```

### 🔵 DESARROLLO & CÓDIGO
```
NECESITO...                          VE A...
───────────────────────────────────────────────────────
Instalar el proyecto                 05-INSTALACION_DESARROLLO.md
Entender la arquitectura              03-ARQUITECTURA_DISEÑO.md
Ver cómo está estructurado            03, secc. 2-3
Aprender sobre autenticación          03, secc. 2.3
Entender flujos de negocio            03, secc. 4
Consumir la API                       04-API_DOCUMENTATION.md
Ver ejemplos de endpoints             04, secc. 5-6
Resolver problemas de setup           05, secc. 9
```

### 🟡 TESTING & CALIDAD
```
NECESITO...                          VE A...
───────────────────────────────────────────────────────
Saber cómo testear                   06-PLAN_PRUEBAS_QA.md
Ver ejemplos de tests                06, secc. 2
Saber criterios QA                   06, secc. 3
Entender testing de seguridad        06, secc. 2.4
Metricas de performance              06, secc. 2.5
```

### 🟠 DESPLIEGUE & OPERACIONES
```
NECESITO...                          VE A...
───────────────────────────────────────────────────────
Desplegar a staging                  07-PROCEDIMIENTO_DESPLIEGUE.md, secc. 4
Desplegar a producción               07-PROCEDIMIENTO_DESPLIEGUE.md, secc. 5
Hacer rollback                       07-PROCEDIMIENTO_DESPLIEGUE.md, secc. 6
Setup Docker                         05-INSTALACION_DESARROLLO.md, secc. 6
                                    07-PROCEDIMIENTO_DESPLIEGUE.md, secc. 4-5
CI/CD automation                     07-PROCEDIMIENTO_DESPLIEGUE.md, secc. 8
```

---

## 🎓 POR ROL PROFESIONAL

### 👨‍💼 PROJECT MANAGER
**Meta:** Entender alcance, requerimientos, estado

```
PASO 1: Lee RESUMEN_EJECUTIVO.md (visión general)
PASO 2: Lee 01-ANALISIS_PROYECTO.md (qué es)
PASO 3: Lee 02-ESPECIFICACION_REQUERIMIENTOS.md (qué hace)
PASO 4: Lee 06-PLAN_PRUEBAS_QA.md, secc. 2 (criterios QA)

DOCUMENTOS CLAVE: 01, 02, RESUMEN_EJECUTIVO
TIEMPO ESTIMADO: 30-45 minutos
```

### 👨‍💻 BACKEND DEVELOPER
**Meta:** Entender arquitectura, implementar features

```
PASO 1: Lee 05-INSTALACION_DESARROLLO.md (setup)
PASO 2: Lee 03-ARQUITECTURA_DISEÑO.md (arquitectura)
PASO 3: Lee 04-API_DOCUMENTATION.md (endpoints)
PASO 4: Lee 02-ESPECIFICACION_REQUERIMIENTOS.md, secc. 3 (RF)
PASO 5: Lee 06-PLAN_PRUEBAS_QA.md (tests)

DOCUMENTOS CLAVE: 03, 04, 05, 06
TIEMPO ESTIMADO: 2-3 horas
```

### 👩‍💻 FRONTEND DEVELOPER
**Meta:** Entender arquitectura, componentes, API

```
PASO 1: Lee 05-INSTALACION_DESARROLLO.md (setup)
PASO 2: Lee 03-ARQUITECTURA_DISEÑO.md, secc. 3 (componentes)
PASO 3: Lee 04-API_DOCUMENTATION.md (endpoints)
PASO 4: Lee 06-PLAN_PRUEBAS_QA.md (tests)

DOCUMENTOS CLAVE: 03, 04, 05, 06
TIEMPO ESTIMADO: 1.5-2 horas
```

### 🧪 QA ENGINEER / TESTER
**Meta:** Validar requerimientos, tests

```
PASO 1: Lee 02-ESPECIFICACION_REQUERIMIENTOS.md (RF/RNF)
PASO 2: Lee 06-PLAN_PRUEBAS_QA.md (testing strategy)
PASO 3: Referencia 04-API_DOCUMENTATION.md (testing manual)
PASO 4: Lee 05-INSTALACION_DESARROLLO.md, secc. 9 (troubleshooting)

DOCUMENTOS CLAVE: 02, 06, 04
TIEMPO ESTIMADO: 1-1.5 horas
```

### 🚀 DEVOPS ENGINEER
**Meta:** Despliegue, operaciones, monitoreo

```
PASO 1: Lee 05-INSTALACION_DESARROLLO.md (tech stack)
PASO 2: Lee 05-INSTALACION_DESARROLLO.md, secc. 6 (Docker)
PASO 3: Lee 07-PROCEDIMIENTO_DESPLIEGUE.md (deploy)
PASO 4: Lee 01-ANALISIS_PROYECTO.md (stack general)

DOCUMENTOS CLAVE: 05, 07
TIEMPO ESTIMADO: 1.5-2 horas
```

### 🏗️ ARCHITECT
**Meta:** Entender diseño, patrones, escalabilidad

```
PASO 1: Lee 01-ANALISIS_PROYECTO.md (visión general)
PASO 2: Lee 03-ARQUITECTURA_DISEÑO.md (arquitectura)
PASO 3: Lee 02-ESPECIFICACION_REQUERIMIENTOS.md, secc. 4 (RNF)
PASO 4: Lee 03-ARQUITECTURA_DISEÑO.md, secc. 6 (escalabilidad)

DOCUMENTOS CLAVE: 01, 02, 03
TIEMPO ESTIMADO: 2-2.5 horas
```

---

## 🚀 TAREAS COMUNES - RUTA RÁPIDA

### "Necesito instalar el proyecto"
```
1. Lee: 05-INSTALACION_DESARROLLO.md, secc. 2-3
2. Ejecuta comandos en Backend: secc. 3
3. Ejecuta comandos en Frontend: secc. 4
4. Si hay errores: secc. 9 (troubleshooting)
⏱️ Tiempo: 30-60 minutos
```

### "Necesito crear una nueva API"
```
1. Lee: 03-ARQUITECTURA_DISEÑO.md, secc. 2.2
2. Lee: 04-API_DOCUMENTATION.md, secc. 3-6 (ejemplos)
3. Lee: 02-ESPECIFICACION_REQUERIMIENTOS.md, secc. 3 (si hay RF)
4. Lee: 06-PLAN_PRUEBAS_QA.md, secc. 2 (tests)
⏱️ Tiempo: 1-2 horas
```

### "Necesito desplegar a producción"
```
1. Lee: 07-PROCEDIMIENTO_DESPLIEGUE.md, secc. 5
2. Revisa: secc. 3 (requisitos)
3. Sigue: secc. 5.1-5.6 (paso a paso)
4. Ten listo: secc. 6 (rollback)
⏱️ Tiempo: 2-4 horas
```

### "Necesito escribir tests"
```
1. Lee: 06-PLAN_PRUEBAS_QA.md, secc. 2
2. Mira: ejemplos en secc. 2.1-2.4
3. Sigue: secc. 3 (criterios de aceptación)
4. Ejecuta: secc. 5 (comandos)
⏱️ Tiempo: 1-2 horas
```

### "Algo no funciona"
```
1. Ve a: 05-INSTALACION_DESARROLLO.md, secc. 9
2. Si es API: 04-API_DOCUMENTATION.md, secc. 7
3. Si es seguridad: 06-PLAN_PRUEBAS_QA.md, secc. 2.4
4. Si es deploy: 07-PROCEDIMIENTO_DESPLIEGUE.md, secc. 6
⏱️ Tiempo: 15-30 minutos
```

---

## 📞 REFERENCIAS RÁPIDAS

### Comandos Útiles
```bash
# Backend
npm run start:dev      # Iniciar en desarrollo
npm run test          # Tests unitarios
npm run lint          # Linting
npm run build         # Build producción

# Frontend
npm run dev           # Servidor desarrollo
npm run build         # Build producción
npm run lint          # Linting

# Docker
docker-compose up -d  # Iniciar
docker-compose down   # Detener
docker-compose logs   # Ver logs
```

### URLs Importantes
```
Localhost:
  Backend:  http://localhost:3000
  Frontend: http://localhost:5173
  
Staging:   https://staging-api.planificash.com
Producción: https://api.planificash.com

GitHub:    https://github.com/EAdrianLinares/Pl4nificash
```

### Credenciales de Ejemplo
```
Email:    test@example.com
Password: TestPassword123!

Base de Datos (dev):
  Host:     localhost:5432
  User:     planificash_user
  Password: <ver .env>
  DB:       planificash_db
```

---

## 🆘 ¿ESTÁ PERDIDO?

### "¿Por dónde empiezo?"
→ Lee `README.md` en la carpeta docs/

### "Tengo un rol específico"
→ Ve a la sección "POR ROL PROFESIONAL" arriba

### "Tengo una tarea específica"
→ Ve a la sección "TAREAS COMUNES" arriba

### "Necesito buscar un tema"
→ Ve a `00-INDICE_DOCUMENTACION.md`

### "Necesito contactar al equipo"
→ Ve a `README.md`, secc. "Soporte y referencias"

---

## 📊 ESTRUCTURA DE CARPETA DOCS

```
docs/
├── README.md ........................ LEER PRIMERO
├── RESUMEN_EJECUTIVO.md ............. Overview ejecutivo
├── GUIA_RAPIDA.md ................... ESTE ARCHIVO
├── 00-INDICE_DOCUMENTACION.md ....... Índice detallado
├── 01-ANALISIS_PROYECTO.md .......... Descripción proyecto
├── 02-ESPECIFICACION_REQUERIMIENTOS. Requerimientos
├── 03-ARQUITECTURA_DISEÑO.md ........ Arquitectura
├── 04-API_DOCUMENTATION.md .......... Endpoints
├── 05-INSTALACION_DESARROLLO.md .... Setup local
├── 06-PLAN_PRUEBAS_QA.md ........... Testing
└── 07-PROCEDIMIENTO_DESPLIEGUE.md .. Deploy
```

---

## ⏱️ TIEMPO DE LECTURA POR DOCUMENTO

| Documento | Minutos | Para |
|-----------|---------|------|
| README | 5 | Todos |
| RESUMEN_EJECUTIVO | 10 | Managers, Leads |
| 01-ANALISIS | 15 | Todos |
| 02-ESPECIFICACION | 15 | PMs, QA, Devs |
| 03-ARQUITECTURA | 20 | Devs, Architects |
| 04-API | 15 | Frontend, API users |
| 05-INSTALACION | 30 | Newbies, DevOps |
| 06-TESTING | 20 | QA, Devs |
| 07-DEPLOY | 25 | DevOps, Leads |
| **TOTAL** | **155 min** | Lectura completa |

---

## ✅ CHECKLIST ANTES DE EMPEZAR

- [ ] He leído `README.md`
- [ ] Sé dónde está mi rol en la sección "POR ROL"
- [ ] Tengo acceso a los repositorios
- [ ] Conozco los requisitos (Node.js, PostgreSQL, etc.)
- [ ] He identificado qué documentos leer primero

---

## 💡 TIPS PARA USAR ESTA DOCUMENTACIÓN

1. **Abre en Markdown Viewer:** Usa VSCode con extensión Markdown Preview
2. **Ctrl+F:** Usa búsqueda para encontrar temas específicos
3. **Enlaces internos:** Haz clic en las referencias cruzadas
4. **Ejemplos:** Copia y adapta los ejemplos de código
5. **Actualiza:** Si encuentras errores, actualiza los docs
6. **Comparte:** Envía links a tus colegas cuando sea relevante

---

## 📝 ÚLTIMA ACTUALIZACIÓN

- **Fecha:** 25 de Julio de 2025
- **Versión:** 1.0.0
- **Responsable:** Equipo de Desarrollo

---

## 🎯 PRÓXIMO PASO

**¿Listo?** → Empieza con `README.md` o ve a tu rol en "POR ROL PROFESIONAL"

**¿Necesitas algo específico?** → Usa el índice en `00-INDICE_DOCUMENTACION.md`

---

**¡Bienvenido al proyecto Pl4nificash! 🚀**

