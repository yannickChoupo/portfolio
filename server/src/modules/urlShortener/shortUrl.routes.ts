import { Router, Request, Response } from 'express';
import dns from 'node:dns';
import { URL } from 'node:url';
import Url from '../../models/url';
const router = Router();

const lookupAsync = (hostname: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (error, address) => {
      if (error || !address) {
        reject(new Error('DNS lookup failed'));
        return;
      }

      resolve(address);
    });
  });
};

router.post('/', async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({
      error: 'URL is required',
    });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({
      error: 'invalid url',
    });
  }

  // Only allow HTTP/HTTPS
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return res.status(400).json({
      error: 'Only HTTP and HTTPS URLs are allowed',
    });
  }

  try {
    await lookupAsync(parsedUrl.hostname);
  } catch {
    return res.status(400).json({
      error: 'invalid url',
    });
  }

  try {
    const existingUrl = await Url.findOne({
      original_url: url,
    });

    if (existingUrl) {
      return res.status(409).json({
        success: false,
        message: 'URL already exists',
      });
    }

    const count = await Url.estimatedDocumentCount();

    const newUrl = new Url({
      original_url: url,
      short_url: count + 1,
    });

    const savedUrl: any = await newUrl.save();
    const { original_url, short_url } = savedUrl;

    return res.status(201).json({
      original_url,
      short_url,
    });
  } catch (error) {
    console.error('URL creation error:', error);

    return res.status(500).json({
      error: error instanceof Error
        ? error.message
        : 'Failed to create shortened URL',
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const originalUrl = await Url.findOne({
      short_url: id,
    });

    if (!originalUrl) {
      return res.status(404).json({
        error: "Shortcut doesn't exist",
      });
    }

    return res.redirect(originalUrl.original_url);
  } catch (error) {
    console.error('URL redirect error:', error);

    return res.status(500).json({
      error: 'Failed to redirect',
    });
  }
});

export default router;