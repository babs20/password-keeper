$(() => {
  const $main = $('#main-content');
  const $homepage = $(`
  <div class="min-h-full w-full flex flex-col items-start justify-start">

      <div class="w-full flex justify-start">
        <img src="/img/homepage-img.png" alt="Photo of a Phone and Laptop" class="object-cover w-full h-84 object-center shadow-md">
      </div>

      <div class="logo flex items-center justify-around w-full my-12 px-8">
        <section class="h-full w-full md:w-1/2">
          <h1 class="keeper-logo font-bold text-5xl mx-8 pt-4 pb-8 border-black border-b-2 w-min whitespace-nowrap">What is Keeper?</h1>
          <article class="keeper-description">
            <p class="px-8 pb-4 pt-8 text-lg">
              <b>Keeper</b> is a password management system for organizations of any size.
              <em>Generate</em> and easily <em>share</em> passwords for use on any website for all users in your organization.
           </p>
           <p class="px-8 py-4 text-lg">
              Organizations are able to add as many members as they like to their team.
              Each member has access to all the organizations accounts using a <b>master password</b>,
              making sharing accounts across large teams a breeze and secure when changing members.
           </p>
           <p class="px-8 py-4 text-lg">
           Are you tired of using the same password for every site or you just can't think of a secure password?
           <em>No worries!</em>
           Keeper has a built in <b>password generator</b> which makes creating secure passwords <em>simple and streamlined</em>.
           </p>
          </article>
        </section>
        <div class="border border-black rounded-lg p-1 bg-gray-100 shadow-lg hidden md:flex">
          <img src="/img/homepage-img-2.png" alt="Photo of a desk with laptops" class="rounded-lg transform -translate-x-3 -translate-y-3 shadow-xl">
        </div>
      </div>

    </div>
`);

  const $footer = $(`
    <footer class="page-header w-screen bg-gray-600 py-12 border-t-2 border-gray-400 flex justify-between">

    <div class="flex items-center justify-start h-12">
      <span class="font-sans font-bold text-xl ml-6 text-white px-3 hidden md:inline">Follow Us!</span>
      <i class="fab fa-twitter-square text-white px-3 fa-2x hover:text-blue-50 ml-6 md:ml-0"></i>
      <i class="fab fa-instagram-square text-white px-3 fa-2x"></i>
      <i class="fab fa-github-square text-white px-3 fa-2x"></i>
    </div>

    <div class="flex items-center justify-end h-12">
      <span class="font-sans text-l font-bold text-white pr-2">Created By: </span>
      <span class="font-sans text-l mr-6 text-white pr-3"> Rebecca Chen and Brady Blair</span>
    </div>
    </footer>
  `);

  window.$homepage = $homepage;
  window.$footer = $footer;

  $main.append($homepage);
  $footer.insertAfter($main);
});
