(function (doc) {

  var recorder = Recorder.create(),
      basePath = '/Recorder/sample/',
      bluePath = basePath + 'blue/',
      greenPath = basePath + 'green/',
      redPath = basePath + 'red/';

  function run() {
    recorder.replaceState(basePath);
    bindAllListeners();
  }

  function bindAllListeners() {
    $('#toGreen').bind('click', function (evt) {
      evt.preventDefault();
      toGreen();
      recorder.pushState(greenPath);
    });
    $('#toRed').bind('click', function (evt) {
      evt.preventDefault();
      toRed();
      recorder.pushState(redPath);
    });
    $('#toBlue').bind('click', function (evt) {
      evt.preventDefault();
      toBlue();
      recorder.pushState(bluePath);
    });

    recorder.addListener(basePath, toBlue);
    recorder.addListener(bluePath, toBlue);
    recorder.addListener(greenPath, toGreen);
    recorder.addListener(redPath, toRed);
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
