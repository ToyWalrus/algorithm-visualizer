interface NodeArgs {
  value: String | number;
  index?: number;
}

export default class Node {
  private args: NodeArgs;

  get value(): String | number {
    return this.args.value;
  }

  listPosition?: number;

  // get isBeingSorted(): boolean {
  //   return true;
  // }
  isBeingSorted: boolean;

  get color(): String {
    return this.isBeingSorted ? 'steelblue' : 'green';
  }

  constructor(args: NodeArgs) {
    this.args = args;
    this.listPosition = args.index;
    this.isBeingSorted = false;
  }
}
