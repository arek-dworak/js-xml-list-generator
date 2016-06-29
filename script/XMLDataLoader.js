
export default function(Editor, file) {

    this.file = null;
    this.Editor = null;
    this.request = new XMLHttpRequest();
    
    this.construct = function(Editor, file)
    {
        this.file = file;
        this.Editor = Editor;
        
        this.request.open('GET', file);
        this.request.onload = () => {
            this.Editor.setValue(this.request.response);
        };
    };
    
    this.load = function()
    {
        this.request.send();
    };
    
    this.construct(Editor, file);
}
