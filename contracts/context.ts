import { DateTime } from "luxon";

declare module '@ioc:Adonis/Core/HttpContext' {
    interface HttpContextContract {
        userDateTime: DateTime,
        userTimezone: string
    }
}