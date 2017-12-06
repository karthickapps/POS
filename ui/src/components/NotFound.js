import React from "react";

import { Message } from "semantic-ui-react";

const NotFound = () => (
	<Message style={{ margin: 10 }} success>
		<Message.Header>Oops! 404</Message.Header>
		<Message.List>
			<Message.Item>
				Already signed up?&nbsp;<a href="/">Login here</a>&nbsp;instead.
			</Message.Item>
		</Message.List>
	</Message>
);

export default NotFound;