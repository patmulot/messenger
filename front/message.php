<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Messagerie</title>
  <link rel="stylesheet" href="assets/css/reset.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
</head>

<body>
  <div>
    <h1>Messagerie</h1>
    <div class="all_msg_container">
      <div class="all_msg_header">
        <div class="avatar">A</div>
        <a href="">
          <p class="friend_name">Friend Name</p>
        </a>
        <div class="msg_header_btns">
          <button> - </button>
          <button> X </button>
        </div>
      </div>
      <div class="msg_view_container">
        <!-- get messages from db -->
      </div>
      <form method="POST" class="msg_form">
        <input class="msg_form_input" type="text" placeholder="Nouveau message" name="name" />
        <button class="msg_send_btn">Send</button>
      </form>
    </div>
  </div>
  <!-- Template to create new message from user //-->
  <template id="tpl-msg-user">
    <div class="msg_container" data-id="">
      <span class="msg_date"></span>
      <div class="user_msg">
        <div class="msg_container_btns">
          <button class="msg_btn_other"> ... </button>
          <button class="msg_btn_edit"> m </button>
          <button class="msg_btn_delete"> X </button>
        </div>
        <div class="msg_view">
          <p class="msg_content msg_content_user"></p>
          <div class="avatar avatar_sm"></div>
        </div>
      </div>
    </div>
  </template>
  <template id="tpl-msg-friend">
    <div class="msg_container" data-id="">
      <span class="msg_date"></span>
      <div class="user_msg">
        <div class="msg_view">
          <div class="avatar avatar_sm"></div>
          <p class="msg_content msg_content_friend"></p>
        </div>
        <div class="msg_container_btns">
          <button class="msg_btn_other"> ... </button>
          <button class="msg_btn_edit"> m </button>
          <button class="msg_btn_delete"> X </button>
        </div>
      </div>
    </div>
  </template>


  <script src="assets/js/app.js"></script>
  <script src="assets/js/components/messagesList.js"></script>
  <script src="assets/js/components/messages.js"></script>
</body>

</html>