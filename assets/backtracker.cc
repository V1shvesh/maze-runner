#include <nan.h>

using namespace v8;

NAN_METHOD(WhoAmI) {
  auto message = Nan::New<String>("I'm a Node Hero!").ToLocalChecked();
  info.GetReturnValue().Set(message);
}

NAN_MODULE_INIT(Initialize) {
	NAN_EXPORT(target, WhoAmI);
}

NODE_MODULE(backtrack, Initialize)