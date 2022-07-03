import React, { Component } from 'react';
import {dateFunction, truncateContext} from '../../../util/utils'
import remarkGfm from 'remark-gfm';
import ReactMarkdown from "react-markdown";

class JournalContent extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="py-2">
        <div className="text-sm"
             style= {{ color: '#6B6B6B'}}>
          {dateFunction(this.props.msgObject.createdAt)}
        </div>
        <div className="text-4xl font-bold"
             style= {{ color: '#6B6B6B'}}>
          <div className="sm:hidden flex">
            {truncateContext(this.props.msgObject.title, "10")}
          </div>
          <div className="sm:flex hidden">
            {truncateContext(this.props.msgObject.title, "50")}
          </div>
        </div>
        <div className="text-md"
             style= {{ color: '#6B6B6B'}}>
          by {this.props.msgObject.username}
        </div>
        <div className="text-xl break-all"
             style= {{ color: '#8A8A8A'}}>

          <br />
          <ReactMarkdown children={truncateContext(this.props.msgObject.content, "128")} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
    )
  };
}

export default JournalContent;