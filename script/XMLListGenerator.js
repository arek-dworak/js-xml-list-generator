
export default function(Editor, JsonOutput, HtmlListOutput, DepthSelect)
{
    this.Editor = null;
    this.JsonOutput = null;
    this.DepthSelect = null;
    this.HtmlListOutput = null;
    
    this.event_handlers = {
        options_generated: () => {}
    };
    
    this.xml = null;
    
    this.constructor = function(Editor, JsonOutput, HtmlListOutput, DepthSelect)
    {
        this.Editor = Editor;
        this.JsonOutput = JsonOutput;
        this.DepthSelect = DepthSelect;
        this.HtmlListOutput = HtmlListOutput;
        
        this.bind();
    };
    
    this.on = function(name, callback)
    {
        this.event_handlers[name] = callback;
    };
    
    this.fire = function(name)
    {
        this.event_handlers[name].call();
    };
    
    this.off = function(name)
    {
        this.event_handlers[name] = () => {};
    };
    
    this.bind = function()
    {
        const GenerateList = () =>
        {
            let node_list = this.findNodeList();
            this.generateJsonOutput(node_list);
            this.generateHtmlOutput(node_list);
        };
        
        CodeMirror.on(this.Editor, 'change', () => {
            this.loadXML();
            this.generateDepthOptions(this.findMaxDepth());
            this.fire('options_generated');

            GenerateList();
        });
        
        this.DepthSelect.addEventListener("change", GenerateList);
    };
    
    this.loadXML = function()
    {
        this.xml = (new DOMParser()).parseFromString(this.Editor.getValue(), "text/xml");
    };
    
    this.findMaxDepth = function()
    {
        var traverseChildren = function(node, depth)
        {
            var kids_max_depth = depth;
            for(let i = 0; i < node.length; i++)
            {
                let child = node[i]; 
                let kid_depth = traverseChildren(child.children, depth + 1);
                kids_max_depth = kids_max_depth < kid_depth ? kid_depth : kids_max_depth; 
            }
            return kids_max_depth;
        };
        
        return traverseChildren(this.xml.children, 0);
    };
    
    this.generateDepthOptions = function(max_depth)
    {
        let current_max_depth = this.DepthSelect.children.length;
        
        if(max_depth > current_max_depth) // add options
        {
            for(let i = current_max_depth + 1; i <= max_depth; i++)
            {
                let option = document.createElement("option");
                option.text = "Level " + i;
                option.value = i;
                this.DepthSelect.add(option);
            }
        } else if(max_depth < current_max_depth) // remove options
        {
            for(let i = current_max_depth - 1; i >= max_depth; i--) {
                this.DepthSelect.remove(i);
            }
        }
    };
    
    this.findNodeList = function()
    {
        let node_list = [];
        
        var target_depth = this.DepthSelect.value,
            traverseNodes = (node, current_depth, node_list) => {
                if(current_depth == target_depth)
                {
                    node_list.push({
                        name: node.nodeName,
                        children: node.children.length
                    });

                    return node_list;
                }
                
                for(let i = 0; i < node.children.length; i++)
                {
                    let child = node.children[i];
                    traverseNodes(child, current_depth + 1, node_list);
                }
                
                return node_list;
            };
        
        return traverseNodes(this.xml, 0, node_list);
    };
    
    this.generateJsonOutput = function(node_list)
    {
        this.JsonOutput.setValue(JSON.stringify(node_list, null, 2));
    };
    
    this.generateHtmlOutput = function(node_list)
    {
        this.HtmlListOutput.innerHTML = '';
        var List = document.createElement("ul");
        
        for(let i = 0; i < node_list.length; i++)
        {
            let node = node_list[i],
                ListElement = document.createElement("li");
            ListElement.innerHTML = '( ' + node.children + ' ) ' + node.name;
            List.appendChild(ListElement);
        }
        
        this.HtmlListOutput.appendChild(List);
    };
    
    this.constructor(Editor, JsonOutput, HtmlListOutput, DepthSelect);
};