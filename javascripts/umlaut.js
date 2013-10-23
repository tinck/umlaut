// Generated by CoffeeScript 1.6.3
(function() {
  var E, L, Mouse, article, aside, command, commands, data, drag, e, element, element_add, force, generate_url, height, history_pop, link, load, name, objectify, save, svg, sync, tick, width, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    _this = this,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.Element = (function() {
    function Element(x, y, text, fixed) {
      this.x = x;
      this.y = y;
      this.text = text;
      this.fixed = fixed != null ? fixed : true;
      this.margin = {
        x: 10,
        y: 5
      };
    }

    Element.prototype.pos = function() {
      return {
        x: this.x,
        y: this.y
      };
    };

    Element.prototype.width = function() {
      return this._txt_bbox.width + 2 * this.margin.x;
    };

    Element.prototype.height = function() {
      return this._txt_bbox.height + 2 * this.margin.y;
    };

    Element.prototype.direction = function(x, y) {
      var delta;
      delta = this.height() / this.width();
      if (this.x <= x && this.y <= y) {
        if (y > delta * (x - this.x) + this.y) {
          return 'S';
        } else {
          return 'E';
        }
      }
      if (this.x >= x && this.y <= y) {
        if (y > delta * (this.x - x) + this.y) {
          return 'S';
        } else {
          return 'O';
        }
      }
      if (this.x <= x && this.y >= y) {
        if (y > delta * (this.x - x) + this.y) {
          return 'E';
        } else {
          return 'N';
        }
      }
      if (this.x >= x && this.y >= y) {
        if (y > delta * (x - this.x) + this.y) {
          return 'O';
        } else {
          return 'N';
        }
      }
    };

    Element.prototype.anchor = function(direction) {
      switch (direction) {
        case 'N':
          return {
            x: this.x,
            y: this.y - this.height() / 2
          };
        case 'S':
          return {
            x: this.x,
            y: this.y + this.height() / 2
          };
        case 'E':
          return {
            x: this.x + this.width() / 2,
            y: this.y
          };
        case 'O':
          return {
            x: this.x - this.width() / 2,
            y: this.y
          };
      }
    };

    Element.prototype["in"] = function(rect) {
      var _ref, _ref1;
      return (rect.x < (_ref = this.x) && _ref < rect.x + rect.width) && (rect.y < (_ref1 = this.y) && _ref1 < rect.y + rect.height);
    };

    Element.prototype.objectify = function() {
      return {
        name: this.constructor.name,
        x: this.x,
        y: this.y,
        text: this.text,
        fixed: this.fixed
      };
    };

    return Element;

  })();

  Mouse = (function(_super) {
    __extends(Mouse, _super);

    function Mouse() {
      _ref = Mouse.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Mouse.prototype.width = function() {
      return 1;
    };

    Mouse.prototype.height = function() {
      return 1;
    };

    Mouse.prototype.weight = 1;

    return Mouse;

  })(Element);

  E = {};

  L = {};

  E.Process = (function(_super) {
    __extends(Process, _super);

    function Process() {
      _ref1 = Process.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Process.prototype.path = function() {
      var h2, w2;
      w2 = this.width() / 2;
      h2 = this.height() / 2;
      return "M " + (-w2) + " " + (-h2) + "         L " + w2 + " " + (-h2) + "         L " + w2 + " " + h2 + "         L " + (-w2) + " " + h2 + "         z";
    };

    return Process;

  })(Element);

  E.DataIO = (function(_super) {
    __extends(DataIO, _super);

    function DataIO() {
      _ref2 = DataIO.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    DataIO.prototype.path = function() {
      var h2, shift, w2;
      w2 = this.width() / 2;
      h2 = this.height() / 2;
      shift = 5;
      return "M " + (-w2 - shift) + " " + (-h2) + "         L " + (w2 - shift) + " " + (-h2) + "         L " + (w2 + shift) + " " + h2 + "         L " + (-w2 + shift) + " " + h2 + "         z";
    };

    return DataIO;

  })(Element);

  E.Terminator = (function(_super) {
    __extends(Terminator, _super);

    function Terminator() {
      _ref3 = Terminator.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Terminator.prototype.path = function() {
      var h2, shift, w2;
      w2 = this.width() / 2;
      h2 = this.height() / 2;
      shift = 10;
      return "M " + (-w2 + shift) + " " + (-h2) + "         L " + (w2 - shift) + " " + (-h2) + "         Q " + w2 + " " + (-h2) + " " + w2 + " " + (-h2 + shift) + "         L " + w2 + " " + (h2 - shift) + "         Q " + w2 + " " + h2 + " " + (w2 - shift) + " " + h2 + "         L " + (-w2 + shift) + " " + h2 + "         Q " + (-w2) + " " + h2 + " " + (-w2) + " " + (h2 - shift) + "         L " + (-w2) + " " + (-h2 + shift) + "         Q " + (-w2) + " " + (-h2) + " " + (-w2 + shift) + " " + (-h2);
    };

    return Terminator;

  })(Element);

  E.Decision = (function(_super) {
    __extends(Decision, _super);

    function Decision() {
      Decision.__super__.constructor.apply(this, arguments);
      this.margin.y = 0;
    }

    Decision.prototype.width = function() {
      var ow;
      ow = Decision.__super__.width.call(this);
      return ow + Math.sqrt(ow * this._txt_bbox.height + 2 * this.margin.y);
    };

    Decision.prototype.height = function() {
      var oh;
      oh = Decision.__super__.height.call(this);
      return oh + Math.sqrt(oh * this._txt_bbox.width + 2 * this.margin.x);
    };

    Decision.prototype.path = function() {
      var h2, w2;
      w2 = this.width() / 2;
      h2 = this.height() / 2;
      return "M " + (-w2) + " 0         L 0 " + (-h2) + "         L " + w2 + " 0         L 0 " + h2 + "         z";
    };

    return Decision;

  })(Element);

  E.Delay = (function(_super) {
    __extends(Delay, _super);

    function Delay() {
      _ref4 = Delay.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    Delay.prototype.path = function() {
      var h2, shift, w2;
      w2 = this.width() / 2;
      h2 = this.height() / 2;
      shift = 10;
      return "M " + (-w2) + " " + (-h2) + "         L " + (w2 - shift) + " " + (-h2) + "         Q " + w2 + " " + (-h2) + " " + w2 + " " + (-h2 + shift) + "         L " + w2 + " " + (h2 - shift) + "         Q " + w2 + " " + h2 + " " + (w2 - shift) + " " + h2 + "         L " + (-w2) + " " + h2 + "         z";
    };

    return Delay;

  })(Element);

  this.Link = (function() {
    function Link(source, target) {
      this.source = source;
      this.target = target;
      this.lol = this.target;
    }

    Link.prototype.objectify = function() {
      return {
        name: this.constructor.name,
        source: data.elts.indexOf(this.source),
        target: data.elts.indexOf(this.target)
      };
    };

    Link.prototype.path = function() {
      var a1, a2, c1, c2, d1, d2, m, path;
      c1 = this.source.pos();
      c2 = this.target.pos();
      d1 = this.source.direction(c2.x, c2.y);
      d2 = this.target.direction(c1.x, c1.y);
      a1 = this.source.anchor(d1);
      a2 = this.target.anchor(d2);
      path = "M " + a1.x + " " + a1.y;
      if (state.linkstyle === 'curve') {
        path = "" + path + " C";
        m = {
          x: .5 * (a1.x + a2.x),
          y: .5 * (a1.y + a2.y)
        };
        if (d1 === 'N' || d1 === 'S') {
          path = "" + path + " " + a1.x + " " + m.y;
        } else {
          path = "" + path + " " + m.x + " " + a1.y;
        }
        if (d2 === 'N' || d2 === 'S') {
          path = "" + path + " " + a2.x + " " + m.y;
        } else {
          path = "" + path + " " + m.x + " " + a2.y;
        }
      } else if (state.linkstyle === 'diagonal') {
        path = "" + path + " L";
      } else if (state.linkstyle === 'rectangular') {
        path = "" + path + " L";
        path = "" + path + " " + a1.x + " " + a2.y + " L";
      }
      return "" + path + " " + a2.x + " " + a2.y;
    };

    return Link;

  })();

  this.data = data = {};

  this.state = {
    selection: [],
    snap: 25,
    no_save: false,
    dragging: false,
    mouse: new Mouse(0, 0, ''),
    linking: [],
    linkstyle: 'curve'
  };

  objectify = function() {
    return JSON.stringify({
      elts: data.elts.map(function(elt) {
        return elt.objectify();
      }),
      lnks: data.lnks.map(function(lnk) {
        return lnk.objectify();
      })
    });
  };

  load = function(new_data) {
    var elt, lnk, _i, _j, _len, _len1, _ref5, _ref6;
    if (new_data == null) {
      new_data = null;
    }
    data.elts = [];
    data.lnks = [];
    new_data = new_data || localStorage.getItem('data');
    if (!new_data) {
      return;
    }
    new_data = JSON.parse(new_data);
    _ref5 = new_data.elts;
    for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
      elt = _ref5[_i];
      data.elts.push(new E[elt.name](elt.x, elt.y, elt.text, elt.fixed));
    }
    _ref6 = new_data.lnks;
    for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
      lnk = _ref6[_j];
      data.lnks.push(new _this[lnk.name](data.elts[lnk.source], data.elts[lnk.target]));
    }
    return state.selection = [];
  };

  save = function() {
    return localStorage.setItem('data', objectify());
  };

  generate_url = function() {
    var hash;
    if (state.no_save) {
      state.no_save = false;
      return;
    }
    hash = '#' + btoa(objectify());
    if (location.hash !== hash) {
      return history.pushState(null, null, hash);
    }
  };

  commands = {
    reorganize: {
      fun: function() {
        var elt, sel, _i, _len;
        sel = state.selection.length > 0 ? state.selection : data.elts;
        for (_i = 0, _len = sel.length; _i < _len; _i++) {
          elt = sel[_i];
          elt.fixed = false;
        }
        return sync();
      },
      label: 'Reorganize',
      hotkey: 'r'
    },
    link: {
      fun: function() {
        var elt, _i, _len, _ref5;
        state.linking = [];
        _ref5 = state.selection;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          elt = _ref5[_i];
          state.linking.push(new Link(elt, state.mouse));
        }
        return sync();
      },
      label: 'Link elements',
      hotkey: 'l'
    },
    edit: {
      fun: function() {
        var elt, _i, _len, _ref5;
        _ref5 = state.selection;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          elt = _ref5[_i];
          elt.text = prompt("Enter a name for " + elt.text + ":");
        }
        return sync();
      },
      label: 'Edit element text',
      hotkey: 'e'
    },
    select_all: {
      fun: function(e) {
        state.selection = data.elts.slice();
        d3.selectAll('g.element').classed('selected', true);
        return e != null ? e.preventDefault() : void 0;
      },
      label: 'Select all elements',
      hotkey: 'ctrl+a'
    },
    save: {
      fun: function(e) {
        save();
        return e != null ? e.preventDefault() : void 0;
      },
      label: 'Save locally',
      hotkey: 'ctrl+s'
    },
    load: {
      fun: function(e) {
        load();
        sync();
        return e != null ? e.preventDefault() : void 0;
      },
      label: 'Load locally',
      hotkey: 'ctrl+l'
    },
    undo: {
      fun: function(e) {
        history.go(-1);
        return e != null ? e.preventDefault() : void 0;
      },
      label: 'Undo',
      hotkey: 'ctrl+z'
    },
    redo: {
      fun: function(e) {
        history.go(1);
        return e != null ? e.preventDefault() : void 0;
      },
      label: 'Redo',
      hotkey: 'ctrl+y'
    },
    remove: {
      fun: function() {
        var elt, lnk, _i, _j, _len, _len1, _ref5, _ref6;
        _ref5 = state.selection;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          elt = _ref5[_i];
          data.elts.splice(data.elts.indexOf(elt), 1);
          _ref6 = data.lnks.slice();
          for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
            lnk = _ref6[_j];
            if (elt === lnk.source || elt === lnk.target) {
              data.lnks.splice(data.lnks.indexOf(lnk), 1);
            }
          }
        }
        state.selection = [];
        d3.selectAll('g.element').classed('selected', false);
        return sync();
      },
      label: 'Remove elements',
      hotkey: 'del'
    },
    linkstyle: {
      fun: function() {
        state.linkstyle = (function() {
          switch (state.linkstyle) {
            case 'curve':
              return 'diagonal';
            case 'diagonal':
              return 'rectangular';
            case 'rectangular':
              return 'curve';
          }
        })();
        return tick();
      },
      label: 'Change link style',
      hotkey: 'space'
    }
  };

  for (e in E) {
    commands[e] = (function(elt) {
      return {
        fun: function() {
          return element_add(elt);
        },
        label: elt,
        hotkey: elt[0]
      };
    })(e);
  }

  aside = d3.select('aside');

  for (name in commands) {
    command = commands[name];
    aside.append('button').text(command.label).on('click', command.fun);
    Mousetrap.bind(command.hotkey, command.fun);
  }

  article = d3.select("article");

  width = article.node().clientWidth;

  height = article.node().clientHeight || 500;

  svg = article.append("svg").attr("width", width).attr("height", height);

  svg.append("svg:defs").append("svg:marker").attr("id", 'arrow').attr("viewBox", "0 0 10 10").attr("refX", 10).attr("refY", 5).attr("markerUnits", 'strokeWidth').attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto").append("svg:path").attr("d", "M 0 0 L 10 5 L 0 10");

  force = d3.layout.force().gravity(.2).linkDistance(300).charge(-2000).size([width, height]);

  drag = force.drag().on("drag.force", function(elt) {
    var delta, _i, _len, _ref5, _ref6;
    if (!state.dragging) {
      return;
    }
    if (_ref5 = !elt, __indexOf.call(state.selection, _ref5) >= 0) {
      state.selection.push(elt);
    }
    if (d3.event.sourceEvent.shiftKey) {
      delta = {
        x: elt.px - d3.event.x,
        y: elt.py - d3.event.y
      };
    } else {
      delta = {
        x: elt.px - state.snap * Math.floor(d3.event.x / state.snap),
        y: elt.py - state.snap * Math.floor(d3.event.y / state.snap)
      };
    }
    _ref6 = state.selection;
    for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
      elt = _ref6[_i];
      elt.px -= delta.x;
      elt.py -= delta.y;
    }
    return force.resume();
  }).on('dragstart', function() {
    if (d3.event.sourceEvent.which !== 3) {
      return state.dragging = true;
    }
  }).on('dragend', function() {
    return state.dragging = false;
  });

  element = null;

  link = null;

  svg.on("mousedown", function() {
    var elt, mouse, _i, _len, _ref5;
    if (state.dragging) {
      return;
    }
    if (d3.event.which === 3) {
      state.linking = [];
      _ref5 = state.selection;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        elt = _ref5[_i];
        state.linking.push(new Link(elt, state.mouse));
      }
      sync();
    } else {
      if (!d3.event.shiftKey) {
        d3.selectAll('.selected').classed('selected', false);
        state.selection = [];
      }
      mouse = d3.mouse(this);
      svg.select('g.overlay').append("rect").attr({
        "class": "selection",
        x: mouse[0],
        y: mouse[1],
        width: 0,
        height: 0
      });
    }
    return d3.event.preventDefault();
  }).on('contextmenu', function() {
    return d3.event.preventDefault();
  });

  d3.select(this).on("mousemove", function() {
    var mouse, move, rect, sel;
    mouse = d3.mouse(svg.node());
    state.mouse.x = mouse[0];
    state.mouse.y = mouse[1];
    if (state.linking.length) {
      tick();
      return;
    }
    sel = svg.select("rect.selection");
    if (!sel.empty()) {
      rect = {
        x: +sel.attr("x"),
        y: +sel.attr("y"),
        width: +sel.attr("width"),
        height: +sel.attr("height")
      };
      move = {
        x: mouse[0] - rect.x,
        y: mouse[1] - rect.y
      };
      if (move.x < 1 || (move.x * 2 < rect.width)) {
        rect.x = mouse[0];
        rect.width -= move.x;
      } else {
        rect.width = move.x;
      }
      if (move.y < 1 || (move.y * 2 < rect.height)) {
        rect.y = mouse[1];
        rect.height -= move.y;
      } else {
        rect.height = move.y;
      }
      sel.attr(rect);
      d3.selectAll('g.element').each(function(elt) {
        var g, selected;
        g = d3.select(this);
        selected = g.classed('selected');
        if (elt["in"](rect) && !selected) {
          state.selection.push(elt);
          return g.classed('selected', true);
        } else if (!elt["in"](rect) && selected && !d3.event.shiftKey) {
          state.selection.splice(state.selection.indexOf(elt), 1);
          return g.classed('selected', false);
        }
      });
      return d3.event.preventDefault();
    }
  }).on("mouseup", function() {
    if (state.linking.length) {
      state.linking = [];
      sync();
    }
    svg.selectAll("rect.selection").remove();
    return d3.event.preventDefault();
  });

  svg.append('g').attr('class', 'underlay');

  svg.append('g').attr('class', 'links');

  svg.append('g').attr('class', 'elements');

  svg.append('g').attr('class', 'overlay');

  sync = function() {
    var g;
    force.nodes(data.elts).links(data.lnks);
    link = svg.select('g.links').selectAll('path.link').data(data.lnks.concat(state.linking));
    link.enter().append("path").attr("class", "link").attr("marker-end", "url(#arrow)");
    element = svg.select('g.elements').selectAll('g.element').data(data.elts);
    g = element.enter().append('g').attr('class', 'element').call(drag).on("mouseup", function(elt) {
      var lnk, _i, _len, _ref5;
      if (state.linking.length) {
        _ref5 = state.linking;
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          lnk = _ref5[_i];
          if (lnk.source !== elt) {
            data.lnks.push(new Link(lnk.source, elt));
          }
        }
        state.linking = [];
        sync();
        return d3.event.preventDefault();
      }
    }).on("mousedown", function(elt) {
      var selected;
      g = d3.select(this);
      selected = g.classed('selected');
      if ((selected && !state.dragging) || (!selected) && !d3.event.shiftKey) {
        d3.selectAll('.selected').classed('selected', false);
        state.selection = [elt];
        d3.select(this).classed('selected', true);
      }
      if (d3.event.shiftKey && !selected) {
        d3.select(this).classed('selected', true);
        return state.selection.push(elt);
      }
    }).on("mousemove", function(elt) {
      var lnk, _i, _len, _ref5, _results;
      _ref5 = state.linking;
      _results = [];
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        lnk = _ref5[_i];
        _results.push(lnk.target = elt);
      }
      return _results;
    }).on("mouseout", function(elt) {
      var lnk, _i, _len, _ref5, _results;
      _ref5 = state.linking;
      _results = [];
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        lnk = _ref5[_i];
        _results.push(lnk.target = state.mouse);
      }
      return _results;
    }).on('dblclick', function(elt) {
      elt.text = prompt("Enter a name for " + elt.text + ":");
      return sync();
    });
    g.append('path').attr('class', 'shape');
    g.append('text');
    element.select('text').text(function(elt) {
      return elt.text;
    }).each(function(elt) {
      return elt._txt_bbox = this.getBBox();
    });
    element.select('path.shape').attr('d', function(elt) {
      return elt.path();
    });
    element.exit().remove();
    link.exit().remove();
    tick();
    return force.start();
  };

  tick = function() {
    var elt, need_force, _i, _len, _ref5;
    need_force = false;
    _ref5 = data.elts;
    for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
      elt = _ref5[_i];
      if (!elt.fixed) {
        need_force = true;
        break;
      }
    }
    need_force = need_force && (force.alpha() || 1) > .03;
    if (!need_force) {
      force.stop();
    }
    element.attr("transform", (function(elt) {
      return "translate(" + elt.x + "," + elt.y + ")";
    })).each(function(elt) {
      return d3.select(this).classed('moving', !elt.fixed);
    });
    return link.attr("d", function(elt) {
      return elt.path();
    });
  };

  element_add = function(type) {
    var elt, new_elt, _i, _len, _ref5;
    new_elt = new E[type](void 0, void 0, 'New element', false);
    data.elts.push(new_elt);
    _ref5 = state.selection;
    for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
      elt = _ref5[_i];
      data.lnks.push(new Link(elt, new_elt));
    }
    return sync();
  };

  force.on('tick', tick).on('end', function() {
    var elt, _i, _len, _ref5;
    _ref5 = data.elts;
    for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
      elt = _ref5[_i];
      elt.fixed = true;
    }
    tick();
    return generate_url();
  });

  history_pop = function() {
    try {
      if (location.hash) {
        load(atob(location.hash.slice(1)));
      } else {
        load();
      }
    } catch (_error) {
      data.elts = [];
      data.lnks = [];
    }
    state.no_save = true;
    return sync();
  };

  this.addEventListener("popstate", history_pop);

  if (this.mozInnerScreenX !== null) {
    history_pop();
  }

}).call(this);
