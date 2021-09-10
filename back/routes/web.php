<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get(
    '/',
    [
        'uses' => 'MainController@home',
        'as'   => 'main-home'
    ]
);

//==============================
// TaskController
//==============================

$router->get(
  "/messages",
  [
      'uses' => 'MessageController@list',
      'as'   => 'message-list'
  ]
);

$router->post(
  "/messages",
  [
      'uses' => 'MessageController@add',
      'as'   => 'message-add'
  ]
);
$router->delete(
  "/messages/{id}",
  [
      'uses' => 'MessageController@delete',
      'as'   => 'message-delete'
  ]
);

// $router->put(
//   "/tasks/{id}",
//   [
//       'uses' => 'TaskController@edit',
//       'as'   => 'task-edit-put'
//   ]
// );

// $router->patch(
//   "/tasks/{id}",
//   [
//       'uses' => 'TaskController@edit',
//       'as'   => 'task-edit-patch'
//   ]
// );

// $router->delete(
//   "/tasks/{id}",
//   [
//       'uses' => 'TaskController@delete',
//       'as'   => 'task-delete'
//   ]
// );

// //==============================
// // CategoryController
// //==============================

// $router->get(
//   "/categories",
//   [
//       'uses' => 'CategoryController@list',
//       'as'   => 'category-list'
//   ]
// );

// $router->post(
//   "/categories",
//   [
//       'uses' => 'CategoryController@add',
//       'as'   => 'category-add'
//   ]
// );

// $router->delete(
//   "/categories/{id}",
//   [
//       'uses' => 'CategoryController@delete',
//       'as'   => 'category-delete'
//   ]
// );
