import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../utils/api";
import Articles from "./Articles";
import Comments from "./Comments";
import NewComment from "./NewComment";
import Vote from "./Vote";

function Article() {
  const [currArticle, setArticle] = useState({ created_at: "0000-00-00" });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    getArticle(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [article_id]);

  if (isError) {
    return <p className="error">Oopps.. {isError.msg}</p>;
  }

  if (isLoading) {
    return <p>... loading</p>;
  }

  return (
    <>
      <div className="article">
        <article>
          <h2>{currArticle.title}</h2>
          <div className="article-info">
            <p>in {currArticle.topic}</p>
            <p>created at {currArticle.created_at.slice(0, 10)}</p>
            <p>by {currArticle.author}</p>
          </div>
          <p className="article-body">{currArticle.body}</p>
          <div className="article-info">
            <Vote currArticle={currArticle} />
          </div>
          <div className="comments">
            <NewComment article_id={article_id} />
            <div className="comments-count">
              <span className="material-symbols-outlined">comment</span>
              <p>{currArticle.comment_count} comments</p>
            </div>
            <Comments article_id={currArticle.article_id} />
          </div>
        </article>
      </div>
      <h3>Related articles:</h3>
      <Articles topicFromArticle={currArticle.topic} />
    </>
  );
}

export default Article;
