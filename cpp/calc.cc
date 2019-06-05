/**
 *
 */
#include <napi.h>

using namespace Napi;

namespace {

Value Loop(const CallbackInfo& info) {
  Env env = info.Env();

  if (!info[0].IsNumber()) {
    throw Error::New(env, "NotNumber");
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
