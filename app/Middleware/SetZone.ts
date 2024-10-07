import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class SetZone {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    try {
      const timezone = ctx.request.header('Timezone', 'UTC')
      
      const dateTime = DateTime.now().setZone(timezone)
      ctx.userTimezone = timezone
      ctx.userDateTime = dateTime

      await next()
    } catch (err) {
      console.log('Error setting timezone:', err)

    }
  }
}
