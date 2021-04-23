interface NodeArgs {
  value: String | number;
}

export default class Node {
  private args: NodeArgs;

  get value(): String | number {
    return this.args.value;
  }

  get isBeingSorted(): boolean {
    return true;
  }

  constructor(args: NodeArgs) {
    this.args = args;
  }
}
