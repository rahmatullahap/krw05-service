# Kawaluyaan RW 05 Service

service to run application of kawaluyaan rw 05

## Quick Start

Make sure you already installed this service / runtime

1. nodejs > 12.0
1. myql > 11

if those requirement mets, create file `.apirc` and add configuration based on your development environment

```ini
[httpServer]
  port = 1221

[mysql]
  host = localhost
  port = 3306
  username = <your mysql username>
  password = <your mysql password>
  database = <your app database>

[app]
  providerSecret = your-provider-secret

```

install packages and build this project

```bash
npm i
npm run build
```

then run it

```bash
npm start
```

open your browser at http://localhost:5000/ to explore API service

## Development

to develop this projects you just run this command

```bash
npm i
npm run dev
```
