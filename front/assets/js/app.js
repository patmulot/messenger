
let app = {

  apiBaseURL : "http://localhost:8080/",

  init: function()
  {
    messagesList.loadNewMessage();
    messagesList.checkMessagesNb();
  }
};
document.addEventListener( "DOMContentLoaded", app.init )