import theme from 'app/theme/theme';

interface NodeProps {
	value: string | number;
	id: string;
	index?: number;
}

export default class Node {
	private props: NodeProps;

	constructor(props: NodeProps) {
		this.props = props;
		this.index = props.index;
		this.isBeingSorted = false;
	}

	get value(): string | number {
		return this.props.value;
	}

	index?: number;

	isBeingSorted: boolean;

	get color(): string {
		return this.isBeingSorted ? theme.palette.secondary.main : theme.palette.info.main;
	}

	get id(): string {
		return this.props.id;
	}
}
