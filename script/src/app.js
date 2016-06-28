const $ = document.querySelector.bind(document);
import XMLListGenerator from './XMLListGenerator';

window.addEventListener('load', () => {
    
    let input = $('#xml');
    let output = $('#list');
    let Editor = EditorFactory.create(input);
    let ListGenerator = new XMLListGenerator(input, output);
    let DataLoader = new XMLDataLoader(input, '/items.xml');
    
    DataLoader.load();
    
    let editor = CodeMirror.fromTextArea(input, {
        lineNumbers: true,
        mode: 'xml',
        htmlMode: false,
        matchClosing: true
    });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/items.xml');
    xhr.onload = function() {
        console.log(xhr)
    };
    xhr.send();
    
    
    
}, false);