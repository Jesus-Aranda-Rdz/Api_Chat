import mongoose, { Schema, Document } from 'mongoose';
import connectToDatabase, { disconnectFromDatabase } from 'Config/mongoose';
import { ObjectId } from 'mongodb';


interface IMessage extends Document{
    user: number;
    message: string;
    createdAt: Date;
    read: boolean;
    chat: ObjectId;
  }

const MessageSchema = new Schema<IMessage>({
    user: { type: Number, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  });

  let Message: mongoose.Model<IMessage>;

  const getMessageModel = async () => {
    await connectToDatabase();
    if (!Message) {
      Message = mongoose.model<IMessage>('Message', MessageSchema);
    } else {
    }
    return Message;
  };
  const closeChatSession = async () => {
    await disconnectFromDatabase();
  };
  
  export { getMessageModel, closeChatSession };

