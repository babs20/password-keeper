$(() => {
  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $homepage.detach();
    $loginForm.detach();
    $signupForm.detach();
    $orgLoginForm.detach();
    $orgSignupForm.detach();
    $editUserForm.detach();
    $addAccountForm.detach();

    switch (item) {
      case 'homepage':
        $homepage.appendTo($main);
        break;
      case 'signup':
        $signupForm.appendTo($main);
        break;
      case 'login':
        $loginForm.appendTo($main);
        break;
      case 'orgLogin':
        $orgLoginForm.appendTo($main);
        break;
      case 'orgSignup':
        $orgSignupForm.appendTo($main);
        break;
      case 'allAccounts':
        $editUserForm.appendTo($main);
        break;
      case 'editUser':
        $editUserForm.appendTo($main);
        break;
      case 'addAccount':
        $addAccountForm.appendTo($main);
        break;
    }
  };




});
