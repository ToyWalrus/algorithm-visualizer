interface NodeProps {
	value: string | number;
	id: string;
	index?: number;
	primaryColor: string;
	alternateColor?: string;
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
		if (!this.props.alternateColor) return this.props.primaryColor;
		return this.isBeingSorted ? this.props.alternateColor : this.props.primaryColor;
	}

	get id(): string {
		return this.props.id;
	}
}
