// Credit to ellisbben
// http://stackoverflow.com/questions/7395813/html5-canvas-get-transform-matrix

//`enhanceContext` takes a 2d canvas context and wraps its matrix-changing
//functions so that `context._matrix` should always correspond to its
//current transformation matrix.
//Call `enhanceContext` on a freshly-fetched 2d canvas context for best
//results.
var SVGns = document.createElementNS("http://www.w3.org/2000/svg", "svg");

var newMatrix = function() {
  return SVGns.createSVGMatrix();
}

var enhanceContext = function(context) {
  var m = newMatrix();
  context._matrix = m;
  context.isEnhanced = true;

  //the stack of saved matrices
  context._savedMatrices = [m];

  var super_ = context.__proto__;
  context.__proto__ = ({
    __proto__: super_,

    //helper for manually forcing the canvas transformation matrix to
    //match the stored matrix.
    _setMatrix: function() {
      var m = this._matrix;
      super_.setTransform.call(this, m.a, m.b, m.c, m.d, m.e, m.f);
    },

    getMatrix: function() {
      var m = this._matrix;
      return m;
    },

    save: function() {
      this._savedMatrices.push(this._matrix);
      super_.save.call(this);
    },

    //if the stack of matrices we're managing doesn't have a saved matrix,
    //we won't even call the context's original `restore` method.
    restore: function() {
      if(this._savedMatrices.length == 0)
        return;
      super_.restore.call(this);
      this._matrix = this._savedMatrices.pop();
      this._setMatrix();
    },

    scale: function(x, y) {
      this._matrix = this._matrix.scaleNonUniform(x, y);
      super_.scale.call(this, x, y);
    },

    rotate: function(theta) {
      //canvas `rotate` uses radians, SVGMatrix uses degrees.
      this._matrix = this._matrix.rotate(theta * 180 / Math.PI);
      super_.rotate.call(this, theta);
    },

    translate: function(x, y) {
      this._matrix = this._matrix.translate(x, y);
      super_.translate.call(this, x, y);
    },

    transform: function(a, b, c, d, e, f) {
      var rhs = createMatrix();
      //2x2 scale-skew matrix
      rhs.a = a; rhs.b = b;
      rhs.c = c; rhs.d = d;

      //translation vector
      rhs.e = e; rhs.f = f;
      this._matrix = this._matrix.multiply(rhs);
      super_.transform.call(this, a, b, c, d, e, f);
    },

    //warning: `resetTransform` is not implemented in at least some browsers
    //and this is _not_ a shim.
    resetTransform: function() {
      this._matrix = createMatrix();
      super_.resetTransform.call(this);
    }
  });

  return context;
};

var transformPoint = function(m, p) {
  var xx = p.x * m.a + p.y * m.c + m.e;
  var yy = p.x * m.b + p.y * m.d + m.f;
  return {'x':xx, 'y':yy};
}
