$(() => {

  const $addAccountForm = $(`
  <form id="generate-password-form" class="hidden"></form>
  <form id="add-account-form">
    <h4 class="add-account>Add account login information"></h4>

    <div class="add-account_field-wrapper form-field">
      <label for="email-username" class="label">Email/Username</label>
      <input type="text" id="email-username" name="name" placeholder="Login" class="input">
    </div>

    <div class="password-with-generator flex items-center justify-between mb-3 w-2/3">
      <div class="add-account_field-wrapper flex flex-col w-full">
        <label for="password" class="label">Password</label>
        <div class="flex justify-between w-full">
          <input type="password" name="password" placeholder="Password" class="input w-3/4 mr-3" id="account-password-field">
          <button class="generate-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5">Generate</button>
        </div>
      </div>
    </div>

    <div class="add-account_field-wrapper">
      <label for="website">Website</label>
      <input type="url" id="website" name="website" placeholder="website">
    </div>

    <div class="add-account_field-wrapper">
      <label for="account-type">Account Type</label>
      <select name="account-type" id="account-type-dropdown">
        <option value="1">Work</option>
        <option value="2">Entertainment</option>
        <option value="3">Social</option>
        <option value="4">Other</option>
      </select>
    </div>

    <div class="add-account_field-wrapper">
      <button id="add-account-button">Add Account</button>
  </form>
  `);

  window.$addAccountForm = $addAccountForm;

  const $generatePassword = $(`
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
  `);

  $('main').on('submit', '#add-account-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    createAccount(data)
      .then(() => {
        views_manager.show('allAccounts');
      });
  });

});
