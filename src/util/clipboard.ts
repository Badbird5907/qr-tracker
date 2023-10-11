export async function copyToClipboard(textToCopy: string): Promise<boolean> {
    async function workaround(): Promise<boolean> {
        // https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        let success = false;
        try {
            document.execCommand("copy");
            success = true;
        } catch (e) {
            console.error(e);
            success = false;
        } finally {
            textArea.remove();
        }
        return success;
    }

    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(textToCopy);
            return true;
        } catch (e) {
            console.error(e);
        }
    }
    return workaround();
}