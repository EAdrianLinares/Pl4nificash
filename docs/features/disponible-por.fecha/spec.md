# Disponible según movimientos

## Objetivo

Modificar el cálculo del disponible para que represente
el saldo acumulado de los movimientos registrados hasta
la fecha actual.

## Regla de negocio

Disponible = suma de ingresos - suma de gastos

considerando todos los movimientos cuya fecha sea menor
o igual a la fecha actual.

## Comportamiento

- Los ingresos aumentan el disponible.
- Los gastos disminuyen el disponible.
- Los movimientos futuros no afectan el disponible actual.
- Los movimientos anteriores sí afectan el disponible.
- Si no existen movimientos, el disponible será 0.

## Ejemplo

Movimientos:

01/08 - Ingreso  $500.000
03/08 - Gasto    $100.000
05/08 - Gasto     $50.000
10/08 - Ingreso  $200.000

Si hoy es 07/08:

Disponible = 500.000 - 100.000 - 50.000
Disponible = 350.000

El ingreso del 10/08 todavía no afecta el disponible.