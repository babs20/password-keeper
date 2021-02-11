$(() => {

  window.sidenav = {};

  const showSidebar = function(orgId, userId) {
    if (orgId && userId) {
      // get org abbreviation for a given user
      return getUserOrgs()
        .then(orgsArr => {
          let userOrgs = '';
          for (const org of orgsArr) {
            const $orgSelect = `
              <option name="org_id" value="${org.org_id}">${org.abbreviation}</option>
            `;
            userOrgs += $orgSelect;
          }

          let sidebar1 = `
            <nav id="sidebar_links"
            class="sidebar_links sm:w-1/5 flex flex-col justify-start border-r-2 border-gray-400 bg-button text-white divide-y divide-gray-400">
            <div class="user-options py-4 flex items-center justify-between px-4 h-100">
              <div class="org-swap-wrapper flex flex-col w-3/4 ">
                <label for="org-swap" class="pb-2 font-bold text-xl">Organization</label>
                <select name="organization" id="organizations-dropdown"
                  class="font-sans mr-4 w-100 rounded border-gray-400 border outline-none focus:outline-none text-center bg-white font-semibold text-md text-black focus:text-black">
            `;
          sidebar1 += userOrgs;
          sidebar1 += `
                </select>
              </div>

              <div class="edit-user-wrapper flex flex-col h-full justify-end ml-4 w-1/4">
                <button id="edit-user" class="pb-2">
                <i class="fas fa-cog hover:scale-125 animate-300 text-center text-lg" title="Edit User Information"></i>
                </button>
                <button id="join-org">
                  <i class="fas fa-plus-square text-center text-lg animate-300 hover:scale-125" title="Join New Organization"></i>
                </button>
              </div>
            </div>

            <div class="add-account py-4 px-4 hover:bg-white hover:text-black cursor-pointer flex justify-start items-center">
              <div class="sm:hidden lg:inline">
                <i class="fas fa-folder-plus mr-3 text-xl md:hidden lg:inline"></i>
              </div>
              <button id="add-account" class="font-bold text-left text-xl">
                Add Account</button>
            </div>

            <div class="generate-pass py-4 px-4 hover:bg-white hover:text-black cursor-pointer flex justify-start items-center">
              <div class="sm:hidden lg:inline">
                <i class="fas fa-random mr-3 text-xl md:hidden lg:inline"></i>
              </div>
              <button id="generate-pass" class="font-bold text-left text-xl">
                Generate Password</button>
            </div>

            <div class="account-categories hover:bg-white hover:text-black cursor-pointer flex flex-col justify-start items-start">
              <div id="account-categories-button" class="px-4 py-4 w-full">
                <div class="sm:hidden lg:inline">
                  <i class="fas fa-layer-group mr-2 text-xl hidden"></i>
                </div>
                <button id="account-categories" class="font-bold text-left text-xl">
                  Categories</button>
              </div>

              <div class="category-submenu hidden flex flex-col pb-2 justify-center items-start">
                <form id="account-type-work" class="my-1 mx-8 hover:bg-button hover:text-white rounded">
                  <input id="work" class="hidden" name="account_type_id" value="1">
                  <button id="work-category" class="text-lg font-semibold w-full text-left px-3 py-2">Work</button>
                </form>
                <form id="account-type-entertainment" class="my-1 mx-8 hover:bg-button hover:text-white rounded">
                  <input id="entertainment" class="hidden" name="account_type_id" value="2">
                  <button id="entertainment-category" class="text-lg font-semibold w-full text-left px-3 py-2">Entertainment</button>
                </form>
                <form id="account-type-social" class=" my-1 mx-8 hover:bg-button hover:text-white rounded">
                  <input id="social" class="hidden" name="account_type_id" value="3">
                  <button id="social-category" class="text-lg font-semibold w-full text-left px-3 py-2">Social</button>
                </form>
                <form id="account-type-other" class="my-1 mx-8 hover:bg-button hover:text-white rounded">
                  <input id="other" class="hidden" name="account_type_id" value="4">
                  <button id="other-category" class="text-lg font-semibold w-full text-left px-3 py-2">Other</button>
                </form>
              </div>
            </div>

            <div class="account-search py-4 px-4 w-auto flex items-center">
              <input type=text name="website" placeholder="Search" size="12" id="account-search-bar"
              class="text-black font-bold border-2 rounded border-gray-400 p-1 focus:outline-none focus:ring-1 focus:border-button w-full px-2">
            </div>
          </nav>
          `;
          const $userLinks = $(sidebar1);
          return $userLinks;
        });
    } else if (orgId) {
      // get org name for an org
      let orgName;
      return getOrgInfo()
        .then(json => {
          orgName = json.org.name;
          const $orgLinks = $(`
          <nav id="sidebar_links"
          class="sidebar_links flex flex-col justify-start border-r-2 border-gray-400 bg-button text-white divide-y divide-gray-400 sm:w-1/5">
          <div class="org-options py-4 flex items-center justify-between px-4 h-100">
            <div class="org-options flex flex-col w-3/4 ">
              <h1 class="org-name-label font-bold text-xl">Organization:</h1>
              <h3 class="sidebar-org-name font-bold rounded border-l-8 p-1 pl-2 mt-2 bg-white text-black border-gray-400 break-words">${orgName}</h3>
            </div>

            <div class="edit-org-wrapper h-full w-1/4 flex justify-end">
              <button id="edit-org" class="pr-2">
                <i class="fas fa-cog hover:scale-125 animate-300 text-lg" title="Edit Organization Information"></i>
              </button>
            </div>
          </div>

          <div class="manage-org  py-4 px-4 hover:bg-white hover:text-black cursor-pointer flex justify-start items-center">
            <div class="sm:hidden lg:inline">
              <i class="fas fa-tasks mr-3 text-xl md:hidden lg:inline"></i>
            </div>
            <button type="button" id="manage-org" class="font-bold text-left text-xl">Manage Organization</button>
          </div>

          <div class="add-account py-4 px-4 hover:bg-white hover:text-black cursor-pointer flex justify-start items-center">
            <div class="sm:hidden lg:inline">
              <i class="fas fa-folder-plus mr-3 text-xl md:hidden lg:inline"></i>
            </div>
            <button id="add-account" class="font-bold text-left text-xl">
              Add Account</button>
          </div>

          <div
            class="generate-pass py-4 px-4 hover:bg-white hover:text-black cursor-pointer flex justify-start items-center">
            <div class="sm:hidden lg:inline">
              <i class="fas fa-random mr-3 text-xl md:hidden lg:inline"></i>
            </div>
            <button id="generate-pass" class="font-bold text-left text-xl">
              Generate Password</button>
          </div>

          <div
            class="account-categories hover:bg-white hover:text-black cursor-pointer flex flex-col justify-start items-start">
            <div id="account-categories-button" class="px-4 py-4 w-full">
              <div class="sm:hidden lg:inline">
                <i class="fas fa-layer-group mr-2 text-xl hidden"></i>
              </div>
              <button id="account-categories" class="font-bold text-left text-xl">
                Categories</button>
            </div>

            <div class="category-submenu hidden flex flex-col pb-2 justify-center items-start">
              <form id="account-type-work" class="my-1 mx-8 hover:bg-button hover:text-white rounded">
                <input id="work" class="hidden" name="account_type_id" value="1">
                <button id="work-category" class="text-lg font-semibold w-full text-left px-3 py-2">Work</button>
              </form>
              <form id="account-type-entertainment" class="my-1 mx-8 hover:bg-button hover:text-white rounded">
                <input id="entertainment" class="hidden" name="account_type_id" value="2">
                <button id="entertainment-category"
                  class="text-lg font-semibold w-full text-left px-3 py-2">Entertainment</button>
              </form>
              <form id="account-type-social" class="my-1 mx-8 hover:bg-button hover:text-white rounded">
                <input id="social" class="hidden" name="account_type_id" value="3">
                <button id="social-category" class="text-lg font-semibold w-full text-left px-3 py-2">Social</button>
              </form>
              <form id="account-type-other" class="my-1 mx-8 hover:bg-button hover:text-white rounded">
                <input id="other" class="hidden" name="account_type_id" value="4">
                <button id="other-category" class="text-lg font-semibold w-full text-left px-3 py-2">Other</button>
              </form>
            </div>
          </div>

          <div class="account-search py-4 px-4 w-auto flex items-center">
            <input type=text name="website" placeholder="Search" size="12" id="account-search-bar"
              class="text-black font-bold border-2 rounded border-gray-400 p-1 focus:outline-none focus:ring-1 focus:border-button w-full px-2">
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
  $('main').on('change', '#organizations-dropdown', function(event) {
    const data = $(this).serialize();
    views_manager.show();
    getAllAccounts(data)
      .then(() => {
        addAccountToTable();
      })
  });

  // edit user listener
  $('main').on('click', '#edit-user', () => {
    views_manager.show('editUser');
  });

  // edit org listener
  $('main').on('click', '#edit-org', () => {
    views_manager.show('editOrg');
  });

  // join new organization listener
  $('main').on('click', '#join-org', () => {
    views_manager.show('joinOrg');
  });

  // manage org listener
  $('main').on('click', '#manage-org', () => {
    views_manager.show('manageOrg');
  });

  // add account listener
  $('main').on('click', '.add-account', () => {
    authenticateUser()
      .then(json => {
        if (json.authenticated) {
          views_manager.show('addAccount');
        } else {
          views_manager.show('allAccounts');
        }
      })
  });

  // generate password listener
  $('main').on('click', '.generate-pass', () => {
    views_manager.show('generatePassword');
  });

  // categories listener
  $('main').on('click', '#account-categories-button', () => {
    views_manager.show('allAccounts');
    $('.category-submenu').slideToggle(300);
  });

  // work listener
  $('main').on('submit', '#account-type-work', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    views_manager.show();
    addAccountToTable(data);
  });

  // enterntainment listener
  $('main').on('submit', '#account-type-entertainment', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    views_manager.show();
    addAccountToTable(data);
  });

  // social listener
  $('main').on('submit', '#account-type-social', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    views_manager.show();
    addAccountToTable(data);
  });

  // other listener
  $('main').on('submit', '#account-type-other', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    views_manager.show();
    addAccountToTable(data);
  });

  // search bar listener
  $('main').on('keydown', '#account-search-bar', function(event) {
    if (event.keyCode === 13) {
      const data = $(this).serialize();
      views_manager.show();
      addAccountToTable(data);
      $('#account-search-bar').val('');
    }
  })

});
