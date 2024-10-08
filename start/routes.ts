import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login');
  Route.post('logout', 'AuthController.logout');
  Route.resource('users', 'UsersController').apiOnly();
}).prefix('api/v1').namespace('App/Controllers/Http/Authentication').middleware('auth');


Route.group(() => {
  Route.resource('chats', 'ChatsController').apiOnly().except(['update', 'show']);
  Route.resource('messages', 'MessagesController').apiOnly().except(['index']);
}).prefix('api/v1').namespace('App/Controllers/Http/ChatSystem').middleware('auth');

