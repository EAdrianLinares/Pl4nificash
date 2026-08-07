# Tasks - Feature: Disponible por fecha

## 1. Backend

- [x] Identificar en `movimientos` el endpoint y servicio que actualmente calculan o exponen el disponible.
- [x] Definir la fuente de fecha actual a usar en backend (zona horaria del servidor o estrategia acordada del proyecto).
- [x] Ajustar consulta/filtro para incluir solo movimientos con fecha `<= hoy`.
- [x] Excluir explícitamente movimientos con fecha futura del cálculo.
- [x] Calcular total de ingresos acumulados hasta hoy.
- [x] Calcular total de gastos acumulados hasta hoy.
- [x] Implementar regla: `disponible = ingresos - gastos`.
- [x] Garantizar retorno de `0` cuando no existan movimientos.
- [x] Validar que el tipo de dato retornado sea consistente para consumo en frontend.

## 2. API y contrato

- [ ] Verificar respuesta del endpoint con datos mixtos (ingresos y gastos).
- [x] Confirmar que el contrato no rompe consumidores actuales (nombre de campos y formato).
- [ ] Documentar en `docs/04-API_DOCUMENTATION.md` el comportamiento de exclusión de movimientos futuros.

## 3. Frontend

- [x] Actualizar consumo del endpoint de disponible (si cambió estructura o semántica).
- [x] Actualizar la tarjeta/componente de disponible para mostrar el valor acumulado hasta hoy.
- [x] Verificar formato monetario y separadores según configuración regional usada por la app.
- [ ] Comprobar que no se muestren valores negativos con formato incorrecto.

## 4. Pruebas

- [ ] Caso sin movimientos: disponible esperado `0`.
- [ ] Caso solo ingresos: disponible igual a suma de ingresos.
- [ ] Caso solo gastos: disponible igual a `0 - suma de gastos`.
- [ ] Caso ingresos y gastos: disponible igual a diferencia acumulada.
- [ ] Caso con movimientos futuros: no deben afectar el disponible actual.
- [ ] Caso con movimientos anteriores: deben afectar el disponible actual.
- [ ] Caso de borde en fecha actual (movimiento exactamente hoy): debe incluirse.

## 5. Criterios de aceptación

- [x] El disponible refleja únicamente movimientos con fecha `<= hoy`.
- [x] Los movimientos futuros no impactan el valor mostrado.
- [x] El frontend muestra el valor correcto y con formato monetario consistente.
- [ ] Los casos de prueba definidos pasan correctamente.
