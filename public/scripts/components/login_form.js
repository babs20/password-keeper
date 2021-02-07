$(() => {

  const $loginForm = $(`
    <form id="user-login-form" class="user-login-form">
      <p>Login</p>
      <div class="login-form_field-wrapper">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="email">
      </div>

      <div class="login-form_field_wrapper">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="password">
      </div>

      <div class="login-form_field_wrapper">
        <button>Login</button>
      </div>
    </form>
    <p>Trying to login as an organization? <a id="org-login-link" href="/organizations/login">Login Here</a>
    <p>Don't have an account? <a id="sign-up-link" href="/users/registration">Sign Up</a>
  `);

  $('#user-login-form').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    userLogin(data)
      .then(getUserInfo)
      .then(json => {
        updateHeader(json.user);
        // views_manager.show
      });

  });

  $('#org-login-link').on('click', (event) => {
    views_manager.show('orgLogin');
  });

  $('#sign-up-link').on('click', (event) => {
    views_manager.show('signup');
  })

});
