# "Node | Express | Typescript - User Roles and Permissions"

---

## How to run locally

- clone the repo
```cmd
git clone https://github.com/Maxwell-ihiaso/user_roles_auth.git
```
- switch to working directory
```
cd user_roles_auth
```
- install dependencies
```
yarn install
```
- create a `.env` file
```
touch .env
```
- add the following files to you env file
```
MONGODB_URI=[your MONGODB_URI]
ACCESS_TOKEN_SECRET=[your access_token_secret]
REFRESH_TOKEN_SECRET=[your refresh_token_secret]
```
#### For development, run 
```
yarn dev
```
#### For production, run 
```
yarn dev
```

---
---

## How to run in docker container
> ensure you have docker installed on your machine for this to work
- clone the repo
```cmd
git clone https://github.com/Maxwell-ihiaso/user_roles_auth.git
```
- switch to working directory
```
cd user_roles_auth
```
- Development
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
- Production
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```


