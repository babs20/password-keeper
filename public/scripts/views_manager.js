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
        $('#user-login-form').on('submit', function(event) {
          event.preventDefault();

          const data = $(this).serialize();
          userLogin(data)
            .then(getUserInfo)
            .then(json => {
              header.update(json.user);
              views_manager.show('allAccounts');
            });

        });
        $('#org-login-link').on('click', (event) => {
          views_manager.show('orgLogin');
        });
        $('#sign-up-link').on('click', (event) => {
          views_manager.show('signup');
        });
        break;
      case 'orgLogin':
        $orgLoginForm.appendTo($main);

        $('#org-login-form').on('submit', function(event) {
          event.preventDefault();

          const data = $(this).serialize();
          orgLogin(data)
            .then(getOrgInfo)
            .then(json => {
              header.update(json.org);
              views_manager.show('allAccounts');
            });

        });
        $('#user-login-link').on('click', (event) => {
          views_manager.show('login');
        });
        $('#org-sign-up-link').on('click', (event) => {
          views_manager.show('orgSignup');
        });
        break;
      case 'orgSignup':
        $orgSignupForm.appendTo($main);
        break;
      case 'allAccounts':
        $homepage.appendTo($main);
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
