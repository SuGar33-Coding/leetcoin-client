import { FunctionalComponent, h } from "preact";

interface Props {
	page?: string;
}

const NotLoggedIn: FunctionalComponent<Props> = (props: Props) => {
	return (
		<div>
			<h3>
				Please Log In before you access
				{props.page ? ` the ${props.page}` : " this"} page.
			</h3>
		</div>
	);
};

export default NotLoggedIn;
