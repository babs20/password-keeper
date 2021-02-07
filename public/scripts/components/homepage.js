$(() => {

  const $homepage = $(`
    <div class="logo">
      <insert key image here>
      <h1 class="keeper-logo">Keeper</h1>
    </div>

    <h3 class="keeper-description">Keeper is a password storage system for organizations. Generate and easily share passwords for use on any website for all users in your organization.</h3>
  `);

  $main.append($homepage);

});
