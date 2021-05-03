import theme from '../app/theme/theme';

interface NodeArgs {
  value: string | number;
  id: string;
  index?: number;
}

export default class Node {
  private args: NodeArgs;

  get value(): string | number {
    return this.args.value;
  }

  get id(): string {
    return this.args.id;
  }

  index?: number;

  // get isBeingSorted(): boolean {
  //   return true;
  // }
  isBeingSorted: boolean;

  get color(): string {
    return this.isBeingSorted ? theme.palette.secondary.main : theme.palette.info.main;
  }

  constructor(args: NodeArgs) {
    this.args = args;
    this.index = args.index;
    this.isBeingSorted = false;
  }
}
