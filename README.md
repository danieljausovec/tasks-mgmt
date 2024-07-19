## Installation

```bash
# build docker image
$ docker build .

# start app (to get container id)
$ docker-compose up

# connect to container
$ docker exec -it {container-id} sh

# OPTIONAL: stops the execution of a script if a command or pipeline has an error
$ set +e

# install packages
$ npm install

# run migrations
$ npm run migration:run
```

## Running the app

```bash
# start app
$ docker-compose up

# build image and run app at the same time
$ docker-compose up --build
```

## How to generate and run migrations

```bash
# connect to container
$ docker exec -it {container-id} sh

# OPTIONAL: stops the execution of a script if a command or pipeline has an error
$ set +e

# generate migration
$ npm run migration:generate --name={task-name}

# run migration
$ npm run migration:run
```

## Swagger

```
http://localhost:3000/api
```
