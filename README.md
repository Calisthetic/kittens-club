# Kittens club

## About

Разработан с использованием фреймворка [Next.js](https://nextjs.org/).

Диаграмма базы данных [здесь](https://dbdiagram.io/d/kittens-club-6669ca06a179551be6b81380).

База данных на сервере [TiDB](https://www.pingcap.com/)

Размещён на хостинге при помощи [Velcel](https://vercel.com).

## Dev

Личный кабинет [TiDB](https://tidbcloud.com/console/clusters/10066201494960421752/overview?orgId=1372813089209231409&projectId=1372813089454548684)

### History

```bash
npm create next-app
```

```bash
npm install autoprefixer
npm install framer-motion
npm install mysql2
npm install next-auth@beta
npx auth secret
npm install formidable
npm i --save-dev @types/formidable
npm install next-themes
```

[ReactJS Drag Drop File Upload](https://codepen.io/codemzy/pen/YzELgbb)

### Setup

Install project locally. Check database [provider](https://tidbcloud.com/console/clusters/10066201494960421752/overview?orgId=1372813089209231409&projectId=1372813089454548684) and create **.env.development.local** file as example:

```bash
TIDB_HOST=gateway01.eu-central-1.prod.aws.tidbcloud.com
TIDB_PORT=4000
TIDB_USER=x.root
TIDB_PASSWORD=x
TIDB_DATABASE=x
NEXT_PUBLIC_API_URL="http://localhost:3000"
AUTH_SECRET="x"
NODE_ENV="development"
```

Run the development server:

```bash
npm run dev
```

Also check next.config.js to prevent troubles with images

## Other

Best dbs:

- [turso](https://turso.tech/app)
- [cockroachlabs](https://cockroachlabs.com/pricing/)
