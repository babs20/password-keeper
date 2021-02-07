$(() => {

  const $editUserForm = $(`
    <form id="edit-user-form" class="edit-user-form">
      <h4 class="edit-user">Edit Account Information</h4>

      <div class="first-last-name">
        <div class="edit-user-form_field-wrapper">
          <label for="first_name">First Name</label>
          <input type="text" name="first_name" placeholder="First Name">
        </div>

        <div class="edit-user-form_field-wrapper">
          <label for="last_name">Last Name</label>
          <input type="text" name="last_name" placeholder="Last Name">
        </div>
      </div>

      <div class="edit-user-form_field-wrapper">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="password-with-generator">
        <div class="edit-user-form_field-wrapper">
          <label for="password">Password</label>
          <input type="password" name="password" placeholder="Password">
        </div>

        <div class="edit-user-form_field-wrapper">
          <button class="generate-password">Generate</button>
        </div>
      </div>

      <div class="edit-user-form_field-wrapper">
        <button class="save-user-info">Save</button>
      </div>

      <div class="edit-user-form_field-wrapper">
        <button class="cancel">Cancel</button>
      </div>

      <div class="edit-user-form_field-wrapper">
        <button class="delete-user">Delete Account</button>
      </div>
    </form>
  `);

  window.$editUserForm = $editUserForm;

});