$(() => {
  const $main = $('#main-content');
  const $homepage = $(`
  <div class=" h-100 w-1/2 flex flex-col items-center justify-center mb-10">
  <div class="logo mb-8 pb-8 border-b-2 border-black w-full flex items-center justify-center">
    <img src="img/key.png" alt="Key Logo" class="w-14 h-14 mr-4">
    <h1 class="keeper-logo font-bold text-4xl mr-4">Keeper</h1>
  </div>

  <h3 class="keeper-description">Keeper is a password storage system for organizations.<br>Generate and easily share passwords for use on any website<br>for all users in your organization.</h3>
</div>
  `);
  window.$homepage = $homepage;

  $main.append($homepage);

});
