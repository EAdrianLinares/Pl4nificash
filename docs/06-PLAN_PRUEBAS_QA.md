# PLAN DE PRUEBAS (QA) - Pl4nificash

## 1. INTRODUCCIÓN

Este documento especifica la estrategia de pruebas para garantizar la calidad y confiabilidad de Pl4nificash.

---

## 2. TIPOS DE PRUEBAS

### 2.1 Pruebas Unitarias (Unit Tests)

**Propósito:** Validar funcionalidad individual de métodos/funciones

**Tecnología:** Jest

**Cobertura Objetivo:** > 80%

**Ejemplos:**

#### Backend - AuthService
```typescript
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsuariosService],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('debe crear un usuario nuevo', async () => {
      const dto = {
        email: 'test@example.com',
        nombre: 'Test',
        password: 'TestPassword123!',
      };

      const result = await service.register(dto);

      expect(result).toBeDefined();
      expect(result.email).toBe(dto.email);
      expect(result.nombre).toBe(dto.nombre);
    });

    it('debe lanzar error si email ya existe', async () => {
      const dto = {
        email: 'existing@example.com',
        nombre: 'Test',
        password: 'TestPassword123!',
      };

      await expect(service.register(dto))
        .rejects
        .toThrow('Email already exists');
    });

    it('debe hashear la contraseña', async () => {
      const dto = {
        email: 'new@example.com',
        nombre: 'Test',
        password: 'TestPassword123!',
      };

      const result = await service.register(dto);

      expect(result.password).not.toBe(dto.password);
      expect(result.password).toHaveLength(60); // bcrypt hash length
    });
  });

  describe('login', () => {
    it('debe retornar JWT si credenciales son válidas', async () => {
      const result = await service.login({
        email: 'test@example.com',
        password: 'TestPassword123!',
      });

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('token_type');
      expect(result.token_type).toBe('Bearer');
    });

    it('debe lanzar error si contraseña es incorrecta', async () => {
      await expect(
        service.login({
          email: 'test@example.com',
          password: 'WrongPassword123!',
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
```

#### Frontend - useMovimientos Hook
```typescript
describe('useMovimientos', () => {
  it('debe inicializar con estado vacío', () => {
    const { result } = renderHook(() => useMovimientos());

    expect(result.current.movimientos).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('debe cargar movimientos', async () => {
    const { result } = renderHook(() => useMovimientos());

    act(() => {
      result.current.fetchMovimientos();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movimientos.length).toBeGreaterThan(0);
  });
});
```

---

### 2.2 Pruebas de Integración (Integration Tests)

**Propósito:** Validar interacción entre módulos

**Tecnología:** Jest + Supertest

**Enfoque:** Controllers + Services + Base de datos

#### Ejemplo Backend
```typescript
describe('MovimientosController (Integration)', () => {
  let app: INestApplication;
  let movimientosService: MovimientosService;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    movimientosService = moduleFixture.get<MovimientosService>(
      MovimientosService,
    );

    // Obtener token de autenticación
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123!',
      });

    authToken = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /movimientos', () => {
    it('debe crear un nuevo movimiento', async () => {
      const createDto = {
        monto: 100.50,
        tipo: 'INGRESO',
        descripcion: 'Test ingreso',
        fecha: '2025-07-25',
      };

      const response = await request(app.getHttpServer())
        .post('/movimientos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.monto).toBe(createDto.monto);
      expect(response.body.tipo).toBe(createDto.tipo);
    });

    it('debe validar campos requeridos', async () => {
      const invalidDto = {
        monto: 100,
        // tipo faltante
        descripcion: 'Test',
        fecha: '2025-07-25',
      };

      await request(app.getHttpServer())
        .post('/movimientos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /movimientos', () => {
    it('debe retornar lista de movimientos del usuario', async () => {
      const response = await request(app.getHttpServer())
        .get('/movimientos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page');
    });

    it('debe filtrar por tipo', async () => {
      const response = await request(app.getHttpServer())
        .get('/movimientos?tipo=INGRESO')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      response.body.data.forEach((mov) => {
        expect(mov.tipo).toBe('INGRESO');
      });
    });
  });
});
```

---

### 2.3 Pruebas E2E (End-to-End)

**Propósito:** Validar flujos completos del usuario

**Tecnología:** Cypress o Playwright

**Ejemplo:**

```typescript
describe('Login and Create Movimiento - E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Usuario debe poder registrarse y crear un movimiento', () => {
    // 1. Ir a página de registro
    cy.contains('Register').click();

    // 2. Llenar formulario de registro
    cy.get('input[name="email"]').type('newemail@test.com');
    cy.get('input[name="nombre"]').type('New User');
    cy.get('input[name="password"]').type('SecurePassword123!');
    cy.get('button[type="submit"]').click();

    // 3. Esperar redirección a login
    cy.url().should('include', '/login');

    // 4. Login
    cy.get('input[name="email"]').type('newemail@test.com');
    cy.get('input[name="password"]').type('SecurePassword123!');
    cy.get('button[type="submit"]').click();

    // 5. Esperar redirección a dashboard
    cy.url().should('include', '/dashboard');

    // 6. Navegar a movimientos
    cy.contains('Movimientos').click();

    // 7. Crear nuevo movimiento
    cy.contains('Nuevo Movimiento').click();
    cy.get('input[name="monto"]').type('500');
    cy.get('select[name="tipo"]').select('INGRESO');
    cy.get('input[name="descripcion"]').type('Test ingreso');
    cy.get('button[type="submit"]').click();

    // 8. Verificar que se creó
    cy.contains('Movimiento creado exitosamente').should('be.visible');
    cy.contains('500').should('be.visible');
  });
});
```

