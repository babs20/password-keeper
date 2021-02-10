$(() => {
  const $joinOrgForm = $(`
    <div class="w-10/12 mx-auto h-full flex justify-center">
      <div class="w-10/12 h-full flex flex-col items-center justify-center">
        <form id="join-org-form">
          <h2 class="join-org-title">Join Another Organization</h2>

          <div class="empty-fields-error hidden">
            <h2 class="empty-fields-message">Organization Id Cannot Be Empty</h2>
          </div>

          <div class="org-key-error hidden">
            <h2 class="org-key-message">Organization Does Not Exist</h2>
          </div>

          <div class="org-joined-error hidden">
            <h2 class="org-joined-message">You Are Already Apart of This Organization</h2>
          </div>

          <div class="join-org_field-wrapper>
            <label for="org-key" class="label">Organization ID</label>
            <input type="text" id="org-key" name="identifier_key" placeholder="Org ID" class="input">
            <button id="join-org-button" class="button font-bold">Join Organization</button>
          </div>
        </form>
      </div>
    </div>
  `);

  window.$joinOrgForm = $joinOrgForm;

  $('main').on('submit', '#join-org-form', function(event) {
    event.preventDefault();

    if ($('#org-key').val().length < 1) {
      $('.org-key-error').slideUp(10);
      $('.org-joined-error').slideUp(10);
      $('.empty-fields-error').slideDown(150);
      return;
    }

    const data = $(this).serialize();
    joinOrg(data)
      .then(json => {
        if (json.orgKeyErr) {
          $('.empty-fields-error').slideUp(10);
          $('.org-joined-error').slideUp(10);
          $('.org-key-error').slideDown(150);
        } else if (json.orgJoinedErr) {
          $('.org-key-error').slideUp(10);
          $('.empty-fields-error').slideUp(10);
          $('.org-joined-error').slideDown(150);
        } else {
          $('.org-key-error').slideUp(10);
          $('.empty-fields-error').slideUp(10);
          $('.org-joined-error').slideUp(10);
          $('#org-key').val('');
          views_manager.show('allAccounts');
          sidenav.detachSidebar();
          sidenav.showSidebar(json.org_id, json.user_id)
            .then($sidebar => {
              const $main = $('main');
              $sidebar.appendTo($main);
              $('#organizations-dropdown').val(json.org_id);
              views_manager.show('allAccounts');
            })
        }
      });
  });
});
