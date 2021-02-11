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
    $generatePasswordForm.detach();
    $getAllAccounts.detach();
    $editAccountForm.detach();
    $editOrgForm.detach();
    $manageOrg.detach();
    $joinOrgForm.detach();

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
        addAccountToTable();
        break;
      case 'editUser':
        $editUserForm.appendTo($main);
        createEditUserForm();
        break;
      case 'addAccount':
        $addAccountForm.appendTo($main);
        break;
      case 'generatePassword':
        $generatePasswordForm.appendTo($main);
        break;
      case 'editAccount':
        $editAccountForm.appendTo($main);
        break;
      case 'editOrg':
        $editOrgForm.appendTo($main);
        createEditOrgForm();
        break;
      case 'manageOrg':
        $manageOrg.appendTo($main);
        addUsersToTable();
        break;
      case 'joinOrg':
        $joinOrgForm.appendTo($main);
        break;
    }
  };

});
