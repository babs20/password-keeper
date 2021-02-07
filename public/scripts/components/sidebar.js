$(() => {

  window.sidebar = {};

  const showSidebar = function(orgId, userId) {
    if (orgId && userId) {
      const $userLinks = `
        <nav id="sidebar_links" class="sidebar_links">
          <div class="user-options>
            <div class="org-swap-wrapper">
              <label for="org-swap">Organization</label>
              <select name="organization" id="organizations-dropdown">
              </select>
            </div>

            <div class="edit-user-wrapper">
              <button id="edit-user"><i class="fas fa-cog"></i></button>
            </div>
          </div>

          <div class="add-account">
            <button id="add-account">Add Account</button>
          </div>

          <div class="generate-pass">
            <button id="generate-pass">Generate Password</button>
          </div>

          <div class="account-categories">
            <button id="account-categories">Categories</button>
          </div>

          <div class="account-search">
            <input type=text name="search" placeholder="search">
          </div>
        </nav>
      `;
    } else if (orgId) {
      const $orgLinks = `
        <nav id="sidebar_links" class="sidebar_links">
          <div class="org-options>
            <h2 class="org-name-label">Organization:</h2>
            <h3 class="org-name">${name}</h3>
          </div>

          <div class="edit-org-wrapper">
            <button type="button" id="edit-org"><i class="fas fa-cog"></i></button>
          </div>

          <div class="manage-org">
            <button type="button" id="manage-org">Manage Organization</button>
          </div>

          <div class="add-account">
            <button type="button" id="add-account">Add Account</button>
          </div>

          <div class="generate-pass">
            <button type="button" id="generate-pass">Generate Password</button>
          </div>

          <div class="account-categories">
            <button type="button" id="account-categories">Categories</button>
          </div>

          <div class="account-search">
            <input type=text name="search" placeholder="search">
            <button id="sidebar-search">Seach</button>
          </div>
        </nav>
      `;
    }


          // <option value="${org_id}">${abbreviation}</option>
  };

  sidebar.show = showSidebar;

  // org selector listener

  // edit user listener
  $('#edit-user').on('click', () => {
    views_manager.show('editUser');
  });

  // edit org listener

  // manage org listener

  // add account listener
  $('#add-account').on('click', () => {
    views_manager.show('addAccount');
  });

  // generate password listener

  // categories listener

  // work listener

  // enterntainment listener

  // social listener

  // other listener

  // search button listener

});
