let messagesList = {
  // ---------------------------------//
  // --- LOAD MESSAGES FROM DB : --- //
  // -------------------------------//
  loadNewMessage: function () {
    let fetchOptions = {
      method: "GET",
      mode: "cors",
      cache: "no-cache"
    };
    fetch(app.apiBaseURL + "messages", fetchOptions)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(
        function (jsonResponse) {
          for (let messageData of jsonResponse) {
            if (messages.allMessages[messageData.id] === undefined) {
              messages.allMessages[messageData.id] = messageData;
              messagesList.createMessage(messages.allMessages[messageData.id]);
              // init all messages elements :
              messages.init();
            }
          }
        }
      )
  },
  // --------------------------------------//
  // --- CREATE MESSAGE DOM ELEMENT : --- //
  // ------------------------------------//
  createMessage: function (message) {
    let sender = messages.sender;
    let msgUserTemplate;
    if (sender === "user") {
      msgUserTemplate = document.querySelector("#tpl-msg-user");
    } else if (sender === "friend") {
      msgUserTemplate = document.querySelector("#tpl-msg-friend");
    }
    // modifying template elements with datas :
    let newMsgUser = msgUserTemplate.content.cloneNode(true);
    // message content :
    newMsgUser.querySelector(".msg_content").textContent = messages.sender + " : " + message.message;
    // message date :
    newMsgUser.querySelector(".msg_date").textContent = message.created_at;
    newMsgUser.querySelector(".msg_container").dataset.id = message.id;
    // create into message container element :
    let msgContainerElement = document.querySelector(".msg_view_container");
    msgContainerElement.appendChild(newMsgUser);
  },
  checkMessagesNb: function () {
    window.setInterval(this.loadNewMessage, 3000);
  }
};