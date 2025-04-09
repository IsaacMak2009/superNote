import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { NoteModel } from '../models/note';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    /**
     * Route: GET /notes/
     * Get all notes in the database.
     */
    const notes = await NoteModel.find({}).exec();
    // console.debug(notes);
    res.render('notes', { notes });
});

router.get('/details/:id', async (req: Request, res: Response) => {
    /**
     * Route: GET /notes/details/:id
     * Get a specific note in the database.
     */
    res.send("Not implemented");
});

router.post('/create', multer({ dest: 'resources/images/' }).single('cover'), async (req: Request, res: Response) => {
    /**
     * Route: POST /notes/create
     * Create a new note in the database.
     */
    // console.log(req.body, req.file);

    // Check if the request contains all the required fields
    if (!req.body.title || !req.body.content || !req.body.tags) {
        res.status(400).send({
            message: 'Missing required fields'
        })
    }

    // Check if the cover image is exists
    if (req.file && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
        res.status(400).send({
            message: 'Invalid file type'
        })
    }

    const note = new NoteModel({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags.split(',').map((tag: string) => tag.trim()),
        createdAt: new Date(),
        updatedAt: new Date(),
        coverPath: req.file ? `/images/${req.file.filename}` : '/images/default_cover.jpg'
    });
    console.debug("Created note:", note);
    await note.save();

    res.status(201).send({
        message: 'Note created successfully'
    });
});

export default router;