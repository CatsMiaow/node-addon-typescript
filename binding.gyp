# https://github.com/nodejs/node-addon-api/blob/master/doc/setup.md
# https://github.com/nodejs/node-addon-api/blob/master/test/binding.gyp
{
  "targets": [{
    "target_name": "demo",
    "sources": [ "./cpp/hello.cc" ]
  }, {
    "target_name": "addon",
    "defines": [ "NAPI_CPP_EXCEPTIONS" ], #NAPI_DISABLE_CPP_EXCEPTIONS
    "cflags!": [ "-fno-exceptions" ],
    "cflags_cc!": [ "-fno-exceptions" ],
    "xcode_settings": {
      "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
      "CLANG_CXX_LIBRARY": "libc++",
      "MACOSX_DEPLOYMENT_TARGET": "10.7"
    },
    "msvs_settings": {
      "VCCLCompilerTool": { "ExceptionHandling": 1 }
    },
    "sources": [ "./cpp/binding.cc", "./cpp/test.cc", "./cpp/calc.cc" ],
    "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
    "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"]
  }]
}
