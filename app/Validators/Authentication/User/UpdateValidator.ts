import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.params.id } }),
      rules.maxLength(255)
    ]),
    password: schema.string.optional({}, [
      rules.minLength(6),
      rules.maxLength(180)
    ]),
    name: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
  })
  public messages: CustomMessages = {}
}
