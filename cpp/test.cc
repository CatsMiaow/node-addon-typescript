/**
 * https://github.com/nodejs/node-addon-api
 * https://github.com/nodejs/node-addon-examples/blob/master/1_hello_world/node-addon-api/hello.cc
 */
#include <napi.h>

// using namespace Napi;

namespace {

Napi::String Hello(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "world");
}

Napi::String Foo(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "bar");
}

}  // anonymous namespace

Napi::Object InitTest(Napi::Env env) {
  Napi::Object exports = Napi::Object::New(env);
  exports.Set(Napi::String::New(env, "foo"), Napi::Function::New(env, Foo));
  exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Hello));
  return exports;
}
