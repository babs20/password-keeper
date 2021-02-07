$(() => {

  const $orgSignupForm = $(`
  <div class="w-screen h-100 flex flex-col items-center justify-center mb-10">
  <form id="org-signup-form" class="org-signup-form w-1/2 h-100 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-2/3 my-5">Sign up for a Free<br>Organization Account</p>

    <div class="name-abbrev flex items-center justify-between mb-3 w-2/3">
      <div class="signup-form_field-wrapper flex flex-col w-7/12 ">
        <label for="name" class="label">Organization Name</label>
        <input type="text" name="name" placeholder="Organization Name" class="input">
      </div>

      <div class="signup-form_field-wrapper flex flex-col w-2/6">
        <label for="abbreviation" class="label">Abbreviation</label>
        <input type="text" name="abbreviation" placeholder="Abbreviation" class="input">
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

    <div class="signup-form_field_wrapper form-field">
      <button id="org-register" class="button">Register</button>
    </div>
  </form>
</div>
  `);

  window.$orgSignupForm = $orgSignupForm;

  $orgSignupForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    orgRegistration(data)
      .then(getOrgInfo)
      .then(json => {
        header.update(json.org);
        views_manager.show('allAccounts');
      });
  });

});
