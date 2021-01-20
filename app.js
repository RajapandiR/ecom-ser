import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import router from './src/routes';
import config from './config/config';
import init from './config/init';
// import viewRouters from './src/routes/viewRoute';

const app = express();
const port = config.PORT;
const MongoStore = connectMongo(session);



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  resave: false,
  saveUninitialized: true,
  keys: ['username', 'token' , "id" , "role", "isValid"],
  secret: '123456789',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: config.DB,
    autoReconnect: true,
    autoRemove: 'disabled'
  })
}));
app.use('/api', router)

app.get('/', (req, res) => {
	res.send("Hello")
});

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, 
	{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
  });

// app.listen(port, () => console.log(`Serven on ${port}`));
init(app,config.DB).then(function initialized() {
  app.listen(port, () => console.log(`Serven on ${port}`));
})