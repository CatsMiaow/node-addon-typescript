/**
 * https://github.com/nodejs/node-addon-examples/tree/master/2_function_arguments/node-addon-api
 */
#include <napi.h>

using namespace Napi;

namespace {

Value Loop(const CallbackInfo& info) {
  Env env = info.Env();

  if (info.Length() != 1) {
    // throw Error::New(env, "Message");
    // throw RangeError::New(env, "Message");
    throw TypeError::New(env, "RequiredParameter");
    // return env.Null();
  }

  if (!info[0].IsNumber()) {
    throw TypeError::New(env, "NotNumber");
  }

  int count = 0;
  int size = info[0].ToNumber();
  for (int i = 0; i < size; i++) {
    count += 1;
  }

  auto deferred = Promise::Deferred::New(env);
  deferred.Resolve(Number::New(env, count));

  return deferred.Promise();
}

}  // anonymous namespace

Object InitCalc(Env env) {
  Object exports = Object::New(env);
  exports.Set("loop", Function::New(env, Loop));

  return exports;
}
