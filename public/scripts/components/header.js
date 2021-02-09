$(() => {
  window.header = {};

  const $main = $('#main-content');
  const $pageHeader = $('#page-header');
  let currentUser = null;
  const updateHeader = function(user) {
    currentUser = user;
    $pageHeader.find('#page-header_user-links').remove();
    let userLinks;
    if (!user) {
      userLinks = `
        <nav id="page-header_user-links" class="page-header_user-links w-screen min-h-full bg-white flex items-center justify-between">
          <div class="flex items-center justify-start">
            <span id="logo" class="font-sans text-3xl lg:text-4xl font-bold ml-10 border-r-4 border-black pr-6 cursor-pointer">Keeper</span>
            <span class="font-sans text-xl lg:text-2xl ml-6">Remember Passwords Better</span>
          </div>
          <div class="flex items-center justify-start">
            <button type="button" class="login-button font-sans text-xl lg:text-2xl mr-6  hover:underline hover:animate-pulse">Login</button>
            <button type="button" class="register-button font-sans text-xl lg:text-2xl mr-10 hover:underline hover:animate-pulse ">Register</button>
          </div>
        </nav>
      `;
    } else {
      userLinks = `
      <nav id="page-header_user-links" class="page-header_user-links w-screen min-h-full bg-white flex items-center justify-between">
        <div class="flex items-center justify-start">
          <span id="logo" class="font-sans text-3xl lg:text-4xl font-bold ml-10 border-r-4 border-black pr-6 cursor-pointer">Keeper</span>
          <span class="font-sans text-xl lg:text-2xl ml-6">Remember Passwords Better</span>
        </div>
        <div class="flex items-center justify-start">
            <button type="button" class="font-sans text-xl lg:text-2xl mr-10 hover:underline hover:animate-pulse" id="logout-button">Logout</button>
        </div>
      </nav>
      `;
    }

    $pageHeader.append(userLinks);
  };

  header.update = updateHeader;

  // send get request to /api/user
  // check for userId cookie - returns with user from db
  getUserInfo()
    .then(json => {
      updateHeader(json.user);
    });

  getOrgInfo()
    .then(json => {
      updateHeader(json.org);
    });

  $('header').on('click', '.login-button', (event) => {
    views_manager.show('login');
  });

  $('header').on('click', '#logo', (event) => {
    getUserInfo()
    .then(json => {
      if (json.user) {
        header.update(json.user);
        sidenav.showSidebar(json.user.org, json.user.id)
          .then($sidebar => {
            const $main = $('main');
            $sidebar.appendTo($main);
            views_manager.show('allAccounts');
          })
      } else {
        getOrgInfo()
          .then(json => {
            if (json.org) {
              header.update(json.org);
              sidenav.showSidebar(json.org.orgId, json.org.user_id)
                .then($sidebar => {
                  const $main = $('main');
                  $sidebar.appendTo($main);
                  views_manager.show('allAccounts');
                })
            } else {
              views_manager.show('homepage');
            }
          })
      }
    })
  });

  $('header').on('click', '#logout-button', (event) => {
    userLogout()
      .then(getUserInfo)
      .then(json => {
        updateHeader(json.user);
        views_manager.show('homepage');
        window.sidenav.detachSidebar();
      });
  });

  $('header').on('click', '.register-button', (event) => {
    views_manager.show('signup');
  });
});
