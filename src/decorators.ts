export function authenticate(target: Object, key: string, descriptor: any) {
  const value = descriptor.value;

  descriptor.value = function() {
    const args = arguments;

    if (!this.client.options.token) {
      return this.client.authenticate().then(() => {
        return value.apply(this, args);
      });
    } else {
      return Promise.resolve(value.apply(this, args));
    }
  };

  return descriptor;
}
