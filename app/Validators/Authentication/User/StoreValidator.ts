import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.maxLength(255)
    ]),
    password: schema.string({}, [
      rules.minLength(6),
      rules.maxLength(180)
    ]),
    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
  })

 
  public messages: CustomMessages = {}
}
