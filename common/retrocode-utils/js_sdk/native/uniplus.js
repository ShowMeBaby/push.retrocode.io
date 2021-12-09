function ImportAndroidPackage(packageName) {
  return plus.android.importClass(packageName);
}

function InvokeAndroidMethod(instanceObject, method, ...param) {
  return plus.android.invoke(instanceObject, method, ...param);
}

module.exports = {
  ImportAndroidPackage,
  InvokeAndroidMethod
}
