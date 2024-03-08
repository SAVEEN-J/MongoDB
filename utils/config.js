const MONGODB_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT_BACKEND;
const Email_ID = process.env.Email_ADDRESS;
const Email_PW = process.env.Email_APP_PW;
const SECRET = process.env.SECRET_KEY;


module.exports={
    MONGODB_URI,
    PORT,
    Email_ID,
    Email_PW,
    SECRET
}