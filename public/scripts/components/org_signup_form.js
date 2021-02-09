$(() => {

  const $orgSignupForm = $(`
  <div class="w-screen h-100 flex flex-col items-center justify-start mb-10">
  <form id="org-signup-form" class="org-signup-form w-1/2 h-100 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-2/3 my-5">Sign up for a Free<br>Organization Account</p>

    <div class="sign-up-blank-error flex flex-col mb-3 w-2/3 hidden bg-alertRed rounded-lg">
      <h4 class="blank-field-error-message text-white p-2 font-bold text-sm">
        <i class="fas fa-exclamation-triangle px-2"></i>
        Please Complete All Fields
      </h4>
    </div>

    <div class="name-abbrev flex items-center justify-between mb-3 w-2/3">
      <div class="signup-form_field-wrapper flex flex-col w-7/12 ">
        <label for="name" class="label">Organization Name</label>
        <input type="text" name="name" placeholder="Organization Name" class="org-name input">
      </div>

      <div class="signup-form_field-wrapper flex flex-col w-2/6">
        <label for="abbreviation" class="label">Abbreviation</label>
        <input type="text" name="abbreviation" placeholder="Abbreviation" class="org-abbrev input">
      </div>
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="email" class="label">Email</label>
      <input type="email" name="email" placeholder="Email" class="org-email input">
    </div>

    <div class="signup-form_field-wrapper form-field">
      <label for="password" class="label">Password</label>
      <input type="password" name="password" placeholder="Password" class="org-password input">
    </div>

    <div class="signup-form_field_wrapper form-field">
      <button id="org-register" class="button">Register</button>
    </div>
  </form>
</div>
  `);

  window.$orgSignupForm = $orgSignupForm;

  $('main').on('submit', '#org-signup-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    orgRegistration(data)
      .then(res => {
        if (res.blankFieldErr) {
          $('.sign-up-blank-error').slideDown(200);
          return;
        } else {
          $('.sign-up-blank-error').slideUp(10);
          $('.org-name').val('');
          $('.org-abbrev').val('');
          $('.org-email').val('');
          $('.org-password').val('');
          getOrgInfo()
            .then(json => {
              header.update(json.org);
              sidenav.showSidebar(json.org.orgId, json.org.user_id)
                .then($sidebar => {
                  const $main = ('main');
                  $sidebar.appendTo($main);
                  views_manager.show('allAccounts');
                })
            });
        }
      });
  });

});
