$(() => {

  const $signupForm = $(`
  <div class="w-9/12 h-auto flex flex-col items-center justify-start mx-auto mb-36">
    <div class="w-9/12 flex flex-col items-center h-full pt-16">
    <form id="signup-form" class="signup-form h-100 w-100 xl:w-3/4 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-full my-5 border-l-8 border-black pl-4">Sign up for a free account</p>

    <div class="sign-up-blank-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
      <h4 class="blank-field-error-message text-white p-2 font-bold text-sm">
        <i class="fas fa-exclamation-triangle px-2"></i>
        Please Complete All Fields
      </h4>
    </div>

    <div class="sign-up-org-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
      <h4 class="org-error-message text-white p-2 font-bold text-sm">
        <i class="fas fa-exclamation-triangle px-2"></i>
        Incorrect Organization ID
      </h4>
    </div>

    <div class="sign-up-exists-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
      <h4 class="exists-error-message text-white p-2 font-bold text-sm">
        <i class="fas fa-exclamation-triangle px-2"></i>
        This Email is Already Registered
      </h4>
    </div>

    <div class="first-last-name flex items-center justify-between mb-3 w-full">
      <div class="signup-form_field-wrapper flex flex-col w-9/20">
        <label for="first_name" class="label">First Name</label>
        <input type="text" name="first_name" placeholder="First Name" class="first-name input">
      </div>

      <div class="signup-form_field-wrapper flex flex-col w-9/20">
        <label for="last_name" class="label">Last Name</label>
        <input type="text" name="last_name" placeholder="Last Name" class="last-name input">
      </div>
    </div>

    <div class="signup-form_field-wrapper flex flex-col w-full ml-3 mr-3 mb-3">
      <label for="email" class="label">Email</label>
      <input type="email" name="email" placeholder="Email" class="signup-email input">
    </div>

    <div class="signup-form_field-wrapper flex flex-col w-full ml-3 mr-3 mb-3">
      <label for="password" class="label">Password</label>
      <input type="password" name="password" placeholder="Password" class="signup-password input">
    </div>

    <div class="signup-form_field-wrapper flex flex-col w-full ml-3 mr-3 mb-3">
      <label for="org_id" class="label">Organization ID</label>
      <input type="text" name="org_key" placeholder="Organization ID"  class="org-key input">
    </div>

    <div class="signup-form_field_wrapper flex flex-col w-full ml-3 mr-3 mb-3">
      <button class="button font-bold">Register</button>
    </div>
    </form>
    <p class="text-l font-normal mt-3">Need an Organization Account? <button type="button" id="org-sign-up-link"  class="cursor-pointer text-button hover:underline">Register</button></p>
</div>
</div>
  `);

  window.$signupForm = $signupForm;

  $('main').on('submit', '#signup-form', function(event) {
    event.preventDefault();

    const $firstName = $('.first-name').val().length;
    const $lastName = $('.last-name').val().length;
    const $email = $('.signup-email').val().length;
    const $password = $('.signup-password').val().length;
    const $orgID = $('.org-key').val().length;

    if ($firstName < 1 || $lastName < 1 || $email < 1 || $password < 1 || $orgID < 1) {
      $('.sign-up-exists-error').slideUp(10);
      $('.sign-up-org-error').slideUp(10);
      $('.sign-up-blank-error').slideDown(200);
      return;
    }

    const data = $(this).serialize();
    userRegistration(data)
      .then((data) => {
        if (data.noOrgErr) {
          $('.sign-up-exists-error').slideUp(10);
          $('.sign-up-blank-error').slideUp(10);
          $('.sign-up-org-error').slideDown(200);
        } else if (data.userExistsErr) {
          $('.sign-up-org-error').slideUp(10);
          $('.sign-up-blank-error').slideUp(10);
          $('.sign-up-exists-error').slideDown(200);
        } else {
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
