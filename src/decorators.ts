export function authenticate(target: Object, key: string, descriptor: any) {
  const value = descriptor.value;

  descriptor.value = function() {
    const args = arguments;

    return this.client.authenticate().then(() => {
      return value.apply(this, args);
    });
  };

  return descriptor;
}
