# Tasks - Feature: Mobile responsive

## 0. Preparacion

- [x] Renombrar archivo de tareas de `tassk.md` a `tasks.md` para estandarizar documentacion.

## 1. Auditoria UI

- [x] Revisar `Dashboard` en mobile para detectar desbordes, solapamientos y jerarquia visual.
- [x] Revisar `Navbar` en mobile para navegacion tactil y legibilidad.
- [x] Revisar formularios para ancho, espaciado y facilidad de interaccion.
- [x] Revisar tablas para problemas de lectura y overflow horizontal.
- [x] Revisar modales para ajuste al viewport y accesibilidad de acciones.
- [x] Revisar tarjetas para apilamiento vertical y consistencia de margenes.

## 2. Implementacion responsive

- [x] Definir/validar breakpoints operativos: `<576px`, `576px-991px`, `>=992px`.
- [x] Ajustar grid principal para reorganizacion vertical en mobile.
- [x] Ajustar layout de dashboard para apilar bloques y priorizar contenido.
- [x] Asegurar que no exista scroll horizontal en vistas principales.
- [x] Adaptar tablas (scroll controlado, columnas prioritarias o version compacta).
- [x] Ajustar formularios para ocupar ancho disponible en mobile.
- [x] Aumentar area tactil de botones y controles interactivos.
- [x] Ajustar textos para evitar desbordes (`wrap`, truncado o escalado segun aplique).
- [x] Adaptar modales al ancho disponible y asegurar cierre/acciones visibles.
- [x] Ajustar navegacion mobile (menu, tabs o enlaces) para uso comodo con dedo.

## 3. Validacion por dispositivo/ancho

- [x] Validar interfaz en `320px`.
- [x] Validar interfaz en `375px`.
- [x] Validar interfaz en `390px`.
- [x] Validar interfaz en `414px`.
- [x] Validar interfaz en `768px`.
- [x] Validar interfaz en desktop (`>=992px`) para evitar regresiones.

## 4. QA funcional y visual

- [ ] Comprobar que todos los flujos clave funcionen en mobile (navegar, crear, editar, guardar).
- [x] Verificar legibilidad de textos y labels en formularios.
- [x] Verificar que botones primarios/secundarios sean distinguibles y tocables.
- [ ] Verificar que modales no queden fuera de pantalla con teclado virtual activo.
- [ ] Ejecutar chequeo rapido en orientacion vertical y horizontal.

## 5. Criterios de aceptacion

- [x] La app es usable desde `320px` en adelante.
- [x] No hay scroll horizontal no intencional.
- [ ] Formularios, tablas, modales, dashboard y navegacion son utilizables en mobile.
- [x] Los textos no desbordan contenedores.
- [x] No hay regresiones visuales relevantes en tablet/desktop.
