$(() => {
  const $manageOrg = $(`
  <div class="manage-organization w-10/12 mx-auto mt-10 flex flex-col items-center">
    <div class="users-table w-11/12">
        <h1 class="manage-title font-bold shadow-md rounded border-l-8 p-1 pl-2 my-3 bg-white text-black text-lg border-gray-400 self-start whitespace-nowrap w-min">Manage Your Organization</h1>
        <table class="all-users-table table-auto p-2 border-collapse border-2 border-gray-400 w-full"></table>
      </div>
    </div>
  `);

  window.$manageOrg = $manageOrg;

  const addUsersToTable = function() {
    $('.all-users-table').empty();
    getUsersInOrg()
      .then(usersArr => {
        const $usersTableHeader = $(`
      <thead class="border-2 border-gray-400">
        <tr class="border-b-2 border-gray-400 py-2 bg-button text-white">
          <th class="p-2 border-2 border-gray-400 font-black text-sm">User</th>
          <th class="p-2 border-2 border-gray-400 font-black text-sm">Email</th>
          <th class="p-2 border-2 border-gray-400 font-black text-sm">Remove</th>
        </tr>
      </thead>
      <tbody id="all-accounts-body" class="bg-white"></tbody>
        `);
        $usersTableHeader.appendTo('.all-users-table');
        for (const user of usersArr) {
          const $userRow = $(`
          <tr class="border-t-2 border-b-2 border-gray-400 p-2">
            <td class="p-2 border-2 border-gray-400 font-semibold text-sm">${escape(user.first_name)} ${escape(user.last_name)}</td>
            <td class="p-2 border-2 border-gray-400 font-semibold text-sm">${escape(user.email)}</td>
            <td class="p-2 border-2 border-gray-400 font-semibold text-sm">
              <form class="remove-user-from-org">
                <input type="number" name="user_id" value="${user.userid}" class="hidden">
                <button class="remove-user rounded p-1 bg-warning w-full text-white hover:bg-warningHover">Remove</button>
              </form>
            </td>
          </tr>
          `);

          $userRow.appendTo('.all-users-table');
        }
      });
  };

  window.addUsersToTable = addUsersToTable;

  $('main').on('submit', '.remove-user-from-org', function(event) {
    event.preventDefault();
    const $specificUser = $(this).closest('.remove-user-from-org');
    const data = $($specificUser).serialize();
    removeUserFromOrg(data)
      .then(() => {
        views_manager.show('manageOrg');
      });
  });
});
