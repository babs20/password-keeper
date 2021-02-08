$(() => {
  const $generatePasswordForm = $(`
    <div class="h-100 flex flex-col items-center justify-start mb-10 mx-auto">
      <div class="mt-10">
        <form id="generate-password-form">
          <div class="w-full h-full divide-y divide-gray-400">

            <h2
              class="generate-password-title font-bold shadow-md rounded border-l-8 p-1 pl-2 my-4 bg-white text-black text-lg border-gray-400 self-start">
              Generate a new password</h2>

            <div class="flex flex-col justify-between items-center w-full py-4">
              <label for="length " class="label w-full mb-2">Length</label>
              <input type="range" min="6" max="30" increment="1" name="length"
                class="rounded-lg appearance-none w-full h-3  border-gray-400 shadow-md" placeholder="length"
                id="password-option0" value="12">
            </div>

            <!-- Top Row of Options -->
            <div class="flex justify-between items-center divide-x divide-gray-400 py-4">
              <div class="flex justify-between items-center w-1/2 pr-4">
                <label for="password-option1" class="label">Lower Case</label><br>
                <input type="checkbox" id="password-option1" name="lc" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3" checked>
              </div>

              <div class="flex justify-between items-center w-1/2 pl-4">
                <label for="password-option2" class="label"> Upper Case</label><br>
                <input type="checkbox" id="password-option2" name="uc" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>
            </div>
            <!-- Bottom Row of Options -->
            <div class="flex justify-between items-center divide-x divide-gray-400 py-4">
              <div class="flex justify-between items-center w-1/2 pr-4">
                <label for="password-option3" class="label"> Numbers</label><br>
                <input type="checkbox" id="password-option3" name="num" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>

              <div class="flex justify-between items-center w-1/2 pl-4">
                <label for="password-option4" class="label"> Symbols</label><br>
                <input type="checkbox" id="password-option4" name="sym" value="true"
                  class="form-checkbox h-3.5 w-3.5 rounded text-button border-gray-400 border ml-3">
              </div>
            </div>

            <div class="generate-password_field-wrapper py-4">
              <button id="generate-pass-button" class="rounded p-1 bg-button w-full text-white hover:bg-hoverBlue">Generate Password</button>
            </div>
        </form>
      </div>

      <div class="new-password_field-wrapper flex justify-between">
        <div class="form field w-2/3">
          <label for="new-password" class="label">New Password</label>
          <input type="text" id="new-password" class="input w-full" placeholder="password" readonly>
        </div>
        <div class="flex">
          <button type="button" class="copy-password rounded-full p-1 w-12 l-10 bg-button text-white hover:bg-hoverBlue self-end mb-1"><i class="far fa-clipboard"></i></button>
          <span id="custom-tooltip" class="self-end mb-2 ml-2 font-bold">Copied!</span>
        </div>
      </div>
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
