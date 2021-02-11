$(() => {

  const $editUserForm = $(`
  <form id="generate-password-form" class="hidden"></form>
    <div class="w-10/12 h-100 mx-auto flex flex-col items-center justify-start">
      <form id="edit-user-form" class="edit-user-form w-7/12 flex flex-col items-center justify-start mx-auto pt-5">
      </form>
    </div>
  `);

  window.$editUserForm = $editUserForm;

  const createEditUserForm = function() {
    getUserInfo()
      .then(json => {
        $('#edit-user-form').empty();

        const $customUserForm = $(`
        <h1 class="edit-user font-sans text-2xl font-bold w-full h-full my-5 pl-4 border-l-8 border-black">Edit User Information</h1>

        <div class="password-match-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
          <h2 class="password-match-message text-white p-2 font-bold">
          <i class="fas fa-exclamation-triangle px-2"></i>
          Passwords Do Not Match</h2>
        </div>

        <div class="fields-blank-error hidden flex flex-col mb-3 w-full bg-alertRed rounded-lg">
          <h2 class="fields-blank-message text-white p-2 font-bold">
          <i class="fas fa-exclamation-triangle px-2"></i>
          Please Fill Out All Fields</h2>
        </div>

        <div class="first-last-name flex items-center justify-between mx-3 mb-3 w-full">
          <div class="edit-user-form_field-wrapper flex flex-col w-9/20">
            <label for="first_name" class="label">First Name</label>
            <input type="text" name="first_name" placeholder="First Name" class="user-first-name input" value="${escape(json.user.firstName)}">
          </div>

          <div class="edit-user-form_field-wrapper flex flex-col w-9/20">
            <label for="last_name" class="label">Last Name</label>
            <input type="text" name="last_name" placeholder="Last Name" class="user-last-name input" value="${escape(json.user.lastName)}">
          </div>
        </div>

        <div class="edit-user-form_field-wrapper flex flex-col mx-3 mb-3 w-full">
          <label for="email" class="label">Email</label>
          <input type="email" name="email" placeholder="Email" class="user-email input" value="${escape(json.user.email)}">
        </div>

        <div class="password-with-generator flex flex-col mx-3 mb-3 w-full">
          <div class="edit-user-form_field-wrapper flex flex-col w-full">
            <label for="password" class="label">Password</label>
            <div id="generator" class="flex justify-between w-full">
              <input type="password" name="password" placeholder="Password" class="mt-2 border-2 rounded border-gray-400 focus:outline-none focus:ring-1 focus:border-button w-3/4 mr-3 pr-16 pl-1 py-1"
                id="user-password-field" form="edit-user-form">

                <div class="password-buttons flex justify-between items-center w-min ml-2 -ml-20 mr-1 mt-2">
                <button type="button" id="view-user-password"
                class="flex justify-center items-center opacity-50 hover:opacity-100"><i title="Show or Hide Password"
                  class="fas fa-eye px-2"></i></button>
                <button type="button" id="copy-user-password"
                class="flex justify-center items-center opacity-50 hover:opacity-100"><i title="Copy Password"
                  class="far fa-clipboard px-2"></i></button>
                </div>


              <button type="button"
                class="generate-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5 text-sm ml-4 font-bold">Generate</button>
            </div>
          </div>
        </div>

        <div class="checkbox-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg border-none">
              <h2 class="checkbox-error-message text-white p-2 font-bold">
              <i class="fas fa-times-circle px-2 text-lg"></i>
              At Least One Option Must Be Checked</h2>
        </div>

        <div id="generate-container" class="flex flex-col mx-3 mb-3 w-full divide-y divide-gray-400 hidden">
          <div class="flex justify-between items-center divide-x divide-gray-400 pb-2">
            <div class="flex justify-between items-center w-1/2 pr-3">
              <label for="length " class="label">Length</label>
              <input type="number" min="6" max="30" name="length"
                class="password-option0 font-sans password-generator mr-4 w-1/3 rounded border-gray-400 border outline-none focus:outline-none text-center bg-white font-semibold text-md hover:text-black focus:text-black"
                placeholder="length" value="12" form="generate-password-form">
            </div>
            <div class="flex justify-between items-center w-1/2 pl-4">
              <label for="password-option1" class="label ml-4"> Lower Case</label><br>
              <input type="checkbox" name="lc" value="true"
                class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form" checked>
            </div>
          </div>
          <div class="flex justify-between items-center pt-2 divide-x divide-gray-400">
            <div class="flex justify-between items-center w-full pr-4">
              <label for="password-option2" class="label"> Upper Case</label><br>
              <input type="checkbox" name="uc" value="true"
                class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form">
            </div>
            <div class="flex justify-between items-center px-4 w-full">
              <label for="password-option3" class="label"> Numbers</label><br>
              <input type="checkbox" name="num" value="true"
                class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form">
            </div>
            <div class="flex justify-between items-center pl-4 w-full">
              <label for="password-option4" class="label"> Symbols</label><br>
              <input type="checkbox" name="sym" value="true"
                class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form">
            </div>
          </div>
        </div>

        <div class="edit-user-form_field-wrapper flex flex-col mx-3 mb-3 w-full">
          <label for="confirm-password" class="label">Confirm Password</label>
          <input type="password" name="confirm-password" placeholder="Confirm Password" class="input"
            id="confirm-user-password">
        </div>

        <div class="edit-user-form_field-wrapper flex flex-col mx-3 mb-3 w-full">
          <button type="submit"
            class="save-user-info rounded p-1 bg-button w-full text-white hover:bg-hoverBlue mt-1.5 font-bold">Save
            Account</button>
        </div>

        <div class="edit-user-form_field-wrapper flex justify-between w-full">
          <button type="button"
            class="cancel rounded p-1 bg-button w-2/3 text-white hover:bg-hoverBlue mt-1.5 mr-3 font-bold">Cancel</button>
          <button type="button"
            class="delete-user rounded p-1 bg-warning w-1/3 text-white hover:bg-warningHover mt-1.5 font-bold">Delete</button>
        </div>
`);

        $customUserForm.appendTo('#edit-user-form');
      });
  };

  window.createEditUserForm = createEditUserForm;

  $('main').on('click', '#view-user-password', function() {
    const $passwordField = $('#user-password-field');
    if ($passwordField.attr('type') === 'password') {
      $passwordField.attr('type', 'text');
    } else {
      $passwordField.attr('type', 'password');
    }
  });

  $('main').on('click', '#copy-user-password', function() {
    const $passwordField = $('#user-password-field');
    if ($passwordField.attr('type') === 'password') {
      $passwordField.attr('type', 'text');
      $passwordField.select();
      document.execCommand('copy');
      $passwordField.attr('type', 'password');
    } else {
      $passwordField.select();
      document.execCommand('copy');
    }
  });

  $('main').on('click', '.generate-password', function() {
    $('#generate-container').slideToggle(300, () => {
      if (!$('#generate-container').is(':hidden')) {
        const data = $('#generate-password-form').serialize();
        generatePassword(data)
          .then(password => {
            $('#user-password-field').val(password);
            $('#confirm-user-password').val(password);
          })
          .catch(e => console.log(e));
      }
    });
  });

  $('main').on('input', '.password-option0', function() {
    const data = $('#generate-password-form').serialize();
    generatePassword(data)
      .then(password => {
        $('#user-password-field').val(password);
        $('#confirm-user-password').val(password);
      })
      .catch(e => console.log(e));
  });

  $('main').on('change', '.password-option', function() {
    if ($('.password-option').is(':checked')) {
      $('.checkbox-error').slideUp(10);
      const data = $('#generate-password-form').serialize();
      generatePassword(data)
        .then(password => {
          $('#user-password-field').val(password);
          $('#confirm-user-password').val(password);
        })
        .catch(e => console.log(e));
    } else {
      $('.checkbox-error').slideDown(150);
    }
  });

  $('main').on('submit', '#edit-user-form', function(event) {
    event.preventDefault();

    if ($('#user-password-field').val() !== $('#confirm-user-password').val()) {
      $('.fields-blank-error').slideUp();
      $('.password-match-error').slideDown(150);
      return;
    }

    if ($('#user-password-field').val().length < 1 || $('.user-first-name').val().length < 1 || $('.user-last-name').val().length < 1 || $('.user-email').val().length < 1) {
      $('.password-match-error').slideUp();
      $('.fields-blank-error').slideDown(150);
      return;
    }

    $('.password-match-error').slideUp();
    $('.fields-blank-error').slideUp();
    const data = $(this).serialize();
    editUserInfo(data)
      .then(() => {
        $('#user-password-field').val('');
        $('#confirm-user-password').val('');
        $('.password-option0').val('12');
        views_manager.show('allAccounts');
      })
      .catch(e => console.log(e));
  });

  $('main').on('click','.cancel', function() {
    views_manager.show('allAccounts');
  });

  $('main').on('click', '.delete-user', function() {
    deleteUser()
      .then(userLogout)
      .then(getUserInfo)
      .then(json => {
        header.update(json.user);
        views_manager.show('homepage');
        window.sidenav.detachSidebar();
      });
  });

});
