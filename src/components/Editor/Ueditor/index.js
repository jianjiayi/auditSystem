/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-01 13:29:57
 * @LastEditTime: 2020-07-06 14:48:46
 */ 
import React, {Component} from 'react';
import lodash from 'lodash';

const toolbars = [[
    'source', '|', 'undo', 'redo', '|',
    'bold', 'italic', 'underline', 
    // 'fontborder', 
    'strikethrough', 'removeformat', 
    // 'formatmatch', 
    // 'autotypeset', 
    'blockquote', 
    // 'pasteplain', 
    '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
    'paragraph', 'fontfamily', 'fontsize', '|',
    'indent',
    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 
    // 'touppercase', 'tolowercase', '|',
    'link', 
    // 'unlink', 
    '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
    'simpleupload', 'insertimage', 
    // '|',
    // 'horizontal',
    // 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|',
    // 'searchreplace'
]];

const createScript = (url) => {
    const scriptTags = window.document.querySelectorAll('script');
    const len = scriptTags.length;
    let i = 0;
    const _url = window.location.origin + url;
    return new Promise((resolve, reject) => {
        for (i = 0; i < len; i++) {
            const src = scriptTags[i].src;
            if (src && src === _url) {
              scriptTags[i].parentElement.removeChild(scriptTags[i]);
            }
        }

        const node = document.createElement('script');
        node.src = url;
        node.onload = resolve;
        document.body.appendChild(node);
    });
}

class UEditor extends Component {
    constructor(props) {
        super(props);
        this.inited = false;
        this.timer = null;
        this.editor = null;
    }

    onContentChange = () => {
        if(this.inited && this.props.onContentChange) {
            this.props.onContentChange(this.editor.getContent);
        }
    }

    onEditorReady = (UE) => {
        const props = this.props;
        const config = lodash.omit(props, ['id', 'width', 'height']);
        config.initialFrameWidth = props.initialFrameWidth || props.width;
        config.initialFrameHeight = props.initialFrameHeight || props.height;
        this.editor = UE.getEditor(props.id, config);
        this.editor.ready(() => {
            this.editor.addListener('contentchange', this.onContentChange);
            if(this.props.initialContent) {
                this.editor.setContent(this.props.initialContent);
                this.inited = true;
            }
        });
    }

    initUeditor = () => {
        let UE = window.UE || {};
        if(UE.getEditor) {
            this.onEditorReady(UE);
        } else {
            this.timer = setInterval(() => {
                if(UE.getEditor) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.onEditorReady(UE);
                }
            }, 300);
        }
    }

    getContent = () => {
        return this.editor.getContent();
    }

    componentWillReceiveProps (nextProps) {
        if(!this.inited && this.editor && this.editor.isReady && !lodash.isEmpty(nextProps.initialContent)) {
            this.editor.setContent(nextProps.initialContent);
            this.inited = true;
        }
    }

    componentDidMount() {
        const {ueditorConfigSrc, ueditorSrc} = this.props;
        Promise.all([createScript(ueditorConfigSrc),createScript(ueditorSrc)])
        .then((res)=>{
            this.initUeditor()
        }).catch((error) => {
            console.log(error)
        })
        
    }

    componentWillUnmount() {
        if(this.editor) {
            this.editor.removeListener('contentChange', this.onContentChange);
            this.editor.destroy();
            this.editor = null;
        }
    }

    render() {
        const {id} = this.props;
        return (
            <script id={id} type="text/plain"></script>
        );
    }
}

UEditor.defaultProps = {
    toolbars,
    id: 'ueditor-container',
    width: '100%',
    height: 164,
    initialContent: '',
    ueditorConfigSrc: "/ueditor/ueditor.config.js",
    ueditorSrc: "/ueditor/ueditor.all.js",
    maximumWords: 1000000,
    scaleEnabled: false,
    autoFloatEnabled: false,
    autoHeightEnabled: false
};

export default UEditor;