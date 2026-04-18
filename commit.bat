@echo off
cd /d "c:\Users\eyner\Documents\Pl4nificash"
git add -A
git commit -m "fix: Corregir errores de TypeScript en componentes de formularios - Cambiar TipoMovimiento y CategoriaMovimiento de enum values a strings literales - Corregir props de ModalMovimiento en Movimientos.tsx (onSubmit -> onSubmitMovimiento) - Establecer categoría inicial válida en Movimientos.tsx - Tipar array data en Recurrentes.tsx - Remover parámetro nome no utilizado en handleAplicarIndividual - Limpiar imports innecesarios de enums - Agregar import React en ModalMovimiento Fixes para despliegue a Vercel"
