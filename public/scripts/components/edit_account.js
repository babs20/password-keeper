$(() => {
  const $editAccountForm = $(`
  <form id="generate-password-form" class="hidden"></form>
    <div class="w-10/12 mx-auto h-100 flex flex-col items-center justify-center">
      <form id="edit-account-form" class="w-7/12 flex flex-col items-center justify-start mx-auto pt-5">
      </form>
      <div class="edit-account-buttons w-7/12 h-full flex flex-col items-center justify-start">
      </div>
    </div>
  `);

  window.$editAccountForm = $editAccountForm;

  const createEditAccountForm = function(accountId) {
    getAllAccounts(accountId)
      .then(accountArr => {
        $('#edit-account-form').empty();
        $('.edit-account-buttons').empty();
        $('#account-type-dropdown').empty();
        const account = accountArr[0];
        const $specificAccountForm = $(`
        <h1 class="edit-account font-sans text-2xl font-bold w-full h-full my-5 pl-4 border-l-8 border-black">Edit Account</h1>

        <div class="empty-fields-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
        <h2 class="empty-fields-message text-white p-2 font-bold">
        <i class="fas fa-exclamation-triangle px-2"></i>
        Please Fill Out All Fields</h2>
        </div>

        <div class="password-match-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
        <h2 class="password-match-message text-white p-2 font-bold">
        <i class="fas fa-exclamation-triangle px-2"></i>
        Passwords Do Not Match</h2>
        </div>

        <div class="edit-account_field-wrapper flex flex-col mx-3 mb-3 w-full">
              <label for="email-username" class="label">Email/Username</label>
              <input type="text" id="email-username" name="name" placeholder="Login" class="input" value="${escape(account.name)}">
            </div>

            <div class="password-with-generator flex flex-col mx-3 mb-3 w-full">
              <div class="edit-account_field-wrapper flex flex-col w-full">
                <label for="password" class="label">Password</label>
                <div class="flex justify-between w-full">
                  <input type="password" name="password" placeholder="Password" class="mt-2 border-2 rounded border-gray-400 focus:outline-none focus:ring-1 focus:border-button w-3/4 mr-3 pr-16 pl-1 py-1"
                    id="edit-account-password" value=${escape(account.password)}>
                    <div class="password-buttons flex justify-between items-center w-min ml-2 -ml-20 mr-1 mt-2">
                <button type="button" id="edit-account-view-password"
                class="flex justify-center items-center opacity-50 hover:opacity-100"><i title="Show or Hide Password"
                  class="fas fa-eye px-2"></i></button>
                <button type="button" id="edit-account-copy-password"
                class="flex justify-center items-center opacity-50 hover:opacity-100"><i title="Copy Password"
                  class="far fa-clipboard px-2"></i></button>
                </div>
                  <button type="button" class="generate-account-edit-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5 text-sm ml-4 font-bold">Generate</button>
                </div>
              </div>
            </div>

            <div class="checkbox-error hidden">
              <h2 class="checkbox-error-message">At Least One Option Must Be Checked</h2>
            </div>

            <div id="generate-account-edit-container" class="flex flex-col w-full mb-3 divide-y divide-gray-400 hidden">
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


            <div class="edit-account_field-wrapper flex flex-col mx-3 mb-3 w-full">
              <label for="confirm-password" class="label">Confirm Password</label>
              <input type="password" name="confirm-password" placeholder="Confirm Password" class="input"
                id="confirm-edit-password" value="${escape(account.password)}">
            </div>

            <div class="edit-account_field-wrapper flex flex-col mx-3 mb-3 w-full">
              <label for="website" class="label">Website</label>
              <input type="url" id="website" name="website" placeholder="Website" class="input" value="${escape(account.website)}">
            </div>

            <div class="edit-account_field-wrapper flex flex-col mx-3 mb-3 w-full">
              <label for="account-type" class="label">Account Type</label>
              <select name="account_type_id" id="account-type-dropdown"
              class="w-100 rounded border-gray-400 mt-2 border-2 p-1 outline-none focus:outline-none bg-white font-bold text-md text-black focus:text-black">
              </select>
            </div>

            <input type="number" class="account-id hidden" name="id" value="${account.id}">

            <div class="edit-account_field-wrapper flex flex-col mx-3 mb-3 w-full">
              <button type="submit"
                class="save-account-info rounded p-1 bg-button w-full text-white hover:bg-hoverBlue mt-1.5">
                Save</button>
            </div>
    `);

        const $editAccountButtons = $(`
      <div class="edit-account_field-wrapper flex mx-3 mb-3 w-full">
      <button type="button"
        class="cancel rounded p-1 bg-button w-2/3 text-white hover:bg-hoverBlue mt-1.5 mr-3">Cancel</button>
        <form id="delete-account-form" class="w-1/3">
        <input type="number" class="account-id hidden" name="id" value="${account.id}">
          <button class="delete-account rounded p-1 bg-warning w-full text-white hover:bg-warningHover mt-1.5">Delete</button>
        </form>
      </div>
      `);

        const accountType = account.account_type_id;
        let $options;

        switch (true) {
          case Number(accountType) === 1:
            $options = $(`
            <option value="1" selected>Work</option>
            <option value="2">Entertainment</option>
            <option value="3">Social</option>
            <option value="4">Other</option>
            `);
            break;
          case Number(accountType) === 2:
            $options = $(`
            <option value="1">Work</option>
            <option value="2" selected>Entertainment</option>
            <option value="3">Social</option>
            <option value="4">Other</option>
            `);
            break;
          case Number(accountType) === 3:
            $options = $(`
            <option value="1">Work</option>
            <option value="2">Entertainment</option>
            <option value="3" selected>Social</option>
            <option value="4">Other</option>
            `);
            break;
          case Number(accountType) === 4:
            $options = $(`
            <option value="1">Work</option>
            <option value="2">Entertainment</option>
            <option value="3">Social</option>
            <option value="4" selected>Other</option>
            `);
            break;
        }

        $specificAccountForm.appendTo('#edit-account-form');
        $editAccountButtons.appendTo('.edit-account-buttons');
        $options.appendTo('#account-type-dropdown');
      });
  };

  window.createEditAccountForm = createEditAccountForm;

  $('main').on('click', '#edit-account-view-password', function() {
    const $passwordField = $('#edit-account-password');
    if ($passwordField.attr('type') === 'password') {
      $passwordField.attr('type', 'text');
    } else {
      $passwordField.attr('type', 'password');
    }
  });

  $('main').on('click', '#edit-account-copy-password', function() {
    const $passwordField = $('#edit-account-password');
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

  $('main').on('submit', '#edit-account-form', function(event) {
    event.preventDefault();

    const $emailUsername = $('#email-username').val().length;
    const $password = $('#edit-account-password').val().length;
    const $confirmPassword = $('#confirm-edit-password').val().length;
    const $website = $('#website').val().length;

    if ($emailUsername < 1 || $password < 1 || $confirmPassword < 1 || $website < 1) {
      $('.password-match-error').slideUp(10);
      $('.empty-fields-error').slideDown(150);
      return;
    }

    if ($password !== $confirmPassword) {
      $('.empty-fields-error').slideUp(10);
      $('.password-match-error').slideDown(150);
      return;
    }

    const data = $(this).serialize();
    editAccount(data)
      .then(() => {
        $('.empty-fields-error').slideUp(10);
        $('.password-match-error').slideUp(10);
        views_manager.show('allAccounts');
      })
      .catch(e => console.log(e));
  });

  $('main').on('submit', '#delete-account-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    deleteAccount(data)
      .then(() => {
        views_manager.show('allAccounts');
      });
  });

  $('main').on('click', '.generate-account-edit-password', function() {
    $('#generate-account-edit-container').slideToggle(300, () => {
      if (!$('#generate-account-edit-container').is(':hidden')) {
        const data = $('#generate-password-form').serialize();
        generatePassword(data)
          .then(password => {
            $('#edit-account-password').val(password);
            $('#confirm-edit-password').val(password);
          })
          .catch(e => console.log(e));
      }
    });
  });

  $('main').on('input', '.password-option0', function() {
    const data = $('#generate-password-form').serialize();
    generatePassword(data)
      .then(password => {
        $('#edit-account-password').val(password);
        $('#confirm-edit-password').val(password);
      })
      .catch(e => console.log(e));
  });

  $('main').on('change', '.password-option', function() {
    if ($('.password-option').is(':checked')) {
      $('.checkbox-error').slideUp(10);
      const data = $('#generate-password-form').serialize();
      generatePassword(data)
        .then(password => {
          $('#edit-account-password').val(password);
          $('#confirm-edit-password').val(password);
        })
        .catch(e => console.log(e));
    } else {
      $('.checkbox-error').slideDown(150);
    }
  });

});
