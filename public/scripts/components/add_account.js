$(() => {

  const $addAccountForm = $(`
  <form id="generate-password-form" class="hidden"></form>
  <div class="w-10/12 mx-auto h-full flex justify-center">
    <div class="w-10/12 h-full flex flex-col items-center justify-center">
      <form id="add-account-form" class="add-account-form w-7/12 min-h-full flex flex-col items-center justify-start pt-5 mx-auto">
        <h4 class="add-account font-sans text-2xl font-bold w-full my-5 border-l-8 border-black pl-4">Add Account Login Information</h4>

        <div class="empty-fields-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
          <h2 class="empty-fields-message text-white p-2 font-bold">
          <i class="fas fa-exclamation-triangle px-2"></i>
          Please Fill Out All Fields</h2>
        </div>


        <div class="add-account_field-wrapper flex flex-col ml-3 mr-3 mb-3 w-full">
          <label for="email-username" class="label">Email / Username</label>
          <input type="text" id="email-username" name="name" placeholder="Login" class="input">
        </div>

        <div class="password-with-generator flex items-center justify-between mb-3 w-full">
          <div class="add-account_field-wrapper flex flex-col w-full">
            <label for="password" class="label">Password</label>
            <div class="flex justify-between w-full">
              <input type="password" name="password" placeholder="Password" class="mt-2 border-2 rounded border-gray-400 focus:outline-none focus:ring-1 focus:border-button w-3/4 mr-3 pr-16 pl-1"
                id="account-password-field">

                <div class="password-buttons flex justify-between items-center w-min ml-2 -ml-20 mr-1 mt-2">
                <button type="button" id="account-view-password"
                class="flex justify-center items-center opacity-50 hover:opacity-100"><i title="Show or Hide Password"
                  class="fas fa-eye px-2"></i></button>
                <button type="button" id="account-copy-password"
                class="flex justify-center items-center opacity-50 hover:opacity-100"><i title="Copy Password"
                  class="far fa-clipboard px-2"></i></button>
                </div>

              <button
                class="generate-account-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5 text-sm text-center ml-4" type="button">Generate</button>
            </div>
          </div>
        </div>

        <div class="checkbox-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg border-none">
              <h2 class="checkbox-error-message text-white p-2 font-bold">
              <i class="fas fa-times-circle px-2 text-lg"></i>
              At Least One Option Must Be Checked</h2>
            </div>

        <div id="generate-account-container" class="flex flex-col w-full mb-3 divide-y divide-gray-400 hidden">
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

        <div class="add-account_field-wrapper flex flex-col mx-3 mb-3 w-full">
          <label for="website" class="label">Website</label>
          <input type="url" id="website" name="website" placeholder="Website" class="input" value="https://">
        </div>

        <div class="add-account_field-wrapper flex flex-col ml-3 mr-3 mb-3 w-full">
          <label for="account-type" class="label">Account Type</label>
          <select name="account_type_id" id="account-type-dropdown"
            class="w-100 rounded border-gray-400 mt-2 border-2 p-1 outline-none focus:outline-none bg-white font-bold text-md text-black focus:text-black">
            <option value="1">Work</option>
            <option value="2">Entertainment</option>
            <option value="3">Social</option>
            <option value="4">Other</option>
          </select>
        </div>

        <div class="add-account_field-wrapper flex flex-col ml-3 mr-3 mb-3 w-full">
          <button id="add-account-button" class="button font-bold">Add Account</button>
      </form>
    </div>
    </div>
  `);

  window.$addAccountForm = $addAccountForm;

  $('main').on('click', '#account-view-password', function() {
    const $passwordField = $('#account-password-field');
    if ($passwordField.attr('type') === 'password') {
      $passwordField.attr('type', 'text');
    } else {
      $passwordField.attr('type', 'password');
    }
  });

  $('main').on('click', '#account-copy-password', function() {
    const $passwordField = $('#account-password-field');
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

  $('main').on('submit', '#add-account-form', function(event) {
    event.preventDefault();

    if ($('#email-username').val().length < 1 || $('#account-password-field').val().legnth < 1 || $('#website').val().length < 1) {
      $('.empty-fields-error').slideDown(150);
      return;
    }

    const data = $(this).serialize();
    createAccount(data)
      .then(() => {
        $('.empty-fields-error').slideUp();
        $('#email-username').val('');
        $('#account-password-field').val('');
        $('#website').val('https://');
        $('#account-type-dropdown').val('1');
        $('.password-option0').val('12');
        views_manager.show('allAccounts');
      });
  });

  $('main').on('click', '.generate-account-password', function(event) {
    $('#generate-account-container').slideToggle(300, () => {
      if (!$('#generate-account-container').is(':hidden')) {
        const data = $('#generate-password-form').serialize();
        generatePassword(data)
          .then(password => {
            $('#account-password-field').val(password);
          })
          .catch(e => console.log(e));
      }
    });
  });

  $('main').on('input', '.password-option0', function(event) {
    const data = $('#generate-password-form').serialize();
    generatePassword(data)
      .then(password => {
        $('#account-password-field').val(password);
      })
      .catch(e => console.log(e));
  });

  $('main').on('change', '.password-option', function(event) {
    if ($('.password-option').is(':checked')) {
      $('.checkbox-error').slideUp(10);
      const data = $('#generate-password-form').serialize();
      generatePassword(data)
        .then(password => {
          $('#account-password-field').val(password);
        })
        .catch(e => console.log(e));
    } else {
      $('.checkbox-error').slideDown(150);
    }
  });

});
