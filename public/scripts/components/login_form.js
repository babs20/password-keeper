$(() => {

  const $loginForm = $(`
  <div class="login-form w-screen h-100 flex flex-col items-center justify-center mb-10">
  <form id="user-login-form" class="user-login-form h-72 w-80 flex flex-col items-center justify-center">
    <p class="font-sans text-2xl font-bold w-2/3 mb-1">User Login</p>
    <div class="login-form_field-wrapper flex flex-col m-3 w-2/3">
      <label for="email" class="font-bold">Email</label>
      <input type="email" name="email" placeholder="email" class="mt-2 border-2 rounded border-gray-400 p-1">
    </div>

    <div class="login-form_field_wrapper flex flex-col w-2/3 ml-3 mr-3 mb-3">
      <label for="password" class="font-bold">Password</label>
      <input type="password" name="password" placeholder="password" class="mt-2 border-2 rounded border-gray-400 p-1">
    </div>

    <div class="login-form_field_wrapper w-2/3">
      <button class="mt-2 rounded p-1 bg-button w-full text-white hover:bg-hoverBlue">Login</button>
    </div>
  </form>
  <div class="flex flex-col items-center justify-center w-72 mt-2">
    <p class="text-l font-normal">Organization? <button id="org-login-link" class="cursor-pointer text-button hover:underline">Login</button></p>

    <p class="text-l font-normal">Don't have an account? <button id="sign-up-link"  class="cursor-pointer text-button hover:underline">Register</button></p>
  </div>
</div>
  `);

  window.$loginForm = $loginForm;

  $('#user-login-form').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    userLogin(data)
      .then(getUserInfo)
      .then(json => {
        header.update(json.user);
        // views_manager.show
      });

  });

});
