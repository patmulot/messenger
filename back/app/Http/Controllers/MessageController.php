<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MessageController extends Controller
{
  public function list()
  {
    // return response()->json( Message::all()->load('category'), 200 );
    return response()->json(Message::all(), 200);
  }
  public function add( Request $request )
  {
    $newMessage = new Message();
    $this->validate( $request, [
      "sender" => "required|min:1|max:45",
      "message" => "required|min:1|max:256|",
    ] );
    $newMessage->sender = $request->input("sender");
    $newMessage->message = $request->input("message");
    if( $newMessage->save() )
    {
      return response()->json( $newMessage, Response::HTTP_CREATED );
    }
    return response( "", Response::HTTP_INTERNAL_SERVER_ERROR );
  }

//   public function edit( Request $request, $id )
//   {
//     // On récupère notre tache via son ID
//     $taskToUpdate = Task::find( $id );

//     // Si la tache existe (find renvoi null sinon)
//     if( $taskToUpdate !== null )
//     {
//       // Est-ce que c'est une requete en PUT ?
//       if( $request->isMethod( "put" ) )
//       {
//         // On vérifie que tous les champs sont présents ET remplis
//         // Bonus : On pourrait aller plus loin en utilisant validate ;)
//         if( $request->filled( [ "title", "categoryId", "completion", "status" ] ) )
//         {
//           // Mise à jour de l'objet Task
//           $taskToUpdate->title       = $request->input( "title" );
//           $taskToUpdate->category_id = $request->input( "categoryId" );
//           $taskToUpdate->completion  = $request->input( "completion" );
//           $taskToUpdate->status      = $request->input( "status" );
//         }
//         else
//         {
//           // Si manque des informations => mauvaise requête
//           return response( "", Response::HTTP_BAD_REQUEST );
//         }
//       }
//       else // Sinon c'est une requete en PATCH
//       {
//         // On va définir un booléen a false qui passera
//         // a true si une valeur est remplie correctement dans la requete
//         $oneDataAtLeast = false;

//         // Pour chaque propriété, on vérifie si une modif est présente dans Request
//         if( $request->filled('title'))
//         {
//           $taskToUpdate->title = $request->input('title');
//           $oneDataAtLeast = true;
//         }

//         if( $request->filled('categoryId') )
//         {
//           $taskToUpdate->category_id = $request->input('categoryId');
//           $oneDataAtLeast = true;
//         }

//         if( $request->filled('completion') )
//         {
//           $taskToUpdate->completion = $request->input('completion');
//           $oneDataAtLeast = true;
//         }

//         if( $request->filled('status') )
//         {
//           $taskToUpdate->status = $request->input('status');
//           $oneDataAtLeast = true;
//         }

//         // Si on a toujours $oneDataAtLeast = false, c'est qu'aucune donnée
//         // correcte n'a été trouvée pour modifier notre objet => erreur
//         // if( $oneDataAtLeast === false )
//         if( !$oneDataAtLeast )
//         {
//           return response( "", Response::HTTP_BAD_REQUEST );
//         }
//       }

//       // Si on arrive ici, c'est qu'on a pas rencontré d'erreur
//       // On vérifie si la sauvegarde a marché
//       if( $taskToUpdate->save() )
//       {
//         return response( "", Response::HTTP_NO_CONTENT );
//       }
//       else
//       {
//         return response( "", Response::HTTP_INTERNAL_SERVER_ERROR );
//       }
//     }

//     //
//     return response( "", Response::HTTP_NOT_FOUND );
//   }

  public function delete( $id )
  {
    Message::destroy( $id );
    return response()->json( null, 204 );
  }
}
