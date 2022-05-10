# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

- MongoDB URL local

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

## Recontruir el proyecto y levantar Next.js

```
yarn install
yarn dev
```

## Llenar la BD con datos de prueba

llamar:

```

localhost:3000/api/seed

```
