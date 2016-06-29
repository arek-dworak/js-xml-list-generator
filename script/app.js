const $ = document.querySelector.bind(document);
import XMLListGenerator from './XMLListGenerator';
import EditorFactory from './EditorFactory';
import XMLDataLoader from './XMLDataLoader';

window.addEventListener('load', () => {
    
    let Editor = EditorFactory.create($('#xml'));
    let ListGenerator = new XMLListGenerator(Editor, $('#list'), $('.error'));
    let DataLoader = new XMLDataLoader(Editor, '/items.xml');
    
    DataLoader.load();
    
}, false);