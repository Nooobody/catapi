
let PORT:string = "4000";
let MONGODB_URL:string = "mongodb://localhost:27017/catapi";
let MONGODB_DATABASE:string = "catapi";

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT;
  MONGODB_URL = process.env.MONGODB_URI;
  MONGODB_DATABASE = "heroku_2t9tjc2z";
}

export {
  PORT,
  MONGODB_URL,
  MONGODB_DATABASE
}
