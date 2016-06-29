
export default
{
    create(input) {
        return CodeMirror.fromTextArea(input, {
            lineNumbers: true,
            mode: 'xml',
            htmlMode: false,
            matchClosing: true
        });
    }
};