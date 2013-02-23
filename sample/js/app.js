(function (doc) {

  function run() {
    bindAllListeners();
  }

  function bindAllListeners() {
    $('#toGreen').bind('click', function (evt) {
      evt.preventDefault();
      toGreen();
    });
    $('#toRed').bind('click', function (evt) {
      evt.preventDefault();
      toRed();
    });
    $('#toBlue').bind('click', function (evt) {
      evt.preventDefault();
      toBlue();
    });
  }

  function toGreen() {
    $('#blue, #red').addClass('is-hide');
    $('#green').removeClass('is-hide');
  }

  function toRed() {
    $('#blue, #green').addClass('is-hide');
    $('#red').removeClass('is-hide');
  }

  function toBlue() {
    $('#red, #green').addClass('is-hide');
    $('#blue').removeClass('is-hide');
  }

  $(doc).ready(function () {
    run();
  });
}(document));
