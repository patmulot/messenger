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
    <h1>hello home</h1>
    <div class="message_window">
      <?php require __DIR__.'/message.php'; ?>
    </div>
    <select class="select_sender">
      <option value="user">User</option>
      <option value="friend">Friend</option>
    </select>
  </div>

  <script src="assets/js/app.js"></script>
  <script src="assets/js/components/messagesList.js"></script>
  <script src="assets/js/components/messages.js"></script>
</body>

</html>