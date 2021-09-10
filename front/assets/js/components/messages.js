let messages = {
  allMessages: {},
  sender: "user",
  // currentMsgCount: 0,
  // msgCounter: [],
  msgIdCounter: [],
  // loadMsgNb: 0,
  init: function () {
    // getting form Element for submit event :
    let msgFormElement = document.querySelector(".msg_form");
    msgFormElement.addEventListener("submit", messages.handleFormSubmit);
    // getting button element to edit message :
    let msgEditBtnElements = document.querySelectorAll(".msg_btn_edit");
    for (let editBtn of msgEditBtnElements) {
      editBtn.addEventListener("click", messages.handleClicEditButton);
    }
    // getting button element to delete message :
    let msgDeleteBtnElements = document.querySelectorAll(".msg_btn_delete");
    for (let deleteBtn of msgDeleteBtnElements) {
      deleteBtn.addEventListener("click", messages.handleClicDeleteButton);
    }
    // setting scroll position at bottom :
    document.querySelector(".msg_view_container").scrollTop = document.querySelector(".msg_view_container").scrollHeight;
  },
  // // ---------------------------------//
  // // --- LOAD MESSAGES FROM DB : --- //
  // // -------------------------------//
  // loadNewMessage: function () {
  //   let fetchOptions = {
  //     method: "GET",
  //     mode: "cors",
  //     cache: "no-cache"
  //   };
  //   fetch(app.apiBaseURL + "messages", fetchOptions)
  //     .then(
  //       function (response) {
  //         return response.json();
  //       }
  //     )
  //     .then(
  //       function (jsonResponse) {
  //         for (let messageData of jsonResponse) {
  //           messages.allMessages[messageData.id] = messageData;
  //           messages.createMessage(messages.allMessages[messageData.id]);
  //           // init all messages elements :
  //           // messages.msgIdCounter = messageData.id;
  //           messages.init();
  //           // messages.currentMsgCount++;
  //         }
  //         console.log("check");
  //         // messages.msgCounter["count" + messages.loadMsgNb] = messages.currentMsgCount;
  //       }
  //     )
  //     // console.log("loaded nb : " + messages.loadMsgNb);
  //     // messages.loadMsgNb++;
  // },
  // // --------------------------------------//
  // // --- CREATE MESSAGE DOM ELEMENT : --- //
  // // ------------------------------------//
  // createMessage: function (message) {
  //   // console.log(message.id); //!
  //   // console.log(message.message); //!
  //   // console.log(message.created_at); //!
  //   // console.log(message.updated_at); //!
  //   let sender = messages.sender;
  //   let msgUserTemplate;
  //   if (sender === "user") {
  //     msgUserTemplate = document.querySelector("#tpl-msg-user");
  //   } else if (sender === "friend") {
  //     msgUserTemplate = document.querySelector("#tpl-msg-friend");
  //   }
  //   // modifying template elements with datas :
  //   let newMsgUser = msgUserTemplate.content.cloneNode(true);
  //   // message content :
  //   newMsgUser.querySelector(".msg_content").textContent = messages.sender + " : " + message.message;
  //   // message date :
  //   newMsgUser.querySelector(".msg_date").textContent = message.created_at;
  //   newMsgUser.querySelector(".msg_container").dataset.id = message.id;
  //   // create into message container element :
  //   let msgContainerElement = document.querySelector(".msg_view_container");
  //   msgContainerElement.appendChild(newMsgUser);
  // },
  // --------------------------------------------------//
  // --- GETTING MESSAGES DATAS FROM FORM TO DB : --- //
  // ------------------------------------------------//
  handleFormSubmit: function (evt) {
    evt.preventDefault();
    console.log("form function loaded");
    let msgFormElement = evt.currentTarget;
    let newMsgInputElement = msgFormElement.querySelector(".msg_form_input");
    let newMsgValue = newMsgInputElement.value;
    console.log(newMsgValue);
    // send new message to DB
    let msgData = {
      sender: messages.sender,
      message: newMsgValue,
    };
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");
    let fetchOptions = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: httpHeaders,
      body: JSON.stringify(msgData)
    };
    fetch(app.apiBaseURL + "messages", fetchOptions)
      .then(
        function (response) {
          if (response.status === 201) {
            return response.json();
          } else {
            alert("une erreur est survenue");
            return;
          }
        }
      )
      .then(
        function (jsonResponse) {
          messages.allMessages[jsonResponse.id] = jsonResponse;
          messagesList.createMessage(messages.allMessages[jsonResponse.id]);
          document.querySelector(".msg_container").scrollTop = document.querySelector(".msg_container").scrollHeight;
          newMsgInputElement.value = "";
          newMsgInputElement.focus();
          document.querySelector(".msg_view_container").scrollTop = document.querySelector(".msg_view_container").scrollHeight;
        }
      );
  },
  handleClicEditButton: function (evt) {
    let msgToEditElement = evt.currentTarget;
  },
  handleClicDeleteButton: function (evt) {
    let msgToDeleteElement = evt.currentTarget;
    let msgContainerElement = msgToDeleteElement.closest(".msg_container");
    // getting message's id from dataset :
    let currentMessageId = msgContainerElement.dataset.id;
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");
    let fetchOptions = {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: httpHeaders,
    };
    fetch(app.apiBaseURL + "messages/" + currentMessageId, fetchOptions)
      .then(
        function (response) {
          if (response.status === 204) {
            console.log("MESSAGE DELETED OK"); //!
          } else {
            alert("Une erreur est survenue !");
          }
        }
      );
  },
};