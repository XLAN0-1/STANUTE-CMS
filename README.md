# STANUTE-CMS

//npm modules to install
mocha(tests)
express
mongoose
jsonwebtoken
bcrypt
dotenv
cors
nodemon(optional)

//HOW TO CONNECT TO THE DATABASE
In server/server.js line 13: mongoose.connect(`mongodb+srv://admin-lana:${process.env.DB_PASSWORD}@cluster0.4ltqi.mongodb.net/cms?retryWrites=true&w=majority`);
The argument passed to mongoose.connect() is the connection uri to connect to my personal mongodb database, when testing the app you will want to create your own personal mongodb databse and connect to it using the uri they give you, You can use this link to assist you in creating your cloud database: "https://www.mongodb.com/docs/atlas/getting-started/" or you can install the mongodb server on your laptop to test it on a local database without connecting to the internet.

After setting up the databse run 'node app.js' or 'nodemon app.js' to start testing it locally on port 3000.
