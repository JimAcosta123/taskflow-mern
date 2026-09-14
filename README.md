# TaskFlow — Gestor de Tareas y Proyectos (MERN)

Aplicacion web full stack para gestionar proyectos y tareas personales, con autenticacion de usuarios. Construida con **MongoDB, Express, React y Node.js**.

## Funcionalidades

- Registro e inicio de sesion con JWT (contrasenas hasheadas con bcrypt).
- CRUD de proyectos por usuario autenticado.
- CRUD de tareas asociadas a un proyecto, con estado (pendiente / en progreso / completada) y prioridad.
- Rutas protegidas tanto en el backend (middleware JWT) como en el frontend (rutas privadas).
- API REST documentada por recurso (ver abajo).

## Stack tecnico

**Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, express-validator
**Frontend:** React 18, Vite, React Router, Axios, Context API para el estado de autenticacion

## Estructura del proyecto

```
01-taskflow-mern/
├── backend/
│   ├── src/
│   │   ├── config/       # conexion a MongoDB
│   │   ├── controllers/  # logica de negocio
│   │   ├── middleware/   # auth JWT y manejo de errores
│   │   ├── models/       # esquemas Mongoose (User, Project, Task)
│   │   ├── routes/       # rutas Express
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/          # cliente axios
    │   ├── context/       # AuthContext
    │   ├── components/    # componentes reutilizables
    │   ├── pages/          # Login, Register, Dashboard
    │   └── App.jsx
    └── package.json
```

## Como correrlo en local

### Requisitos
- Node.js 18+
- MongoDB corriendo localmente (o una URI de MongoDB Atlas)

### Backend
```bash
cd backend
cp .env.example .env      # y edita JWT_SECRET / MONGO_URI si hace falta
npm install
npm run dev                # http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

## Endpoints principales

| Metodo | Ruta                  | Descripcion                         | Auth |
|--------|-----------------------|--------------------------------------|------|
| POST   | /api/auth/register    | Crea un usuario                      | No   |
| POST   | /api/auth/login       | Inicia sesion, devuelve JWT          | No   |
| GET    | /api/auth/me          | Perfil del usuario autenticado       | Si   |
| GET    | /api/projects         | Lista proyectos del usuario          | Si   |
| POST   | /api/projects         | Crea un proyecto                     | Si   |
| PUT    | /api/projects/:id     | Actualiza un proyecto                | Si   |
| DELETE | /api/projects/:id     | Elimina un proyecto (y sus tareas)   | Si   |
| GET    | /api/tasks?project=id | Lista tareas (filtrable por proyecto)| Si   |
| POST   | /api/tasks             | Crea una tarea                       | Si   |
| PUT    | /api/tasks/:id         | Actualiza una tarea                  | Si   |
| DELETE | /api/tasks/:id         | Elimina una tarea                    | Si   |

## Posibles mejoras futuras

- Tests con Jest + Supertest en el backend y React Testing Library en el frontend.
- Paginacion e infinite scroll en la lista de tareas.
- Notificaciones por fecha de vencimiento.
- Despliegue: backend en Render/Railway, frontend en Vercel/Netlify, DB en MongoDB Atlas.

---
Proyecto desarrollado como parte del portafolio de Jim Kleber Acosta Acosta, egresado de Desarrollo de Software - SENATI.
