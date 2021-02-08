$(() => {

  const $editOrgForm = $(`
  <form id="generate-password-form" class="hidden"></form>
  <div class="w-screen h-100 flex flex-col items-center justify-center mb-10">
    <form id="edit-org-form" class="edit-org-form w-7/12 min-h-full flex flex-col items-center justify-start mb-10">
      <h4 class="edit-org font-sans text-2xl font-bold w-2/3 my-5">Edit Organization Information</h4>

      <div class="name-abbrev flex items-center justify-between mb-3 w-2/3">
        <div class="edit-org-form_field-wrapper flex flex-col w-9/20">
          <label for="name" class="label">Name</label>
          <input type="text" name="name" placeholder="Name" class="input">
        </div>

        <div class="edit-org-form_field-wrapper flex flex-col w-9/20">
          <label for="abbreviation" class="label">Abbreviation</label>
          <input type="text" name="abbreviation" placeholder="abbreviation" class="input">
        </div>
      </div>

      <div class="edit-org-form_field-wrapper form-field">
        <label for="email" class="label">Email</label>
        <input type="email" name="email" placeholder="Email" class="input">
      </div>

      <div class="password-with-generator flex items-center justify-between mb-3 w-2/3">
        <div class="edit-org-form_field-wrapper flex flex-col w-full">
          <label for="password" class="label">Password</label>
          <div id="generator" class="flex justify-between w-full">
            <input type="password" name="password" placeholder="Password" class="input w-3/4 mr-3"
              id="org-password-field">
            <button type="button"
              class="generate-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5">Generate</button>
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

      <div class="edit-org-form_field-wrapper form-field">
        <label for="confirm-password" class="label">Confirm Password</label>
        <input type="password" name="confirm-password" placeholder="Confirm Password" class="input"
          id="confirm-user-password">
      </div>

      <div class="edit-org-form_field-wrapper form-field">
        <button type="submit" class="save-org-info rounded p-1 bg-button w-full text-white hover:bg-hoverBlue mt-1.5">Save</button>
      </div>
      <div class="edit-org-form_field-wrapper flex justify-between w-2/3">
        <button type="button"
          class="cancel rounded p-1 bg-button w-2/3 text-white hover:bg-hoverBlue mt-1.5 mr-3">Cancel</button>
        <button type="button"
          class="delete-org rounded p-1 bg-warning w-1/3 text-white hover:bg-warningHover mt-1.5">Delete</button>
      </div>
    </form>
  </div>
  `);

  window.$editOrgForm = $editOrgForm;

  $('main').on('submit', '#edit-org-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    editOrgInfo(data)
      .then(() => {
        views_manager.show('allAccounts');
      })
      .catch(e => console.log(e));

  });


  $('main').on('click', '.delete-org', function(event) {
    deleteOrg()
      .then(userLogout)
      .then(getOrgInfo)
      .then(json => {
        header.update(json.user);
        views_manager.show('homepage');
      });
  });
});