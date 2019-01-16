import React from 'react';
import articleRequests from '../../../helpers/data/articleRequests';
import authRequests from '../../../helpers/data/authRequests';
import './articleForm.scss';

class ArticleForm extends React.Component {
  addArticles = (e) => {
    e.preventDefault();
    const newArticle = {
      title: document.getElementById('articleName').value,
      synopsis: document.getElementById('articleSynopsis').value,
      url: document.getElementById('articleUrl').value,
      uid: authRequests.getCurrentUid(),
    };
    articleRequests.postRequest(newArticle)
      .then(() => {
        this.props.displayArticles();
      }).catch(err => console.error('err posting article', err));
  };
  
  render() {
    return (
      <form className="form-details">
      <div className="form-group">
        <label htmlFor="articleName">Title</label>
        <input type="text" className="form-control" id="articleName" placeholder="Article Title"/>
      </div>
      <div className="form-group">
        <label htmlFor="articleSynopsis">Synopsis</label>
        <input type="text" className="form-control" id="articleSynopsis" placeholder="Synopsis"/>
      </div>
      <div className="form-group">
        <label htmlFor="articleUrl">URL</label>
        <input type="text" className="form-control" id="articleUrl" placeholder="URL"/>
      </div>
      <button type="submit" className="btn btn-primary" onClick={this.addArticles}>Submit</button>
      </form>
    );
  }
}

export default ArticleForm;
