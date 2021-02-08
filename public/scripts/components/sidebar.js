$(() => {

  window.sidenav = {};

  const showSidebar = function(orgId, userId) {
    if (orgId && userId) {
      // get org abbreviation for a given user
      return getUserOrgs()
        .then(orgsArr => {
          const $userLinks = $(`
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
              <div class="category-submenu hidden">
                <form id="account-type-work">
                  <button id="work-category" value="1">Work</button>
                </form>
                <form id="account-type-entertainment">
                  <button id="entertainment-category" value="2">Entertainment</button>
                </form>
                <form id="account-type-social">
                  <button id="social-category" value="3">Social</button>
                </form>
                <form id="account-type-other">
                  <button id="other-category" value="4">Other</button>
                </form>
              </div>
            </div>

            <div class="account-search">
              <input type=text name="search" placeholder="search">
            </div>
          </nav>
          `);
          for (const org of orgsArr) {
            const $orgSelect = $(`
              <option value="${org.org_id}">${org.abbreviation}</option>
            `);
            $orgSelect.appendTo('#organizations-dropdown');
          }
          return $userLinks;
        });
    } else if (orgId) {
      // get org name for an org
      let orgName;
      return getOrgInfo()
        .then(json => {
          orgName = json.org.name;
          const $orgLinks = $(`
          <nav id="sidebar_links" class="sidebar_links">
            <div class="org-options>
              <h2 class="org-name-label">Organization:</h2>
              <h3 class="org-name">${orgName}</h3>
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
              <div class="category-submenu hidden">
                <form id="account-type-work">
                  <button id="work-category" value="1">Work</button>
                </form>
                <form id="account-type-entertainment">
                  <button id="entertainment-category" value="2">Entertainment</button>
                </form>
                <form id="account-type-social">
                  <button id="social-category" value="3">Social</button>
                </form>
                <form id="account-type-other">
                  <button id="other-category" value="4">Other</button>
                </form>
              </div>
            </div>

            <div class="account-search">
              <input type=text name="search" placeholder="search">
              <button id="sidebar-search">Seach</button>
            </div>
          </nav>
          `);

          return $orgLinks;
        });
    };
  };

  sidenav.showSidebar = showSidebar;

  const detachSidebar = function() {
    $('#sidebar_links').detach();
  };

  sidenav.detachSidebar = detachSidebar;

  // org selector listener
  // make sure to change org cookie upon changing org

  // edit user listener
  $('main').on('click', '#edit-user', () => {
    views_manager.show('editUser');
  });

  // edit org listener

  // manage org listener

  // add account listener
  $('main').on('click', '#add-account', () => {
    views_manager.show('addAccount');
  });

  // generate password listener
  $('main').on('click', '#generate-pass', () => {
    views_manager.show('generatePassword');
  });

  // categories listener
  $('main').on('click', '#account-categories', () => {
    views_manager.show('allAccounts');
    $('.category-submenu').slideToggle(300);
  });

  // work listener
  $('main').on('submit', '#account-type-work', function(event) {
    views_manager.show('allAccounts');
  });

  // enterntainment listener
  $('main').on('submit', '#account-type-entertainment', function(event) {
    views_manager.show('allAccounts');
  });

  // social listener
  $('main').on('submit', '#account-type-social', function(event) {
    views_manager.show('allAccounts');
  });

  // other listener
  $('main').on('submit', '#account-type-other', function(event) {
    views_manager.show('allAccounts');
  });

  // search button listener

});
