'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _deprecateObjectProperties = require('../deprecateObjectProperties');

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _shouldWarn = require('./shouldWarn');

var _shouldWarn2 = _interopRequireDefault(_shouldWarn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe('Router', function () {
  var Parent = function (_Component) {
    _inherits(Parent, _Component);

    function Parent() {
      _classCallCheck(this, Parent);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Parent.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        null,
        'parent ',
        this.props.children
      );
    };

    return Parent;
  }(_react.Component);

  var Child = function (_Component2) {
    _inherits(Child, _Component2);

    function Child() {
      _classCallCheck(this, Child);

      return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
    }

    Child.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        null,
        'child'
      );
    };

    return Child;
  }(_react.Component);

  var node = void 0;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  it('renders routes', function (done) {
    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: (0, _createMemoryHistory2.default)('/') },
      _react2.default.createElement(_Route2.default, { path: '/', component: Parent })
    ), node, function () {
      (0, _expect2.default)(node.textContent).toEqual('parent ');
      done();
    });
  });

  it('renders child routes when the parent does not have a path', function (done) {
    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: (0, _createMemoryHistory2.default)('/') },
      _react2.default.createElement(
        _Route2.default,
        { component: Parent },
        _react2.default.createElement(
          _Route2.default,
          { component: Parent },
          _react2.default.createElement(_Route2.default, { path: '/', component: Child })
        )
      )
    ), node, function () {
      (0, _expect2.default)(node.textContent).toEqual('parent parent child');
      done();
    });
  });

  it('renders nested children correctly', function (done) {
    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: (0, _createMemoryHistory2.default)('/hello') },
      _react2.default.createElement(
        _Route2.default,
        { component: Parent },
        _react2.default.createElement(_Route2.default, { path: 'hello', component: Child })
      )
    ), node, function () {
      (0, _expect2.default)(node.textContent).toMatch(/parent/);
      (0, _expect2.default)(node.textContent).toMatch(/child/);
      done();
    });
  });

  it("renders the child's component when it has no component", function (done) {
    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: (0, _createMemoryHistory2.default)('/hello') },
      _react2.default.createElement(
        _Route2.default,
        null,
        _react2.default.createElement(_Route2.default, { path: 'hello', component: Child })
      )
    ), node, function () {
      (0, _expect2.default)(node.textContent).toMatch(/child/);
      done();
    });
  });

  it('renders with a custom "createElement" prop', function (done) {
    var Wrapper = function (_Component3) {
      _inherits(Wrapper, _Component3);

      function Wrapper() {
        _classCallCheck(this, Wrapper);

        return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
      }

      Wrapper.prototype.render = function render() {
        return _react2.default.createElement(this.props.component, { fromWrapper: 'wrapped' });
      };

      return Wrapper;
    }(_react.Component);

    var Child = function (_Component4) {
      _inherits(Child, _Component4);

      function Child() {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, _Component4.apply(this, arguments));
      }

      Child.prototype.render = function render() {
        return _react2.default.createElement(
          'div',
          null,
          this.props.fromWrapper
        );
      };

      return Child;
    }(_react.Component);

    (0, _reactDom.render)(_react2.default.createElement(
      _Router2.default,
      { history: (0, _createMemoryHistory2.default)('/'), createElement: function createElement(x) {
          return _react2.default.createElement(Wrapper, { component: x });
        } },
      _react2.default.createElement(_Route2.default, { path: '/', component: Child })
    ), node, function () {
      (0, _expect2.default)(node.textContent).toEqual('wrapped');
      done();
    });
  });

  describe('with named components', function () {
    var Parent = function (_Component5) {
      _inherits(Parent, _Component5);

      function Parent() {
        _classCallCheck(this, Parent);

        return _possibleConstructorReturn(this, _Component5.apply(this, arguments));
      }

      Parent.prototype.render = function render() {
        return _react2.default.createElement(
          'div',
          null,
          this.props.sidebar,
          '-',
          this.props.content
        );
      };

      return Parent;
    }(_react.Component);

    var Sidebar = function (_Component6) {
      _inherits(Sidebar, _Component6);

      function Sidebar() {
        _classCallCheck(this, Sidebar);

        return _possibleConstructorReturn(this, _Component6.apply(this, arguments));
      }

      Sidebar.prototype.render = function render() {
        return _react2.default.createElement(
          'div',
          null,
          'sidebar'
        );
      };

      return Sidebar;
    }(_react.Component);

    var Content = function (_Component7) {
      _inherits(Content, _Component7);

      function Content() {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, _Component7.apply(this, arguments));
      }

      Content.prototype.render = function render() {
        return _react2.default.createElement(
          'div',
          null,
          'content'
        );
      };

      return Content;
    }(_react.Component);

    var routes = void 0;

    beforeEach(function () {
      routes = _react2.default.createElement(
        _Route2.default,
        { component: Parent },
        _react2.default.createElement(_Route2.default, { path: '/', components: { sidebar: Sidebar, content: Content } })
      );
    });

    it('receives those components as props', function (done) {
      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, { history: (0, _createMemoryHistory2.default)('/'), routes: routes }), node, function () {
        (0, _expect2.default)(node.textContent).toEqual('sidebar-content');
        done();
      });
    });

    it('sets the key on those components', function (done) {
      var components = {};
      function createElementSpy(Component, props) {
        if (props.key) {
          components[props.key] = Component;
        }

        return null;
      }

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, {
        history: (0, _createMemoryHistory2.default)('/'), routes: routes,
        createElement: createElementSpy
      }), node, function () {
        (0, _expect2.default)(components.sidebar).toBe(Sidebar);
        (0, _expect2.default)(components.content).toBe(Content);
        done();
      });
    });
  });

  describe('at a route with special characters', function () {
    it('does not double escape', function (done) {
      // https://github.com/reactjs/react-router/issues/1574
      var MyComponent = function (_Component8) {
        _inherits(MyComponent, _Component8);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          return _possibleConstructorReturn(this, _Component8.apply(this, arguments));
        }

        MyComponent.prototype.render = function render() {
          return _react2.default.createElement(
            'div',
            null,
            this.props.params.someToken
          );
        };

        return MyComponent;
      }(_react.Component);

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/point/aaa%2Bbbb') },
        _react2.default.createElement(_Route2.default, { path: 'point/:someToken', component: MyComponent })
      ), node, function () {
        (0, _expect2.default)(node.textContent).toEqual('aaa+bbb');
        done();
      });
    });

    it('does not double escape when nested', function (done) {
      // https://github.com/reactjs/react-router/issues/1574
      var MyWrapperComponent = function (_Component9) {
        _inherits(MyWrapperComponent, _Component9);

        function MyWrapperComponent() {
          _classCallCheck(this, MyWrapperComponent);

          return _possibleConstructorReturn(this, _Component9.apply(this, arguments));
        }

        MyWrapperComponent.prototype.render = function render() {
          return this.props.children;
        };

        return MyWrapperComponent;
      }(_react.Component);

      var MyComponent = function (_Component10) {
        _inherits(MyComponent, _Component10);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          return _possibleConstructorReturn(this, _Component10.apply(this, arguments));
        }

        MyComponent.prototype.render = function render() {
          return _react2.default.createElement(
            'div',
            null,
            this.props.params.someToken
          );
        };

        return MyComponent;
      }(_react.Component);

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/point/aaa%2Bbbb') },
        _react2.default.createElement(
          _Route2.default,
          { component: MyWrapperComponent },
          _react2.default.createElement(_Route2.default, { path: 'point/:someToken', component: MyComponent })
        )
      ), node, function () {
        (0, _expect2.default)(node.textContent).toEqual('aaa+bbb');
        done();
      });
    });

    it('is happy to have colons in parameter values', function (done) {
      // https://github.com/reactjs/react-router/issues/1759
      var MyComponent = function (_Component11) {
        _inherits(MyComponent, _Component11);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          return _possibleConstructorReturn(this, _Component11.apply(this, arguments));
        }

        MyComponent.prototype.render = function render() {
          return _react2.default.createElement(
            'div',
            null,
            this.props.params.foo
          );
        };

        return MyComponent;
      }(_react.Component);

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/ns/aaa:bbb/bar') },
        _react2.default.createElement(_Route2.default, { path: 'ns/:foo/bar', component: MyComponent })
      ), node, function () {
        (0, _expect2.default)(node.textContent).toEqual('aaa:bbb');
        done();
      });
    });

    it('handles % in parameters', function (done) {
      // https://github.com/reactjs/react-router/issues/1766
      var MyComponent = function (_Component12) {
        _inherits(MyComponent, _Component12);

        function MyComponent() {
          _classCallCheck(this, MyComponent);

          return _possibleConstructorReturn(this, _Component12.apply(this, arguments));
        }

        MyComponent.prototype.render = function render() {
          return _react2.default.createElement(
            'div',
            null,
            this.props.params.name
          );
        };

        return MyComponent;
      }(_react.Component);

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/company/CADENCE%20DESIGN%20SYSTEM%20INC%20NOTE%202.625%25%2060') },
        _react2.default.createElement(_Route2.default, { path: '/company/:name', component: MyComponent })
      ), node, function () {
        (0, _expect2.default)(node.textContent).toEqual('CADENCE DESIGN SYSTEM INC NOTE 2.625% 60');
        done();
      });
    });

    it('handles forward slashes', function (done) {
      // https://github.com/reactjs/react-router/issues/1865
      var Parent = function (_Component13) {
        _inherits(Parent, _Component13);

        function Parent() {
          _classCallCheck(this, Parent);

          return _possibleConstructorReturn(this, _Component13.apply(this, arguments));
        }

        Parent.prototype.render = function render() {
          return _react2.default.createElement(
            'div',
            null,
            this.props.children
          );
        };

        return Parent;
      }(_react.Component);

      var Child = function (_Component14) {
        _inherits(Child, _Component14);

        function Child() {
          _classCallCheck(this, Child);

          return _possibleConstructorReturn(this, _Component14.apply(this, arguments));
        }

        Child.prototype.render = function render() {
          return _react2.default.createElement(
            'h1',
            null,
            this.props.params.name
          );
        };

        return Child;
      }(_react.Component);

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/apple%2Fbanana') },
        _react2.default.createElement(
          _Route2.default,
          { component: Parent },
          _react2.default.createElement(_Route2.default, { path: '/:name', component: Child })
        )
      ), node, function () {
        (0, _expect2.default)(node.textContent).toEqual('apple/banana');
        done();
      });
    });

    it('handles error that are not valid URI character', function (done) {
      var errorSpy = _expect2.default.createSpy();

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/%'), onError: errorSpy },
        _react2.default.createElement(_Route2.default, { path: '*' })
      ), node, function () {
        (0, _expect2.default)(errorSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('render prop', function () {
    it('renders with the render prop', function (done) {
      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, {
        history: (0, _createMemoryHistory2.default)('/'),
        render: function render() {
          return _react2.default.createElement(
            'div',
            null,
            'test'
          );
        },
        routes: { path: '/', component: Parent }
      }), node, function () {
        (0, _expect2.default)(node.textContent).toBe('test');
        done();
      });
    });

    it('passes router props to render prop', function (done) {
      var MyComponent = function MyComponent() {
        return _react2.default.createElement('div', null);
      };
      var route = { path: '/', component: MyComponent };

      var assertProps = function assertProps(props) {
        (0, _expect2.default)(props.routes).toEqual([route]);
        (0, _expect2.default)(props.components).toEqual([MyComponent]);
        (0, _expect2.default)(props.foo).toBe('bar');
        (0, _expect2.default)(props.render).toNotExist();
        done();
        return _react2.default.createElement('div', null);
      };

      (0, _reactDom.render)(_react2.default.createElement(_Router2.default, {
        history: (0, _createMemoryHistory2.default)('/'),
        routes: route,
        render: assertProps,
        foo: 'bar'
      }), node);
    });
  });

  describe('async components', function () {
    var componentSpy = void 0,
        renderSpy = void 0;

    beforeEach(function () {
      componentSpy = _expect2.default.createSpy();

      renderSpy = function renderSpy(_ref) {
        var components = _ref.components;

        componentSpy(components);
        return _react2.default.createElement('div', null);
      };
    });

    it('should support getComponent', function (done) {
      var Component = function Component() {
        return _react2.default.createElement('div', null);
      };

      function getComponent(nextState, callback) {
        (0, _expect2.default)(this.getComponent).toBe(getComponent);
        (0, _expect2.default)(nextState.location.pathname).toBe('/');

        setTimeout(function () {
          return callback(null, Component);
        });
      }

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/'), render: renderSpy },
        _react2.default.createElement(_Route2.default, { path: '/', getComponent: getComponent })
      ), node, function () {
        setTimeout(function () {
          (0, _expect2.default)(componentSpy).toHaveBeenCalledWith([Component]);
          done();
        });
      });
    });

    it('should support getComponents', function (done) {
      var foo = function foo() {
        return _react2.default.createElement('div', null);
      };
      var bar = function bar() {
        return _react2.default.createElement('div', null);
      };

      function getComponents(nextState, callback) {
        (0, _expect2.default)(this.getComponents).toBe(getComponents);
        (0, _expect2.default)(nextState.location.pathname).toBe('/');

        setTimeout(function () {
          return callback(null, { foo: foo, bar: bar });
        });
      }

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/'), render: renderSpy },
        _react2.default.createElement(_Route2.default, { path: '/', getComponents: getComponents })
      ), node, function () {
        setTimeout(function () {
          (0, _expect2.default)(componentSpy).toHaveBeenCalledWith([{ foo: foo, bar: bar }]);
          done();
        });
      });
    });

    it('should supply location properties to getComponent', function (done) {
      if (_deprecateObjectProperties.canUseMembrane) {
        (0, _shouldWarn2.default)('deprecated');
      }

      var Component = function Component() {
        return _react2.default.createElement('div', null);
      };
      var getComponent = function getComponent(location, callback) {
        (0, _expect2.default)(location.pathname).toBe('/');
        setTimeout(function () {
          return callback(null, Component);
        });
      };

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/'), render: renderSpy },
        _react2.default.createElement(_Route2.default, { path: '/', getComponent: getComponent })
      ), node, function () {
        setTimeout(function () {
          (0, _expect2.default)(componentSpy).toHaveBeenCalledWith([Component]);
          done();
        });
      });
    });
  });

  describe('error handling', function () {
    var error = void 0,
        getComponent = void 0;

    beforeEach(function () {
      error = new Error('error fixture');
      getComponent = function getComponent(_, callback) {
        return callback(error);
      };
    });

    it('should work with onError', function (done) {
      var errorSpy = _expect2.default.createSpy();

      (0, _reactDom.render)(_react2.default.createElement(
        _Router2.default,
        { history: (0, _createMemoryHistory2.default)('/'), onError: errorSpy },
        _react2.default.createElement(_Route2.default, { path: '/', getComponent: getComponent })
      ), node, function () {
        (0, _expect2.default)(errorSpy).toHaveBeenCalledWith(error);
        done();
      });
    });

    it('should throw without onError', function () {
      (0, _expect2.default)(function () {
        (0, _reactDom.render)(_react2.default.createElement(
          _Router2.default,
          { history: (0, _createMemoryHistory2.default)('/') },
          _react2.default.createElement(_Route2.default, { path: '/', getComponent: getComponent })
        ), node);
      }).toThrow('error fixture');
    });
  });
});