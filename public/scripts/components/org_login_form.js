$(() => {

  const $orgLoginForm = $(`
  <div class="login-form w-auto h-auto flex flex-col items-center justify-start mx-auto mt-10">
  <form id="org-login-form" class="org-login-form h-72 w-80 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-2/3 mb-1">Organization Login</p>
    <div class="login-error">
      <h4 class="login-error-message hidden">Incorrect email/password</h4>
    </div>
    <div class="login-form_field-wrapper flex flex-col m-3 w-2/3">
      <label for="email" class="font-bold">Email</label>
      <input type="email" name="email" placeholder="Email" class="login-email input">
    </div>

    <div class="login-form_field_wrapper flex flex-col w-2/3 ml-3 mr-3 mb-3">
      <label for="password" class="font-bold">Password</label>
      <input type="password" name="password" placeholder="Password" class="login-password input">
    </div>

    <div class="login-form_field_wrapper w-2/3">
      <button class="mt-2 rounded p-1 bg-button w-full text-white hover:bg-hoverBlue">Login</button>
    </div>
  </form>
  <div class="flex flex-col items-center justify-center w-72 mt-2">
    <p class="text-l font-normal">User? <button type="button" id="user-login-link" class="cursor-pointer text-button hover:underline">Login</button></p>

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
          $('.login-error-message').slideDown(200);
        } else {
          $('.login-error-message').slideUp(10);
          $('.login-email').val('');
          $('.login-password').val('');
          sidenav.showSidebar(json.org.id, json.org.user_id)
          .then($sidebar => {
            const $main = ('main');
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
