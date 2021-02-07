$(() => {

  const $editUserForm = $(`
  <form id="generate-password-form">/<form>
  <div class="w-screen h-100 flex flex-col items-center justify-center mb-10">
  <form id="edit-user-form" class="edit-user-form w-7/12 h-100 flex flex-col items-center justify-center">
    <h4 class="edit-user font-sans text-2xl font-bold w-2/3 my-5">Edit Account Information</h4>

    <div class="first-last-name flex items-center justify-between mb-3 w-2/3">
      <div class="edit-user-form_field-wrapper flex flex-col w-9/20">
        <label for="first_name" class="label">First Name</label>
        <input type="text" name="first_name" placeholder="First Name" class="input" form="edit-user-form">
      </div>

      <div class="edit-user-form_field-wrapper flex flex-col w-9/20">
        <label for="last_name" class="label">Last Name</label>
        <input type="text" name="last_name" placeholder="Last Name" class="input" form="edit-user-form">
      </div>
    </div>

    <div class="edit-user-form_field-wrapper form-field">
      <label for="email" class="label">Email</label>
      <input type="email" name="email" placeholder="Email" class="input" form="edit-user-form">
    </div>

    <div class="password-with-generator flex items-center justify-between mb-3 w-2/3">
      <div class="edit-user-form_field-wrapper flex flex-col w-full">
        <label for="password" class="label">Password</label>
        <div class="flex justify-between w-full">
          <input type="password" name="password" placeholder="Password" class="input w-3/4 mr-3" id="user-password-field" form="edit-user-form">
          <button class="generate-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5">Generate</button>
        </div>
      </div>
    </div>

    <div class="edit-user-form_field-wrapper form-field">
      <label for="confirm-password" class="label">Confirm Password</label>
      <input type="password" name="confirm-password" placeholder="Confirm Password" class="input" id="confirm-user-password">
    </div>

    <div class="edit-user-form_field-wrapper form-field">
      <button class="save-user-info rounded p-1 bg-button w-full text-white hover:bg-hoverBlue mt-1.5" form="edit-user-form">Save Account</button>
    </div>

    <div class="edit-user-form_field-wrapper flex justify-between w-2/3">
      <button class="cancel rounded p-1 bg-button w-2/3 text-white hover:bg-hoverBlue mt-1.5 mr-3">Cancel</button>
      <button class="delete-user rounded p-1 bg-warning w-1/3 text-white hover:bg-warningHover mt-1.5">Delete</button>
    </div>
  </form>
 </div>
  `);

  window.$editUserForm = $editUserForm;

  const $generatePassword = `

      <div class="password-generator_field-wrapper">
        <label for="length">Password Length</label>
        <input type="number" name="length" class="password-generator" placeholder="length" id="password-option0" form="generate-password-form">
      </div>

      <div class="password-generator_field-wrapper">
        <input type="checkbox" id="password-option1" name="lc" value="lower-case" class="password-option" form="generate-password-form">
        <label for="password-option1"> Lower Case</label><br>

        <input type="checkbox" id="password-option2" name="uc" value="upper-case" class="password-option" form="generate-password-form">
        <label for="password-option2"> Upper Case</label><br>

        <input type="checkbox" id="password-option3" name="num" value="numbers" class="password-option" form="generate-password-form">
        <label for="password-option3"> Numbers</label><br>

        <input type="checkbox" id="password-option4" name="sym" value="symbols" class="password-option" form="generate-password-form">
        <label for="password-option4"> Symbols</label><br>
      </div>
  `;

  const $passwordField = $('.password-with-generator');

  $('.generate-password').on('click', function(event) {
    $generatePassword.appendTo($passwordField);

    $('#password-option0').on('input', function(event) {
      const data = $('#generate-password-form').serialize();
      generatePassword(data)
        .then(password => {
          $('#user-password-field').val(password);
          $('#confirm-user-password').val(password);
        })
        .catch(e => console.log(e));
    });

    $('.password-option').on('click', function(event) {
      const data = $('#generate-password-form').serialize();
      generatePassword(data)
        .then(password => {
          $('#user-password-field').val(password);
          $('#confirm-user-password').val(password);
        })
        .catch(e => console.log(e));
    });

  });

  $('.save-user-info').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    editUserInfo(data)
      .then(() => {
        views_manager.show('allAccounts');
      })
      .catch(e => console.log(e));
  });

  $('.cancel').on('click', function(event) {
    views_manager.show('allAccounts');
  });

  $('.delete-user').on('click', function(event) {
    deleteUser()
      .then(userLogout)
      .then(getUserInfo)
      .then(json => {
        header.update(json.user);
        views_manager.show('homepage');
      });
  });

});
