import React from 'react';
import 'firebase/auth';
import smashRequests from '../../../helpers/data/smashRequests';
import './articles.scss';
import Article from '../Article/article';
import authRequests from '../../../helpers/data/authRequests'

class Articles extends React.Component {
  state = {
    articles: [],
  }

  componentDidMount() {
    const uid = authRequests.getCurrentUid();
    smashRequests.getArticlesFromMeAndFriends(uid)
      .then((data) => {
        this.setState({ articles: data });
      }).catch(err => console.error('error getting data', err));
  }

  render() {
    const articleBuilder = this.state.articles.map((article) => {
      return (<Article
        id={article.id}
        title={article.title}
        synopsis={article.synopsis}
        url={article.url}
      />);
    });
    return (
      <div className="Articles">
        <h2>Articles Component</h2>
        <div>{articleBuilder}</div>
      </div>
    );
  }
}

export default Articles;
