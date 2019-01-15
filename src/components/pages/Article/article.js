import React from 'react';
import articleRequests from '../../../helpers/data/articleRequests';
import authRequests from '../../../helpers/data/authRequests';
import './article.scss';

class Article extends React.Component {
  render() {
    const myUid = authRequests.getCurrentUid();
    const deleteEvent = (e) => {
      articleRequests.deleteArticle(this.props.id)
        .then(() => {
          this.props.updateArticles();
        })
        .catch(err => console.error('error with delete single', err));
    };
    
    const showDeleteButton = () => {
      if (this.props.uid === myUid) {
        return (
          <div>
          <button className="btn btn-danger" onClick={deleteEvent}>Delete</button>
        </div>
        );
      }
    };
    
    return (
          <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{this.props.title}</h5>
            <p className='card-text'>{this.props.synopsis}</p>
            <a href={this.props.url} className='btn btn-primary'>{this.props.url}</a>
            {showDeleteButton()}
          </div>
        </div>
    );
  }
}

export default Article;
