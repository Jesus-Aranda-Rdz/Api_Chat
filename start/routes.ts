import Route from '@ioc:Adonis/Core/Route'




Route.group(() => {
  Route.post('login', 'AuthController.login')
}).prefix('api/v1').namespace('App/Controllers/Http/Authentication')

Route.group(() => {
  Route.post('logout', 'AuthController.logout');
  Route.resource('users', 'UsersController').apiOnly();
  Route.get('profile', 'AuthController.profile');
}).prefix('api/v1').namespace('App/Controllers/Http/Authentication').middleware('auth');


Route.group(() => {
  Route.resource('chats', 'ChatsController').apiOnly().except(['update', 'show']);
  Route.resource('messages', 'MessagesController').apiOnly().except(['index']);

}).prefix('api/v1').namespace('App/Controllers/Http/ChatSystem').middleware('auth');


