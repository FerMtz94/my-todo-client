import { createOverlay, Dialog, Portal } from "@chakra-ui/react";
import type { DialogProps } from "@/types/dialog-props";

export const dialog = createOverlay<DialogProps>((props) => {
	const { title, description, content, ...rest } = props;
	return (
		<Dialog.Root {...rest}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content className="dialog">
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
