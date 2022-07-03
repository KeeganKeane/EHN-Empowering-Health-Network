import React, { useState, useMemo } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import DOMPurify from 'dompurify';
import {marked} from 'marked';
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'


//https://zenn.dev/rinka/articles/b260e200cb5258

const MarkdownEditor = (props) => {

  const configureOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: ['|',
                'bold',
                'italic',
                'heading',
                '|',
                'strikethrough',
                'unordered-list',
                'ordered-list',
                'horizontal-rule',
                '|',
                'link',
                '|',
                'preview',
                'side-by-side',
                'fullscreen',
                '|',
                'guide',
            ]
    }
  }, []);


  // ハイライトの設定
marked.setOptions({
  highlight: (code, lang) => {
    return highlightjs.highlightAuto(code, [lang]).value;
    },
  });


  const onChange = (value) => {
    console.log(value);
    props.onChangeHandler(value);
  };

  return (
    <div className='flex markdown-editor '>
      <SimpleMde value={props.content} onChange={onChange} options={configureOptions} className="markdown-content mx-1"/>

    </div>
  );
};

export default MarkdownEditor;