---

### 2.4 Pruebas de Seguridad

**Propósito:** Validar que la aplicación sea segura

**Checklist:**

- [ ] **SQL Injection:** Validar que DTOs previenen SQL injection
- [ ] **XSS (Cross-Site Scripting):** Sanitizar salidas en frontend
- [ ] **CSRF:** Validar tokens CSRF (si aplica)
- [ ] **JWT:** Verificar que tokens expiran correctamente
- [ ] **Contraseñas:** Validar que se hashean con bcrypt
- [ ] **Autenticación:** Validar que rutas protegidas requieren JWT
- [ ] **Autorización:** Validar que usuarios solo ven sus datos
- [ ] **HTTPS:** Verificar que en producción usa HTTPS

#### Test Ejemplo
```typescript
describe('Security Tests', () => {
  describe('Authorization', () => {
    it('debe rechazar solicitud sin token JWT', async () => {
      await request(app.getHttpServer())
        .get('/movimientos')
        .expect(401);
    });

    it('debe rechazar token JWT inválido', async () => {
      await request(app.getHttpServer())
        .get('/movimientos')
        .set('Authorization', 'Bearer invalid.token.here')
        .expect(401);
    });

    it('Usuario no debe acceder a movimientos de otro usuario', async () => {
      // Usuario A obtiene token
      const tokenA = await getToken('usera@test.com');

      // Usuario B obtiene movimiento de usuario A (debería fallar)
      await request(app.getHttpServer())
        .get(`/movimientos/${otherUsersMovementId}`)
        .set('Authorization', `Bearer ${tokenA}`)
        .expect(403);
    });
  });

  describe('Input Validation', () => {
    it('debe rechazar email inválido', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'not-an-email',
          nombre: 'Test',
          password: 'Password123!',
        })
        .expect(400);
    });

    it('debe rechazar contraseña débil', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          nombre: 'Test',
          password: '123', // Demasiado corta
        })
        .expect(400);
    });

    it('debe rechazar monto negativo', async () => {
      await request(app.getHttpServer())
        .post('/movimientos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          monto: -100,
          tipo: 'INGRESO',
          descripcion: 'Test',
          fecha: '2025-07-25',
        })
        .expect(400);
    });
  });

  describe('Password Security', () => {
    it('debe hashear contraseña al registrar', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'secure@test.com',
          nombre: 'Test',
          password: 'PlainTextPassword123!',
        });

      const user = await User.findOne({ email: 'secure@test.com' });

      expect(user.password).not.toBe('PlainTextPassword123!');
      expect(user.password).toHaveLength(60); // bcrypt hash
    });
  });
});
```

---

### 2.5 Pruebas de Performance

**Propósito:** Validar que la app es rápida

**Métricas Objetivo:**
- API response time: < 200ms para 95% operaciones
- Page load: < 3s en 4G
- Conexión: Soportar 1000+ usuarios concurrentes

#### Test Ejemplo
```typescript
describe('Performance Tests', () => {
  it('GET /movimientos debe responder en < 200ms', async () => {
    const start = Date.now();

    await request(app.getHttpServer())
      .get('/movimientos?limit=100')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(200);
  });

  it('crear 1000 movimientos no debe degradar performance', async () => {
    // Medir antes
    const timeBefore = await measureQueryTime(
      'SELECT * FROM movimientos WHERE usuario_id = ?'
    );

    // Crear 1000 movimientos
    for (let i = 0; i < 1000; i++) {
      await createMovimiento({...});
    }

    // Medir después
    const timeAfter = await measureQueryTime(
      'SELECT * FROM movimientos WHERE usuario_id = ?'
    );

    // No debe ser 1000x más lento
    expect(timeAfter).toBeLessThan(timeBefore * 5);
  });
});
```

---

## 3. PLAN DE EJECUCIÓN DE PRUEBAS

### Fase 1: Desarrollo
- Tests unitarios durante desarrollo
- Ejecutar: `npm run test:watch`

### Fase 2: Pre-Integración
- Tests de integración después de implementar features
- Ejecutar: `npm run test`

### Fase 3: QA
- Tests E2E en ambiente de staging
- Tests de seguridad
- Tests de performance

### Fase 4: Producción
- Monitoreo de errores
- Logs de problemas
- Feedback de usuarios

---

## 4. CRITERIOS DE ACEPTACIÓN PARA TESTS

| Métrica | Target | Crítico |
|---------|--------|---------|
| Cobertura Unit Tests | > 80% | Sí |
| Cobertura Integration | > 70% | Sí |
| E2E Tests Passing | 100% | Sí |
| Security Tests | 100% | Sí |
| Performance < 200ms | 95% | Sí |
| Zero Critical Bugs | 100% | Sí |

---

## 5. COMANDOS DE PRUEBA

```bash
# Backend
npm run test                    # Tests unitarios
npm run test:watch            # Watch mode
npm run test:cov              # Con coverage
npm run test:debug            # Debug mode
npm run test:e2e              # Tests E2E

# Frontend (cuando se implemente)
npm run test                   # Tests con Vitest
npm run test:e2e              # Tests E2E con Cypress
```

---

## 6. REPORTING Y MÉTRICAS

### Reporte de Cobertura
```
npm run test:cov

Genera reporte en: ./coverage/index.html
```

### Métricas a Trackear
- % Cobertura de código
- Bugs encontrados y resueltos
- Tiempo promedio de test
- Fallos intermitentes

---

## 7. AUTOMACIÓN CI/CD (Futuro)

```yaml
# GitHub Actions ejemplo
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run lint
      - run: npm run test:cov
      - run: npm run test:e2e
```

