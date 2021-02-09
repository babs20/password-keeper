$(() => {

  const $editOrgForm = $(`
  <form id="generate-password-form" class="hidden"></form>
  <div class="w-10/12 h-100 mx-auto flex flex-col items-center justify-start">
    <form id="edit-org-form" class="edit-org-form w-7/12 flex flex-col items-center justify-start mx-auto pt-5">
    </form>
  </div>
  `);

  window.$editOrgForm = $editOrgForm;

  const createEditOrgForm = function() {
    getOrgInfo()
      .then(json => {
        const org = json.org;
        $('#edit-org-form').empty();
        const $orgSpecificForm = $(`
        <div class="edit-org-header-section w-full">
          <h2 class="edit-org font-sans text-2xl font-bold w-full my-5 border-l-8 border-black pl-4">Edit Organization Information</h2>
          <h3 class="org-identifier-key font-bold rounded border-l-8 p-1 px-4 my-2 bg-white text-black border-gray-400 break-words w-max hover:shadow-md">Organization ID: ${org.key}</h3>
        </div>

        <div class="password-match-error hidden">
          <h2 class="password-match-message">Passwords do not match</h2>
        </div>

        <div class="fields-blank-error hidden">
          <h2 class="fields-blank-message">Please fill out all fields</h2>
        </div>

        <div class="name-abbrev flex items-center justify-between mb-3 w-full">
          <div class="edit-org-form_field-wrapper flex flex-col w-9/20">
            <label for="name" class="label">Name</label>
            <input type="text" id="org-name" name="name" placeholder="Name" class="org-name input" value="${org.name}">
          </div>

          <div class="edit-org-form_field-wrapper flex flex-col w-9/20">
            <label for="abbreviation" class="label">Abbreviation</label>
            <input type="text" name="abbreviation" placeholder="Abbreviation" class="org-abbrev input" value="${org.abbreviation}">
          </div>
        </div>

        <div class="edit-org-form_field-wrapper flex flex-col ml-3 mr-3 mb-3 w-full">
          <label for="email" class="label">Email</label>
          <input type="email" name="email" placeholder="Email" class="org-email input" value="${org.email}">
        </div>

        <div class="password-with-generator flex items-center justify-between mb-3 w-full">
          <div class="edit-org-form_field-wrapper flex flex-col w-full">
            <label for="password" class="label">Password</label>
            <div id="generator" class="flex justify-between w-full">
              <input type="password" name="password" placeholder="Password" class="org-password-field input w-3/4 mr-3">
              <button type="button"
                class="generate-password rounded p-1 bg-button w-1/4 text-white hover:bg-hoverBlue mt-1.5">Generate</button>
            </div>
          </div>
        </div>

        <div id="generate-container" class="flex flex-col mb-3 divide-y divide-gray-400 hidden w-full">
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
                class="password-option1 form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form" checked>
            </div>
          </div>
          <div class="flex justify-between items-center pt-2 divide-x divide-gray-400">
            <div class="flex justify-between items-center w-full pr-4">
              <label for="password-option2" class="label"> Upper Case</label><br>
              <input type="checkbox" name="uc" value="true"
                class="password-option2 form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form">
            </div>
            <div class="flex justify-between items-center px-4 w-full">
              <label for="password-option3" class="label"> Numbers</label><br>
              <input type="checkbox" name="num" value="true"
                class="password-option3 form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form">
            </div>
            <div class="flex justify-between items-center pl-4 w-full">
              <label for="password-option4" class="label"> Symbols</label><br>
              <input type="checkbox" name="sym" value="true"
                class="password-option4 form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3"
                form="generate-password-form">
            </div>
          </div>
        </div>

        <div class="edit-org-form_field-wrapper flex flex-col ml-3 mr-3 mb-3 w-full">
          <label for="confirm-password" class="label">Confirm Password</label>
          <input type="password" name="confirm-password" placeholder="Confirm Password" class="confirm-org-password input">
        </div>

        <div class="edit-org-form_field-wrapper flex flex-col ml-3 mr-3 mb-3 w-full">
          <button type="submit" class="save-org-info rounded p-1 bg-button w-full text-white hover:bg-hoverBlue mt-1.5">Save</button>
        </div>
        <div class="edit-org-form_field-wrapper flex justify-between w-full">
          <button type="button"
            class="cancel rounded p-1 bg-button w-2/3 text-white hover:bg-hoverBlue mt-1.5 mr-3">Cancel</button>
          <button type="button"
            class="delete-org rounded p-1 bg-warning w-1/3 text-white hover:bg-warningHover mt-1.5">Delete</button>
        </div>
        `);

        $orgSpecificForm.appendTo('#edit-org-form');
      })
  }

  window.createEditOrgForm = createEditOrgForm;

  $('main').on('input', '.password-option0', function(event) {
    const data = $('#generate-password-form').serialize();
    generatePassword(data)
      .then(password => {
        $('.org-password-field').val(password);
        $('.confirm-org-password').val(password);
      })
      .catch(e => console.log(e));
  });

  $('main').on('click', '.password-option', function(event) {
    const data = $('#generate-password-form').serialize();
    generatePassword(data)
      .then(password => {
        $('.org-password-field').val(password);
        $('.confirm-org-password').val(password);
      })
      .catch(e => console.log(e));
  });

  $('main').on('submit', '#edit-org-form', function(event) {
    event.preventDefault();

    const $orgName = $('#org-name').val();
    const $orgAbbrev = $('.org-abbrev').val();
    const $orgEmail = $('.org-email').val();
    const $orgPassword = $('.org-password-field').val();
    const $confirmOrgPass = $('.confirm-org-password').val();

    if ($orgName.length < 1 || $orgAbbrev.length < 1 || $orgEmail.length < 1 || $orgPassword.length < 1 || $confirmOrgPass.length < 1) {
      $('.password-match-error').slideUp(10);
      $('.fields-blank-error').slideDown(150);
      return;
    }

    if ($orgPassword !== $confirmOrgPass) {
      $('.fields-blank-error').slideUp(10);
      $('.password-match-error').slideDown(150);
      return;
    }

    const data = $(this).serialize();
    editOrgInfo(data)
      .then(() => {
        $('.password-match-error').slideUp(10);
        $('.fields-blank-error').slideUp(10);
        $('.sidebar-org-name').text($orgName);
        views_manager.show('allAccounts');
      })
      .catch(e => console.log(e));

  });


  $('main').on('click', '.delete-org', function(event) {
    deleteOrg()
      .then(userLogout)
      .then(getOrgInfo)
      .then(json => {
        header.update(json.org);
        views_manager.show('homepage');
        sidenav.detachSidebar();
      });
  });
});
