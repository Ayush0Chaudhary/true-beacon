# True Beacon Assignement

Live Project Link : [http://jupiter.mdgspace.org:8701/]()
<br>
Youtube Demo Link :( bad audio : [https://www.youtube.com/watch?v=o972wo2mGUY]()

**NOTE**: 
<br>
1. Use following creds to login to see entire website
<br>
**username** : ayush0000ayush
<br>
**password**: ayushayush

<br>

2. Websocket don't work on hosted version. only work on local 

## Frontend setup

1. Clean install all the packages
```
$ cd website
$ npm ci
```
2. COPY .env.sample and paste following creds
```
VITE_BACKEND_URL='http://localhost:3000'
VITE_WEBSOCKET_URL='ws://localhost:3000'
```

3. Start the server
```
$ npm run dev
```

Frontend running at http://localhost:5173

## Backend setup

1. Clean install all the packages
```
$ cd backend
$ npm ci
```

2. Install nest cli
```
npm install -g @nestjs/cli
```

3. Generate artifacts (e.g. Prisma Client)
```
$ npx prisma generate
```

4. Start the server
```
$ npm run start:dev
```


#### Alternatively you can you use docker file but configure env accordingly