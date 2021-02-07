$(() => {

  const $orgSignupForm = $(`
    <form id="org-signup-form" class="org-signup-form">
      <p>Sign up for a free organization account</p>

      <div class="name-abbrev">
        <div class="signup-form_field-wrapper">
          <label for="name">Organization Name</label>
          <input type="text" name="name" placeholder="Organization Name">
        </div>

        <div class="signup-form_field-wrapper">
          <label for="abbreviation">Abbreviation</label>
          <input type="text" name="abbreviation" placeholder="Abbreviation">
        </div>
      </div>

      <div class="signup-form_field-wrapper">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="signup-form_field-wrapper">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password">
      </div>

      <div class="signup-form_field_wrapper">
        <button id="org-register">Register</button>
      </div>
  `);

  window.$orgSignupForm = $orgSignupForm;

  $orgSignupForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    orgRegistration(data)
      .then(getOrgInfo)
      .then(json => {
        header.update(json.org);
        // views_manager.show
      })
  })
});
