# dearUs-app

**dearUs** is a full-stack web application designed for couples to create, share, and complete meaningful experiences together. It features user authentication, couple creation and joining via invite codes, a shared bucket list, and photo uploads for completed experiences. Built with React, TypeScript, Node.js, Express, PostgreSQL, and Cloudinary, the application is deployed using Vercel and Railway.

## Tech stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL with Knex
- **Media storage:** Cloudinary
- **Deployment:** Vercel and Railway

## Getting started

### Requirements

- Node.js and npm
- PostgreSQL
- Cloudinary account for photo uploads

### Environment variables

Create `backend/.env`:

```env
PORT=3000
JWT_SECRET=your-jwt-secret
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=dear_us
DB_USER=postgres
DB_PASSWORD=your-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Create `frontend/.env`:

```env
VITE_API_URL=https://your-api-domain
```

### Install and run

```bash
cd backend
npm install
npm run migrate
npm run dev
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Keep environment files private and do not commit them.
