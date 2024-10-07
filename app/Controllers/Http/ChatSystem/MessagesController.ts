import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getMessageModel } from 'App/Models/Mongo/Messages';
import { badRequest, ok } from 'App/Services/ResponseHandler';
import Ws from 'App/Services/Ws';
import StoreValidator from 'App/Validators/ChatSystems/Message/StoreValidator';
import UpdateValidator from 'App/Validators/ChatSystems/Message/UpdateValidator';
import { DateTime } from 'luxon';

export default class MessagesController {


    public async store({ request, auth, response, userTimezone }: HttpContextContract) {
        const user = await auth.authenticate();
        const payload = await request.validate(StoreValidator)
        try {
            // Get the user id from the request
            const message = {
                user: user.id,
                createdAt: new Date(),
                read: false,
                message: payload.message,
                chat: payload.chat
            };
            // Return the payload\
            const Message = await getMessageModel();

            // Create a new message
            await Message.create(message);
            // Get the messages
            var messages = await Message.find({ chat: payload.chat });
            // Get the other user
            const otherUser = messages.find((message) => message.user !== user.id);
            // Get the other user id
            const otherUserId = otherUser ? otherUser.user : null;
            // Get the websocket instance
            Ws.io.emit('new:message', {
                Participants: [user.id, otherUserId],
                emiter: user.id,
                chat: payload.chat
            });
            // parse the messages to the user timezone
            const messagesWithTimezone = Object.entries(
                messages.reduce((acc: any, message: any) => {
                    const createdAt = DateTime.fromJSDate(message.createdAt)
                        .setZone(userTimezone)
                        .toFormat('yyyy-MM-dd hh:mm a');
                    const date = createdAt.split(' ')[0];
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push({ ...message.toObject(), createdAt });
                    return acc;
                }, {})
            ).map(([date, messages]) => ({ date, messages }));
            // Return the response
            return ok(response, "Mensaje enviado", messagesWithTimezone);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al enviar el mensaje";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async show({ response, params,userTimezone }: HttpContextContract) {
        try {
            // Get the Message model
            const Message = await getMessageModel();
            // Get the messages
            const messages = await Message.find({ chat: params.id })
            // parse the messages to the user timezone
            const messagesWithTimezone = Object.entries(
                messages.reduce((acc: any, message: any) => {
                    const createdAt = DateTime.fromJSDate(message.createdAt)
                        .setZone(userTimezone)
                        .toFormat('yyyy-MM-dd hh:mm a');
                    const date = createdAt.split(' ')[0];
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push({ ...message.toObject(), createdAt });
                    return acc;
                }, {})
            ).map(([date, messages]) => ({ date, messages }));
            // Return the response
            return ok(response, "Mensajes obtenidos", messagesWithTimezone);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al obtener los mensajes";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async update({ response, params, request,userTimezone }: HttpContextContract) {
        // Validate the request
        const payload = await request.validate(UpdateValidator)
        try {
            // Get the Message model
            const Message = await getMessageModel();
            // Update the message
            const message = await Message.findOneAndUpdate(
                { _id: params.id }, 
                { message: payload.message }, 
                { new: true } // This returns the updated document
            );
            if (!message) {
                return badRequest(response, "Mensaje no encontrado");
            }
            // parse the messages to the user timezone
            const messageWithTimezone = {
                ...message.toObject(),
                createdAt: DateTime.fromJSDate(message.createdAt)
                    .setZone(userTimezone)
                    .toFormat('yyyy-MM-dd hh:mm a')
            };

            // Return the response
            return ok(response, "Mensaje actualizado", messageWithTimezone);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al actualizar el mensaje";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        try {
            // Get the Message model
            const Message = await getMessageModel();
            // Delete the message
            const messages = await Message.findOneAndDelete({ _id: params.id });
            // Return the response
            return ok(response, "Mensaje eliminado", messages);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al eliminar el mensaje";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }
}
