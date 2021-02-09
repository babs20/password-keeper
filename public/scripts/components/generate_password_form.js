$(() => {
  const $generatePasswordForm = $(`
    <div class="h-100 flex flex-col items-center justify-start mb-10 mx-auto w-7/12">
      <div class="mt-10 w-full">
        <form id="generate-password-form-full">
          <div class="w-full h-full divide-y divide-gray-400">

            <h2
              class="generate-password-title font-sans text-2xl font-bold w-full my-5 border-l-8 border-black pl-4 self-start">
              Generate a new password</h2>

            <div class="flex flex-col justify-between items-center w-full py-4">
              <label for="length " class="label w-full mb-2 text-xl">Length</label>
              <p id="password-length-value" class="mb-6 bg-button rounded-full text-white font-bold px-2 py-1">12</p>
              <input type="range" min="6" max="30" increment="1" name="length"
                class="rounded-lg appearance-none w-full h-4 border-2  border-gray-400 shadow-md" placeholder="length"
                id="password-option0" value="12">
            </div>


            <div class="flex justify-between items-center divide-x divide-gray-400 py-4">
              <div class="flex justify-between items-center w-1/2 pr-4 text-xl">
                <label for="password-option1" class="label">Lower Case</label><br>
                <input type="checkbox" id="password-option1" name="lc" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3" checked>
              </div>

              <div class="flex justify-between items-center w-1/2 pl-4 text-xl">
                <label for="password-option2" class="label"> Upper Case</label><br>
                <input type="checkbox" id="password-option2" name="uc" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>
            </div>


            <div class="flex justify-between items-center divide-x divide-gray-400 py-4">
              <div class="flex justify-between items-center w-1/2 pr-4 text-xl">
                <label for="password-option3" class="label"> Numbers</label><br>
                <input type="checkbox" id="password-option3" name="num" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>

              <div class="flex justify-between items-center w-1/2 pl-4 text-xl">
                <label for="password-option4" class="label"> Symbols</label><br>
                <input type="checkbox" id="password-option4" name="sym" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>
            </div>

            <div class="generate-password_field-wrapper py-4">
              <button id="generate-pass-button"
                class="rounded p-1 bg-button w-full text-white hover:bg-hoverBlue font-bold py-2">Generate Password</button>
            </div>
        </form>
      </div>

      <div class="new-password_field-wrapper flex justify-between">
        <div class="form field w-2/3">
          <label for="new-password" class="label text-xl">New Password</label>
          <input type="text" id="new-password" class="input w-full" placeholder="Password" readonly>
        </div>

        <div class="flex justify-start w-1/3 pl-4">
          <button type="button"
            id="copy-password" class="copy-password rounded-full p-1 w-12 l-10 bg-button text-white hover:bg-hoverBlue self-end mb-1"><i
              class="far fa-clipboard"></i></button>
          <div class="flex justify-center items-center pl-4 pt-3">
            <span id="custom-tooltip" class="hidden font-bold pt-3 pr-4">Copied!</span>
          </div>
        </div>
      </div>
    </div>
  `);

  window.$generatePasswordForm = $generatePasswordForm;

  $('main').on('submit', '#generate-password-form-full', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    generatePassword(data)
      .then(password => {
        $('#new-password').val(password);
      });
  });

  $('main').on('click', '#copy-password', function(event) {
    if ($('#new-password').val().length > 0) {
      $('#new-password').select();
      document.execCommand('copy');
      $('#custom-tooltip').fadeIn(150);
      setTimeout(() => {
        $('#custom-tooltip').fadeOut(150);
      }, 5000)
    }
  });

  $('main').on('input', '#password-option0', () => {
    const passwordLength = $('#password-option0').val();
    $('#password-length-value').text(passwordLength);
  })

});
