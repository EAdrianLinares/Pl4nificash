---
name: coding-preferences
description: "Preferencias de codificación: respuestas en español, código limpio, TypeScript production-ready con explicaciones detalladas de funcionalidades"
applyTo: "**"
---

# Preferencias de Codificación - Pl4nificash

## Idioma
- **Responde siempre en español** (instrucciones, explicaciones, comentarios en código)
- Usa terminología técnica en inglés cuando sea estándar (ej: `async/await`, `TypeScript`, `React hooks`)

## Cuando Escribas Código

### Explicación de Funcionalidades
- **Siempre explica** qué hace cada función, componente o lógica importante
- Incluye ejemplos de uso cuando sea relevante
- Documenta parámetros y valores de retorno significativos
- Explica la estrategia o patrón utilizado (ej: "usando patrón Observer", "lazy loading", etc.)
- Especifica el propósito y los casos de uso

### Código Limpio
- Nombres de variables/funciones descriptivos y en inglés (estándar para código profesional)
- Máximo 80-120 caracteres por línea
- Funciones pequeñas y enfocadas (principio de responsabilidad única)
- Evita código duplicado (DRY - Don't Repeat Yourself)
- Elimina código muerto y comentarios innecesarios
- Usa constantes para valores mágicos
- Importaciones organizadas y limpias
- Estructura consistente y predecible

### TypeScript para Producción
- **Tipado fuerte**: Define tipos explícitos para funciones, parámetros y retornos
- Usa `type` o `interface` según convenga:
  - `type` para tipos simples, uniones, y tipos primitivos
  - `interface` para contratos de objetos y clases
- **Evita `any` a toda costa** - usa tipos genéricos o tipos más específicos
- Valida datos de entrada y maneja excepciones robustamente
- Usa `readonly` para propiedades inmutables
- Exporta tipos públicos claramente
- Implementa manejo de errores exhaustivo
- Considera performance y memory leaks en operaciones async
- Usa `as const` para literales de tipo
- Usa enums o unions para opciones limitadas (evita strings mágicos)

## Estructura de Respuestas al Escribir Código

### Para Funciones/Componentes:
1. **Contexto**: Explica brevemente qué vas a implementar y por qué
2. **Código**: Muestra la implementación completa
3. **Explicación**: Detalla las funcionalidades y decisiones de diseño
4. **Funcionalidades Clave**: Lista puntual de lo que hace
5. **Ejemplo de Uso**: Muestra cómo se utiliza con casos reales
6. **Notas Importantes**: Cuidados, optimizaciones, edge cases, o consideraciones especiales

---

## Contexto Pl4nificash

### Backend (NestJS)
- Usar servicios para la lógica de negocio
- Controllers para rutas HTTP
- DTOs para validación de entrada
- Middleware para autenticación y autorización
- Manejo de errores consistente

### Frontend (React + TypeScript)
- Componentes funcionales con hooks
- Custom hooks para lógica reutilizable
- Separación: pages, components, hooks, utils, api
- Gestión de estado con useState/useContext
- Tipado fuerte en props y estado

## Prioridades
1. **Tipado fuerte en TypeScript** - es la base de código production-ready
2. **Explicaciones detalladas** - ayuda a mantener y entender el código
3. **Código limpio** - facilita mantenimiento y escalabilidad
4. **Funcionabilidad correcta** - el código debe hacer exactamente lo que promete
