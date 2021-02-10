$(() => {

  const $orgLoginForm = $(`
  <div class="login-form w-9/12 h-auto flex flex-col items-center justify-start mx-auto mt-10">
    <div class="w-full flex flex-col items-center h-full pt-32">
      <form id="org-login-form" class="org-login-form h-100 w-9/12 xl:w-1/2 flex flex-col items-center justify-center">
        <p class="font-sans text-2xl font-bold w-full mb-1">Organization Login</p>

        <div class="login-error flex flex-col mt-3 w-full hidden bg-alertRed rounded-lg">
          <h4 class="login-error-message  text-white p-2 font-bold text-sm">
            <i class="fas fa-exclamation-triangle px-2"></i>
            Incorrect Email / Password
          </h4>
        </div>

        <div class="login-blank-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
          <h4 class="blank-field-error-message text-white p-2 font-bold text-sm">
            <i class="fas fa-exclamation-triangle px-2"></i>
            Please Fill In All Fields
          </h4>
        </div>

        <div class="login-form_field-wrapper flex flex-col mt-3 w-full">
          <label for="email" class="font-bold">Email</label>
          <input type="email" name="email" placeholder="Email" class="input org-login-email">
        </div>

        <div class="login-form_field_wrapper flex flex-col w-full ml-3 mr-3 mb-3">
          <label for="password" class="font-bold">Password</label>
          <input type="password" name="password" placeholder="Password" class="input org-login-password">
        </div>

        <div class="login-form_field_wrapper flex flex-col w-full ml-3 mr-3 mb-3">
          <label for="master-password" class="font-bold">Master Password</label>
          <input type="password" name="master_password" placeholder="Master Password" class="input org-login-master-password">
        </div>

        <div class="login-form_field_wrapper w-full">
          <button class="mt-2 rounded p-1 bg-button w-full text-white hover:bg-hoverBlue">Login</button>
        </div>
      </form>

      <div class="flex flex-col items-center justify-center w-72 mt-2">
        <p class="text-l font-normal">User? <button type="button" id="user-login-link" class="cursor-pointer text-button hover:underline">Login</button></p>

        <p class="text-l font-normal">Don't have an account? <button type="button" id="org-sign-up-link"  class="cursor-pointer text-button hover:underline">Register</button></p>
      </div>
    </div>
    </div>
  `);

  window.$orgLoginForm = $orgLoginForm;

  $('main').on('submit', '#org-login-form', function(event) {
    event.preventDefault();

    const $email = ('.org-login-email').val().length;
    const $password = ('.org-login-password').val().length;
    const $masterPassword = ('.org-login-master-password').val().length;

    if ($email < 1 || $password < 1 || $masterPassword < 1) {
      $('.login-error').slideUp(10);
      $('.login-blank-error').slideDown(200);
      return;
    }

    const data = $(this).serialize();
    orgLogin(data)
      .then(json => {
        header.update(json.org);
        if (!json.org) {
          $('.login-blank-error').slideUp(10);
          $('.login-error').slideDown(200);
        } else {
          $('.login-error').slideUp(10);
          $('.login-blank-error').slideUp(10);
          $('.org-login-email').val('');
          $('.org-login-password').val('');
          $('.org-login-master-password').val('');
          sidenav.showSidebar(json.org.id, json.org.user_id)
          .then($sidebar => {
            const $main = $('main');
            $sidebar.appendTo($main);
            views_manager.show('allAccounts');
          })
        }
      });
  });

  $('main').on('click', '#user-login-link', (event) => {
    views_manager.show('login');
  });

  $('main').on('click', '#org-sign-up-link', (event) => {
    views_manager.show('orgSignup');
  });

});
