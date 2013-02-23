(function (name, global, definition) {
  if (typeof require !== 'undefined' && typeof require.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('Recorder', window, function () {
  var arrayProto = Array.prototype
    , slice = arrayProto.slice
    , local = {}
    ;

  function Recorder () {
    this.handlers = {};
    local.observeHistoryState(this.handlers);
  }

  Recorder.create = function () {
    var recorder = createObject(Recorder.prototype)
      , args = slice.call(arguments);

    Recorder.apply(recorder, args);
    return recorder;
  };

  Recorder.prototype.addListener = function (path, handler) {
    this.handlers[path] = handler;

    return this;
  };

  Recorder.prototype.pushState = function (path, supportHandler, unsupportHandler) {
    if (isSupport()) {
      supportHandler();
      history.pushState(path, null, path);
    } else {
      unsupportHandler ? unsupportHandler() : (location.href = path);
    }

    return this;
  };

  local.observeHistoryState = function (handlers) {
    if (isSupport()) {
      this.observePopState(handlers);
    }
  };

  local.observePopState = function (handlers) {
    window.addEventListener('popstate', function (evt) {
      var state = evt.state
        , handler = (state ? handlers[state] : handlers[location.pathname])
        ;

      if (handler) {
        handler();
      }
    });
  }

  function createObject(obj) {
    if (Object.create) {
      return Object.create(obj);
    }

    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = obj;
    return new F();
  }

  function isSupport() {
    return !(window.history && window.history.pushState);
  }

  return Recorder;
});
