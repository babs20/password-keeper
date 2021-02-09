$(() => {
  const $editAccountForm = $(`
  <form id="generate-password-form" class="hidden"></form>
    <div class="w-screen h-100 flex flex-col items-center justify-center mb-10">
      <form id="edit-account-form" class="w-7/12 h-full flex flex-col items-center justify-start">
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
        const account = accountArr[0];
        const $specificAccountForm = $(`
        <h4 class="edit-account font-sans text-2xl font-bold w-2/3 my-5">Edit Account</h4>
        <div class="edit-account_field-wrapper form-field">
              <label for="email-username" class="label">Email/Username</label>
              <input type="text" id="email-username" name="name" placeholder="Login" class="input" value="${account.name}">
            </div>

            <div class="password-with-generator flex items-center justify-between mb-3 w-2/3">
              <div class="edit-account_field-wrapper flex flex-col w-full">
                <label for="password" class="label">Password</label>
                <div class="flex justify-between w-full">
                  <input type="password" name="password" placeholder="Password" class="input w-3/4 mr-3"
                    id="account-password-field" value=${account.password}>
                  <button
                    class="generate-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5 text-sm">Generate</button>
                </div>
              </div>
            </div>

            <div id="generate-container" class="flex flex-col w-2/3 mb-3 divide-y divide-gray-400 hidden">
              <div class="flex justify-between items-center divide-x divide-gray-400 pb-2">
                <div class="flex justify-between items-center w-1/2 pr-3">
                  <label for="length " class="label">Length</label>
                  <input type="number" min="6" max="30" name="length"
                    class="font-sans password-generator mr-4 w-1/3 rounded border-gray-400 border outline-none focus:outline-none text-center bg-white font-semibold text-md hover:text-black focus:text-black"
                    placeholder="length" id="password-option0" value="12" form="generate-password-form">
                </div>
                <div class="flex justify-between items-center w-1/2 pl-4">
                  <label for="password-option1" class="label ml-4"> Lower Case</label><br>
                  <input type="checkbox" id="password-option1" name="lc" value="true"
                    class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                    form="generate-password-form" checked>
                </div>
              </div>
              <div class="flex justify-between items-center pt-2 divide-x divide-gray-400">
                <div class="flex justify-between items-center w-full pr-4">
                  <label for="password-option2" class="label"> Upper Case</label><br>
                  <input type="checkbox" id="password-option2" name="uc" value="true"
                    class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                    form="generate-password-form">
                </div>
                <div class="flex justify-between items-center px-4 w-full">
                  <label for="password-option3" class="label"> Numbers</label><br>
                  <input type="checkbox" id="password-option3" name="num" value="true"
                    class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                    form="generate-password-form">
                </div>
                <div class="flex justify-between items-center pl-4 w-full">
                  <label for="password-option4" class="label"> Symbols</label><br>
                  <input type="checkbox" id="password-option4" name="sym" value="true"
                    class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                    form="generate-password-form">
                </div>
              </div>
            </div>


            <div class="edit-account_field-wrapper form-field">
              <label for="confirm-password" class="label">Confirm Password</label>
              <input type="password" name="confirm-password" placeholder="Confirm Password" class="input"
                id="confirm-account-password" value="${account.password}">
            </div>

            <div class="edit-account_field-wrapper form-field">
              <label for="website" class="label">Website</label>
              <input type="url" id="website" name="website" placeholder="Website" class="input" value="${account.website}">
            </div>

            <div class="edit-account_field-wrapper form-field">
              <label for="account-type" class="label">Account Type</label>
              <select name="account-type" id="account-type-dropdown" class="w-100 rounded border-gray-400 mt-2 border-2 p-1 outline-none focus:outline-none bg-white font-bold text-md text-black focus:text-black" value="${account.account_type_id}">
                <option value="1">Work</option>
                <option value="2">Entertainment</option>
                <option value="3">Social</option>
                <option value="4">Other</option>
              </select>
            </div>

            <input type="number" class="account-id hidden" name="id" value="${account.id}">

            <div class="edit-account_field-wrapper form-field">
              <button type="submit"
                class="save-account-info rounded p-1 bg-button w-full text-white hover:bg-hoverBlue mt-1.5">
                Save</button>
            </div>
    `);

      const $editAccountButtons = $(`
      <div class="edit-account_field-wrapper flex justify-between w-2/3">
      <button type="button"
        class="cancel rounded p-1 bg-button w-2/3 text-white hover:bg-hoverBlue mt-1.5 mr-3">Cancel</button>
        <form id="delete-account-form" class="w-1/3">
        <input type="number" class="account-id hidden" name="id" value="${account.id}">
          <button class="delete-account rounded p-1 bg-warning w-full text-white hover:bg-warningHover mt-1.5">Delete</button>
        </form>
      </div>
      `);

      $specificAccountForm.appendTo('#edit-account-form');
      $editAccountButtons.appendTo('.edit-account-buttons');
    });
  };

  window.createEditAccountForm = createEditAccountForm;

  $('main').on('submit', '#edit-account-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    editAccount(data)
      .then(() => {
        views_manager.show('allAccounts');
      })
      .catch(e => console.log(e));
  });

  $('main').on('submit', '#delete-account-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    console.log(data);
    deleteAccount(data)
      .then(() => {
        views_manager.show('allAccounts');
      })
  });

});
