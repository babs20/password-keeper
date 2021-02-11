$(() => {
  const $main = $('#main-content');
  const $homepage = $(`
  <div class="min-h-full w-full flex flex-col items-start justify-start">

      <div class="w-full flex justify-start">
        <img src="/img/homepage-img.png" alt="Photo of a Phone and Laptop" class="object-cover w-full h-84 object-center shadow-md">
      </div>

      <div class="logo flex items-center justify-around w-full my-auto px-8 md:my-12">
        <section class="h-full w-full md:w-1/2">
          <h1 class="keeper-logo font-bold text-5xl mx-8 py-4 border-black border-b-2">What is Keeper?</h1>
          <article class="">
            <p class="keeper-description px-8 py-4 text-lg">
              Keeper is a password storage system for organizations.
              Generate and easily share passwords for use on any website for all users in your organization. <br> <br>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit esse iste quia autem eaque dolore fugiat ipsum minima nulla.
              Nesciunt, ea facere aut totam natus ipsum dicta laudantium commodi suscipit. <br> <br>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit esse iste quia autem eaque dolore fugiat ipsum minima nulla.
              Nesciunt, ea facere aut totam natus ipsum dicta laudantium commodi suscipit.
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
