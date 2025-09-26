# 📚 **React-express-messenger**

A simple client-server application for message sending

---

# 📚 **Technologies**

- React+Vite+TypeScript
- Express
- Docker
- Axios
- Tailwind
- Ant Design

---

## ⚙ **Prerequisites**

- [Git](https://git-scm.com/downloads) — download & install.
- [Node.js](https://nodejs.org/en/download/) — includes `npm`.
- [Docker](https://docs.docker.com/engine/install/) — required for DB & containerized runs.

---

## 🚀 **Clone the repository**

```bash
git https://github.com/potatosim/react-express-messenger.git
cd react-express-messenger
```

---

## 🌱 **Setup environment variables**

- Copy `.env.example` → rename to `.env`
- Edit if necessary.

---

## 🖥 **Run in development mode**

> ⚠️ **Note:** Before starting the app locally in dev mode, follow the next algorithm:

```bash

cd client
npm install
npm run dev


```

## 🐳 **Run DB with Docker**

Open a separate terminal to run DB (make sure that Docker Engine is running):

```bash

docker-compose -f docker-compose.dev.yml up --build

```

Open a separate terminal for running BE server:

```bash

cd server
npm install
npm run dev

```

---

## 🐳 **Run client/server/DB with Docker in prod mode**

```bash
docker-compose -f docker-compose.yml up --build
```

---

Open [App](http://localhost:8080/)
