import mongoose, { Schema, Document } from 'mongoose';
import connectToDatabase from 'Config/mongoose';

interface IParticipant {
    id: number;
    name: string;
    img: string | null;
    pending_messages: number;
}

interface IChat extends Document {
    participants: IParticipant[];
    created_at: Date;
    updated_at: Date;
  }

  const ParticipantSchema = new Schema<IParticipant>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    img: { type: String, required: false },
    pending_messages: { type: Number, required: true },
  });

  const ChatSchema = new Schema<IChat>({
    participants: { type: [ParticipantSchema], required: true },
    created_at: { type: Date, default: () => {
      let date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }},
    updated_at: { type: Date, default: () => {
      let date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }},
  });

  let Chat: mongoose.Model<IChat>;

  const getChatModel = async () => {
    console.log('Connecting to database');
    await connectToDatabase();
    if (!Chat) {
      Chat = mongoose.model<IChat>('Chat', ChatSchema);
    } else {
    }
    return Chat;
  };
 
  
  export { getChatModel };

