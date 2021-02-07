$(() => {
  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $homepage.detach();
    $loginForm.detach();
    $signupForm.detach();
    $orgLoginForm.detach();

    switch (item) {
      case 'signup':
        $signupForm.appendTo($main);
        break;
      case 'login':
        $loginForm.appendTo($main);
        $('div').on('click', '#org-login-link', (event) => {
          views_manager.show('orgLogin');
        });
        $('div').on('click', '#sign-up-link', (event) => {
          views_manager.show('signup');
        });
        break;
      case 'orgLogin':
        $orgLoginForm.appendTo($main);
        break;
    }
  };




});
