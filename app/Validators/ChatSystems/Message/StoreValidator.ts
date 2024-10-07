import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    message: schema.string(),
    chat: schema.string(),
  })


  public messages: CustomMessages = {}
}
