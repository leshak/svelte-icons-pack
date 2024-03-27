export const log = (msg: string) => {
	process.stdout.write(msg);
};

export const logClearLine = () => {
	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
};
