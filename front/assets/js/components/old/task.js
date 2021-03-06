
console.log( "Module/composant task chargé !" );

let task = {
  initTask : function( taskElement )
  {
    let taskNameElement = taskElement.querySelector('.task__name-display');
    taskNameElement.addEventListener( "click", task.handleClickOnTaskName );

    // Même histoire pour le clic sur le bouton "éditer"
    let taskEditButtonElement = taskElement.querySelector( '.task__button--modify' );
    taskEditButtonElement.addEventListener( "click", task.handleClickOnEditButton );

    // Je récupère l'input du nom de la tache
    let taskInputNameElement = taskElement.querySelector( ".task__name-edit" );

    // On ajoute un écouteur d'événement lors de l'appui sur une touche
    taskInputNameElement.addEventListener( "keyup", task.handleKeyUpOnTaskName );

    // On écoute l'event "blur" => perte de focus de l'élément
    taskInputNameElement.addEventListener( "blur", task.handleBlurOnTaskName )

    // Atelier :
    // Récupération de tout les boutons verts pour marquer une tache comme terminée
    let taskValidateButtonElement = taskElement.querySelector( ".task__button--validate" );
    taskValidateButtonElement.addEventListener( "click", task.handleClickOnValidateButton );

    // Récupération de tout les boutons verts pour marquer une tache comme incomplète
    let taskUnvalidateButtonElement = taskElement.querySelector( ".task__button--incomplete" );
    taskUnvalidateButtonElement.addEventListener( "click", task.handleClickOnUnvalidateButton );
    
    let taskArchiveButtonElement = taskElement.querySelector( '.task__button--archive' );
    taskArchiveButtonElement.addEventListener( "click", task.handleClickOnArchiveButton );

  },

  createNewTask: function( taskNewName, taskCategory, taskId )
  {
    // Première étape, on récupère le template
    let template = document.querySelector("#task-template");

    // Cloner le contenu du template en un nouvel élément
    let newTaskFromTemplate = template.content.cloneNode( true );

    // Je change les différentes valeurs de mon nouvel élément
    newTaskFromTemplate.querySelector( ".task" ).dataset.category = taskCategory;
    newTaskFromTemplate.querySelector( ".task__category p" ).textContent = taskCategory;

    // Pareil pour le nom de la tache
    newTaskFromTemplate.querySelector( ".task__name-display" ).textContent = taskNewName;
    newTaskFromTemplate.querySelector( ".task__name-edit" ).value = taskNewName;
    // Petite astuce pour avoir la value qui s'affiche également dans l'inspecteur
    // Mais ça fonctionne aussi sans, tant qu'on a fait la ligne précédente ;)
    newTaskFromTemplate.querySelector( ".task__name-edit" ).setAttribute( "value", taskNewName );
    
    // On ajoute également au dataset, l'id de la tache
    newTaskFromTemplate.querySelector( ".task" ).dataset.id = taskId;

    // Est-ce que la tache est complétée ? Si oui, je la marque comme tel
    task.changeCompletion( newTaskFromTemplate.querySelector( ".task" ), tasksList.tasks[ taskId ].completion );
    // BONUS : Il vaudrait mieux charger la progression des taches, même partielle

    // On oublie pas d'initialiser notre nouvelle tache
    // pour enregistrer les écouteurs d'événement etc
    task.initTask( newTaskFromTemplate );

    // On peut ajouter notre nouvelle tache a notre page
    let taskList = document.querySelector(".tasks");
    taskList.prepend( newTaskFromTemplate );

    // BOonus organisation : On aurait pu return notre élément ici
    // puis passer l'ajout de cette nouvelle tache dans la list au composant taskList
    // C'est plus cohérent, mais plus long.

    // Bonus, vider le form
  },

  // Modifie le DOM d'une tache pour la marquer comme complétée
  changeCompletion( taskElement, completion )
  {
    if( completion == 100 )
    {
      taskElement.classList.remove( "task--todo" );
      taskElement.classList.add( "task--complete" );
    }
    else
    {
      taskElement.classList.remove( "task--complete" );
      taskElement.classList.add( "task--todo" );
    }    

    let currentProgressBarElement = taskElement.querySelector( ".progress-bar__level" );
    currentProgressBarElement.style.width = completion + "%";
  },

  // ===========================================
  //  Events callbacks / handlers
  // ===========================================

  handleClickOnTaskName: function( evt )
  {
    let taskNameElement = evt.currentTarget;

    // Tout ce qu'on va faire, c'est changer la 
    // classe qui se trouve sur la tache
    // Le CSS se chargera d'afficher/masquer le p/l'input
    // En l'occurrence ici, ajouter la classe "task--edit"
    // Pour ça, je dois d'abord récupérer la tache à partir du nom
    // element.closest permet de cibler le parent le plus proche qui
    // correspond au sélecteur fourni
    let taskElement = taskNameElement.closest( ".task" );

    // Maintenant que j'ai mon élément task
    // je lui ajoute la classe task--edit
    taskElement.classList.add( "task--edit" );

    // TODO Bonus : Gérer le focus sur l'input
    let taskNameInputElement = taskElement.querySelector( ".task__name-edit" );
    taskNameInputElement.focus();

    // TODO Bonus bonus : Mettre le curseur a la fin de l'input
  },

  handleClickOnEditButton: function( evt )
  {
    // On garde un handler différent pour pas se perdre
    // mais on va quand même pas coder deux fois la même chose
    // Donc au clic sur le bouton edit, on fait comme au clic sur le titre ;)
    task.handleClickOnTaskName( evt )
  },

  handleClickOnArchiveButton: function( evt )
  {
    // Récupération de l'élément concerné 
    let archiveButtonElement = evt.currentTarget;

    // Récupération de la tache concernée
    let taskElement = archiveButtonElement.closest( ".task" );



    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    let data = {
      status : 2
    };
    let fetchOptions = {
      method : "PATCH",
      mode   : "cors",
      cache  : "no-cache",      
      headers: httpHeaders,
      body   : JSON.stringify(data)
    };
    console.log();
    fetch( app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions ) // <= Promesse de réponse a la requete
    .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
      function( response )
      {
        if( response.status === 204 )
        {
          task.changeArchive( taskElement, 0 );
        }
        else
        {
          alert( "Une erreur est survenue !" );
        }        
      }
    );
  },
  // Modifie le DOM d'une tache pour la marquer comme complétée
  changeArchive( taskElement, archiveStatus )
  {
    if( archiveStatus == 0 )
    {
      // taskElement.classList.remove( "task--todo" );
      taskElement.classList.add( "task--archive" );
    }
    else
    {
      taskElement.classList.remove( "task--archive" );
      // taskElement.classList.add( "task--todo" );
    }    

  },

  handleBlurOnTaskName: function( evt )
  {
    // Récupération de l'élément concerné 
    let taskInputNameElement = evt.currentTarget;

    // On récupère ce qui a été tapé dans l'input
    let taskNewName = taskInputNameElement.value;

    // On récupère toute la tache
    let taskElement = taskInputNameElement.closest( ".task" )

    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // On stocke les données à envoyer à l'API sous forme d'objet JS
    let data = {
      title : taskNewName
    };

    // On appelle l'API pour lui dire de modifier le titre de la tache
    let fetchOptions = {
      method : "PATCH",
      mode   : "cors",
      cache  : "no-cache",      
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body   : JSON.stringify(data)
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes :cri:
    fetch( app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions ) // <= Promesse de réponse a la requete
    .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
      function( response )
      {
        if( response.status === 204 )
        {
          // A partir du parent, je peux récupérer facilement la balise <p> du nom
          let taskNameElement = taskElement.querySelector( ".task__name-display" );
          taskNameElement.textContent = taskNewName;

          // On retire la classe CSS task--edit du parent
          // ce qui remasquera l'input et réaffichera le <p>
          taskElement.classList.remove( "task--edit" );
        }
        else
        {
          alert( "Une erreur est survenue lors du changement de nom !" );
        }        
      }
    );
  },

  handleKeyUpOnTaskName: function( evt )
  {
    // On vérifie que la touche "relachée" est bien Entrée
    // Pour ça, on utilise evt.key
    if( evt.key === "Enter" )
    {
      task.handleBlurOnTaskName( evt );
    }
  },

  handleClickOnValidateButton: function( evt )
  {
    // Récupération de l'élément concerné 
    let validateButtonElement = evt.currentTarget;

    // Récupération de la tache concernée
    let taskElement = validateButtonElement.closest( ".task" );

    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // On stocke les données à envoyer à l'API sous forme d'objet JS
    let data = {
      completion : 100
    };

    // On appelle l'API pour lui dire de modifier la complétion de la tache
    let fetchOptions = {
      method : "PATCH",
      mode   : "cors",
      cache  : "no-cache",      
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body   : JSON.stringify(data)
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes :cri:
    fetch( app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions ) // <= Promesse de réponse a la requete
    .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
      function( response )
      {
        if( response.status === 204 )
        {
          // On marque la tache comme complétée dans le DOM
          task.changeCompletion( taskElement, 100 );
        }
        else
        {
          alert( "Une erreur est survenue !" );
        }        
      }
    );
  },

  handleClickOnUnvalidateButton: function( evt )
  {
    // Récupération de l'élément concerné 
    let validateButtonElement = evt.currentTarget;

    // Récupération de la tache concernée
    let taskElement = validateButtonElement.closest( ".task" );

    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    // On stocke les données à envoyer à l'API sous forme d'objet JS
    let data = {
      completion : 0
    };

    // On appelle l'API pour lui dire de modifier la complétion de la tache
    let fetchOptions = {
      method : "PATCH",
      mode   : "cors",
      cache  : "no-cache",      
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body   : JSON.stringify(data)
    };

    // Cette fois, on enchaine les then avec des fonctions anonymes :cri:
    fetch( app.apiBaseURL + "tasks/" + taskElement.dataset.id, fetchOptions ) // <= Promesse de réponse a la requete
    .then( // <= Lors qu'on reçoit la réponse (ici pas de JSON, car la réponse est "vide", code 204 No Content)
      function( response )
      {
        if( response.status === 204 )
        {
          // On marque la tache comme complétée dans le DOM
          task.changeCompletion( taskElement, 0 );
        }
        else
        {
          alert( "Une erreur est survenue !" );
        }        
      }
    );
  }

};