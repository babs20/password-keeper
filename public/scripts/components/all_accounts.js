$(() => {

  const $getAllAccounts = $(`
    <div class="all-accounts">
      <h2 class="accounts-title">Your Organization's Accounts</h2>

      <div class="accounts-table">
        <table class="all-accounts-table">
        </table>
      </div>
    </div>
  `);

  window.$getAllAccounts = $getAllAccounts;

  const addAccountToTable = function() {
    $('.all-accounts-table').empty();
    getAllAccounts()
      .then(accountsArr => {
        const $accountsTableHeader = $(`
            <tr>
              <th>Website</th>
              <th>Email/Username</th>
              <th>Password</th>
            </tr>
        `);
        $accountsTableHeader.appendTo('.all-accounts-table')
        for (const account of accountsArr) {
          const $accountRow = $(`
            <tr>
              <td>${account.website}</td>
              <td>${account.name}</td>
              <td>${account.password}</td>
            </tr>
          `);

          $accountRow.appendTo('.all-accounts-table');
        }
      })
  };

  window.addAccountToTable = addAccountToTable;
});
