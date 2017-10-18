// Generated by CoffeeScript 2.0.1
(function() {
  var _inputStyle, calculatePixelRatio, growthRatio, imageHeight;

  exports.keyboardLayer = new Layer({
    x: 0,
    y: Screen.height,
    width: Screen.width,
    height: 432,
    html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
  });

  //screen width vs. size of image width
  growthRatio = Screen.width / 732;

  imageHeight = growthRatio * 432;

  // Extends the LayerStyle class which does the pixel ratio calculations in framer
  _inputStyle = Object.assign({}, Framer.LayerStyle, calculatePixelRatio = function(layer, value) {
    return (value * layer.context.pixelMultiplier) + "px";
  }, {
    fontSize: function(layer) {
      return calculatePixelRatio(layer, layer._properties.fontSize);
    },
    lineHeight: function(layer) {
      return layer._properties.lineHeight + "em";
    },
    padding: function(layer) {
      var padding, paddingValue, paddingValues, pixelMultiplier;
      ({pixelMultiplier} = layer.context);
      padding = [];
      paddingValue = layer._properties.padding;
      // Check if we have a single number as integer
      if (Number.isInteger(paddingValue)) {
        return calculatePixelRatio(layer, paddingValue);
      }
      // If we have multiple values they come as string (e.g. "1 2 3 4")
      paddingValues = layer._properties.padding.split(" ");
      switch (paddingValues.length) {
        case 4:
          padding.top = parseFloat(paddingValues[0]);
          padding.right = parseFloat(paddingValues[1]);
          padding.bottom = parseFloat(paddingValues[2]);
          padding.left = parseFloat(paddingValues[3]);
          break;
        case 3:
          padding.top = parseFloat(paddingValues[0]);
          padding.right = parseFloat(paddingValues[1]);
          padding.bottom = parseFloat(paddingValues[2]);
          padding.left = parseFloat(paddingValues[1]);
          break;
        case 2:
          padding.top = parseFloat(paddingValues[0]);
          padding.right = parseFloat(paddingValues[1]);
          padding.bottom = parseFloat(paddingValues[0]);
          padding.left = parseFloat(paddingValues[1]);
          break;
        default:
          padding.top = parseFloat(paddingValues[0]);
          padding.right = parseFloat(paddingValues[0]);
          padding.bottom = parseFloat(paddingValues[0]);
          padding.left = parseFloat(paddingValues[0]);
      }
      // Return as 4-value string (e.g "1px 2px 3px 4px")
      return `${padding.top * pixelMultiplier}px ${padding.right * pixelMultiplier}px ${padding.bottom * pixelMultiplier}px ${padding.left * pixelMultiplier}px`;
    }
  });

  exports.keyboardLayer.states = {
    shown: {
      y: Screen.height - imageHeight
    }
  };

  exports.keyboardLayer.states.animationOptions = {
    curve: "spring(500,50,15)"
  };

  exports.Input = (function() {
    class Input extends Layer {
      constructor(options = {}) {
        if (options.setup == null) {
          options.setup = false;
        }
        if (options.width == null) {
          options.width = Screen.width;
        }
        if (options.clip == null) {
          options.clip = false;
        }
        if (options.height == null) {
          options.height = 60;
        }
        if (options.backgroundColor == null) {
          options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
        }
        if (options.fontSize == null) {
          options.fontSize = 30;
        }
        if (options.lineHeight == null) {
          options.lineHeight = 1;
        }
        if (options.padding == null) {
          options.padding = 10;
        }
        if (options.text == null) {
          options.text = "";
        }
        if (options.placeholder == null) {
          options.placeholder = "";
        }
        if (options.virtualKeyboard == null) {
          options.virtualKeyboard = Utils.isMobile() ? false : true;
        }
        if (options.type == null) {
          options.type = "text";
        }
        if (options.goButton == null) {
          options.goButton = false;
        }
        if (options.autoCorrect == null) {
          options.autoCorrect = "on";
        }
        if (options.autoComplete == null) {
          options.autoComplete = "on";
        }
        if (options.autoCapitalize == null) {
          options.autoCapitalize = "on";
        }
        if (options.spellCheck == null) {
          options.spellCheck = "on";
        }
        if (options.autofocus == null) {
          options.autofocus = false;
        }
        if (options.textColor == null) {
          options.textColor = "#000";
        }
        if (options.fontFamily == null) {
          options.fontFamily = "-apple-system";
        }
        if (options.fontWeight == null) {
          options.fontWeight = "500";
        }
        if (options.submit == null) {
          options.submit = false;
        }
        if (options.tabIndex == null) {
          options.tabIndex = 0;
        }
        super(options);
        // Add additional properties
        this._properties.fontSize = options.fontSize;
        this._properties.lineHeight = options.lineHeight;
        this._properties.padding = options.padding;
        if (options.placeholderColor != null) {
          this.placeholderColor = options.placeholderColor;
        }
        this.input = document.createElement("input");
        this.input.id = `input-${_.now()}`;
        // Add styling to the input element
        this.input.style.width = _inputStyle["width"](this);
        this.input.style.height = _inputStyle["height"](this);
        this.input.style.fontSize = _inputStyle["fontSize"](this);
        this.input.style.lineHeight = _inputStyle["lineHeight"](this);
        this.input.style.outline = "none";
        this.input.style.border = "none";
        this.input.style.backgroundColor = options.backgroundColor;
        this.input.style.padding = _inputStyle["padding"](this);
        this.input.style.fontFamily = options.fontFamily;
        this.input.style.color = options.textColor;
        this.input.style.fontWeight = options.fontWeight;
        this.input.value = options.text;
        this.input.type = options.type;
        this.input.placeholder = options.placeholder;
        this.input.setAttribute("tabindex", options.tabindex);
        this.input.setAttribute("autocorrect", options.autoCorrect);
        this.input.setAttribute("autocomplete", options.autoComplete);
        this.input.setAttribute("autocapitalize", options.autoCapitalize);
        if (options.autofocus === true) {
          this.input.setAttribute("autofocus", true);
        }
        this.input.setAttribute("spellcheck", options.spellCheck);
        this.form = document.createElement("form");
        if ((options.goButton && !options.submit) || !options.submit) {
          this.form.action = "#";
          this.form.addEventListener("submit", function(event) {
            return event.preventDefault();
          });
        }
        this.form.appendChild(this.input);
        this._element.appendChild(this.form);
        this.backgroundColor = "transparent";
        if (this.placeholderColor) {
          this.updatePlaceholderColor(options.placeholderColor);
        }
        if (!Utils.isMobile() && options.virtualKeyboard === true) {
          this.input.addEventListener("focus", function() {
            exports.keyboardLayer.bringToFront();
            return exports.keyboardLayer.stateCycle();
          });
          this.input.addEventListener("blur", function() {
            return exports.keyboardLayer.animate("default");
          });
        }
      }

      updatePlaceholderColor(color) {
        var css;
        this.placeholderColor = color;
        if (this.pageStyle != null) {
          document.head.removeChild(this.pageStyle);
        }
        this.pageStyle = document.createElement("style");
        this.pageStyle.type = "text/css";
        css = `#${this.input.id}::-webkit-input-placeholder { color: ${this.placeholderColor}; }`;
        this.pageStyle.appendChild(document.createTextNode(css));
        return document.head.appendChild(this.pageStyle);
      }

      focus() {
        return this.input.focus();
      }

      onFocus(cb) {
        return this.input.addEventListener("focus", function() {
          return cb.apply(this);
        });
      }

      onBlur(cb) {
        return this.input.addEventListener("blur", function() {
          return cb.apply(this);
        });
      }

    };

    Input.define("style", {
      get: function() {
        return this.input.style;
      },
      set: function(value) {
        return _.extend(this.input.style, value);
      }
    });

    Input.define("value", {
      get: function() {
        return this.input.value;
      },
      set: function(value) {
        return this.input.value = value;
      }
    });

    return Input;

  })();

}).call(this);

//# sourceMappingURL=input.js.map
