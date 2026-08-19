import { Request, Response, Router } from "express";
import path from 'path';
import multer from 'multer';
import fs from 'fs';

// Use OS temp directory for temporary file storage
const tmpDir = require('os').tmpdir();

// Allowed file types - restrict to safe types only
const ALLOWED_MIMETYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

const router = Router();



const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, tmpDir);
    },
    filename: (req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'upload-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const fileFilter: multer.Options['fileFilter'] = (
    _req,
    file,
    cb,
) => {
    if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
        cb(null, false);
        return;
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: MAX_FILE_SIZE }
});

router.post('/fileanalyse', (req: Request, res: Response) => {
    upload.single('upfile')(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extract file metadata
        const fileMetadata = {
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        };

        // Delete the temporary file immediately after extracting metadata
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting temporary file:', unlinkErr);
            }
        });

        // Return metadata
        res.json(fileMetadata);
    });
})

export default router;
