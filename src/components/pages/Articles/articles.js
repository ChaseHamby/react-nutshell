import React from 'react';
import 'firebase/auth';
import smashRequests from '../../../helpers/data/smashRequests';
import './articles.scss';
import Article from '../Article/article';
import authRequests from '../../../helpers/data/authRequests';
import ArticleForm from '../ArticleForm/articleForm';

class Articles extends React.Component {
  state = {
    articles: [],
    isEditing: false,
    articleId: '',
  }

  displayArticles = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests.getArticlesFromMeAndFriends(uid)
      .then((data) => {
        this.setState({ articles: data });
      }).catch(err => console.error('error getting data', err));
  }

  editing = (currentId) => {
    this.setState({ isEditing: true, articleId: currentId });
  }

  updateArticles = () => {
    this.displayArticles();
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
        editing={this.editing}
      />);
    });
    return (
      <div className="Articles row">
        <div className="builder">{articleBuilder}</div>
        <div className="articleForm">
        <ArticleForm
        displayArticles={this.displayArticles}
        editing={this.editing}
        isEditing={this.state.isEditing}
        articleId={this.state.articleId}
        />
        </div>
      </div>
    );
  }
}

export default Articles;
