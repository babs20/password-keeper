$(() => {
  const $main = $('#main-content');
  const $homepage = $(`
  <div class="h-100 w-1/2 flex flex-col items-center justify-start mt-20 mx-auto">
  <div class="logo mb-8 pb-8 border-b-2 border-black w-full flex items-center justify-center">
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-14 h-14 mr-4"><style type="text/css">
	.st0{display:none;enable-background:new    ;}
	.st1{font-family:&#39;HelveticaNeue-BoldOutline&#39;;}
	.st2{font-size:5px;}
  </style><title>  05</title><path d="M77.4 14.6L40.6 51.4c-8.4-6.1-20.1-4.2-26.2 4.2s-4.2 20.1 4.2 26.2 20.1 4.2 26.2-4.2c4.7-6.6 4.7-15.4 0-22L61 39.6l10.5 10.5 17.6-17.6L78.6 21.9l3.1-3.1L77.4 14.6zM38.7 75.6c-5 5-13.1 5-18.1 0s-5-13.1 0-18.1c5-5 13.1-5 18.1 0C43.7 62.6 43.7 70.7 38.7 75.6L38.7 75.6zM80.6 32.4l-9.1 9.1 -6.3-6.3 9.1-9.1L80.6 32.4z"/><text transform="matrix(1 0 0 1 0 102.5226)" class="st0 st1 st2">  Created by Trendy</text><text transform="matrix(1 0 0 1 0 107.5226)" class="st0 st1 st2">  from the Noun Project</text>
  </svg>
    <h1 class="keeper-logo font-bold text-4xl mr-4">Keeper</h1>
  </div>

  <h3 class="keeper-description">Keeper is a password storage system for organizations.<br>Generate and easily share passwords for use on any website<br>for all users in your organization.</h3>
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
