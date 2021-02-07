$(() => {

  const $orgLoginForm = $(`
    <form id="org-login-form" class="org-login-form">
      <p>Organization Login</p>
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
    <p>Trying to login as a user? <a id="user-login-link" href="/users/login">Login Here</a>
    <p>Don't have an organization account? <a id="org-sign-up-link" href="/organizations/registration">Sign Up</a>
  `);

  window.$orgLoginForm = $orgLoginForm;

  $('#org-login-form').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    orgLogin(data)
      .then(getOrgInfo)
      .then(json => {
        header.update(json.org);
        // views_manager.show
      });

  });

  $('#user-login-link').on('click', (event) => {
    views_manager.show('login');
  });

  $('#org-sign-up-link').on('click', (event) => {
    views_manager.show('orgSignup');
  })


});
