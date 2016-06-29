
export default
{
    create(input) {
        return CodeMirror.fromTextArea(input, {
            lineNumbers: true,
            mode: input.dataset.mode,
            htmlMode: false,
            matchClosing: true
        });
    }
};