import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getChatModel } from 'App/Models/Mongo/Chat';
import User from 'App/Models/User';
import { badRequest, notFound, ok, unauthorized, UnprocessableEntity } from 'App/Services/ResponseHandler';

import StoreValidator from 'App/Validators/ChatSystems/Chat/StoreValidator';



export default class ChatsController {

  public async index({ response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate();

      if (!user) {
        return unauthorized(response, 'user not found');
      }
      console.log('User:', user.id);

      const chats = await this.getUserChatsWithMessagesFromOthers(user.id);

      console.log('chats:', chats);

      return ok(response, 'Chats fetched', chats);

    } catch (error) {
      // Get the error message
      const errorMsg = error.message || 'Error fetching chats';
      // Return the error response
      return badRequest(response, errorMsg);
    }
  }


  public async store({ request, response, auth }: HttpContextContract) {
    // Get the authenticated user

    const user = await auth.authenticate()
    // Validate the request
    const payload = await request.validate(StoreValidator)
    // Get the other user from the request
    const other_user = payload.other_user

    try {
      // Find the other user
      console.log('other_user:', other_user);
      const register_other_user = await User.find(other_user)
      console.log('register_other_user:', register_other_user);
      // If the other user is not found
      if (!register_other_user) {
        return notFound(response, 'User not found')
      }
      // If the other user is the same as the authenticated user
      if (user.id === register_other_user.id) {
        return UnprocessableEntity(response, 'You cannot chat with yourself')
      }
      // Get the chat model
      const Chat = await getChatModel()
      // Find the chat with the authenticated user and the other user
      const existingChat = await Chat.findOne({
        participants: {
          $all: [
            { $elemMatch: { id: user.id } },
            { $elemMatch: { id: register_other_user.id } }
          ]
        }
      })
      // If the chat already exists
      if (existingChat) {
        return ok(response, 'Chat already exists', existingChat)
      }
      // Create the participants
      const participants = [
        { id: user.id, name: user.name, img: user.img, pending_messages: 0 },
        { id: register_other_user.id, name: register_other_user.name, img: register_other_user.img, pending_messages: 0 }
      ]
      // Create a new chat
      const chat = new Chat()
      // Set the participants
      chat.participants = participants
      // Save the chat
      await chat.save()
      // Emit the new chat event

      // Return the chat
      return ok(response, 'Chat created', chat)
    } catch (error) {
      // Get the error message
      const errorMsg = error.message || 'Error creating chat'
      // Return the error response
      return badRequest(response, errorMsg)
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    // Get the authenticated user
    const user = await auth.authenticate()
    try {
      // Get the chat model
      const Chat = await getChatModel()
      // Find the chat by id
      const chat = await Chat.findOne({ _id: params.id })
      // If the chat is not found
      if (!chat) {
        return notFound(response, 'Chat not found')
      }
      // If the authenticated user is not a participant
      if (!chat.participants.some(participant => participant.id === user.id)) {
        return UnprocessableEntity(response, 'You are not a participant in this chat')
      }
      // Delete the chat
      await chat.deleteOne()
      // Return the success response
      return ok(response, 'Chat deleted', chat)
    } catch (error) {
      // Get the error message
      const errorMsg = error.message || 'Error deleting chat'
      // Return the error response
      return badRequest(response, errorMsg)
    }
  }

  private getUserChatsWithMessagesFromOthers = async (userId: number) => {
    // Get the chat model
    const Chat = await getChatModel();
    // Get the chats
    const chats = await Chat.aggregate([
      {
        // Find the chats where the user is a participant
        $match: {
          'participants.id': userId
        }
      },
      {
        // Lookup the messages from others
        $lookup: {
          // Get the messages collection
          from: 'messages',
          // Set the chat id and user id
          let: { chatId: '$_id', userId: userId },
          pipeline: [
            {
              // Find the messages from others
              $match: {
                // Get the messages where the chat is the same as the chat id and the user is not the same as the user id and the message is not read
                $expr: {
                  $and: [
                    { $eq: ['$chat', '$$chatId'] },//
                    { $ne: ['$user', '$$userId'] },
                    { $eq: ['$read', false] }
                  ]
                }
              }
            }
          ],
          // Set the messages from others
          as: 'messagesFromOthers'
        }
      },
      {
        // Project the fields
        $project: {
          _id: 1,
          participants: 1,
          messageNotRead: { $size: '$messagesFromOthers' }
        }
      }
    ]);
    return chats;
  };
}
