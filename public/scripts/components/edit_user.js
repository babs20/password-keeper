$(() => {

  const $editUserForm = $(`
  <form id="generate-password-form" class="hidden"></form>
    <div class="w-screen h-100 flex flex-col items-center justify-center mb-10">
      <form id="edit-user-form" class="edit-user-form w-7/12 h-full flex flex-col items-center justify-start mb-10 mt-6">
      </form>
    </div>
  `);

  window.$editUserForm = $editUserForm;

  const createEditUserForm = function() {
    getUserInfo()
      .then(json => {
        $('#edit-user-form').empty();

        const $customUserForm = $(`
        <h4 class="edit-user font-sans text-2xl font-bold w-2/3 my-5">Edit User Information</h4>
        <div class="first-last-name flex items-center justify-between mb-3 w-2/3">
                <div class="edit-user-form_field-wrapper flex flex-col w-9/20">
                  <label for="first_name" class="label">First Name</label>
                  <input type="text" name="first_name" placeholder="First Name" class="input" value="${json.user.firstName}">
                </div>

                <div class="edit-user-form_field-wrapper flex flex-col w-9/20">
                  <label for="last_name" class="label">Last Name</label>
                  <input type="text" name="last_name" placeholder="Last Name" class="input" value="${json.user.lastName}">
                </div>
              </div>

              <div class="edit-user-form_field-wrapper form-field">
                <label for="email" class="label">Email</label>
                <input type="email" name="email" placeholder="Email" class="input" value="${json.user.email}">
              </div>

              <div class="password-with-generator flex items-center justify-between mb-3 w-2/3">
                <div class="edit-user-form_field-wrapper flex flex-col w-full">
                  <label for="password" class="label">Password</label>
                  <div id="generator" class="flex justify-between w-full">
                    <input type="password" name="password" placeholder="Password" class="input w-3/4 mr-3"
                      id="user-password-field">
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

              <div class="edit-user-form_field-wrapper form-field">
                <label for="confirm-password" class="label">Confirm Password</label>
                <input type="password" name="confirm-password" placeholder="Confirm Password" class="input"
                  id="confirm-user-password">
              </div>

              <div class="edit-user-form_field-wrapper form-field">
                <button type="submit" class="save-user-info rounded p-1 bg-button w-full text-white hover:bg-hoverBlue mt-1.5">Save Account</button>
              </div>
              <div class="edit-user-form_field-wrapper flex justify-between w-2/3">
                <button type="button"
                  class="cancel rounded p-1 bg-button w-2/3 text-white hover:bg-hoverBlue mt-1.5 mr-3">Cancel</button>
                <button type="button"
                  class="delete-user rounded p-1 bg-warning w-1/3 text-white hover:bg-warningHover mt-1.5">Delete</button>
              </div>`);

        $customUserForm.appendTo('#edit-user-form');
      })
  };

  window.createEditUserForm = createEditUserForm;

  $('main').on('click', '.generate-password', function(event) {
    $('#generate-container').slideToggle(300);
  });

  $('main').on('input', '.password-option0', function(event) {
    const data = $('#generate-password-form').serialize();
    generatePassword(data)
      .then(password => {
        $('#user-password-field').val(password);
        $('#confirm-user-password').val(password);
      })
      .catch(e => console.log(e));
  });

  $('main').on('click', '.password-option', function(event) {
    const data = $('#generate-password-form').serialize();
    generatePassword(data)
      .then(password => {
        $('#user-password-field').val(password);
        $('#confirm-user-password').val(password);
      })
      .catch(e => console.log(e));
  });

  $('main').on('submit', '#edit-user-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    editUserInfo(data)
      .then(() => {
        $('#user-password-field').val('');
        $('#confirm-user-password').val('');
        views_manager.show('allAccounts');
      })
      .catch(e => console.log(e));
  });

  $('main').on('click','.cancel', function(event) {
    views_manager.show('allAccounts');
  });

  $('main').on('click', '.delete-user', function(event) {
    deleteUser()
      .then(userLogout)
      .then(getUserInfo)
      .then(json => {
        header.update(json.user);
        views_manager.show('homepage');
      });
  });

});
