export interface DialogProps {
	title: string;
	description?: string;
	content?: React.ReactNode;
	placement?: "top" | "center" | "bottom";
}
