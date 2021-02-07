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
        <nav id="page-header_user-links" class="page-header_user-links w-screen min-h-full bg-white flex items-center justify-between border-b-2 border-gray-400">
          <div class="flex items-center justify-start">
            <span id="logo" class="font-sans text-3xl lg:text-4xl font-bold ml-10 border-r-4 border-black pr-6 cursor-pointer">Keeper</span>
            <span class="font-sans text-xl lg:text-2xl ml-6 mt-2">Remember Passwords Better</span>
          </div>
          <div class="flex items-center justify-start">
            <button class="login-button font-sans text-xl lg:text-2xl mr-6  hover:underline hover:animate-pulse">Login</button>
            <button class="register-button font-sans text-xl lg:text-2xl mr-10 hover:underline hover:animate-pulse ">Register</button>
          </div>
        </nav>
      `;
    } else {
      userLinks = `
      <nav id="page-header_user-links" class="page-header_user-links w-screen h-32 bg-white flex items-center justify-between">
          <div class="flex items-center justify-start">
            <span id="logo" class="font-sans text-5xl font-bold ml-10 cursor-pointer">Keeper</span>
            <span class="font-sans text-2xl ml-6 mt-2">Remember Passwords Better</span>
          </div>
          <div class="flex items-center justify-start">
            <button class="font-sans text-2xl mr-10 hover:underline hover:animate-pulse ">Logout</button>
          </div>
      </nav>
      `;
    }

    $pageHeader.append(userLinks);
  };

  // send get request to /api/user
  // check for userId cookie - returns with user from db
  getUserInfo()
    .then(json => {
      updateHeader(json.user);
    });

  $('header').on('click', '.login-button', (event) => {
    views_manager.show('login');
  });

  $('header').on('click', '#logo', (event) => {
    views_manager.show('homepage');
  });

  $('header.logout-button').on('click', (event) => {
    const $main = $('#main-content');
    userLogout()
      .then(() => {
        views_manager.show('homepage');
      });
  });

  $('header').on('click', '.register-button', (event) => {
    views_manager.show('signup');
  });
});
