import 'reflect-metadata';
import express, { Request, Response } from 'express';
import './database';

const app = express();

app.listen(3000, () => console.log(`Server is running! NLWS`));
app.get('/', (req: Request, res: Response) => {
    return res.json({ 'message': 'Hello World!' });
});