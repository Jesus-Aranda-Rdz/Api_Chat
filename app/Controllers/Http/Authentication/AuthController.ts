import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import HashGenerator from "App/Services/HashGenerator ";
import { badRequest, ok, unauthorized } from "App/Services/ResponseHandler";
import LoginValidator from "App/Validators/Authentication/LoginValidator";

export default class AuthController {
    public async login({ auth, request, response }: HttpContextContract) {

        // Validate the request
        const payload = await request.validate(LoginValidator)
        // Get the email and password from the request
        const email = payload.email;
        // Get the email and password from the request
        const password = payload.password;

        try {
            // get the instance of the hash generator
            const hashGenerator = new HashGenerator();
            // Attempt to login the user
            const user = await hashGenerator.verifyUser(email, password);

            // If the user is not found
            if (!user) {
                return unauthorized(response, 'Usario o contraseña incorrectos');
            }

            // Attempt to login the user
            const token = await auth.use("api").login(user);
            
            // Return the token
            return ok(response, "Login exitoso", {
                access_token: {
                    token: token.token,
                    type: token.type,
                    tokenExpiresAt: token.expiresAt,
                }
            });
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || 'Error de autenticación';
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        try {
            // Revoke the token
            await auth.use("api").revoke();
            // Return the success response
            return ok(response, "Logout exitoso");
        } catch (error) {
            // Get the error message
            const errorMsg = error.message || 'Error al cerrar sesión';
            // Return the error response
            return badRequest(response, errorMsg);
        }
    }
}
