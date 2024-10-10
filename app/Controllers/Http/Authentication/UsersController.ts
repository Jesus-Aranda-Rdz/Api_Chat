import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { badRequest, ok, notFound } from "App/Services/ResponseHandler";
import StoreValidator from "App/Validators/Authentication/User/StoreValidator";
import UpdateValidator from "App/Validators/Authentication/User/UpdateValidator";


export default class UsersController {
    public async index({ response }: HttpContextContract) {
        try {
            // Get all users
            const users = await User.all();
            // Return the list of users
            return ok(response, "Lista de usuarios", users);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al obtener la lista de usuarios";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async show({ response, params }: HttpContextContract) {
        try {
            // Find the user by id
            const user = await User.find(params.id);
            // If the user is not found
            if (!user) {
                // Return a not found response
                return notFound(response, "Usuario no encontrado");
            }
            // Return the user
            return ok(response, "Usuario encontrado", user);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al obtener el usuario";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async store({ request, response }: HttpContextContract) {
        const playload = await request.validate(StoreValidator);
        const data={
            email:playload.email,
            password:playload.password,
            name:playload.name,
            img:playload.img,
            phone:playload.phone,
            birthdate:new Date(playload.birthdate.toString()),
            description:playload.description
        }
        try {
            // Create a new user
            const user = await User.create(data);
            // Return the user
            return ok(response, "Usuario creado", user);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al crear el usuario";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async update({ request, response, params }: HttpContextContract) {
        const playload = await request.validate(UpdateValidator);
        try {
            // Find the user by id
            const user = await User.find(params.id);
            // If the user is not found
            if (!user) {
                // Return a not found response
                return notFound(response, "Usuario no encontrado");
            }
            // Update the user
            user.merge(playload);
            await user.save();
            // Return the user
            return ok(response, "Usuario actualizado", user);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al actualizar el usuario";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        try {
            // Find the user by id
            const user = await User.find(params.id);
            // If the user is not found
            if (!user) {
                // Return a not found response
                return notFound(response, "Usuario no encontrado");
            }
            // Delete the user
            await user.delete();
            // Return the success response
            return ok(response, "Usuario eliminado", user);
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || "Error al eliminar el usuario";
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }
}
