import React from 'react';
import './article.scss';

class Article extends React.Component {
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{this.props.title}</h5>
          <p class="card-text">{this.props.synopsis}</p>
          <a href={this.props.url} class="btn btn-primary">{this.props.url}</a>
        </div>
      </div>
    );
  }
}

export default Article;
