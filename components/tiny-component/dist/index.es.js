import { Component, PureComponent } from 'react';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withoutProps;

/**
 * remove unused props, same as es6 object destructing
 *
 * @param obj {object} - native object
 * @param keys {string[]} - list of object members that will be removed
 *
 * @example
 *  const { className, prefixCls, ...restProps } = withoutProps(this.props, [
 *  'isPlaying',
 *  'renderPlay',
 *  'renderPause',
 *  'rotationInPlay',
 *  'rotationInPause'
 *  ]);
 *
 * @return {object}
 */
function withoutProps(obj, keys) {
  var target = {};

  for (var i in obj) {
    // noinspection JSUnfilteredForInLoop
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}
});

var _withoutProps = unwrapExports(lib);

var dist = createCommonjsModule(function (module, exports) {
/**
 * MIT License
 *
 * Copyright (c) 2018 Enkot
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (global, factory) {
    module.exports = factory();
})(commonjsGlobal, function () {

    function handleError(ctx, errorClass, handler, error) {
        // check if error is instance of passed error class
        if (typeof handler === 'function' && error instanceof errorClass) {
            // run handler with error object 
            // and class context as second argument
            handler.call(null, error, ctx);
        } else {
            // throw error further,
            // next decorator in chain can catch it
            throw error;
        }
    }
    // decorator factory function
    var index = (errorClass, handler) => {
        return (target, propertyKey, descriptor) => {
            // save a reference to the original method
            const originalMethod = descriptor.value;
            // rewrite original method with custom wrapper
            descriptor.value = function (...args) {
                try {
                    const result = originalMethod.apply(this, args);
                    // check if method is asynchronous
                    if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
                        // return promise
                        return result.catch(error => {
                            handleError(this, errorClass, handler, error);
                        });
                    }
                    // return actual result
                    return result;
                } catch (error) {
                    handleError(this, errorClass, handler, error);
                }
            };
            return descriptor;
        };
    };

    return index;
});
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * 创建错误 class 帮助方法
 * @ref https://medium.com/@xpl/javascript-deriving-from-error-properly-8d2f8f315801
 * @param {string} errorName - 错误名
 * @param {number} errorCode - 错误码
 * @param {string} [defaultErrorMessage] - 默认错误信息
 * @return {{name, new(...[*]): CustomClass, constructor: *, __proto__, prototype: CustomClass}}
 */
function createErrorClass(errorName, errorCode, defaultErrorMessage) {
  return function (_window$Error) {
    inherits(CustomClass, _window$Error);

    function CustomClass() {
      var _ref;

      classCallCheck(this, CustomClass);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = CustomClass.__proto__ || Object.getPrototypeOf(CustomClass)).call.apply(_ref, [this].concat(args)));

      if (!_this.message) {
        defaultErrorMessage && (_this.message = defaultErrorMessage);
      }
      _this.constructor = CustomClass;
      // noinspection JSUnusedGlobalSymbols
      _this.__proto__ = CustomClass.prototype;
      _this.name = errorName;
      _this.code = errorCode;
      // Error.captureStackTrace(this, CustomClass);
      return _this;
    }

    return CustomClass;
  }(window.Error);
}

/**
 * react unmount error
 * @type {{name, new(...[*]): CustomClass, constructor: *, __proto__, prototype: CustomClass}}
 */
var UnmountSetStateError = createErrorClass('UnmountSetStateError', undefined, 'component has been mounted. setState is not allowed afterwards');

var prototype = {
  // noinspection JSMethodCanBeStatic
  /**
   * 移除对象中不相关的属性keys
   * 以下代码来自官方babel
   *
   * @param {object} obj 需要移除的对象
   * @param {Array<string>} keys 需要移除的属性
   * @returns {{}} 返回一个移除后的新对象
   */
  withoutProps: function withoutProps(obj, keys) {
    return _withoutProps.apply(this, arguments);
  },


  /**
   * 入队回收队列
   * @public
   * @param {Function} disposalAction - 回收操作
   */
  enqueueRecycle: function enqueueRecycle(disposalAction) {
    this.$$recycleQueue.push(disposalAction);
  },


  /**
   * 获取组件命名空间
   * @param {string} [prefixCls]
   * @param {string} [componentCssName]
   * @return {string}
   */
  getNs: function getNs(prefixCls, componentCssName) {
    if (arguments.length === 2) {
      return prefixCls + '-' + componentCssName;
    } else {
      var _props = this.props,
          _prefixCls = _props.prefixCls,
          _componentCssName = _props.componentCssName;

      return _prefixCls + '-' + _componentCssName;
    }
  },


  /**
   * 剔除内置属性
   * @param props
   * @param extraExcludeProps
   * @return {{}}
   */
  escapeInternalProps: function escapeInternalProps(props) {
    var extraExcludeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return this.withoutProps(props, extraExcludeProps.concat(['prefixCls', 'componentCssName']));
  },


  /**
   * 以安全的方式更新 state, 在组件 unmount 后不再进行 setState 操作
   * @param {object} nextState - 下一个状态
   * @param {boolean} [throwError] - 是否抛出异常
   */
  setSafeState: function setSafeState(nextState) {

    if (!this.$$isUnmount) {
      this.setState(nextState);
    } else {
      throw new UnmountSetStateError();
    }
  },


  /**
   * react 生命周期, 使用这个函数进行相关回收, 防止内存泄漏
   * @public
   */
  componentWillUnmount: function componentWillUnmount() {
    this.$$isUnmount = true;
    this.$$recycleQueue.forEach(function (recycle) {
      return recycle();
    });
  },
  render: function render() {
    throw new Error('tiny-component is not intended to be used independently');
  }
};

var TinyComponent = function (_Component) {
  inherits(TinyComponent, _Component);

  function TinyComponent(props, context) {
    classCallCheck(this, TinyComponent);

    var _this = possibleConstructorReturn(this, (TinyComponent.__proto__ || Object.getPrototypeOf(TinyComponent)).call(this, props, context));

    _this.$$recycleQueue = [];
    return _this;
  }

  return TinyComponent;
}(Component);

var TinyPureComponent = function (_PureComponent) {
  inherits(TinyPureComponent, _PureComponent);

  function TinyPureComponent(props, context) {
    classCallCheck(this, TinyPureComponent);

    var _this2 = possibleConstructorReturn(this, (TinyPureComponent.__proto__ || Object.getPrototypeOf(TinyPureComponent)).call(this, props, context));

    _this2.$$recycleQueue = [];
    return _this2;
  }

  return TinyPureComponent;
}(PureComponent);

// noinspection JSValidateTypes


TinyComponent.prototype = prototype;
// noinspection JSValidateTypes
TinyPureComponent.prototype = prototype;

export { TinyComponent, TinyPureComponent, dist as catchError };
//# sourceMappingURL=index.es.js.map
