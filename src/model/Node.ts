interface NodeArgs {
  value: string | number;
  index?: number;
}

export default class Node {
  private args: NodeArgs;

  get value(): string | number {
    return this.args.value;
  }

  index?: number;

  // get isBeingSorted(): boolean {
  //   return true;
  // }
  isBeingSorted: boolean;

  get color(): string {
    return this.isBeingSorted ? 'steelblue' : 'green';
  }

  constructor(args: NodeArgs) {
    this.args = args;
    this.index = args.index;
    this.isBeingSorted = false;
  }
}
