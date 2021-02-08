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

  const addAccountToTable = function(data) {
    $('.all-accounts-table').empty();
    getAllAccounts(data)
      .then(accountsArr => {
        console.log(accountsArr);
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
              <td>
                <div class="account-password-cell">
                  <input type="password" class="account-password-field" value="${account.password}"readonly>

                  <div class="password-buttons">
                    <button type="button" class="view-password"><i class="fas fa-eye"></i></button>
                    <button type="button" class="copy-password"><i class="far fa-clipboard"></i></button>
                    <button type="button" class="edit-account"><i class="fas fa-edit"></i></button>
                  </div>
                </div>
              </td>
            </tr>
          `);

          $accountRow.appendTo('.all-accounts-table');
        }
      })
  };

  window.addAccountToTable = addAccountToTable;

  $('main').on('click', '.view-password', function(event) {
    const $passwordField = $('.account-password-field')
    if ($passwordField.attr('type') === 'password') {
      $passwordField.attr('type', 'text');
    } else {
      $passwordField.attr('type', 'password');
    }
  });
});
