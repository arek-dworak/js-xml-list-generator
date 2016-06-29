
export default function XMLListGenerator(Editor, output)
{
    this.Editor = null;
    this.ouput = null;
    
    this.constructor = function(Editor, output) {
        this.Editor = Editor;
        this.output = output;
        
        this.bind();
    };
    
    this.bind = function() {
        CodeMirror.on(this.Editor, 'change', () => {
            let xml = (new DOMParser()).parseFromString(this.Editor.getValue(), "text/xml");

            console.log(xml)
        });
    };
    
    this.constructor(Editor, output);
};