import React from 'react';
import 'firebase/auth';
import smashRequests from '../../../helpers/data/smashRequests';
import './articles.scss';
import Article from '../Article/article';
import authRequests from '../../../helpers/data/authRequests';
import articleRequests from '../../../helpers/data/articleRequests';

class Articles extends React.Component {
  state = {
    articles: [],
  }

  displayArticles = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests.getArticlesFromMeAndFriends(uid)
      .then((data) => {
        this.setState({ articles: data });
      }).catch(err => console.error('error getting data', err));
  }

  updateArticles = () => {
    this.displayArticles();
  }

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
        this.displayArticles();
      }).catch(err => console.error('err posting article', err));
  }

  componentDidMount() {
    this.displayArticles();
  }

  render() {
    const articleBuilder = this.state.articles.map((article) => {
      return (<Article
        id={article.id}
        key={article.id}
        uid={article.uid}
        title={article.title}
        synopsis={article.synopsis}
        url={article.url}
        updateArticles={this.updateArticles}
      />);
    });
    return (
      <div className="Articles row">
        <div className="builder">{articleBuilder}</div>
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
      </div>
    );
  }
}

export default Articles;
