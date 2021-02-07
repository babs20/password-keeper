$(() => {

  const $signupForm = $(`
  <div class="w-screen h-100 flex flex-col items-center justify-center mb-10">
  <form id="signup-form" class="signup-form w-7/12 h-100 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-2/3 my-5">Sign up for a free account</p>

    <div class="first-last-name flex items-center justify-between mb-3 w-2/3">
      <div class="signup-form_field-wrapper flex flex-col w-9/20">
        <label for="first_name" class="label">First Name</label>
        <input type="text" name="first_name" placeholder="First Name" class="input">
      </div>

      <div class="signup-form_field-wrapper flex flex-col w-9/20">
        <label for="last_name" class="label">Last Name</label>
        <input type="text" name="last_name" placeholder="Last Name" class="input">
      </div>
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="email" class="label">Email</label>
      <input type="email" name="email" placeholder="Email" class="input">
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="password" class="label">Password</label>
      <input type="password" name="password" placeholder="Password" class="input">
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="org_id" class="label">Organization ID</label>
      <input type="text" name="org_id" placeholder="Organization ID"  class="input">
    </div>

    <div class="signup-form_field_wrapper form-field">
      <button class="button">Register</button>
    </div>
</div>
  `);

  window.$signupForm = $signupForm;

  $signupForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    userRegistration(data)
      .then(getUserInfo)
      .then(json => {
        header.update(json.user);
        // views_manager.show
      })
  })
});
