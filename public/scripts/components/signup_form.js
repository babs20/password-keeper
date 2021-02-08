$(() => {

  const $signupForm = $(`
  <div class="w-screen h-100 flex flex-col items-center justify-start mb-10">
  <form id="signup-form" class="signup-form w-7/12 h-100 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-2/3 my-5">Sign up for a free account</p>

    <div class="sign-up-blank-error">
      <h2 class="blank-field-error-message hidden">Please fill in all fields before submitting</h2>
    </div>

    <div class="sign-up-org-error">
      <h2 class="org-error-message hidden">Incorrect Organization ID</h2>
    </div>

    <div class="first-last-name flex items-center justify-between mb-3 w-2/3">
      <div class="signup-form_field-wrapper flex flex-col w-9/20">
        <label for="first_name" class="label">First Name</label>
        <input type="text" name="first_name" placeholder="First Name" class="first-name input">
      </div>

      <div class="signup-form_field-wrapper flex flex-col w-9/20">
        <label for="last_name" class="label">Last Name</label>
        <input type="text" name="last_name" placeholder="Last Name" class="last-name input">
      </div>
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="email" class="label">Email</label>
      <input type="email" name="email" placeholder="Email" class="signup-email input">
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="password" class="label">Password</label>
      <input type="password" name="password" placeholder="Password" class="signup-password input">
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="org_id" class="label">Organization ID</label>
      <input type="text" name="org_key" placeholder="Organization ID"  class="org-key input">
    </div>

    <div class="signup-form_field_wrapper form-field">
      <button class="button">Register</button>
    </div>
    </form>
</div>
  `);

  window.$signupForm = $signupForm;

  $('main').on('submit', '#signup-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    userRegistration(data)
      .then((data) => {
        if (data.emptyErr) {
          $('.blank-field-error-message').slideDown(200);
          $('.org-error-message').slideUp(10);
        } else if (data.noOrgErr) {
          $('.org-error-message').slideDown(200);
          $('.blank-field-error-message').slideUp(10);
        } else {
          $('.org-error-message').slideUp(10);
          $('.blank-field-error-message').slideUp(10);
          $('.first-name').val('');
          $('.last-name').val('');
          $('.signup-email').val('');
          $('.signup-password').val('');
          $('.org-key').val('');
          getUserInfo()
            .then(json => {
              header.update(json.user);
                sidenav.showSidebar(json.user.org, json.user.id)
                .then($sidebar => {
                  const $main = ('main');
                  $sidebar.appendTo($main);
                  views_manager.show('allAccounts');
                })
            });
        }
      })
  });
});
