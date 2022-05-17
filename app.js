const app = require('./server/server');


app.listen(3000, (req, res)=>{
    console.log('Listening on port 3000');
})