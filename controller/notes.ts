import express, { Router, Request, Response } from 'express';
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

router.post('/create', async (req: Request, res: Response) => {
    /**
     * Route: POST /notes/create
     * Create a new note in the database.
     */
    console.log(req.body);

    res.send("Not implemented");
});

export default router;