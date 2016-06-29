const $ = document.querySelector.bind(document);
import XMLListGenerator from './XMLListGenerator';
import EditorFactory from './EditorFactory';
import XMLDataLoader from './XMLDataLoader';

window.addEventListener('load', () => {

    let Editor          =   EditorFactory.create($('#editor')),
        JSONOutput      =   EditorFactory.create($('#json_output')),
        DataLoader      =   new XMLDataLoader(Editor, '/items.xml'),
        ListGenerator   =   new XMLListGenerator(Editor, JSONOutput, $('#list'), $('#depth'));

    ListGenerator.on('options_generated', () => {
        ListGenerator.DepthSelect.value = 2;
        ListGenerator.off('options_generated');
    });
    
    DataLoader.load();
    
}, false);