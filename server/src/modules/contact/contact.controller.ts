import { Request, Response, NextFunction } from 'express';
import * as MessageService from './contact.services';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    res.status(400).json({
      error: 'Message is required',
    });
    return;
  }

  try {
    const message = await MessageService.createMessage(text);

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const messages = await MessageService.getAllMessages();

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
};