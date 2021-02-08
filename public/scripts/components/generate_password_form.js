$(() => {
  const $generatePasswordForm = $(`
      <div class="flex justify-between items-center divide-x divide-gray-400 pb-2">
      <form id="generate-password-form">
        <h2 class="generate-password-title">Generate a new password</h2>

        <div class="flex justify-between items-center w-1/2 pr-3">
          <label for="length " class="label">Length</label>
          <input type="number" min="6" max="30" name="length"
            class="font-sans password-generator mr-4 w-1/3 rounded border-gray-400 border outline-none focus:outline-none text-center bg-white font-semibold text-md hover:text-black focus:text-black"
            placeholder="length" id="password-option0" value="12">
        </div>

        <div class="flex justify-between items-center w-1/2 pl-4">
          <label for="password-option1" class="label ml-4"> Lower Case</label><br>
          <input type="checkbox" id="password-option1" name="lc" value="true"
            class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3" checked>
        </div>
      </div>

      <div class="flex justify-between items-center pt-2 divide-x divide-gray-400">
        <div class="flex justify-between items-center w-full pr-4">
          <label for="password-option2" class="label"> Upper Case</label><br>
          <input type="checkbox" id="password-option2" name="uc" value="true"
            class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
        </div>

        <div class="flex justify-between items-center px-4 w-full">
          <label for="password-option3" class="label"> Numbers</label><br>
          <input type="checkbox" id="password-option3" name="num" value="true"
            class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
        </div>

        <div class="flex justify-between items-center pl-4 w-full">
          <label for="password-option4" class="label"> Symbols</label><br>
          <input type="checkbox" id="password-option4" name="sym" value="true"
            class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
        </div>
      </div>

        <div class="generate-password_field-wrapper">
          <button id="generate-pass-button">Generate Password</button>
        </div>
      </form>

      <div class="new-password_field-wrapper">
        <label for="new-password">New Password</label>
        <input type="text" id="new-password" placeholder="password" readonly>
        <button type="button" class="copy-password"><i class="far fa-clipboard"></i></button>
        <span id="custom-tooltip">copied!</span>
      </div>
  `);

  window.$generatePasswordForm = $generatePasswordForm;

  $('main').on('submit', '#generate-password-form', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    generatePassword()
      .then(password => {
        $('#new-password').val(password);
      });
  });

  $('main').on('click', '.copy-password', function(event) {
    $('#new-password').val().select();
    document.execCommand('copy');
  });

});
