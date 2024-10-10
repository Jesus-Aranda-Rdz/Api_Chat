import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }


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
    img: schema.string.optional({}, [
      rules.regex(new RegExp('^(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)$'))
    ]),
    phone: schema.string.optional({}, [
      rules.maxLength(10),
      rules.minLength(10),
      rules.regex(new RegExp('^[0-9]+$'))
    ]),
    birthdate: schema.date(),
    description: schema.string.optional({}, [
      rules.maxLength(255)
    ])
  })


  public messages: CustomMessages = {}
}
