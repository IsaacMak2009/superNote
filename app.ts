import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/supernote');

const app = express()
    .set('view engine', 'ejs')
    .set('views', __dirname + '/views')
    .use(express.static(__dirname + '/resources'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use((err: Error, req: Request, res: Response, next: Function) => {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error', error: err });
      });

app.use('/notes', require('./controller/notes').default);
app.use('/tags', require('./controller/tags').default);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('Visit http://localhost:3000')
});
