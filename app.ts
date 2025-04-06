import express, { Request, Response } from 'express';
// import fileUpload, { UploadedFile } from 'express-fileupload';
// import bodyParser from 'body-parser';

const app = express()
    .set('view engine', 'ejs')
    .set('views', __dirname + '/views')
    .use(express.static(__dirname + '/resources'))
    // .use(fileUpload())
    // .use(bodyParser.json())
    // .use(bodyParser.urlencoded({extended: true}))
    .use((err: Error, req: Request, res: Response, next: Function) => {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error', error: err });
      });

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('Visit http://localhost:3000')
});
