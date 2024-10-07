import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getMessageModel } from 'App/Models/Mongo/Messages';
import { badRequest, ok } from 'App/Services/ResponseHandler';
import StoreValidator from 'App/Validators/ChatSystems/Message/StoreValidator';
import UpdateValidator from 'App/Validators/ChatSystems/Message/UpdateValidator';

export default class MessagesController {


    public async store({ request, auth,response }: HttpContextContract) {
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
            const data = await Message.create(message);
            // Return the message
            return ok(response, "Mensaje enviado", data);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al enviar el mensaje";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async show({ response, params }: HttpContextContract) {
        try {
            const Message = await getMessageModel();
            const messages = await Message.find({ chat: params.id }).populate('user');
            return ok(response, "Mensajes obtenidos", messages);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al obtener los mensajes";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async update({ response, params ,request}: HttpContextContract) {
          // Validate the request
        const payload = await request.validate(UpdateValidator)
        try {
            // Get the Message model
            const Message = await getMessageModel();
            // Update the message
            const messages = await Message.updateOne({ _id: params.id }, { message: payload.message });
            // Return the response
            return ok(response, "Mensaje actualizado", messages);
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
            const messages = await Message.deleteOne({ _id: params.id });
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
