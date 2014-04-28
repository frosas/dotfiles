(function() {
  var $, CommandRunner, child_process, each_slice, fs, os, path, _;

  child_process = require('child_process');

  os = require('os');

  path = require('path');

  fs = require('fs');

  _ = require('lodash');

  $ = require('atom').$;

  each_slice = function(array, size, callback) {
    var i, slice, _i, _ref, _results;
    _results = [];
    for (i = _i = 0, _ref = array.length; size > 0 ? _i <= _ref : _i >= _ref; i = _i += size) {
      slice = array.slice(i, i + size);
      _results.push(callback(slice));
    }
    return _results;
  };

  module.exports = CommandRunner = (function() {
    CommandRunner._cachedEnv = void 0;

    CommandRunner.fetchEnvOfLoginShell = function(callback) {
      var command, outputPath;
      if (!process.env.SHELL) {
        return callback(new Error("SHELL environment variable is not set."));
      }
      if (process.env.SHELL.match(/csh$/)) {
        return callback(new Error("" + process.env.SHELL + " is not supported."));
      }
      outputPath = path.join(os.tmpdir(), 'CommandRunner_fetchEnvOfLoginShell.txt');
      command = "" + process.env.SHELL + " -l -i -c '$(printenv > " + outputPath + ")'";
      return child_process.exec(command, (function(_this) {
        return function(execError, stdout, stderr) {
          if (execError != null) {
            return callback(execError);
          }
          return fs.readFile(outputPath, function(readError, data) {
            var env;
            if (readError != null) {
              return callback(readError);
            }
            env = _this.parseResultOfPrintEnv(data.toString());
            return callback(null, env);
          });
        };
      })(this));
    };

    CommandRunner.parseResultOfPrintEnv = function(string) {
      var env, key, line, lines, lines_and_last_chars, matches, value, _i, _len, _match;
      env = {};
      lines_and_last_chars = string.split(/([^\\])\n/);
      lines = each_slice(lines_and_last_chars, 2, function(slice) {
        return slice.join('');
      });
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        matches = line.match(/^(.+?)=([\S\s]*)$/);
        if (matches == null) {
          continue;
        }
        _match = matches[0], key = matches[1], value = matches[2];
        if (!(key != null) || key.length === 0) {
          continue;
        }
        env[key] = value;
      }
      return env;
    };

    CommandRunner.mergePathEnvs = function(baseEnv, subsequentEnv) {
      var key, _i, _len, _ref;
      _ref = ['PATH', 'GEM_PATH'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        baseEnv[key] = this.mergePaths(baseEnv[key], subsequentEnv[key]);
      }
      return baseEnv;
    };

    CommandRunner.mergePaths = function(baseString, subsequentString) {
      var basePaths, paths, subsequentPaths;
      basePaths = baseString ? baseString.split(':') : [];
      subsequentPaths = subsequentString ? subsequentString.split(':') : [];
      paths = basePaths.concat(subsequentPaths);
      return _.uniq(paths).join(':');
    };

    CommandRunner.getEnv = function(callback) {
      if (this._cachedEnv === void 0) {
        return this.fetchEnvOfLoginShell((function(_this) {
          return function(error, env) {
            if (env == null) {
              env = {};
            }
            _this._cachedEnv = _this.mergePathEnvs(env, process.env);
            return callback(_this._cachedEnv);
          };
        })(this));
      } else {
        return callback(this._cachedEnv);
      }
    };

    function CommandRunner(command) {
      this.command = command;
    }

    CommandRunner.prototype.run = function(callback) {
      return CommandRunner.getEnv((function(_this) {
        return function(env) {
          if (env == null) {
            env = process.env;
          }
          return _this.runWithEnv(env, callback);
        };
      })(this));
    };

    CommandRunner.prototype.runWithEnv = function(env, callback) {
      var hasInvokedCallback, proc, result;
      proc = child_process.spawn(this.command[0], this.command.splice(1), {
        env: env
      });
      result = {
        stdout: '',
        stderr: ''
      };
      hasInvokedCallback = false;
      proc.stdout.on('data', function(data) {
        return result.stdout += data;
      });
      proc.stderr.on('data', function(data) {
        return result.stderr += data;
      });
      proc.on('close', function(exitCode) {
        if (hasInvokedCallback) {
          return;
        }
        result.exitCode = exitCode;
        callback(null, result);
        return hasInvokedCallback = true;
      });
      return proc.on('error', function(error) {
        if (hasInvokedCallback) {
          return;
        }
        callback(error, result);
        return hasInvokedCallback = true;
      });
    };

    return CommandRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDREQUFBOztBQUFBLEVBQUEsYUFBQSxHQUFnQixPQUFBLENBQVEsZUFBUixDQUFoQixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBSkosQ0FBQTs7QUFBQSxFQUtDLElBQUssT0FBQSxDQUFRLE1BQVIsRUFBTCxDQUxELENBQUE7O0FBQUEsRUFPQSxVQUFBLEdBQWEsU0FBQyxLQUFELEVBQVEsSUFBUixFQUFjLFFBQWQsR0FBQTtBQUNYLFFBQUEsNEJBQUE7QUFBQTtTQUFTLG1GQUFULEdBQUE7QUFDRSxNQUFBLEtBQUEsR0FBUSxLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBZSxDQUFBLEdBQUksSUFBbkIsQ0FBUixDQUFBO0FBQUEsb0JBQ0EsUUFBQSxDQUFTLEtBQVQsRUFEQSxDQURGO0FBQUE7b0JBRFc7RUFBQSxDQVBiLENBQUE7O0FBQUEsRUFZQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osSUFBQSxhQUFDLENBQUEsVUFBRCxHQUFjLE1BQWQsQ0FBQTs7QUFBQSxJQUVBLGFBQUMsQ0FBQSxvQkFBRCxHQUF3QixTQUFDLFFBQUQsR0FBQTtBQUN0QixVQUFBLG1CQUFBO0FBQUEsTUFBQSxJQUFHLENBQUEsT0FBUSxDQUFDLEdBQUcsQ0FBQyxLQUFoQjtBQUNFLGVBQU8sUUFBQSxDQUFhLElBQUEsS0FBQSxDQUFNLHdDQUFOLENBQWIsQ0FBUCxDQURGO09BQUE7QUFHQSxNQUFBLElBQUcsT0FB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
//# sourceURL=/Users/frosas/projects/dotfiles/home/.atom/packages/atom-lint/lib/command-runner.coffee