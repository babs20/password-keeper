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
        break;
      case 'orgLogin':
        $orgLoginForm.appendTo($main);
        break;
    }
  };




});
