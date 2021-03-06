$(() => {

  const $orgSignupForm = $(`
  <div class=" w-9/12 h-auto flex flex-col items-center justify-start mx-auto mb-36">
  <div class="w-9/12 flex flex-col items-center h-full pt-16">
  <form id="org-signup-form" class="org-signup-form h-100 w-100 xl:w-3/4 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-full my-5 border-l-8 border-black pl-4">Sign up for a Free Organization Account</p>

    <div class="sign-up-blank-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
      <h4 class="blank-field-error-message text-white p-2 font-bold text-sm">
        <i class="fas fa-exclamation-triangle px-2"></i>
        Please Complete All Fields
      </h4>
    </div>

    <div class="sign-up-org-exists-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
      <h4 class="sign-up-org-exists-error-message text-white p-2 font-bold text-sm">
        <i class="fas fa-exclamation-triangle px-2"></i>
        This Email is Already Registered
      </h4>
    </div>

    <div class="name-abbrev flex items-center justify-between mb-3 w-full">
      <div class="signup-form_field-wrapper flex flex-col w-7/12 ">
        <label for="name" class="label">Organization Name</label>
        <input type="text" name="name" placeholder="Organization Name" class="org-name input">
      </div>

      <div class="signup-form_field-wrapper flex flex-col w-2/6">
        <label for="abbreviation" class="label">Abbreviation</label>
        <input type="text" name="abbreviation" placeholder="Abbreviation" class="org-abbrev input">
      </div>
    </div>

    <div class="signup-form_field-wrapper flex flex-col w-full ml-3 mr-3 mb-3">
      <label for="email" class="label">Email</label>
      <input type="email" name="email" placeholder="Email" class="org-email input">
    </div>

    <div class="signup-form_field-wrapper flex flex-col w-full ml-3 mr-3 mb-3">
      <label for="password" class="label">Password</label>
      <input type="password" name="password" placeholder="Password" class="org-password input">
    </div>

    <div class="signup-form_field-wrapper flex flex-col w-full ml-3 mr-3 mb-3">
      <label for="master-password" class="label">Master Password</label>
      <div class="flex items-center my-3 w-full bg-button rounded-lg">
      <i class="fas fa-flag pr-2 pl-6 py-4 text-white text-xl"></i>
      <p class="master-password-description text-white p-3 font-bold ">
      This master password will be used by members of your organization to access stored account information
      </p>
      </div>
      <input type="password" name="master_password" placeholder="Master Password" class="org-master-password input">
    </div>

    <div class="signup-form_field_wrapper w-full">
      <button id="org-register" class="button font-bold">Register</button>
    </div>
  </form>
  <p class="text-l font-normal mt-3">Need a User Account? <button type="button" id="user-sign-up-link"  class="cursor-pointer text-button hover:underline">Register</button></p>
</div>
</div>
  `);

  window.$orgSignupForm = $orgSignupForm;

  $('main').on('submit', '#org-signup-form', function(event) {
    event.preventDefault();

    const $orgName = $('.org-name').val().length;
    const $orgAbbrev = $('.org-abbrev').val().length;
    const $orgEmail = $('.org-email').val().length;
    const $orgPassword = $('.org-password').val().length;
    const $masterPassword = $('.org-master-password').val().length;

    if ($orgName < 1 || $orgAbbrev < 1 || $orgEmail < 1 || $orgPassword < 1 || $masterPassword < 1) {
      $('.sign-up-org-exists-error').slideUp(10);
      $('.sign-up-blank-error').slideDown(200);
      return;
    }

    const data = $(this).serialize();
    orgRegistration(data)
      .then(res => {
        if (res.orgExistsErr) {
          $('.sign-up-blank-error').slideUp(10);
          $('.sign-up-org-exists-error').slideDown(200);
          return;
        } else {
          getOrgInfo()
            .then(json => {
              header.update(json.org);
              sidenav.showSidebar(json.org.orgId, json.org.user_id)
                .then($sidebar => {
                  const $main = ('main');
                  $sidebar.appendTo($main);
                  views_manager.show('allAccounts');
                });
            });
        }
      });
  });

});
