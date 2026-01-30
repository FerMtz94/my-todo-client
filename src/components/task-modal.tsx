import { createOverlay, Dialog, Portal } from "@chakra-ui/react";
import type React from "react";

interface DialogProps {
	title: string;
	description?: string;
	content?: React.ReactNode;
}

export const TaskModal = createOverlay<DialogProps>((props) => {
	const { title, description, content, ...rest } = props;
	return (
		<Dialog.Root {...rest}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						{title && (
							<Dialog.Header>
								<Dialog.Title>{title}</Dialog.Title>
							</Dialog.Header>
						)}
						<Dialog.Body spaceY="4">
							{description && (
								<Dialog.Description>{description}</Dialog.Description>
							)}
							{content}
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
});
