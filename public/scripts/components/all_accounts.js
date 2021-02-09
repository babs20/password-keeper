$(() => {

  const $getAllAccounts = $(`
    <div class="all-accounts mx-auto mt-10">
      <h1 class="accounts-title font-bold shadow-md rounded border-l-8 p-1 pl-2 my-3 bg-white text-black text-lg border-gray-400 w-1/2">Your Organization's Accounts</h1>
        <div class="accounts-table rounded">
          <table class="all-accounts-table table-auto p-2 border-collapse border-2 border-gray-400"></table>
      </div>
    </div>
  `);

  window.$getAllAccounts = $getAllAccounts;

  const addAccountToTable = function(data) {
    $('.all-accounts-table').empty();
    getAllAccounts(data)
      .then(accountsArr => {
        const $accountsTableHeader = $(`
        <thead class="border-2 border-gray-400">
          <tr class="border-b-2 border-gray-400 py-2 bg-button text-white">
            <th class="p-2 border-2 border-gray-400 font-black text-sm">Website</th>
            <th class="p-2 border-2 border-gray-400 font-black text-sm">Email / Username</th>
            <th class="p-2 border-2 border-gray-400 font-black text-sm">Password</th>
          </tr>
        </thead>
        <tbody id="all-accounts-body" class="bg-white"></tbody>
        `);
        $accountsTableHeader.appendTo('.all-accounts-table')
        for (const account of accountsArr) {
          const $accountRow = $(`
          <tr class="border-t-2 border-b-2 border-gray-400 p-2">
            <td class="p-2 border-2 border-gray-400 font-semibold text-sm">${account.website}</td>
              <td class="p-2 border-2 border-gray-400 font-semibold text-sm">${account.name}</td>
                <td class="p-2 border-2 border-gray-400 font-semibold text-sm">
                    <div class="account-password-cell flex justify-around">
                      <input type="password" class="account-password-field text-sm text-black font-bold border-2 rounded border-gray-400 p-1 focus:outline-none focus:ring-1 focus:border-button w-7/12" value="${account.password}" readonly>

                      <div class="password-buttons flex justify-around w-9/20 ml-1">
                        <button type="button" class="view-password flex justify-center items-center hover:bg-button rounded-full w-1/3 hover:text-white"><i class="fas fa-eye px-1"></i></button>
                        <button type="button" class="copy-password flex justify-center items-center hover:bg-button rounded-full w-1/3 hover:text-white"><i class="far fa-clipboard px-1"></i></button>
                        <form class="button-to-edit-account flex justify-center items-center hover:bg-button rounded-full w-1/3 hover:text-white">
                          <input type="number" class="edit-account-id hidden" name="id" value="${account.id}">
                          <button class="edit-account flex justify-center items-center hover:bg-button rounded-full w-1/3 hover:text-white"><i class="fas fa-edit px-1"></i></button>
                        </form>
                      </div>
                    </div>
                </td>
            </tr>
          `);

          $accountRow.appendTo('#all-accounts-body');
        }
      })
  };

  window.addAccountToTable = addAccountToTable;

  $('main').on('click', '.view-password', function(event) {
    const $passwordField = $(this).closest('.account-password-cell').find('.account-password-field');
    if ($passwordField.attr('type') === 'password') {
      $passwordField.attr('type', 'text');
    } else {
      $passwordField.attr('type', 'password');
    }
  });

  $('main').on('click', '.copy-password', function(event) {
    const $passwordField = $(this).closest('.account-password-cell').find('.account-password-field');
    if ($passwordField.attr('type') === 'password') {
      $passwordField.attr('type', 'text');
      $passwordField.select();
      document.execCommand('copy');
      $passwordField.attr('type', 'password');
    } else {
      $passwordField.select();
      document.execCommand('copy');
    }
  });

  $('main').on('submit', '.button-to-edit-account', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    views_manager.show('editAccount');
    createEditAccountForm(data);
  });
});
