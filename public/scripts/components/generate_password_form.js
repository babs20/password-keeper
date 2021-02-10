$(() => {
  const $generatePasswordForm = $(`
    <div class="h-100 flex flex-col items-center justify-start mb-10 mx-auto w-10/12">
      <div class="mt-10 w-9/12">
        <form id="generate-password-form-full">
          <div class="w-full h-full divide-y divide-gray-400">

            <h2
              class="generate-password-title font-sans text-2xl font-bold w-full my-5 border-l-8 border-black pl-4 self-start">
              Generate a new password</h2>

            <div class="checkbox-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg border-none">
              <h2 class="checkbox-error-message text-white p-2 font-bold">
              <i class="fas fa-times-circle px-2 text-lg"></i>
              At Least One Option Must Be Checked</h2>
            </div>

            <div class="flex flex-col justify-between items-center w-full py-4">
              <div class="flex justify-start items-center mb-4 w-full">
                <label for="length " class="label text-xl mr-4">Length</label>
                <input id="password-length-value" class="border-2 rounded border-gray-400 p-1 focus:outline-none focus:ring-1 focus:border-button text-center font-bold w-min appearance-none" value="12" type="number" min="6" max="30">
              </div>

              <input type="range" min="6" max="30" increment="1" name="length"
                class="rounded-lg appearance-none w-full h-4 border-2  border-gray-400 shadow-md" placeholder="length"
                id="password-option0" value="12">
            </div>


            <div class="flex justify-between items-center divide-x divide-gray-400 py-4">
              <div class="flex justify-between items-center w-1/2 pr-4 text-xl">
                <label for="password-option1" class="label">Lower Case</label><br>
                <input type="checkbox" id="password-option1" name="lc" value="true"
                  class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3" checked>
              </div>

              <div class="flex justify-between items-center w-1/2 pl-4 text-xl">
                <label for="password-option2" class="label"> Upper Case</label><br>
                <input type="checkbox" id="password-option2" name="uc" value="true"
                  class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>
            </div>


            <div class="flex justify-between items-center divide-x divide-gray-400 py-4">
              <div class="flex justify-between items-center w-1/2 pr-4 text-xl">
                <label for="password-option3" class="label"> Numbers</label><br>
                <input type="checkbox" id="password-option3" name="num" value="true"
                  class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>

              <div class="flex justify-between items-center w-1/2 pl-4 text-xl">
                <label for="password-option4" class="label"> Symbols</label><br>
                <input type="checkbox" id="password-option4" name="sym" value="true"
                  class="password-option form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>
            </div>

            <div class="generate-password_field-wrapper py-4">
              <button id="generate-pass-button"
                class="rounded p-1 bg-button w-full text-white hover:bg-hoverBlue font-bold py-2">Generate Password</button>
            </div>
        </form>
      </div>

      <div class="new-password_field-wrapper flex justify-between">
        <div class="form field w-full">
          <label for="new-password" class="label text-xl">New Password</label>
          <input type="text" id="new-password" class="input w-full border-2 rounded border-gray-400 p-1 focus:outline-none focus:ring-1 focus:border-button pr-24 mt-1" placeholder="Password" readonly>
        </div>

        <div class="flex justify-end w-min -ml-36">
          <div class="flex justify-center items-center w-min h-min mt-6">
            <span id="custom-tooltip" class="hidden font-bold pt-3 mr-4">Copied!</span>
          </div>
          <button type="button"
            id="copy-password" class="rounded-full text-black opacity-50 hover:opacity-100 self-end mb-1.5 mr-3.5">
            <i class="far fa-clipboard text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  `);

  window.$generatePasswordForm = $generatePasswordForm;

  $('main').on('submit', '#generate-password-form-full', function(event) {
    event.preventDefault();

    if ($('.password-option').is(':checked')) {
      $('.checkbox-error').slideUp(10);
      const data = $(this).serialize();
      generatePassword(data)
        .then(password => {
          $('#new-password').val(password);
        });
    } else {
      $('.checkbox-error').slideDown(150);
    }
  });

  $('main').on('click', '#copy-password', function() {
    if ($('#new-password').val().length > 0) {
      $('#new-password').select();
      document.execCommand('copy');
      $('#custom-tooltip').fadeIn(150);
      setTimeout(() => {
        $('#custom-tooltip').fadeOut(150);
      }, 3000);
    }
  });

  $('main').on('input', '#password-option0', () => {
    const passwordLength = $('#password-option0').val();
    $('#password-length-value').val(passwordLength);
  });

  $('main').on('input', '#password-length-value', () => {
    const passwordLength = $('#password-length-value').val();
    $('#password-option0').val(passwordLength);
  });

});
