$(() => {

  const $loginForm = $(`
  <div class="login-form w-auto h-auto flex flex-col items-center justify-start mx-auto mt-10">
      <form id="user-login-form" class="user-login-form h-72 w-80 flex flex-col items-center justify-center">
        <p class="font-sans text-2xl font-bold w-2/3 mb-1">User Login</p>
        <div class="login-error">
          <h4 class="login-error-message hidden">Incorrect email/password</h4>
        </div>
        <div class="login-form_field-wrapper flex flex-col m-3 w-2/3">
          <label for="email" class="font-bold">Email</label>
          <input type="email" name="email" placeholder="Email" class="input login-email">
        </div>

        <div class="login-form_field_wrapper flex flex-col w-2/3 ml-3 mr-3 mb-3">
          <label for="password" class="font-bold">Password</label>
          <input type="password" name="password" placeholder="Password" class="input login-password">
        </div>

        <div class="login-form_field_wrapper w-2/3">
          <button class="mt-2 rounded p-1 bg-button w-full text-white hover:bg-hoverBlue">Login</button>
        </div>
      </form>
      <div class="flex flex-col items-center justify-center w-72 mt-2">
        <p class="text-l font-normal">Organization? <button type="button" id="org-login-link" class="cursor-pointer text-button hover:underline">Login</button></p>

        <p class="text-l font-normal">Don't have an account? <button type="button" id="sign-up-link"  class="cursor-pointer text-button hover:underline">Register</button></p>
      </div>
    </div>
  `);

  window.$loginForm = $loginForm;

  $('main').on('submit', '#user-login-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    userLogin(data)
      .then(json => {
        header.update(json.user);

        if (!json.user) {
          $('.login-error-message').slideDown(200);
        } else {
          $('.login-error-message').slideUp(10);
          $('.login-email').val('');
          $('.login-password').val('');
          sidenav.showSidebar(json.user.org, json.user.id)
          .then($sidebar => {
            const $main = ('main');
            $sidebar.appendTo($main)
            views_manager.show('allAccounts');
          })
          .catch(err => console.log(err));
        }
      });
  });

  $('main').on('click', '#org-login-link', (event) => {
    views_manager.show('orgLogin');
  });

  $('main').on('click', '#sign-up-link', (event) => {
    views_manager.show('signup');
  });

});
