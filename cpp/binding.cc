/**
 * https://github.com/nodejs/node-addon-api/blob/master/test/binding.cc
 */
#include <napi.h>

using namespace Napi;

Object InitTest(Env env);
Object InitCalc(Env env);

Object Init(Env env, Object exports) {
  exports.Set("test", InitTest(env));
  exports.Set("calc", InitCalc(env));

  return exports;
}

NODE_API_MODULE(addon, Init)
