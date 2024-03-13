const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const comicRouter = require('./routes/comics');

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/comics',comicRouter); 

app.listen(3000);
