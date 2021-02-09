$(() => {

  const $orgLoginForm = $(`
  <div class="login-form w-auto h-auto flex flex-col items-center justify-start mx-auto mt-10">
      <form id="org-login-form" class="org-login-form h-100 w-80 flex flex-col items-center justify-center">
        <p class="font-sans text-2xl font-bold w-full mb-1">Organization Login</p>

        <div class="login-error flex flex-col mt-3 w-full hidden bg-alertRed rounded-lg">
          <h4 class="login-error-message  text-white p-2 font-bold text-sm">
            <i class="fas fa-exclamation-triangle px-2"></i>
            Incorrect Email / Password
          </h4>
        </div>

        <div class="login-form_field-wrapper flex flex-col mt-3 w-full">
          <label for="email" class="font-bold">Email</label>
          <input type="email" name="email" placeholder="Email" class="input login-email">
        </div>

        <div class="login-form_field_wrapper flex flex-col w-full ml-3 mr-3 mb-3">
          <label for="password" class="font-bold">Password</label>
          <input type="password" name="password" placeholder="Password" class="input login-password">
        </div>

        <div class="login-form_field_wrapper w-full">
          <button class="mt-2 rounded p-1 bg-button w-full text-white hover:bg-hoverBlue">Login</button>
        </div>
      </form>

      <div class="flex flex-col items-center justify-center w-72 mt-2">
        <p class="text-l font-normal">Organization? <button type="button" id="org-login-link" class="cursor-pointer text-button hover:underline">Login</button></p>

        <p class="text-l font-normal">Don't have an account? <button type="button" id="org-sign-up-link"  class="cursor-pointer text-button hover:underline">Register</button></p>
      </div>

    </div>
  `);

  window.$orgLoginForm = $orgLoginForm;

  $('main').on('submit', '#org-login-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    orgLogin(data)
      .then(json => {
        header.update(json.org);
        if (!json.org) {
          $('.login-error').slideDown(200);
        } else {
          $('.login-error').slideUp(10);
          $('.login-email').val('');
          $('.login-password').val('');
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
