import { Component, PureComponent } from 'react';
import _withoutProps from 'without-props';
import catchError from 'catch-decorator';
import UnmountSetStateError from './errors/unmount-set-state-error';

const prototype = {
  // noinspection JSMethodCanBeStatic
  /**
   * 移除对象中不相关的属性keys
   * 以下代码来自官方babel
   *
   * @param {object} obj 需要移除的对象
   * @param {Array<string>} keys 需要移除的属性
   * @returns {{}} 返回一个移除后的新对象
   */
  withoutProps(obj, keys) {
    return _withoutProps.apply(this, arguments);
  },


  /**
   * 入队回收队列
   * @public
   * @param {Function} disposalAction - 回收操作
   */
  enqueueRecycle(disposalAction) {
    this.$$recycleQueue.push(disposalAction);
  },


  /**
   * 获取组件命名空间
   * @param {string} [prefixCls]
   * @param {string} [componentCssName]
   * @return {string}
   */
  getNs(prefixCls, componentCssName) {
    if (arguments.length === 2) {
      return `${prefixCls}-${componentCssName}`;
    } else {
      const { prefixCls, componentCssName } = this.props;
      return `${prefixCls}-${componentCssName}`;
    }
  },


  /**
   * 剔除内置属性
   * @param props
   * @param extraExcludeProps
   * @return {{}}
   */
  escapeInternalProps(props, extraExcludeProps = []) {
    return this.withoutProps(props, extraExcludeProps.concat(['prefixCls', 'componentCssName']));
  },

  /**
   * 以安全的方式更新 state, 在组件 unmount 后不再进行 setState 操作
   * @param {object} nextState - 下一个状态
   * @param {boolean} [throwError] - 是否抛出异常
   */
  setSafeState(nextState, throwError = true) {
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
  componentWillUnmount() {
    this.$$isUnmount = true;
    this.$$recycleQueue.forEach(recycle => recycle());
  },

  render() {
    throw new Error('tiny-component is not intended to be used independently');
  },
};

class TinyComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.$$recycleQueue = [];
  }
}

class TinyPureComponent extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.$$recycleQueue = [];
  }
}

// noinspection JSValidateTypes
Object.assign(TinyComponent.prototype, prototype);
// noinspection JSValidateTypes
Object.assign(TinyPureComponent.prototype, prototype);

export { TinyComponent, TinyPureComponent };
