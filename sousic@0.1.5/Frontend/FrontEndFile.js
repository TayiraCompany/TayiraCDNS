export class Frontend {
  // Int
  int(value) {
    class Int {
      constructor(value) {
        if (!Number.isInteger(value)) {
          throw new Error("Value must be an integer.");
        }
        this.value = value;
      }

      toString() {
        return this.value.toString();
      }

      valueOf() {
        return this.value;
      }

      // Arithmetic operators
      add(other) {
        return new Int(this.value + other.value);
      }
      subtract(other) {
        return new Int(this.value - other.value);
      }
      multiply(other) {
        return new Int(this.value * other.value);
      }
      divide(other) {
        return new Int(Math.floor(this.value / other.value));
      }
      modulus(other) {
        return new Int(this.value % other.value);
      }
      increment() {
        this.value++;
        return this;
      }
      decrement() {
        this.value--;
        return this;
      }

      // Comparison operators
      equals(other) {
        return this.value === other.value;
      }
      notEquals(other) {
        return this.value !== other.value;
      }
      greaterThan(other) {
        return this.value > other.value;
      }
      lessThan(other) {
        return this.value < other.value;
      }
      greaterThanOrEqual(other) {
        return this.value >= other.value;
      }
      lessThanOrEqual(other) {
        return this.value <= other.value;
      }

      // Assignment operators
      assign(value) {
        this.value = value.value;
        return this;
      }
      addAssign(other) {
        this.value += other.value;
        return this;
      }
      subtractAssign(other) {
        this.value -= other.value;
        return this;
      }
      multiplyAssign(other) {
        this.value *= other.value;
        return this;
      }
      divideAssign(other) {
        this.value = Math.floor(this.value / other.value);
        return this;
      }
      modulusAssign(other) {
        this.value %= other.value;
        return this;
      }
    }
    return new Int(value);
  }

  // String
  string(value) {
    class String {
      constructor(value) {
        if (typeof value !== "string") {
          throw new Error("Value must be a string.");
        }
        this.value = value;
      }

      toString() {
        return this.value;
      }

      valueOf() {
        return this.value;
      }
    }
    return new String(value);
  }

  // Bool
  bool(value) {
    class Bool {
      constructor(value) {
        if (typeof value !== "boolean") {
          throw new Error("Value must be a boolean.");
        }
        this.value = value;
      }

      toString() {
        return this.value.toString();
      }

      valueOf() {
        return this.value;
      }
    }
    return new Bool(value);
  }

  // Float
  float(value) {
    class Float {
      constructor(value) {
        if (
          typeof value !== "number" ||
          !Number.isFinite(value) ||
          !Number.isFinite(parseFloat(value))
        ) {
          throw new Error("Value must be a float.");
        }
        this.value = value;
      }

      toString() {
        return this.value.toString();
      }

      valueOf() {
        return this.value;
      }
    }
    return new Float(value);
  }

  // Double
  double(value) {
    class Double {
      constructor(value) {
        if (
          typeof value !== "number" ||
          !Number.isFinite(value) ||
          !Number.isFinite(parseFloat(value)) ||
          (value.toString().match(/\./g) || []).length > 1
        ) {
          throw new Error("Value must be a valid double.");
        }
        this.value = value;
      }

      toString() {
        return this.value.toString();
      }

      valueOf() {
        return this.value;
      }
    }
    return new Double(value);
  }

  // Char
  char(value) {
    class Char {
      constructor(value) {
        if (typeof value !== "string" || value.length !== 1) {
          throw new Error("Value must be a single character.");
        }
        this.value = value;
      }

      toString() {
        return this.value;
      }

      valueOf() {
        return this.value;
      }
    }
    return new Char(value);
  }

  // Array
  array(type, values) {
    if (type === "string") {
      values = values.map((value) => this.string(value));
    } else if (type === "int") {
      values = values.map((value) => this.int(value));
    } else if (type === "bool") {
      values = values.map((value) => this.bool(value));
    } else if (type === "float") {
      values = values.map((value) => this.float(value));
    } else if (type === "double") {
      values = values.map((value) => this.double(value));
    } else if (type === "char") {
      values = values.map((value) => this.char(value));
    } else {
      throw new Error("Unsupported type for array.");
    }

    return values;
  }

  // Math functions
  static MathFunctions = {
    Max: (a, b) => Math.max(a, b),
    Min: (a, b) => Math.min(a, b),
    Abs: (a) => Math.abs(a),
    Pow: (a, b) => Math.pow(a, b),
    Sqrt: (a) => Math.sqrt(a),
    Round: (a) => Math.round(a),
    Ceil: (a) => Math.ceil(a),
    Floor: (a) => Math.floor(a),
  };

  // Print
  static print = {
    WriteLine: (data) => {
      console.log(data);
    },
    ReadLine: () => {
      return prompt("Enter input:");
    },
  };

  // Define class
  defineClass(className, definition) {
    const staticMembers = new Map();
    const members = {
      public: {},
      private: {},
      static: {},
    };

    class Clazz {
      constructor() {
        definition.call(this);
      }

      static get static() {
        return staticMembers.get(className);
      }

      static set static(value) {
        staticMembers.set(className, value);
      }

      public(name, value) {
        members.public[name] = value;
      }

      private(name, value) {
        members.private[name] = value;
      }

      staticMember(name, value) {
        Clazz.static[name] = value;
      }

      voidMethod(func) {
        func.call(this);
      }
    }

    return Clazz;
  }

  // Global
  global(variable) {
    window[variable] = variable;
  }
}
