(function() {
  var DarthFader, DarthFaderSet;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  DarthFaderSet = (function() {
    function DarthFaderSet() {
      this.set = [];
      $('*[class^=darth-fader]').each(__bind(function(idx, faderElem) {
        if (!faderElem.className.match(/^darth-fader-controls/)) {
          return this.set.push(new DarthFader(faderElem));
        }
      }, this));
    }
    return DarthFaderSet;
  })();
  DarthFader = (function() {
    function DarthFader(faderGroup) {
      var buttonControls, className, isFirst, _i, _len, _ref, _ref2, _ref3;
      faderGroup = $(faderGroup);
      this.elems = [];
      this.currentIdx = 0;
      isFirst = true;
      this.slideInterval = (_ref = faderGroup.data('darthfader-slide-interval')) != null ? _ref : 5000;
      this.pauseInterval = (_ref2 = faderGroup.data('darthfader-pause-interval')) != null ? _ref2 : 5000;
      buttonControls = null;
      _ref3 = faderGroup.attr('class').split(/\s+/);
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        className = _ref3[_i];
        if (className.match(/^darth-fader/)) {
          buttonControls = className.replace(/^darth-fader(.*)$/, "darth-fader-controls$1");
          buttonControls = $("." + buttonControls);
          break;
        }
      }
      faderGroup.children().each(__bind(function(idx, elem) {
        var button, faderElem, li, name, title;
        faderElem = $(elem);
        if (!isFirst) {
          faderElem.hide();
        }
        isFirst = false;
        if (buttonControls) {
          name = $(elem).attr('id');
          title = $(elem).attr('title');
          button = $("<a/>");
          if (title) {
            button.attr('title', title);
          }
          button.attr('href', "javascript:void(0);");
          li = $("<div/>").append(button);
          buttonControls.append(li);
        }
        this.elems[idx] = {
          'name': name,
          'fader': $(elem),
          'button': button
        };
        return button.click(__bind(function(e) {
          this.setByIdx(idx);
          clearInterval(this.hdl);
          this.hdl = null;
          return setTimeout(__bind(function() {
            return this.startAuto();
          }, this), this.pauseInterval);
        }, this));
      }, this));
      this.setByIdx(0);
      this.startAuto();
    }
    DarthFader.prototype.setByIdx = function(idx) {
      var next, prev, _ref, _ref2;
      prev = this.elems[this.currentIdx];
      next = this.elems[idx];
      if ((_ref = prev.button) != null) {
        _ref.removeClass('selected');
      }
      if ((_ref2 = next.button) != null) {
        _ref2.addClass('selected');
      }
      if (this.currentIdx === idx) {
        return;
      }
      this.currentIdx = idx;
      return prev.fader.fadeOut(700, function() {
        return next.fader.fadeIn(700);
      });
    };
    DarthFader.prototype.setByName = function(name) {
      var fader, idx, _len, _ref, _results;
      _ref = this.faderChildren;
      _results = [];
      for (idx = 0, _len = _ref.length; idx < _len; idx++) {
        fader = _ref[idx];
        _results.push(fader.name === name ? this.setByIdx(idx) : void 0);
      }
      return _results;
    };
    DarthFader.prototype.startAuto = function() {
      if (this.hdl) {
        return;
      }
      return this.hdl = setInterval(__bind(function() {
        if (this.currentIdx === this.elems.length - 1) {
          return this.setByIdx(0);
        } else {
          return this.setByIdx(this.currentIdx + 1);
        }
      }, this), this.slideInterval);
    };
    return DarthFader;
  })();
  $(document).ready(function() {
    return new DarthFaderSet();
  });
}).call(this);
