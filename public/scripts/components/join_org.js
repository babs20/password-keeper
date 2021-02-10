$(() => {
  const $joinOrgForm = $(`
    <div class="w-10/12 h-100 mx-auto flex flex-col items-center justify-start">
        <form id="join-org-form" class="w-7/12 h-100 flex flex-col items-center justify-start mx-auto pt-5">
          <h1 class="join-org-title font-sans text-2xl font-bold w-full h-full my-5 pl-4 border-l-8 border-black">Join Another Organization</h1>

          <div class="empty-fields-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
            <h2 class="empty-fields-message text-white p-2 font-bold">
            <i class="fas fa-exclamation-triangle px-2"></i>
            Organization ID Can't Be Empty</h2>
          </div>

          <div class="org-key-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
            <h2 class="org-key-message text-white p-2 font-bold">
            <i class="fas fa-exclamation-triangle px-2"></i>
            Organization Does Not Exist</h2>
          </div>

          <div class="org-joined-error flex flex-col mb-3 w-full hidden bg-alertRed rounded-lg">
            <h2 class="org-joined-message text-white p-2 font-bold">
            <i class="fas fa-exclamation-triangle px-2"></i>
            You Are Already Apart of This Organization</h2>
          </div>

          <div class="join-org_field-wrapper flex flex-col mx-3 mb-3 w-full">
            <label for="org-key" class="label">Organization ID</label>
            <input type="text" id="org-key" name="identifier_key" placeholder="Org ID" class="input">
            <button id="join-org-button" class="mt-2 rounded p-2 bg-button w-full text-white hover:bg-hoverBlue font-bold">Join Organization</button>
          </div>
        </form>
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
