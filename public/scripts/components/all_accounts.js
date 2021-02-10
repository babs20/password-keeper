$(() => {

  const $getAllAccounts = $(`
  <div class="w-10/12 mx-auto h-full flex justify-center">
    <div class="all-accounts mx-5 mt-10 w-11/12 flex flex-col items-center pb-8">
      <h1 class="accounts-title font-bold shadow-md rounded border-l-8 p-2 my-3 bg-white text-black text-lg border-gray-400 w-min self-start whitespace-nowrap">Your Organization's Accounts</h1>
      <div id="no-accounts-container" class="w-full"></div>
        <div class="accounts-table w-full overflow-y-auto border-b-2 border-t-2 border-gray-400 relative" id="accounts-table">
          <table class="all-accounts-table table-auto p-2 border-collapse border-r-2 border-l-2 border-gray-400 w-full"></table>
        </div>
    </div>
  </div>
  `);

  window.$getAllAccounts = $getAllAccounts;

  const addAccountToTable = function(data) {
    $('.all-accounts-table').empty();
    $('#no-accounts-container').empty();
    getAllAccounts(data)
      .then(accountsArr => {
        if (accountsArr.noCipherErr) {
          const $noCipherError = $(`
            <div class="no-cipher-error flex flex mb-3 rounded-lg items-center">
              <h4 class="no-cipher-error-message font-bold text-base">
                Please provide your organization's master key.
              </h4>
              <h4 class="org-name">Organization: ${accountsArr.org}</h4>

              <div class="blank-field-error flex flex mb-3 bg-alertRed rounded-lg items-center hidden">
                <h4 class="blank-error-message text-white p-2 font-bold text-base">
                  Master Password Cannot Be Empty
                </h4>
              </div>

              <div class="master-password-error flex flex mb-3 bg-alertRed rounded-lg items-center hidden">
                <h4 class="master-password-error-message text-white p-2 font-bold text-base">
                  Incorrect Master Password
                </h4>
              </div>

              <form id="master-password-form">
                <div class="master-password_field-wrapper">
                  <label for="master_password">Master Password</label>
                  <input type="password" name="master_password" placeholder="Master Password" id="master-password" class="input">
                </div>

                <div class="master-password_field-wrapper">
                  <button class="master-password button">Submit</button>
                </div>
              </form>
            </div>
          `);

          $noCipherError.appendTo('#no-accounts-container');
        } else {
            const $emptyAccountsTable = $(`
            <div class="no-accounts-alert flex flex mb-3 bg-alertRed rounded-lg items-center">
            <?xml version="1.0" encoding="utf-8"?>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 100 100.1" style="enable-background:new 0 0 100 100.1;" xml:space="preserve" class="w-8 h-8 ml-4 stroke-2 fill-current text-white">
            <path d="M74.8,41.5V29.4c0-4.1-3.4-7.5-7.5-7.5H52.3l-8-7H13.1c-4.1,0-7.5,3.4-7.5,7.5v38.2c0,4.1,3.4,7.5,7.5,7.5H51
              c2.2,9.8,10.9,17.2,21.4,17.2c12.1,0,21.9-9.8,21.9-21.9C94.4,52,85.8,42.7,74.8,41.5z M50.5,63H13.1c-1.4,0-2.5-1.1-2.5-2.5V22.4
              c0-1.4,1.1-2.5,2.5-2.5h29.2l8,7h16.9c1.4,0,2.5,1.1,2.5,2.5v12.2C59,42.8,50.6,51.9,50.5,63z M72.4,80.2c-9.3,0-16.9-7.6-16.9-16.9
              s7.6-16.9,16.9-16.9S89.4,54,89.4,63.3S81.8,80.2,72.4,80.2z M72.3,51.2c-1.4,0-2.5,1.1-2.5,2.5V64c0,1.4,1.1,2.5,2.5,2.5
              s2.5-1.1,2.5-2.5V53.7C74.8,52.3,73.7,51.2,72.3,51.2z M72.3,69c-1.4,0-2.5,1.1-2.5,2.5v0.2c0,1.4,1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5
              v-0.2C74.8,70.1,73.7,69,72.3,69z"/>
            </svg>
            <h4 class="no-accounts-alert-message text-white p-2 font-bold text-base">
              No Accounts to Display.
              </h4>
            </div>
          `);
          if (accountsArr.length < 1) {
            $('#accounts-table').addClass('hidden');
            $emptyAccountsTable.appendTo('#no-accounts-container');
          } else {
            $('#accounts-table').removeClass('hidden');
            const $accountsTableHeader = $(`
            <thead class="border-r-2 border-l-2 border-gray-400">
                <tr class="border-r-2 border-l-2 border-gray-400 py-2 bg-button text-white">
                  <th class="p-2 border-r-2 border-l-2 border-gray-400 font-black text-sm">Website</th>
                  <th class="p-2 border-r-2 border-l-2 border-gray-400 font-black text-sm hidden md:table-cell">Email / Username</th>
                  <th class="p-2 border-r-2 border-l-2 border-gray-400 font-black text-sm">Password</th>
                </tr>
            </thead>
            <tbody id="all-accounts-body" class="bg-white"></tbody>
            `);
            $accountsTableHeader.appendTo('.all-accounts-table');
            for (const account of accountsArr) {
              const $accountRow = $(`
            <tr class="border-t border-gray-400 p-2">
                <td class="p-2 border-r border-l border-gray-400 font-semibold text-sm w-1/2"><a href="${account.website}" target="_blank">${account.website}</a></td>
                <td class="p-2 border-r border-l border-gray-400 font-semibold text-sm w-1/2 hidden md:table-cell">${account.name}</td>
                <td class="p-2 border-r border-l border-gray-400 font-semibold text-sm w-min">
                  <div class="account-password-cell flex justify-start w-min">
                    <input type="password"
                    class="account-password-field text-sm text-black font-bold border-2 rounded border-gray-400 p-1 focus:outline-none focus:ring-1 focus:border-button w-max pr-24"
                    value="${account.password}" readonly>

                    <div class="password-buttons flex justify-between w-min ml-1 -ml-24 mr-1">
                      <button type="button"
                      class="view-password flex justify-center items-center hover:opacity-100 opacity-50"><i title="Show or Hide Password"
                        class="fas fa-eye px-2"></i></button>
                      <button type="button"
                      class="copy-password flex justify-center items-center hover:opacity-100 opacity-50"><i title="Copy Password"
                        class="far fa-clipboard px-2"></i></button>
                      <form
                      class="button-to-edit-account flex justify-center items-center hover:opacity-100 opacity-50">
                      <input type="number" class="edit-account-id hidden" name="id" value="${account.id}">
                        <button
                        class="edit-account flex justify-center items-center"><i title="Edit Account"
                        class="fas fa-edit px-2"></i></button>
                    </form>
                  </div>
                </div>
              </td>
            </tr>
              `);

              $accountRow.appendTo('#all-accounts-body');
            }
          }
        }
      });
  };

  window.addAccountToTable = addAccountToTable;

  $('main').on('submit', '#master-password-form', function(event) {
    event.preventDefault();

    const $masterPass = $('#master-password').val().length;
    if ($masterPass < 1) {
      $('.master-password-error').slideUp(10);
      $('.blank-field-error').slideDown(150);
      return;
    }

    const data = $(this).serialize();
    authenticateUser(data)
      .then(json => {
        if (json.masterPassErr) {
          $('.blank-field-error').slideUp(10);
          $('.master-password-error').slideDown(150);
        } else {
          $('.blank-field-error').slideUp(10);
          $('.master-password-error').slideUp(10);
          views_manager.show('allAccounts');
        }
      })

  })

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
