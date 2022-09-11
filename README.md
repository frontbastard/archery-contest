# ArcheryContest

Architecture - https://www.mindmeister.com/map/2355617550?t=6BIg5PyPWI
Trello - https://trello.com/b/hDbViME0/archery-contest
Git - https://github.com/frontbastard/archery-contest

## To make it work locally

1. MondoDB

- Download - https://www.mongodb.com/try/download/community
- Extract, rename folder to just `mongodb` and place it in a convenient location
- Create a folder next to it and name it `mongodb-data`
- In the terminal run the command `<PATH_TO_FOLDER>/mongodb/bin/mongod --dbpath=<PATH_TO_FOLDER>/mongodb-data` (replace `<PATH_TO_FOLDER>` with the current path)

2. Studio 3T

- Download - https://studio3t.com/download/
- Install
- Connect with defaults (localhost:27017)

3. Postman

- Download - https://www.postman.com/downloads/
- Import `/Archery Contest.postman_collection.json`

4. Archery Contest Backend

- Clone - https://github.com/frontbastard/archery-contest-backend
- create a `/.config/dev.env` file with such content:

```env
NODE_ENV='development'
PORT=3000
SENDGRID_API_KEY=''
MONGODB_URL='mongodb://127.0.0.1:27017/archery-contest-api'
JWT_SECRET='ABCD1234a' // any symbols
```

- npm i
- npm run dev

5. Create master user

- Create user in Postman - `User -> Create User`
- Make it master if needed. In Studio 3T double click on `localhost:27017 -> archery-contest-api -> Collections -> users`, change `role` value to `1`

6. Add JWT token to the client

- Create file `token.ts` in the src/app/core/interceptors/ folder with code:

```typescript
const token = {
  master: 'PLACE_TOKEN_HERE',
  moderator: '',
  user: '',
};
export const jwtToken = token.master;
```

7. `git checkout dev`
8. `npm i`
9. `ng serve`
10. Open `localhost:4200`
