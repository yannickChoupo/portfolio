import Message from '../../models/Message.model';

export const createMessage = async (text: string) => {
  const message = new Message({ text });

  return message.save();
};

export const getAllMessages = async () => {
  return Message.find();
};