
let PORT:string = "4000";
let MONGODB_URL:string = "mongodb://localhost:27017/catapi";

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT;
  MONGODB_URL = process.env.MONGODB_URI;
}

export {
  PORT,
  MONGODB_URL
}
