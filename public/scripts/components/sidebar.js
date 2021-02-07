$(() => {

  window.sidebar = {};

  const $sidebar = $('#sidebar');
  let currentOrg = null;
  const showSidebar = function(orgId, userId) {
    let orgLinks = `
      <nav id="sidebar_org-links" class="sidebar_org-links">
        <div class="user-options>
          <div class="org-swap-wrapper">
            <label for="org-swap">Organization</label>
            <select name="organization">
              <option value="
          </div>

          <div class="edit-user-wrapper">
            <button id="edit-user"><i class="fas fa-cog"></i></button>
          </div>
        </div>
      `;

    if (orgId && userId) {
      orgLinks += `
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
            <input type=text name="search" placeholder="search"></input>
        </nav>
      `;
    } else if (orgId) {
      orgLinks +=
    }
  }

});
