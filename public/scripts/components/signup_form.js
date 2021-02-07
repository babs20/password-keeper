$(() => {

  const $signupForm = $(`
    <form id="signup-form" class="signup-form">
      <p>Sign up for a free account</p>

      <div class="first-last-name">
        <div class="signup-form_field-wrapper">
          <label for="first_name">First Name</label>
          <input type="text" name="first_name" placeholder="First Name">
        </div>

        <div class="signup-form_field-wrapper">
          <label for="last_name">Last Name</label>
          <input type="text" name="last_name" placeholder="Last Name">
        </div>
      </div>

      <div class="signup-form_field-wrapper">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="signup-form_field-wrapper">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password">
      </div>

      <div class="signup-form_field-wrapper">
        <label for="org_id">Organization ID</label>
        <input type="text" name="org_id" placeholder="Organization ID">
      </div>

      <div class="signup-form_field_wrapper">
        <button>Register</button>
      </div>
  `);

  $signupForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    userRegistration(data)
      .then(getUserInfo)
      .then(json => {
        updateHeader(json.user);
        // views_manager.show
      })
  })
});
