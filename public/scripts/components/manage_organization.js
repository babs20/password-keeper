$(() => {
  const $manageOrg = $(`
    <div class="manage-organization">
      <h2 class="manage-title">Manage Your Organization</h2>

      <div class="users-table">
        <table class="all-users-table">
        </table>
      </div>
    </div>
  `);

  window.$manageOrg = $manageOrg;

  const addUsersToTable = function() {
    $('.all-users-table').empty();
    getUsersInOrg()
      .then(usersArr => {
        const $usersTableHeader = $(`
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Remove</th>
          </tr>
        `);
        $usersTableHeader.appendTo('.all-users-table');
        for (const user of usersArr) {
          const $userRow = $(`
            <tr>
              <td>${user.first_name} ${user.last_name}</td>
              <td>${user.email}</td>
              <td>
                <form class="remove-user-from-org">
                  <input name="user_id" value="${user.userId}" class="hidden">
                  <button type="button" class="remove-user">Remove</button>
                </form>
              <td>
            </tr>
          `);

          $userRow.appendTo('.all-users-table');
        }
      })
  }

  window.addUsersToTable = addUsersToTable;

  $('main').on('submit', '.remove-user', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    removeUserFromOrg(data)
      .then(() => {
        views_manager.show('manageOrg');
      })
  })
});
