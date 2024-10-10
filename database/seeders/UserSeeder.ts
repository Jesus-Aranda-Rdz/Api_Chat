import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries here
    await User.createMany([
      {
        name: 'Jesus Aranda',
        email: 'jesus_aranda_rodriguez@hotmail.com',
        img: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        password: '123456',
        birthdate: new Date('1995-10-10'),
        phone: '5530303030',
        description: 'Soy un desarrollador de software',
      },
      {
        name: 'Jesus Aranda Rodriguez',
        email: 'jesus_aranda_rodriguez2@hotmail.com',
        img: 'https://es.gravatar.com/images/homepage/avatar-04.png',
        password: '123456',
        birthdate: new Date('1995-10-10'),
        phone: '5530303030',
        description: 'Soy un desarrollador de software',
      },
    ])
  }
}
