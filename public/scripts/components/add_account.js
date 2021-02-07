$(() => {

  const $addAccountForm = `
    <form id="add-account-form">
      <h4 class="add-account>Add account login information</h4>

      <div class="add-account_field-wrapper">
        <label for="email-username">Email/Username</label>
        <input type="text" id="email-username" name="name" placeholder="login">
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
  `;

  window.$addAccountForm = $addAccountForm;

});
